
document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".resource-card");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    cards.forEach(card => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
  });

  cards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 100}ms`;
    observer.observe(card);

  });

});
