/* MOTION: a film strip pinned to the screen that slides sideways while you scroll.
   15 frames in 5 movements; the big title follows the movement that is on screen.
   Edit a movement below: t = title, fr = frames (i = image name from js/config.js, a = alt text).
   To add a frame: put the file into assets/motion/, list it in js/config.js (images) and add a line to fr.
   STEP = screens of scrolling per frame. */
(() => {
  const R = REZE;
  const STEP = 0.5;

  const MOVEMENTS = [
    {
      t: 'THE APPROACH',
      fr: [
        { i: 'cafe', a: 'Reze rests a hand on Denji’s shoulder at a café table' },
        { i: 'night', a: 'Reze and Denji, hands joined, faces close, a city glowing behind them' },
        { i: 'fireworks', a: 'Two silhouettes embracing at a railing in front of fireworks' }
      ]
    },
    {
      t: 'THE LOOK',
      fr: [
        { i: 'smile', a: 'Reze smiling, looking up at the camera over Denji’s shoulder' },
        { i: 'eyeBlue', a: 'Close-up of an eye in blue light' },
        { i: 'eyeGreen', a: 'Close-up of a green eye behind wet strands of hair' }
      ]
    },
    {
      t: 'THE WAIT',
      fr: [
        { i: 'rainHead', a: 'Reze with her head lowered in the rain, a fence behind her' },
        { i: 'window', a: 'Reze at a rainy window at night' },
        { i: 'beach', a: 'A dark beach by the water at night' }
      ]
    },
    {
      t: 'THE BLAST',
      fr: [
        { i: 'boom', a: 'A figure on a road in front of a huge yellow explosion' },
        { i: 'fireDoor', a: 'Reze holding out a hand towards a wall of fire in a doorway' },
        { i: 'devil', a: 'The Bomb Devil seen from below, arms spread, in a dark red light' }
      ]
    },
    {
      t: 'THE EXIT',
      fr: [
        { i: 'mouth', a: 'Reze wiping blood from her mouth' },
        { i: 'alley', a: 'Makima holding Reze in a sunlit alley' },
        { i: 'footprints', a: 'A girl in a white shirt walking away along wet sand, footprints behind her' }
      ]
    }
  ];

  // All frames in one list; mi = movement index, fi = frame index inside it, n = frames in the movement
  const FRAMES = MOVEMENTS.flatMap((m, mi) => m.fr.map((f, fi) => ({ ...f, mi, fi, n: m.fr.length })));

  const imageHtml = (f) => `<img data-img="${f.i}" alt="${f.a}">`;

  // Reduced motion: no moving strip, the movements simply follow one another
  const listHtml = () => MOVEMENTS.map((m) => (
    `<section class="mf"><h2>${m.t}</h2>${m.fr.map((f) => `<figure>${imageHtml(f)}</figure>`).join('')}</section>`
  )).join('');

  const stripHtml = () => {
    const titles = MOVEMENTS.map((m, i) => `<div class="mi" data-m="${i}"><h2>${m.t}</h2></div>`).join('');
    const figures = FRAMES.map((f) => (
      `<figure>${imageHtml(f)}<figcaption>${MOVEMENTS[f.mi].t} · ${f.fi + 1}/${f.n}</figcaption></figure>`
    )).join('');
    const height = 100 + (FRAMES.length - 1) * STEP * 100; // vh of scrolling
    return `<section class="mo-s" style="height:${height}vh"><div class="stk">`
      + `<div class="mo-top"><div class="mo-ti">${titles}</div></div>`
      + `<div class="strip">${figures}</div></div></section>`;
  };

  let live = null; // elements of the open page, null while closed or in reduced motion

  R.pages.motion = {
    html: () => `<article class="mo"><header class="hd rv"><h1>MOTION</h1></header>${R.reduced ? listHtml() : stripHtml()}</article>`,

    init(root) {
      R.kit.reveal(root, '.rv');
      const section = root.querySelector('.mo-s');
      live = section && {
        section,
        strip: section.querySelector('.strip'),
        figures: [...section.querySelectorAll('figure')],
        titles: [...section.querySelectorAll('.mi')],
        view: '', // last drawn scroll position + window size
        active: -1 // movement whose title is shown
      };
    },

    destroy() {
      live = null;
    },

    // Called on every screen refresh while this page is open: scroll position -> where the strip is
    frame() {
      if (!live) return;
      const view = `${scrollY}|${innerWidth}|${innerHeight}`;
      if (view === live.view) return; // nothing moved, nothing to redraw
      live.view = view;

      const { clamp, progress } = R.kit;
      const { section, strip, figures, titles } = live;
      const pos = progress(section) * (figures.length - 1); // 0 .. last frame (fractional)
      const step = figures[1].offsetLeft - figures[0].offsetLeft;
      strip.style.transform = `translateX(${-pos * step}px)`;

      // the frame in the middle is full size and bright, its neighbours are smaller and dimmer
      figures.forEach((fig, k) => {
        const away = clamp(Math.abs(k - pos));
        fig.style.opacity = 1 - 0.55 * away;
        fig.style.transform = `scale(${1 - 0.07 * away})`;
      });

      const movement = FRAMES[Math.round(pos)].mi;
      if (movement !== live.active) {
        live.active = movement;
        titles.forEach((t) => t.classList.toggle('on', +t.dataset.m === movement));
      }
    }
  };
})();
