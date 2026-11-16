/* Hash router: #about, #motion, #story, #arts. The logo (#home) returns to the home view.
   Pages change behind a short fade (the veil). A section page is an object in REZE.pages:
     html()      -> markup           init(root)  -> optional, runs after the markup is in the page
     frame(root) -> optional, called every screen refresh while the section is open (MOTION)
     destroy()   -> optional, called when the section is left */
(() => {
  const R = REZE;
  const FADE_MS = 350; // keep equal to the #veil transition in css/base.css
  const home = document.querySelector('#home');
  const page = document.querySelector('#page');
  const veil = document.querySelector('#veil');

  let current = 'home'; // the view on screen
  let section = null; // page object of the open section
  let homeScroll = 0; // scroll position to restore when coming back home
  let fadeTimer = 0;
  let looping = false;

  const scrollToTop = () => scrollTo({ top: 0, behavior: R.reduced ? 'auto' : 'smooth' });

  // Hash -> view id. Unknown hashes mean home.
  const viewFromHash = () => {
    const id = location.hash.slice(1);
    return R.pages[id] ? id : 'home';
  };

  // Gives every <img data-img="name"> its real src (once)
  const loadImages = (root) => {
    root.querySelectorAll('img[data-img]').forEach((img) => {
      if (!img.getAttribute('src')) img.src = R.url(img.dataset.img);
    });
  };

  function show(id) {
    if (section && section.destroy) section.destroy(); // leaving a section stops whatever it started
    section = null;

    if (id === 'home') {
      page.innerHTML = '';
      page.className = 'view';
      home.classList.add('on');
      loadImages(home);
      scrollTo(0, homeScroll);
      current = 'home';
      return;
    }

    if (current === 'home') homeScroll = scrollY;
    section = R.pages[id];
    page.innerHTML = section.html();
    loadImages(page);
    home.classList.remove('on');
    page.className = 'view on t-' + id;
    scrollTo(0, 0);
    current = id;
    if (section.init) section.init(page);
    if (section.frame) startLoop();
  }

  // The refresh loop runs only while an open section needs it
  function startLoop() {
    if (looping) return;
    looping = true;
    requestAnimationFrame(function tick() {
      if (!section || !section.frame) {
        looping = false;
        return;
      }
      section.frame(page);
      requestAnimationFrame(tick);
    });
  }

  function go(instant) {
    const id = viewFromHash();
    clearTimeout(fadeTimer); // a newer navigation cancels a fade that is still running
    if (id === current) {
      veil.classList.remove('on');
      return;
    }
    if (instant || R.reduced) {
      show(id);
      return;
    }
    veil.classList.add('on');
    fadeTimer = setTimeout(() => {
      show(id);
      veil.classList.remove('on');
    }, FADE_MS);
  }

  addEventListener('hashchange', () => go());

  // Logo while already home: scroll to the top instead of navigating
  document.querySelector('#logo').addEventListener('click', (event) => {
    if (current === 'home' && viewFromHash() === 'home') {
      event.preventDefault();
      scrollToTop();
    }
  });
  document.querySelector('#ft-top').addEventListener('click', scrollToTop);

  // First screen: no loading screen, the view is shown at once
  const first = viewFromHash();
  if (first === 'home') loadImages(home);
  else show(first);
})();
