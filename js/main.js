import animations from "./animations.js";
import bigTitle from "./bigTitle.js";
import initCursor from "./cursor.js";
// Animation GSAP pour le portfolio
document.addEventListener('DOMContentLoaded', function() {
    

    animations();
    bigTitle();
    initCursor();


    
    console.log('Portfolio chargé avec succès !');
});
