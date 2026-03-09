import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initPageAnimations = () => {
  requestAnimationFrame(() => {
    const nav = document.querySelector('nav');
    const heroContent = document.querySelector('.hero-content');
    const splineContainer = document.querySelector('.spline-container');

    if (nav) {
      gsap.fromTo(nav, 
        { y: '-100%' },
        { y: '0%', duration: 0.8, ease: 'power3.out' }
      );
    }

    if (heroContent) {
      gsap.fromTo(heroContent.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
      );
    }

    if (splineContainer) {
      gsap.fromTo(splineContainer,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
      );
    }
  });
};