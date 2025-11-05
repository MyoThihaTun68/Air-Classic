import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * A custom React hook to create a re-playable, scroll-triggered fade-in animation.
 * @param {string} selector - The CSS selector for the elements to animate.
 * @param {React.RefObject} triggerRef - A React ref attached to the trigger element.
 * @param {object} [options={}] - Optional GSAP animation properties to override the defaults.
 */
const useScrollFadeIn = (selector, triggerRef, options = {}) => {
  
  useGSAP(() => {
    // Return early if the trigger element isn't ready
    if (!triggerRef.current) return;

    // Define the default animation properties
    const defaults = {
      opacity: 0.9,
      y: 75,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 80%',
        // This makes the animation replay every time it's scrolled into view
        toggleActions: "play none none reverse",
      },
    };

    // --- THE FIX ---
    // Deep merge the scrollTrigger objects specifically, then merge the rest.
    const scrollTriggerConfig = {
      ...defaults.scrollTrigger,
      ...(options.scrollTrigger || {})
    };
    
    const config = { 
      ...defaults, 
      ...options,
      scrollTrigger: scrollTriggerConfig
    };

    // Create the animation
    const anim = gsap.from(selector, config);

    // Return a cleanup function to prevent memory leaks
    return () => {
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
      anim.kill();
    };

  }, { 
    scope: triggerRef,
    dependencies: [selector, triggerRef, options]
  });
};

export default useScrollFadeIn;