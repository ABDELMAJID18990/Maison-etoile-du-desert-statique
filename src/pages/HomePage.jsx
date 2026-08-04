import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { accommodationsData, experiencesData } from "../data/data";
import { motion } from "framer-motion";

import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  scaleIn,
  viewportOnce,
} from "../animations";

import RoomCard from "../features/rooms/RoomCard";
import TestimonialsSection from "../components/shared/TestimonialsSection";
import StorySection from "../components/shared/StorySection";

import { MapPin, Star } from "lucide-react";

function HomePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const whatsappNumber = "212630518984";

  const tObj = (obj) => obj?.[lang] || obj?.fr || "";

  return (
    <div className="bg-background min-h-screen">

      {/* ================= HERO SECTION ================= */}
    
      <section className="relative h-screen w-full overflow-hidden">

        {/* Image de fond - Effet Ken Burns (zoom lent) */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img
            src="/unnamed.jpg"
            alt="Désert Marocain"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>

        {/* Assombrissement */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 mt-10">

          {/* Trust Badge - Premier élément visible, delay court */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 mb-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#F4C898] text-[#F4C898]" />
              ))}
            </div>
            <span className="text-white/90 font-sans text-sm tracking-wide bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              {t("homePage.trustBadge")}
            </span>
          </motion.div>

          {/* Titre Principal - Delay moyen */}
          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight drop-shadow-2xl"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            {t("homePage.heroTitle1")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#F4C898]">
              {t("homePage.heroTitle2")}
            </span>
          </motion.h1>

          {/* Sous-titre - Delay après le titre */}
          <motion.p
            className="font-sans text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light drop-shadow-md"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            {t("homePage.heroSubtitle")}
          </motion.p>

          {/* Location Badge */}
          <motion.div
            className="flex items-center justify-center gap-2 text-white mb-10 font-medium tracking-wide bg-black/20 px-5 py-2 rounded-full backdrop-blur-sm border border-white/10"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.85 }}
          >
            <MapPin size={18} className="text-[#F4C898]" />
            <span>Tighmert Oasis, Guelmim, Morocco</span>
          </motion.div>

          {/* Boutons - Derniers éléments, delay le plus long */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            {/* Bouton Secondaire */}
            <motion.a
              href="#chambres"
              className="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-dark transition-colors duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("homePage.btnRooms")}
            </motion.a>

            {/* Bouton Principal WhatsApp */}
            <motion.a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t("homePage.whatsappHero"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-colors duration-300 w-full sm:w-auto shadow-lg shadow-primary/20"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px -8px rgba(var(--primary-rgb), 0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t("homePage.btnBook")}
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator - Animation de flottement continue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">
            Découvrir
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 bg-white/60 rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= SECTION CHAMBRES ================= */}
     
      <section id="chambres" className="container mx-auto px-4 py-12">

        {/* Titre de section */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            {t("homePage.accommodation")}
          </span>
          <h2 className="text-4xl font-serif text-dark mt-2">
            {t("homePage.roomsTitle")}
          </h2>
        </motion.div>

        {/* Badge Scarcity */}
        <motion.div
          className="flex justify-center mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-bold shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            {t("homePage.scarcityBadge", "Seulement 5 suites exclusives. Réservez tôt.")}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {accommodationsData.map((room) => (
            <motion.div
              key={room.id}
              className="w-full sm:w-[45%] lg:w-[30%]"
              variants={staggerItem}
              
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <RoomCard {...room} image={room.image_url} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <StorySection />
      <TestimonialsSection />

      {/* ================= SECTION EXPÉRIENCES ================= */}
    
      <section id="experience" className="py-24 px-6 bg-[#FFF8F0]">
        <div className="max-w-5xl mx-auto">

          {/* Titre de section */}
          <motion.div
            className="text-center mb-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              {t("homePage.experiencesLabel")}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-dark leading-tight">
              {t("homePage.experiencesTitle")}
            </h2>
          </motion.div>

          {/* Liste des expériences */}
          <div className="space-y-24 mb-24 mt-16">
            {experiencesData.map((exp, index) => {
              
              const ImageVariant = index % 2 === 0 ? fadeInLeft : fadeInRight;
              const TextVariant = index % 2 === 0 ? fadeInRight : fadeInLeft;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 
                    ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}
                  `}
                >
                  {/* ── Côté Image ── */}
                  <motion.div
                    className="w-full md:w-1/2 relative group"
                    variants={ImageVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                  >
                    <div className="overflow-hidden rounded-3xl shadow-2xl h-[350px] md:h-[450px]">
                      <img
                        src={exp.image_url}
                        alt={tObj(exp.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                    {/* Bordure décorative - apparaît avec un léger retard */}
                    <motion.div
                      className={`absolute -z-10 w-full h-full border-2 border-primary/20 rounded-3xl top-6 ${index % 2 !== 0 ? "-left-6" : "-right-6"}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={viewportOnce}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                  </motion.div>

                  {/* ── Côté Texte ── */}
                  <motion.div
                    className="w-full md:w-1/2 flex flex-col justify-center"
                    variants={TextVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                  >
                    {/* Numéro décoratif */}
                    <div className="text-7xl font-serif text-primary/20 font-light leading-none mb-4">
                      {exp.id}
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-dark mb-4">
                      {tObj(exp.title)}
                    </h3>

                    <p className="text-gray-600 text-lg leading-relaxed font-light mb-6">
                      {tObj(exp.description)}
                    </p>

                    {/* Carte détails */}
                    <div className="bg-white/60 p-5 rounded-2xl border border-[#F4C898]/40 mb-6">
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-dark font-medium"
                          >
                            <span className="text-primary">✓</span>{" "}
                            {tObj(highlight)}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-[#F4C898]/20 flex justify-between items-center">
                        <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                          {t("homePage.rate")}
                        </span>
                        <span className="text-2xl font-serif font-bold text-primary">
                          {typeof exp.price === "string" ? exp.price : tObj(exp.price)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* ── CTA Final ── */}
         
          <motion.div
            className="text-center bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-[#F4C898]/20"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h4 className="text-2xl font-serif text-dark mb-4 font-bold">
              {t("homePage.ctaTitle")}
            </h4>
            <p className="text-gray-600 text-lg mb-8 font-light max-w-2xl mx-auto leading-relaxed">
              {t("homePage.ctaDesc")}
            </p>
            <motion.a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t("homePage.whatsappExcursion"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-primary-dark transition-colors duration-300 shadow-lg text-lg"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t("homePage.btnExcursion")}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;