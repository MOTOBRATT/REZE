/* REZE: main settings (image names, home tiles) and small shared helpers. */
window.REZE = {
  base: 'assets/',

  // Image name -> file inside assets/. Pages refer to images by these names.
  // To add an image: put the file into its section's folder, then list it here.
  images: {
    // INTRO
    wall: 'intro/wallpaper.jpg',

    // STORY
    rain: 'story/rain.jpg',
    pool: 'story/pool.jpg',
    tear: 'story/goodbye.jpg',

    // MOTION: one group per movement (see js/pages/motion.js)
    cafe: 'motion/approach-cafe.jpg',
    night: 'motion/approach-night.jpg',
    fireworks: 'motion/approach-fireworks.jpg',
    smile: 'motion/look-smile.jpg',
    eyeBlue: 'motion/look-eye-blue.jpg',
    eyeGreen: 'motion/look-eye-green.jpg',
    rainHead: 'motion/wait-rain.jpg',
    window: 'motion/wait-window.jpg',
    beach: 'motion/wait-beach.jpg',
    boom: 'motion/blast-road.jpg',
    fireDoor: 'motion/blast-door.jpg',
    devil: 'motion/blast-devil.jpg',
    mouth: 'motion/exit-mouth.jpg',
    alley: 'motion/exit-alley.jpg',
    footprints: 'motion/exit-footprints.jpg',

    // Home covers (assets/covers)
    aboutCover: 'covers/about.jpg',
    motionCover: 'covers/motion.jpg',
    artsCover: 'covers/arts.jpg'
  },

  // The four home tiles: id = page (#id), cover = image name (null = plain panel), color = hover colour of the title.
  tiles: [
    { id: 'about', title: 'ABOUT', cover: 'aboutCover', color: 'var(--p7)' },
    { id: 'motion', title: 'MOTION', cover: 'motionCover', color: 'var(--p6)' },
    { id: 'story', title: 'STORY', cover: 'pool', color: 'var(--p5)' },
    { id: 'arts', title: 'ARTS', cover: 'artsCover', color: 'var(--p4)' }
  ],

  pages: {} // section pages register themselves here (js/pages/*.js)
};

// Path inside assets/ -> URL (also works in the single-file build, where images are embedded)
REZE.src = (path) => (REZE.data ? REZE.data[path] : REZE.base + path);
REZE.url = (name) => REZE.src(REZE.images[name]);
REZE.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
