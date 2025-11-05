import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// --- SVG Icon Components ---

const TreeLogoIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m-6-6h12M6 9h12M9 6h6" /></svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

// --- NEW Hamburger & Close Icons ---
const MenuIcon = () => (
  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
);

const CloseIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);


const Header = () => {
  const navLinks = ['New Collections', 'Men', 'Girl', 'Contact', 'FAQ'];
  
  // --- STATE for mobile menu ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- Refs for GSAP animation ---
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const menuRef = useRef(null);
  const tlMenu = useRef(null);

  // --- Animation for Desktop Hover + Page Load ---
  useGSAP(() => {
    // --- Page Load Animation ---
    gsap.from(".header-item", {
        y: -60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });

    // --- Desktop Nav Hover Animation ---
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const links = gsap.utils.toArray(".nav-link");

    gsap.set(indicator, { opacity: 0, scale: 0.5 });

    const moveIndicator = (target) => {
      const navRect = nav.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      gsap.to(indicator, { x: targetRect.left - navRect.left, width: targetRect.width, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
    };
    
    const hideIndicator = () => gsap.to(indicator, { opacity: 0, scale: 0.5, duration: 0.3, ease: 'power2.out' });

    links.forEach(link => link.addEventListener('mouseenter', () => moveIndicator(link)));
    nav.addEventListener('mouseleave', hideIndicator);

  }, { scope: headerRef });

  // --- Animation for Mobile Menu Open/Close ---
  useGSAP(() => {
    gsap.set(menuRef.current, { xPercent: -100 }); // Start menu off-screen
    
    tlMenu.current = gsap.timeline({ paused: true })
      .to(menuRef.current, { xPercent: 0, duration: 0.5, ease: 'power3.inOut' })
      .from(".mobile-link", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        ease: 'power3.out',
      }, "-=0.3");

  }, { scope: headerRef });

  // Trigger menu animation based on state change
  useGSAP(() => {
    if (isMenuOpen) {
      tlMenu.current.play();
    } else {
      tlMenu.current.reverse();
    }
  }, [isMenuOpen]);


  return (
    <div ref={headerRef} className="font-sans">
      <header className="fixed top-4 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center w-full">

            {/* Left Section: Availability */}
            <div className="header-item hidden lg:flex bg-white rounded-full shadow-lg items-center px-4 py-2 space-x-2 text-sm font-medium text-gray-700">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span>New Collection Available</span>
            </div>

            {/* Center Section: Navigation */}
            <nav ref={navRef} className="header-item relative bg-white rounded-full shadow-lg flex items-center px-3 py-2">
              <div ref={indicatorRef} className="absolute top-0 left-0 h-full bg-gray-100 rounded-full z-0" />
              <div className="flex items-center space-x-4 sm:space-x-6">
                <a href="#" className="flex-shrink-0 bg-black rounded-full p-2 hover:bg-gray-800 transition-colors z-10">
                  <TreeLogoIcon />
                </a>
                <div className="hidden md:flex items-center space-x-5 text-sm font-semibold text-gray-600">
                  {navLinks.map(link => (
                    <a key={link} href="#" className="nav-link relative px-3 py-1.5 transition-colors duration-300">
                      <span className="relative z-10">{link}</span>
                    </a>
                  ))}
                </div>
                {/* --- Hamburger Button (Visible on Mobile) --- */}
                <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-1.5 z-10">
                    <MenuIcon />
                </button>
              </div>
            </nav>

            {/* Right Section: Contact */}
            <div className="header-item hidden lg:flex bg-white rounded-full shadow-lg items-center px-4 py-2 space-x-3 text-sm font-medium text-gray-700">
              <MailIcon />
              <a href="mailto:hey@zenwood.studio" className="hover:text-black transition-colors">nikeairclassic@gmail.com</a>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div ref={menuRef} className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-2">
            <CloseIcon />
        </button>
        <nav className="flex flex-col items-center gap-y-8">
            {navLinks.map(link => (
                <a key={link} href="#" className="mobile-link text-white text-3xl font-bold hover:text-gray-400 transition-colors">
                    {link}
                </a>
            ))}
        </nav>
      </div>

    </div>
  );
};

export default Header;