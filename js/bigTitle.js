gsap.registerPlugin(SplitText, ScrollTrigger);

const bigTitle = () => {
  const bigTitleContainer = document.querySelector("#big-title");
  const bigTitle = document.querySelector("#big-title-text .title-content");
  const bigTitle2 = document.querySelector("#big-title-text-2");
  const creative = document.querySelector("#creative");
  const stamp = document.querySelector(".stamp-animation");
  const logo = document.querySelector(".logo h2");
  const nav = document.querySelectorAll(".main-nav .nav-links li");

  const title_1 = new SplitText(bigTitle, {
    type: "chars,words",
    charsClass: "char-js",
    wordsClass: "word-js",
  });
  const title_2 = new SplitText(bigTitle2, {
    type: "chars,words",
    charsClass: "char-js",
    wordsClass: "word-js",
  });
  const title_3 = new SplitText(creative, {
    type: "chars,words",
    charsClass: "char-js",
    wordsClass: "word-js",
  });

  //hover effect
  // Fonction qui installe les events hover + reset
  function initCharHoverAnimation(titles, stamp) {
    // Regroupe les chars de tous les SplitText passés
    const allChars = titles.flatMap((t) => t.chars);

    // hover effect
    allChars.forEach((char) => {
      // Ne créer les fonctions qu'une seule fois
      if (!char.hoverEnter) {
        char.hoverEnter = () => {
          gsap.to(char, {
            duration: 0.3,
            y: -75,
            rotate: Math.random() * 360 - 180,
            ease: "power1.out",
          });
        };

        char.hoverLeave = () => {
          gsap.to(char, {
            duration: 0.3,
            y: 0,
            ease: "power2.out",
          });
        };
      }

      // Supprimer d'abord les anciens listeners (au cas où)
      char.removeEventListener("mouseenter", char.hoverEnter);
      char.removeEventListener("mouseleave", char.hoverLeave);

      // Puis ajouter les nouveaux
      char.addEventListener("mouseenter", char.hoverEnter);
      char.addEventListener("mouseleave", char.hoverLeave);
    });

    // reset on click (ne l'ajouter qu'une seule fois)
    if (!stamp.clickHandlerAdded) {
      stamp.addEventListener("click", () => {
        allChars.forEach((c) => {
          gsap.to(c, {
            duration: 0.3,
            y: 0,
            rotate: 0,
            ease: "power2.out",
          });
        });
      });
      stamp.clickHandlerAdded = true;
    }
  }

  // Fonction pour supprimer les event listeners
  function removeCharHoverAnimation(allChars) {
    allChars.forEach((char) => {
      if (char.hoverEnter && char.hoverLeave) {
        char.removeEventListener("mouseenter", char.hoverEnter);
        char.removeEventListener("mouseleave", char.hoverLeave);
      }
    });
  }

  // Utiliser les mots pour l'animation des titres 1 et 2
  const words_1 = title_1.words;
  const words_2 = title_2.words;
  const chars_3 = title_3.chars;

  // Création d'une timeline GSAP avec ScrollTrigger
  const tl = gsap.timeline();

  tl.from(words_1, {
    duration: 3,
    yPercent: 100,
    ease: "expo.out",
  }).from(
    words_2,
    {
      duration: 3,
      yPercent: 100,
      ease: "expo.out",
    },
    "<"
  );
  tl.from(
    chars_3,
    {
      duration: 1.8,
      yPercent: 100,
      ease: "elastic.out(0.5,0.3)",
      stagger: 0.06,
    },
    "<+0.5"
  );
  tl.from(
    stamp,
    {
      duration: 2.2,
      scale: 0,
      ease: "elastic.out(0.8,0.3)",
    },
    "<+1"
  );
  tl.from(
    logo,
    {
      duration: 1.8,
      yPercent: -100,
      ease: "expo.out",
      stagger: 0.06,
    },
    "<+0.5"
  );
  tl.from(
    nav,
    {
      duration: 1.8,
      yPercent: -100,
      ease: "expo.out",
      stagger: 0.2,
    },
    "<+0.5"
  );
  tl.add(() => {
    gsap.set(bigTitle, { overflow: "visible" });
  }, "<");
  tl.add(() => {
    gsap.set(bigTitle2, { overflow: "visible" });
  }, "<");
  tl.add(() => {
    gsap.set(chars_3, { overflow: "visible" });
  }, "<");
  tl.add(() => initCharHoverAnimation([title_1, title_2, title_3], stamp), "<");

  // Scroll trigger pour resetter l'animation et arrêter les événements hover
  let hoverEventsActive = true;
  const allChars = [title_1, title_2, title_3].flatMap((t) => t.chars);

  ScrollTrigger.create({
    trigger: bigTitleContainer,
    start: "10% top ", // quand le haut du titre atteint 25% du viewport
    end: "10% top", // on utilise la même ligne comme "barrière"
    onEnter: () => {
      // Scroll vers le bas → reset et supprimer les listeners
      if (hoverEventsActive) {
        // Reset les animations
        allChars.forEach((char) => {
          gsap.to(char, {
            duration: 0.3,
            y: 0,
            rotate: 0,
            ease: "power2.out",
          });
        });

        // Supprimer les event listeners
        removeCharHoverAnimation(allChars);
        hoverEventsActive = false;
      }
    },
    onEnterBack: () => {
      // Scroll vers le haut → réactiver les listeners
      if (!hoverEventsActive) {
        initCharHoverAnimation([title_1, title_2, title_3], stamp);
        hoverEventsActive = true;
      }
    },
  });
};

export default bigTitle;
