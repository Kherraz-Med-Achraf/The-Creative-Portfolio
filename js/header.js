// Contrôleur du Menu Burger
// =========================

class BurgerMenu {
  constructor() {
    this.burgerButton = document.querySelector('.burger-menu');
    this.nav = document.querySelector('.main-nav');
    this.navLinks = document.querySelectorAll('.nav-links a');
    this.body = document.body;
    this.isOpen = false;

    this.init();
  }

  init() {
    if (this.burgerButton && this.nav) {
      this.burgerButton.addEventListener('click', () => this.toggleMenu());
      
      // Fermer le menu quand on clique sur un lien
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });

      // Fermer le menu avec la touche Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMenu();
        }
      });

      // Fermer le menu en cliquant en dehors
      this.nav.addEventListener('click', (e) => {
        if (e.target === this.nav) {
          this.closeMenu();
        }
      });

      // Gérer le redimensionnement de la fenêtre
      window.addEventListener('resize', () => this.handleResize());
    }
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    this.burgerButton.classList.add('active');
    this.nav.classList.add('active');
    this.burgerButton.setAttribute('aria-expanded', 'true');
    this.burgerButton.setAttribute('aria-label', 'Fermer le menu');
    
    // Empêcher le scroll du body quand le menu est ouvert
    this.body.style.overflow = 'hidden';
    
    // Focus sur la navigation pour l'accessibilité
    this.nav.focus();
  }

  closeMenu() {
    this.isOpen = false;
    this.burgerButton.classList.remove('active');
    this.nav.classList.remove('active');
    this.burgerButton.setAttribute('aria-expanded', 'false');
    this.burgerButton.setAttribute('aria-label', 'Ouvrir le menu');
    
    // Rétablir le scroll du body
    this.body.style.overflow = '';
  }

  handleResize() {
    // Fermer le menu automatiquement si on passe en mode desktop
    if (window.innerWidth >= 768 && this.isOpen) {
      this.closeMenu();
    }
  }
}

// Animation d'entrée smooth pour les liens du menu
class MenuAnimation {
  constructor() {
    this.nav = document.querySelector('.main-nav');
    this.navLinks = document.querySelectorAll('.nav-links li');
  }

  // Réinitialiser les animations quand le menu se ferme
  resetAnimations() {
    this.navLinks.forEach((link, index) => {
      link.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
    });
  }
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = new BurgerMenu();
  const menuAnimation = new MenuAnimation();
  
  console.log('🍔 Menu burger initialisé avec succès !');
});

// Gestion fluide du scroll smooth pour les liens d'ancrage
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
