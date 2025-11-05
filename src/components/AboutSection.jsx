import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import your images
import NikeImage1 from '../assets/nikeimage1.webp';
import NikeImage2 from '../assets/nikeimage5.jpg';
import NikeImage3 from '../assets/nikeimage4.jpg';

gsap.registerPlugin(ScrollTrigger);

const TitleImage = ({ imageSrc }) => (
  <div className="title-image inline-block w-12 h-12 md:w-16 md:h-16 mx-2 bg-gray-200 rounded-full align-middle overflow-hidden">
    <img 
      src={imageSrc} 
      alt="Shoe detail" 
      className="w-full h-full object-cover" 
    />
  </div>
);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const titleLines = gsap.utils.toArray(".title-line-text");
    const titleImages = gsap.utils.toArray(".title-image");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 10%", 
        toggleActions: "play none none reverse",
      }
    });

    // Your animation sequence is already well-structured and needs no changes.
    tl.from(titleLines, {
      yPercent: 100,
      skewY: 7,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    });
    
    tl.from(titleImages, {
      scale: 0,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }, "-=0.7");

    tl.from(".about-subheading", {
      opacity: 0,
      y: 30,
    }, "-=0.5");

    tl.from(".about-column", {
      opacity: 0,
      scale: 0.9,
      y: 50,
      stagger: 0.2,
      ease: 'power2.out'
    }, "<");

  }, { scope: sectionRef });

  return (
    <section 
      id="about-section"
      ref={sectionRef}
      className="w-full min-h-screen bg-white flex flex-col justify-center items-center p-8 md:p-16 font-['Poppins',_sans_serif]"
    >
      <div className="w-full max-w-5xl mx-auto">
        
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 tracking-tighter leading-tight">
            <div className="title-line overflow-hidden">
              <span className="title-line-text inline-block">WE D<TitleImage imageSrc={NikeImage1} />N'T JUST</span>
            </div>
            <div className="title-line overflow-hidden">
              <span className="title-line-text inline-block">MAKE SHOES, WE</span>
            </div>
            <div className="title-line overflow-hidden">
              <span className="title-line-text inline-block">CREATE <TitleImage imageSrc={NikeImage2} /> EXPERIENCES</span>
            </div>
          </h1>
        </div>

        <div className="text-center mb-12">
          <h2 className="about-subheading text-2xl font-semibold text-gray-800 tracking-widest">
            ABOUT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="about-column w-full h-80 bg-gray-200 rounded-2xl overflow-hidden">
            <img src={NikeImage3} alt="People wearing custom shoes" className="w-full h-full object-cover" />
          </div>

          <div className="about-column w-full aspect-square border-2 border-gray-300 rounded-full flex flex-col items-center justify-center text-center p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">About Us</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              We believe shoes are more than just accessories—they're a statement of style, comfort, and confidence. Every pair is crafted with precision to support your journey.
            </p>
            <button className="bg-black text-white font-bold rounded-full py-3 px-8 hover:bg-gray-800 transition-colors duration-300">
              Explore
            </button>
          </div>

          <div className="about-column w-full h-80 bg-gray-200 rounded-2xl overflow-hidden">
            <img src={NikeImage2} alt="Shoes on feet from above" className="w-full h-full object-cover" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;