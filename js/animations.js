gsap.registerPlugin(SplitText, ScrollTrigger);

const animations = () => {
  const smoother = ScrollSmoother.create({
    smooth: 1,
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    effects: true,
  });

  gsap.set(".first", { xPercent: -50 });

  const tl_marquee_challenge = gsap
    .timeline({ repeat: -1, defaults: { ease: "linear", duration: 20 } })
    .to(".first", { xPercent: 0 })
    .to(".second", { xPercent: -50 }, 0);

  ScrollTrigger.create({
    trigger: ".first",
    start: "top 100%",
    end: "bottom top",
    onUpdate: (self) => {
      let velo = self.getVelocity() * 0.015;
      let clampedVelo = gsap.utils.clamp(-15, 15, velo); // On bride la vélocité entre -15 et 15

      gsap.to(".first", { skewX: clampedVelo });
      gsap.to(".second", { skewX: -clampedVelo });
      tl_marquee_challenge.timeScale(1 + Math.abs(clampedVelo * 0.3)); // On ajuste le timeScale de façon contrôlée
    },
  });

  const tl_marquee_overlay = gsap.timeline({
    scrollTrigger: {
      trigger: "#big-title",
      pin: true,
      start: "top top",
      end: "+=75%",
      scrub: true,
    },
  });

  tl_marquee_overlay
    .fromTo(
      ".marquee",
      { y: "100vh" },
      { y: "0vh", ease: "linear", duration: 5 }
    )
    .to("#big-title", { yPercent: -100, ease: "linear", duration: 10 }, "<");
};

export default animations;
