import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Heart } from "lucide-react"; 
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const navLinks = [
    { key: "home", path: "/" },
    { key: "rooms", path: "/#chambres" },
    { key: "experience", path: "/#experience" },
    { key: "contact", path: "/contact" },
  ];

  return (
    <footer className="bg-dark text-white/70 pt-16 pb-28 lg:pb-16 px-8 border-t border-[#F4C898]/10">
      <div className="container mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
          
          {/* COLONNE 1 : MARQUE */}
          <div className="md:pr-8">
            <h3 className="font-serif text-3xl font-bold text-primary tracking-widest">
              {t("footer.brand")}
            </h3>
            <p className="mt-5 text-white/60 leading-relaxed font-light">
              {t("footer.slogan")}
            </p>
          </div>

          {/* COLONNE 2 : NAVIGATION */}
          <div>
            <h4 className="font-sans font-bold text-white uppercase tracking-widest text-sm mb-6">
              {t("footer.navigationTitle")}
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.key}>
                  {link.path.includes('#') ? (
                    <a
                      href={link.path}
                      className="inline-block text-white/60 hover:text-primary transform hover:translate-x-2 transition-all duration-300"
                    >
                      {t(`footer.links.${link.key}`)}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="inline-block text-white/60 hover:text-primary transform hover:translate-x-2 transition-all duration-300"
                    >
                      {t(`footer.links.${link.key}`)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 3 : CONTACT & SOCIAL */}
          <div>
            <h4 className="font-sans font-bold text-white uppercase tracking-widest text-sm mb-6">
              {t("footer.contactTitle")}
            </h4>
            <div className="space-y-4">
              {/* <a 
                href="mailto:etoiledusahra@gmail.com" 
                className="flex items-center justify-center md:justify-start gap-3 text-white/60 hover:text-primary transition-colors group"
              >
                <Mail size={18} className="text-primary group-hover:scale-110 transition-transform" />
                
              </a> */}
              <a 
                href="tel:+212630518984"
                className="flex items-center justify-center md:justify-start gap-3 text-white/60 hover:text-primary transition-colors group"
              >
                <Phone size={18} className="text-primary group-hover:scale-110 transition-transform" /> 
                +212 6 30 51 89 84
              </a>
            </div>

            {/* ✅ LES ICÔNES SOCIALES AVEC TES PROPRES SVG */}
            <div className="mt-8 flex justify-center md:justify-start gap-3">
              {/* INSTAGRAM */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                aria-label={t("footer.social.instagram")}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 1.76-6.98 6.231-.058 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 1.76 6.78 6.231 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-1.771 6.979-6.231.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-1.778-6.78-6.231-6.98-1.28-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* FACEBOOK */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                aria-label={t("footer.social.facebook")}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>

              {/* TIKTOK */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                aria-label={t("footer.social.tiktok")}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.37-3.39-5.68.05-2.4 1.38-4.59 3.53-5.59 1.25-.56 2.68-.69 4-.41V15.2c-.89-.16-1.83.04-2.52.59-.97.77-1.32 2.19-.8 3.29.35.71 1.05 1.25 1.83 1.37.95.14 1.96-.07 2.67-.71.74-.66 1.09-1.65 1.11-2.64.04-4.88.01-9.76.02-14.65z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>

          <p className="mt-4 md:mt-0 flex items-center gap-1.5 pr-2 lg:pr-24">
            {t("footer.developedWith")}
            <Heart size={14} className="text-primary fill-primary" />
            {t("footer.by")}
            <a
              href="https://www.linkedin.com/in/abdelmajid-el-ainousi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white/60 hover:text-primary transition-colors ml-1"
            >
              Abdelmajid El ainousi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;