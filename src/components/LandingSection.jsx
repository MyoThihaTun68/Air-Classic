import React, { useRef } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';

// 1. Import your new `useSideReveal` hook
import useSideReveal from '../hooks/useScrollReveal'; 

// Import your assets
import  ShoeForMen from '../assets/men2.png';
import ShoeForGirl from '../assets/girl1.png';
import JordanShoeOrange from '../assets/new.png';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ image, title, bgColor, isCenter = false, customClass = '' }) => {
  return (
    // 2. Add the customClass to the main div
    <div className={`product-card group relative bg-white rounded-2xl shadow-lg overflow-hidden h-[450px] ${customClass}`}>
      <div className={`absolute top-0 left-0 w-full h-[60%] transform origin-top-left -skew-y-6 ${bgColor}`}></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-end">
        <div id={isCenter ? "shoe-destination" : undefined} className="absolute top-0 left-0 w-full h-2/3">
          {image && (
            <img 
              src={image}
              alt={title}
              className={`w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105 ${isCenter ? 'block lg:hidden' : ''}`}
            />
          )}
        </div>
        <div className="p-8 text-center">
            <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
            <button className="mt-4 bg-black text-white rounded-lg py-3 px-8 text-sm font-semibold hover:bg-gray-700 transition-colors duration-300">
            SHOP NOW &gt;
            </button>
        </div>
      </div>
    </div>
  );
};

const DisplaySection = () => {
  const sectionRef = useRef(null);

  // 3. Call the new hook with selectors for each card
  useSideReveal(
    ".card-left", 
    ".card-center", 
    ".card-right", 
    sectionRef
  );

  return (
    <section 
      id="display-section" 
      ref={sectionRef}
      className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-8 overflow-hidden" // Added overflow-hidden
    >
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 4. Assign the unique classes to each card */}
          <ProductCard
            title="For Women"
            image={ShoeForGirl}
            bgColor="bg-pink-100"
            customClass="card-left"
          />
          <ProductCard
            title="New Collections"
            isCenter={true}
            bgColor="bg-purple-200"
            image={JordanShoeOrange}
            customClass="card-center"
          />
          <ProductCard
            title="For men"
            image={ShoeForMen}
            bgColor="bg-gray-200"
            customClass="card-right"
          />
        </div>
      </div>
    </section>
  );
};

export default DisplaySection;