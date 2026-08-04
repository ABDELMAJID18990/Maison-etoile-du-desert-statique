import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
const { i18n } = useTranslation();
const { t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappNumber = "212630518984";

   const currentLang = i18n.language || 'fr'; 
  const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
};


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        if (!scrolled) setScrolled(true);
      } else {
        if (scrolled) setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setIsMobileMenuOpen(false);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, location.pathname]);

  const isSolid = scrolled || !isHomePage;

  const navLinks = [
    { key: "home", path: "/" },
    { key: "rooms", path: "/#chambres" },
    { key: "experience", path: "/#experience" },
    { key: "contact", path: "/contact" },
  ];

  return (
    <>
      <nav className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
        ${isSolid ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}
      `}>
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          
          <Link to="/" className={`text-2xl font-serif font-bold tracking-widest relative z-[60] transition-colors duration-300 ${
            (isSolid || isMobileMenuOpen) ? 'text-primary' : 'text-white'
          }`}>
            {t('navbar.logo')}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.key}>
                  {link.path.includes('#') ? (
                    <a href={link.path} className={`font-sans font-medium hover:text-primary transition-colors ${isSolid ? 'text-dark' : 'text-white'}`}>
                      {t(`navbar.links.${link.key}`)}
                    </a>
                  ) : (
                    <Link to={link.path} className={`font-sans font-medium hover:text-primary transition-colors ${isSolid ? 'text-dark' : 'text-white'}`}>
                      {t(`navbar.links.${link.key}`)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            

            <div className={`h-6 w-px ${isSolid ? 'bg-gray-200' : 'bg-white/30'}`}></div>

              {/* 🌍 LE SÉLECTEUR DE LANGUE DESKTOP */}
            <div className="flex items-center gap-2 font-sans font-bold text-sm uppercase">
              <button 
                onClick={() => changeLanguage('fr')} 
                className={`transition-colors ${
                  currentLang.startsWith('fr') 
                    ? 'text-primary' 
                    : isSolid ? 'text-gray-400 hover:text-dark' : 'text-white/50 hover:text-white'
                }`}
              >
                FR
              </button>
              <span className={`${isSolid ? 'text-gray-300' : 'text-white/20'} font-light`}>|</span>
              <button 
                onClick={() => changeLanguage('en')} 
                className={`transition-colors ${
                  currentLang.startsWith('en') 
                    ? 'text-primary' 
                    : isSolid ? 'text-gray-400 hover:text-dark' : 'text-white/50 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t('navbar.whatsappMessage'))}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-primary text-white font-sans font-bold text-sm px-6 py-2.5 rounded-full shadow-lg hover:bg-primary-dark transition-all hover:-translate-y-0.5"
            >
              {t('navbar.book')}
            </a>
          </div>

          <button 
            className={`md:hidden relative z-[60] focus:outline-none transition-colors duration-300 ${
              (isSolid || isMobileMenuOpen) ? 'text-primary' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <div className={`
        md:hidden fixed inset-0 w-full h-full bg-background z-40 flex flex-col justify-center items-center
        transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
      `}>
        <ul className="flex flex-col items-center gap-8 mt-12">
          {navLinks.map((link) => (
            <li key={link.key}>
              {link.path.includes('#') ? (
                <a href={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-dark hover:text-primary transition-colors">
                  {t(`navbar.links.${link.key}`)}
                </a>
              ) : (
                <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-dark hover:text-primary transition-colors">
                  {t(`navbar.links.${link.key}`)}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* 🌍 LE SÉLECTEUR DE LANGUE MOBILE */}
        <div className="flex items-center gap-6 mt-12 mb-4 font-serif text-xl">
          <button 
            onClick={() => { changeLanguage('fr'); setIsMobileMenuOpen(false); }} 
            className={`transition-all ${currentLang.startsWith('fr') ? 'text-primary font-bold border-b-2 border-primary' : 'text-gray-400'}`}
          >
            FR
          </button>
          <button 
            onClick={() => { changeLanguage('en'); setIsMobileMenuOpen(false); }} 
            className={`transition-all ${currentLang.startsWith('en') ? 'text-primary font-bold border-b-2 border-primary' : 'text-gray-400'}`}
          >
            EN
          </button>
        </div>

        <div className="mt-12 w-full px-12">
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t('navbar.whatsappMessageMobile'))}`}
            target="_blank" rel="noopener noreferrer"
            className="block text-center w-full bg-primary text-white font-bold text-lg py-4 rounded-full shadow-lg"
          >
            {t('navbar.bookNow')}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
