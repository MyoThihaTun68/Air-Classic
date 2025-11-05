import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = ({ selectedShoeImage }) => {
  const sectionRef = useRef(null);
  const shoeRef = useRef(null);

  useGSAP(() => {
    // --- RESPONSIVE ANIMATION LOGIC ---
    ScrollTrigger.matchMedia({
      
      // --- DESKTOP ANIMATION (screens wider than 767px) ---
      "(min-width: 768px)": function() {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%", 
            end : "bottom -30%",
            toggleActions: "play reverse play reverse",
            scrub: 1.5, 
          },
        });

        // Your original animation for desktop screens
        tl.fromTo(shoeRef.current, 
          { opacity: 0, scale: 0.5, y: -300, rotation: 45 },
          { opacity: 1, scale: 0.55, x: 150, y: -40, rotation: -25, duration: 3.5, ease: "power3.out" }
        );

        tl.fromTo("#ad-container .anim-element", 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 2, ease: 'power2.out' }, 
          "<1.2" 
        );

        return () => { tl.kill(); }; // Cleanup function for desktop
      },

      // --- MOBILE ANIMATION (screens 767px wide or less) ---
      "(max-width: 767px)": function() {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%", // A better start/end for mobile
            end: "top -10%",
            toggleActions: "play reverse play reverse",
            scrub: 1, 
          },
        });

        // A simpler, centered animation for mobile
        tl.fromTo(shoeRef.current, 
          { // FROM state:
            opacity: 0,
            scale: 0.5,
            y: -200, 
            rotation: 45,
          },
          { 
            opacity: 1,
            scale: 1,
            x: 35, // No horizontal movement
            y: 0,
            rotation: -25,
            duration: 2.5, 
            ease: "power3.out",
          }
        );

        tl.fromTo("#ad-container .anim-element", 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 1.5, ease: 'power2.out' }, 
          "<0.8" 
        );

        return () => { tl.kill(); }; // Cleanup function for mobile
      },
    });

  }, { scope: sectionRef });

  return (
    <section
      id="feature-section"
      ref={sectionRef}
      className="w-full min-h-screen bg-white flex justify-center items-center p-4 md:p-8 font-['Poppins',_sans_serif]"
    >
      <div
        id="ad-container"
        className="relative w-full max-w-6xl h-[75vh] max-h-[650px] flex flex-col justify-center items-center bg-[#181818] p-6 md:p-12 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="absolute top-6 w-full text-center z-10 anim-element">
          <p className="text-white/80 tracking-[0.2em] text-xs md:text-sm font-light">
            — JUST DO IT —
          </p>
        </div>

        <div className="absolute inset-0 flex justify-center items-center z-0 overflow-hidden">
          {/* RESPONSIVE: Smaller background text on mobile */}
          <h1 className="text-white/5 font-black text-[10rem] sm:text-[15rem] md:text-[20rem] italic leading-none select-none whitespace-nowrap">
            JORDAN MAX
          </h1>
        </div>

        <div className="relative z-10 w-full flex justify-between items-center px-2 md:px-8">
          <div className="text-white text-left">
            {/* RESPONSIVE: Smaller font sizes on mobile */}
            <h2 className="text-2xl sm:text-7xl md:text-9xl font-black italic -ml-1 sm:-ml-2 anim-element">JORDAN</h2>
            <p className="text-[#e5002b] font-semibold tracking-widest text-xs sm:text-base ml-1 mt-1 anim-element">NEW DEFINITION</p>
          </div>
          <div className="text-white text-right">
            {/* RESPONSIVE: Smaller font sizes on mobile */}
            <p className="text-gray-400 text-sm sm:text-base md:text-lg anim-element">OF STYLE.</p>
            <h2 className="text-2xl sm:text-7xl md:text-9xl font-black italic -mr-1 sm:-mr-2 anim-element">MAX</h2>
          </div>
        </div>

        <div id="shoe-destination" className="absolute inset-0 z-20 w-full h-full flex justify-center items-center pointer-events-none">
            <img
                ref={shoeRef}
                src={selectedShoeImage}
                alt="Selected Jordan Max Shoe"
                // RESPONSIVE: Slightly smaller on mobile to prevent clipping
                className="w-[50%] h-[100%] md:h-[110%] object-contain -rotate-[25deg] drop-shadow-2xl"
            />
        </div>

        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 z-30 anim-element">
          {/* RESPONSIVE: Smaller button on mobile */}
          <button className="bg-[#e5002b] text-white font-bold py-2 px-6 md:py-3 md:px-10 text-sm md:text-lg hover:bg-red-700 transition-colors duration-300">
            SHOP NOW
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;