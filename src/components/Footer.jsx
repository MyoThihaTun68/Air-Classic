import React, { useRef } from 'react'; // 1. Import useRef
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  // 2. Create a ref to attach to the footer element
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".anim-footer-item", {
      scrollTrigger: {
        trigger: footerRef.current, // 3. Use the ref as the trigger
        start: "top 50%", // Start animation a little earlier for a smoother feel
        // 4. Add toggleActions to make the animation replayable
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: footerRef }); // 5. Scope the hook to the footer element

  return (
    <footer 
      id="footer-section" 
      ref={footerRef} // 6. Attach the ref to the footer
      className="relative w-full bg-[#181818] text-white py-16 px-8 font-['Poppins',_sans_serif]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="anim-footer-item">
          <h3 className="text-2xl font-bold italic mb-4">AIR CLASSIC</h3>
          <p className="text-gray-400 text-sm">
            Experience the legacy. Timeless design meets modern comfort.
          </p>
        </div>

        <div className="anim-footer-item">
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Collections</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Men</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Women</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div className="anim-footer-item">
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
          </ul>
        </div>

        <div className="anim-footer-item">
          <h4 className="font-semibold mb-4">Join Our Newsletter</h4>
          <p className="text-gray-400 text-sm mb-3">Get the latest updates on new releases and promotions.</p>
          <div className="flex">
            <input type="email" placeholder="Your Email" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#e5002b]" />
            <button className="bg-[#e5002b] text-white font-bold py-2 px-4 rounded-r-md hover:bg-red-700 transition-colors">&gt;</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm anim-footer-item">
        <p>&copy; {new Date().getFullYear()} Nike Air Classic. All Rights Reserved. Demo created for educational purposes.</p>
      </div>
    </footer>
  );
};

export default Footer;