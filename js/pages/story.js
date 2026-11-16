/* STORY page (full spoilers). Edit the chapters below: t = title, x = text, img = image name from js/config.js (optional). */
(() => {
  const R = REZE;

  const CHAPTERS = [
    { t: 'RAIN', img: 'rain', x: 'A storm, a phone booth. Denji, alone and soaked, shares the shelter of a girl who smiles as if she already knows him. Her name is Reze.' },
    { t: 'THE CAFÉ', x: 'She works at Double Deker and takes him in. She gives him attention and teaches him things he has never learned. But her approach is also part of a mission to take the Chainsaw Devil’s heart.' },
    { t: 'THE POOL', img: 'pool', x: 'At night they slip into his school and swim in the empty pool. She tells him they could run away together. It is the happiest he has ever been.' },
    { t: 'THE PIN', x: 'Then the pin comes out. Reze is the Bomb Devil in human shape, a Soviet agent sent to take the Chainsaw Devil’s heart. She approached him as part of her mission, but her sympathy for him was genuine.' },
    { t: 'THE BLAST', x: 'Denji answers as Chainsaw Man. Blades against explosions, the city tearing apart around two people who never wanted this fight.' },
    { t: 'THE GOODBYE', img: 'tear', x: 'Reze decides to accept Denji’s offer to run away together. Before she can reach their meeting place, Makima intercepts and kills her; Reze is later shown among the weapon hybrids under Makima’s control.' }
  ];

  // Chapters alternate sides (class "r"); a chapter without an image is text-only (class "tx")
  const chapterHtml = (c, i) => {
    const side = i % 2 ? ' r' : '';
    const textOnly = c.img ? '' : ' tx';
    const image = c.img ? `<img data-img="${c.img}" alt="">` : '';
    return `<section class="sn${side}${textOnly}">${image}<h2>${c.t}</h2><p>${c.x}</p></section>`;
  };

  R.pages.story = {
    html: () => `<article class="st"><header><h1>STORY</h1></header>${CHAPTERS.map(chapterHtml).join('')}</article>`,
    init: (root) => R.kit.reveal(root, '.sn')
  };
})();
