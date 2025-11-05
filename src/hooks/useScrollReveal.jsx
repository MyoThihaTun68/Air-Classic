import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A custom hook for a three-card layout where side cards slide in.
 * @param {string} leftCardSelector - The CSS selector for the left card.
 * @param {string} centerCardSelector - The CSS selector for the center card.
 * @param {string} rightCardSelector - The CSS selector for the right card.
 * @param {React.RefObject} triggerRef - A React ref attached to the trigger element.
 */
const useSideReveal = (leftCardSelector, centerCardSelector, rightCardSelector, triggerRef) => {
  
  useGSAP(() => {
    if (!triggerRef.current) return;
    
    // Select the specific cards
    const leftCard = document.querySelector(leftCardSelector);
    const centerCard = document.querySelector(centerCardSelector);
    const rightCard = document.querySelector(rightCardSelector);

    // Create a shared timeline for a cohesive effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current, // Use the main section as the trigger
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    });

    // --- ANIMATION SEQUENCE ---

    // 1. Animate the LEFT card sliding in from the left
    if (leftCard) {
      tl.from(leftCard, {
        x: -200, // Start 200px to the left
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }

    // 2. Animate the CENTER card simply fading in (at the same time)
    if (centerCard) {
      tl.from(centerCard, {
        opacity: 0,
        y: 50, // A subtle slide up
        duration: 1,
        ease: 'power3.out'
      }, "<"); // "<" starts this animation at the same time as the previous one
    }
    
    // 3. Animate the RIGHT card sliding in from the right (at the same time)
    if (rightCard) {
      tl.from(rightCard, {
        x: 200, // Start 200px to the right
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, "<");
    }

  }, { scope: triggerRef });
};

export default useSideReveal;