import { gsap } from "../node_modules/gsap/index.js";
import { SplitText } from "../node_modules/gsap/SplitText.js";
import { ScrollTrigger } from "../node_modules/gsap/ScrollTrigger.js";
gsap.registerPlugin(SplitText, ScrollTrigger);


const bigTitle = () => {
    const bigTitleContainer = document.querySelector('#big-title');
    const bigTitle = document.querySelector('#big-title-text .title-content');
    const bigTitle2 = document.querySelector('#big-title-text-2'); 
    const creative = document.querySelector('#creative');
    const stamp = document.querySelector('.stamp-animation');
    const logo = document.querySelector('.logo h2');
    const nav = document.querySelectorAll('.main-nav .nav-links li');


    const title_1 = new SplitText(bigTitle, { type: "chars,words", charsClass: "char-js", wordsClass: "word-js" });
    const title_2 = new SplitText(bigTitle2, { type: "chars,words", charsClass: "char-js", wordsClass: "word-js" });
    const title_3 = new SplitText(creative, { type: "chars,words", charsClass: "char-js", wordsClass: "word-js" });


    // Utiliser les mots pour l'animation des titres 1 et 2
    const words_1 = title_1.words;
    const words_2 = title_2.words;
    const chars_3 = title_3.chars;


    // Création d'une timeline GSAP avec ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            start: 'top 50%',
            trigger: bigTitleContainer,
        }
    });

    tl.from(words_1, {
        duration: 3,
        yPercent: 100,
        ease: "expo.out",
    })
    .from(words_2, {
        duration: 3,
        yPercent: 100,
        ease: "expo.out",
    }, "<");
    tl.from(chars_3, {
        duration: 1.8,
        yPercent: 100,
        ease: "elastic.out(0.5,0.3)",
        stagger: 0.06,
    }, "<+0.5");
    tl.from(stamp, {
        duration: 2.2,
        scale: 0,
        ease: "elastic.out(0.8,0.3)",
    }, "<+1");
    tl.from(logo, {
        duration: 1.8,
        yPercent: -100,
        ease: "expo.out",
        stagger: 0.06,
    }, "<+0.5");
    tl.from(nav, {
        duration: 1.8,
        yPercent: -100,
        ease: "expo.out",
        stagger: 0.2,
    }, "<+0.5");
}

export default bigTitle;