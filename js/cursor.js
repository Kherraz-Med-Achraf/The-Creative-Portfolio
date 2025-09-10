const initCursor = () => {
  const $cursor = document.querySelector(".cursor");

  gsap.set($cursor, { xPercent: -50, yPercent: -50 });

  // Utiliser quickTo pour des maj plus fluides, et clientX/clientY pour ignorer le scroll
  const tweenX = gsap.quickTo($cursor, "x", {
    duration: 0.2,
    ease: "expo.out",
  });
  const tweenY = gsap.quickTo($cursor, "y", {
    duration: 0.2,
    ease: "expo.out",
  });

  function onMouseMove(e) {
    const mouse_x = e.clientX;
    const mouse_y = e.clientY;

    tweenX(mouse_x);
    tweenY(mouse_y);
  }

  const cursorLinks = document.querySelectorAll("[data-cursor]");

  cursorLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (link.dataset.cursor === "nav") {
        $cursor.classList.add(`is-hovering-nav`);
      } else if (link.dataset.cursor === "logo") {
        $cursor.classList.add(`is-hovering-logo`);
      } else {
        $cursor.classList.add(`is-hovering`);
      }
    });
    link.addEventListener("mouseleave", () => {
      if (link.dataset.cursor === "nav") {
        $cursor.classList.remove(`is-hovering-nav`);
      } else if (link.dataset.cursor === "logo") {
        $cursor.classList.remove(`is-hovering-logo`);
      } else {
        $cursor.classList.remove(`is-hovering`);
      }
    });
  });

  document.addEventListener("mousemove", (e) => onMouseMove(e), {
    passive: true,
  });
};

export default initCursor;
