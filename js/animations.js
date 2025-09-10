gsap.registerPlugin(SplitText, ScrollTrigger);

const animations = () => {
  const smoother = ScrollSmoother.create({
    smooth: 2,
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
  });

  const tl_marquee_challenge = gsap
    .timeline({ repeat: -1 })
    .fromTo(
      ".first",
      { xPercent: -50 },
      { duration: 20, xPercent: 0.4, ease: "linear" }
    )
    .to(".second", { duration: 20, xPercent: -50, ease: "linear" }, 0);

  ScrollTrigger.create({
    trigger: ".first",
    start: "top 100%",
    end: "bottom top",
    onUpdate: (self) => {
      let velo = self.getVelocity() * 0.01;

      gsap.to(".first", { skewX: velo });
      gsap.to(".second", { skewX: -velo });
      tl_marquee_challenge.timeScale(1 + velo);
    },
  });
};

export default animations;
