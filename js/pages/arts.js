/* ARTS: an asymmetric, self-arranging collection. The pictures are listed in js/arts-list.js.
   Every photo keeps its own proportions; large and small frames follow a repeating rhythm.
   Scroll animation: each photo rises and fades in as it enters the screen. */
(() => {
  const R = REZE;

  // Rhythm per screen size. s = first column, n = columns wide, dy = extra space above (vw).
  // The first entry opens the page; the others repeat in a loop.
  const PATTERNS = {
    D: [ // desktop, 12 columns
      { s: 1, n: 12 },
      { s: 1, n: 8 }, { s: 9, n: 4, dy: 10 }, { s: 2, n: 4 }, { s: 7, n: 6, dy: 7 }, { s: 1, n: 6 },
      { s: 8, n: 5, dy: 12 }, { s: 3, n: 10 }, { s: 1, n: 5 }, { s: 7, n: 6, dy: 5 }
    ],
    T: [ // tablet, 6 columns
      { s: 1, n: 6 },
      { s: 1, n: 4 }, { s: 4, n: 3, dy: 8 }, { s: 2, n: 5 }, { s: 1, n: 3 }, { s: 4, n: 3, dy: 10 },
      { s: 1, n: 6 }, { s: 3, n: 4 }
    ],
    P: [ // phone, 6 columns
      { s: 1, n: 6 }, { s: 3, n: 4 }, { s: 1, n: 5 }, { s: 2, n: 5 }, { s: 1, n: 4 }, { s: 3, n: 4 }
    ]
  };
  const COLUMNS = { D: 12, T: 6, P: 6 };
  const SIZE = { s: 0.4, m: 0.6, l: 0.8, full: 1 }; // share of the row for size:'s' | 'm' | 'l' | 'full'

  let alive = false;
  let box = null; // the grid element
  let items = []; // loaded pictures: { item, img, ratio }
  let mode = ''; // 'D' | 'T' | 'P' of the current layout
  let observer = null; // scroll reveal
  let resizeFrame = 0;
  let session = 0; // changes on every open/close, so a late image load cannot touch a closed page

  const currentMode = () => (innerWidth <= 760 ? 'P' : innerWidth <= 1000 ? 'T' : 'D');
  const parseRatio = (r) => {
    const [a, b] = String(r).split('/').map(Number);
    return a / (b || 1);
  };

  // Where picture number `index` goes: first column, width in columns, extra space above
  function place(index, ratio, item, screen) {
    const pattern = PATTERNS[screen];
    const columns = COLUMNS[screen];
    const opener = index === 0;
    const slot = opener ? pattern[0] : pattern[1 + (index - 1) % (pattern.length - 1)];
    let start = slot.s;
    let span = slot.n;

    const forced = SIZE[item.size];
    if (forced) {
      span = opener ? Math.round(columns * forced) : Math.max(2, Math.round(columns * forced));
    } else if (!opener) {
      // portrait photos get narrower frames, very wide ones wider
      const k = ratio < 0.8 ? 0.6 : ratio < 1.1 ? 0.8 : ratio > 1.9 ? 1.25 : 1;
      span = Math.min(columns, Math.max(screen === 'D' ? 3 : 2, Math.round(span * k)));
    }
    if (screen === 'P' && !opener && span < 4) span = 4; // on a phone no frame is narrower than 4 of 6 columns
    if (start + span - 1 > columns) start = columns - span + 1;

    return { start, span, dy: screen === 'P' ? 0 : slot.dy || 0 };
  }

  function layout() {
    if (!alive || !box) return;
    mode = currentMode();
    box.textContent = '';

    items.forEach(({ item, img, ratio }, i) => {
      const { start, span, dy } = place(i, ratio, item, mode);
      const fig = document.createElement('figure');
      fig.style.gridColumn = `${start} / span ${span}`;
      if (dy) fig.style.marginTop = dy + 'vw';

      if (item.ratio || item.pos) { // a fixed crop was asked for
        fig.classList.add('fx');
        if (item.ratio) fig.style.aspectRatio = item.ratio;
        if (item.pos) img.style.objectPosition = item.pos;
      }
      fig.appendChild(img);

      if (item.caption) {
        const caption = document.createElement('figcaption');
        caption.textContent = item.caption;
        fig.appendChild(caption);
      }
      if (!R.reduced) {
        fig.classList.add('rv');
        fig.style.transitionDelay = (i % 3) * 90 + 'ms';
      }
      box.appendChild(fig);
    });

    if (observer) observer.disconnect();
    observer = R.kit.reveal(box, 'figure.rv', 0.12);
  }

  // Resolves with the loaded picture, or null if the file is missing (it is simply skipped)
  const load = (item) => new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.alt = item.alt || '';
    img.onload = () => resolve({ item, img, ratio: item.ratio ? parseRatio(item.ratio) : img.naturalWidth / img.naturalHeight });
    img.onerror = () => resolve(null);
    img.src = R.src('arts/' + item.file);
  });

  // Re-arrange only when the screen class changes (phone / tablet / desktop)
  const onResize = () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      if (currentMode() !== mode) layout();
    });
  };

  R.pages.arts = {
    html: () => '<article class="ar-pg"><header class="hd"><h1>ARTS</h1><span class="sub">FAN ART</span></header><div class="ar" id="ar"></div></article>',

    init(root) {
      alive = true;
      box = root.querySelector('#ar');
      const mine = ++session;

      const seen = new Set(); // a file listed twice is shown once
      const list = (R.arts || []).filter((item) => {
        if (!item || !item.file || seen.has(item.file)) return false;
        seen.add(item.file);
        return true;
      });

      Promise.all(list.map(load)).then((loaded) => {
        if (mine !== session) return; // the page was closed meanwhile
        items = loaded.filter(Boolean);
        layout();
      });
      addEventListener('resize', onResize);
    },

    destroy() {
      session++;
      alive = false;
      box = null;
      items = [];
      if (observer) observer.disconnect();
      observer = null;
      cancelAnimationFrame(resizeFrame);
      removeEventListener('resize', onResize);
    }
  };
})();
