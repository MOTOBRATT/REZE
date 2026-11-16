/* Small helpers shared by the section pages. */
(() => {
  const R = REZE;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  R.kit = {
    clamp,

    // 0..1 progress of a block taller than the screen while its sticky child is pinned
    progress(el) {
      const rect = el.getBoundingClientRect();
      return clamp(-rect.top / Math.max(1, rect.height - innerHeight));
    },

    // Adds the class "in" to every `selector` match inside `root` once it scrolls into view
    // (at once with reduced motion). Returns the observer (null with reduced motion).
    reveal(root, selector, threshold = 0.2) {
      const items = root.querySelectorAll(selector);
      if (R.reduced) {
        items.forEach((el) => el.classList.add('in'));
        return null;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        });
      }, { threshold });
      items.forEach((el) => observer.observe(el));
      return observer;
    }
  };
})();
