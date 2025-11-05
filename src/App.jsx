import React, { useState, useRef } from "react"; // Import useRef
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Import assets
import JordanShoePurple from './assets/new2.png';
import JordanShoeGreen from './assets/new3.png';
import JordanShoeOrange from './assets/new.png';

// Import all components
import Header from "./components/Header";
import Hero from "./components/Hero";
import DisplaySection from "./components/LandingSection";
import FeatureSection from "./components/FeatureSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

const colorOptions = [
    { name: 'Purple', shoe: JordanShoePurple, color: '#8E44AD', textColor: '#5B2C6F' },
    { name: 'Green', shoe: JordanShoeGreen, color: '#27AE60', textColor: '#1D8348' },
    { name: 'Orange', shoe: JordanShoeOrange, color: '#E67E22', textColor: '#AF601A' }
];

function App() {
  const [currentShoe, setCurrentShoe] = useState(colorOptions[2]);
  const container = useRef(null); // Ref for the main container

  useGSAP(() => {
    // --- RESPONSIVE PINNING LOGIC ---
    ScrollTrigger.matchMedia({
      
      // --- DESKTOP SETUP (screens wider than 767px) ---
      "(min-width: 768px)": function() {
        // On desktop, select ALL panels.
        const sections = gsap.utils.toArray(".panel");
        const triggers = sections.map(section => 
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            pin: true,
            pinSpacing: false,
            end: "+=100%",
          })
        );
        
        // Cleanup function to remove these triggers if the screen resizes to mobile
        return () => {
          triggers.forEach(trigger => trigger.kill());
        };
      },

      // --- MOBILE SETUP (screens 767px wide or less) ---
      "(max-width: 767px)": function() {
        // On mobile, select all panels EXCEPT the one with our special class.
        const sections = gsap.utils.toArray(".panel:not(.no-pin-on-mobile)");
        const triggers = sections.map(section => 
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            pin: true,
            pinSpacing: false,
            end: "+=0%",
          })
        );

        // Cleanup function for mobile triggers
        return () => {
          triggers.forEach(trigger => trigger.kill());
        };
      },

    });
  }, { scope: container }); // Scope GSAP to the main container

  return (
    <main ref={container}>
      <Header />

      <Hero
        colorOptions={colorOptions}
        currentShoe={currentShoe}
        setCurrentShoe={setCurrentShoe}
      />

      {/* --- CORRECTED STRUCTURE --- */}
      {/* 1. Add a special class to the DisplaySection panel */}
      <section className="panel ">
        <DisplaySection />
      </section>

      {/* The rest of the panels will pin on all screen sizes */}
      <section className="panel z-90">
        <FeatureSection selectedShoeImage={currentShoe.shoe} />
        <AboutSection/>
        <Footer/>
      </section>
      
    </main>
  );
}

export default App;