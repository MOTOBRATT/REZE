/* Home tiles, built from REZE.tiles. Covers are static single frames.
   The title takes the section colour on hover (touch screens: while the tile is in view). */
(() => {
  const R = REZE;
  const box = document.querySelector('#tiles');

  box.innerHTML = R.tiles.map((tile) => {
    const cover = tile.cover ? `<img data-img="${tile.cover}" alt="">` : '';
    return `<a class="tile t-${tile.id}" href="#${tile.id}" style="--c:${tile.color}">${cover}<span class="tn">${tile.title}</span></a>`;
  }).join('');

  if (matchMedia('(hover: none)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('live', entry.isIntersecting));
    }, { threshold: 0.7 });
    box.querySelectorAll('.tile').forEach((tile) => observer.observe(tile));
  }
})();
