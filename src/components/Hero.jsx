import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ colorOptions, currentShoe, setCurrentShoe }) => {
  const container = useRef(null);
  const currentShoeRef = useRef(null);
  const previousShoeRef = useRef(null);
  const shadowRef = useRef(null);
  const heroInfoRef = useRef(null);
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const shoePinContainerRef = useRef(null);

  const [previousShoe, setPreviousShoe] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedSize, setSelectedSize] = useState(9);

  const sizes = [ 8, 9, 10, 11];
  
  if (!currentShoe || !colorOptions) {
    return null; 
  }

  // --- MAIN ANIMATION HOOK ---
  useGSAP(() => {
    // Initial entrance animation (runs on all screen sizes)
    const tl = gsap.timeline();
    tl.from('.anim-element', { opacity: 0, y: 50, duration: 0.5, rotation: 5, stagger: 0.2, ease: 'power3.out' })
      .from(shadowRef.current, { opacity: 0, scale: 0.5, duration: 1.5, ease: 'power3.out' }, "-=0.8")
      .from(currentShoeRef.current, { opacity: 0, scale: 0.8, y: -50, rotation: 0, duration: 1.5, ease: 'power3.out' }, "<");

    // Idle floating animation (runs on all screen sizes)
    gsap.to(currentShoeRef.current, { y: -15, rotation: -5, repeat: -1, yoyo: true, duration: 2.5, ease: 'sine.inOut', delay: tl.duration() });
    gsap.to(shadowRef.current, { scale: 1, opacity: 0.8, repeat: -1, yoyo: true, duration: 2.5, ease: 'sine.inOut', delay: tl.duration() });

    // --- RESPONSIVE SCROLL ANIMATIONS ---
    ScrollTrigger.matchMedia({
      
      // --- DESKTOP ANIMATION ---
      "(min-width: 768px)": function() {
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=170%",
            scrub: 1.5,
            pin: shoePinContainerRef.current,
          }
        });

        pinTl
          .to(heroInfoRef.current, { opacity: 0, x: -300, ease: 'power2.in' })
          .to(shadowRef.current, { opacity: 0, scale: 0.5, ease: 'power2.in' }, "<")
          .to(shoePinContainerRef.current, {
            x: () => {
              const containerRect = shoePinContainerRef.current.getBoundingClientRect();
              const screenCenter = window.innerWidth / 2;
              const containerCenter = containerRect.left + containerRect.width / 1.8;
              return screenCenter - containerCenter;
            },
            scale: 0.5,
            y:-80,
            ease: 'power2.inOut',
          }, "<");
        
        // Return a cleanup function
        return () => {
          pinTl.kill(); // Kill the timeline when resizing to mobile
        };
      },

      // --- MOBILE ANIMATION ---
      "(max-width: 600px)": function() {
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=30%",
            scale:0.3,
            scrub: 0.5,
            pin: true,
          }
        });

        // Simpler animation: just fade everything out
        pinTl
          .to(heroInfoRef.current, { opacity: 1, ease: 'power2.in' })
          .to(shoePinContainerRef.current, { opacity: 1, scale: 0.8, ease: 'power2.in' },
             )
          .to(shoePinContainerRef.current, {
            opacity:0.7,
            y:-100,
            ease: 'power2.inOut',
          }, "<");

        // Return a cleanup function
        return () => {
          pinTl.kill(); // Kill the timeline when resizing to desktop
        };
      },

    });

  }, { scope: container });

  // Color change animation hook (with the fix)
  useGSAP(() => {
    // This part remains the same
    gsap.to([titleRef.current, priceRef.current], { color: currentShoe.textColor, duration: 0.8, ease: 'power2.inOut' });

    // The animation logic for the shoe transition
    if (previousShoe) {
      const tl = gsap.timeline({ 
        // --- THIS IS THE FIX ---
        // After the animation completes, reset the state
        onComplete: () => {
          setIsAnimating(false);
          setPreviousShoe(null); // Clean up the previous shoe to prepare for the next click
        } 
      });

      // Your animation values are preserved
      tl.to(previousShoeRef.current, {rotation: 50, opacity: 0, x: -450, rotation: -20, duration: 0.8, ease: 'power2.inOut' }, 0);
      tl.fromTo(currentShoeRef.current, { opacity: 0, x: 150, y: 80, rotation: 20 }, { opacity: 1, x: 0, rotation: 0, duration: 0.8, ease: 'power2.inOut' }, 0);
    }
  }, [currentShoe]);

  const handleColorClick = (option) => {
    if (isAnimating || option.name === currentShoe.name) return;
    setIsAnimating(true);
    setPreviousShoe(currentShoe);
    setCurrentShoe(option);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    gsap.fromTo(currentShoeRef.current, { scale: 1 }, { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut' });
    gsap.fromTo(shadowRef.current, { scale: 1.1 }, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut' });
  };
  return (
    // The JSX is already responsive, no major changes needed here
    <section ref={container} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-100">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 items-center gap-8 md:gap-12 max-w-7xl w-full p-4 sm:p-8">
        <div ref={heroInfoRef} className="md:col-span-2 text-gray-800 space-y-6 md:space-y-10 order-2 md:order-1">
          <div className="space-y-4">
            <div className="anim-element flex items-baseline">
              <h1 className="text-1xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide">Air&nbsp;</h1>
              <h1 ref={titleRef} className="text-2xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide" style={{ color: currentShoe.textColor }}>Classic</h1>
            </div>
            <p ref={priceRef} className="anim-element text-3xl md:text-4xl font-bold" style={{ color: currentShoe.textColor }}>$190.00</p>
            <p className="anim-element text-sm md:text-base font-light leading-relaxed max-w-md">Experience the legacy. The Air Classic combines timeless design with modern comfort for a look that's always in style.</p>
          </div>
          <div className="space-y-6">
            <div className="anim-element">
              <h3 className="uppercase font-semibold mb-3 text-sm">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (<button key={size} onClick={() => handleSizeClick(size)} className={`w-12 h-10 sm:w-14 border rounded-md text-center transition ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-black hover:text-white'}`}>{size}</button>))}
              </div>
            </div>
            <div className="anim-element">
              <h3 className="uppercase font-semibold mb-3 text-sm">Select Color</h3>
              <div className="flex items-center space-x-3">
                {colorOptions.map((option) => (<button key={option.name} style={{ backgroundColor: option.color }} className={`w-8 h-8 rounded-full transition-transform transform hover:scale-110 ${currentShoe.color === option.color ? 'ring-2 ring-offset-2 ring-black' : ''}`} onClick={() => handleColorClick(option)} aria-label={`Select ${option.name} color`} />))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 flex items-center justify-center h-[150px] sm:h-[400px] md:h-[600px] order-1 md:order-2">
          <div ref={shoePinContainerRef} className="relative w-[70%]  h-full">
            <div ref={shadowRef} className=" absolute bottom-10 md:bottom-20 w-[70%] h-12 bg-black/20 rounded-full blur-3xl transform rotate-[-10deg]" />
            {previousShoe && (<img ref={previousShoeRef} src={previousShoe.shoe} alt="Nike Shoe" className="absolute z-30 inset-0 w-full h-full object-contain transform-gpu" />)}
            <img ref={currentShoeRef} src={currentShoe.shoe} alt="Nike Shoe" className="absolute inset-0 w-full h-full object-contain transform-gpu" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;