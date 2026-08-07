import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, MessageCircle, Car, Map, Compass, Navigation
} from "lucide-react";

import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../animations";

const ContactPage = () => {
  const { t } = useTranslation();

  const whatsappNumber = "212630518984";
  const whatsappMessage = t('contactPage.whatsappMessage');

  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* ================= EN-TÊTE ================= */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
         
        >
          <h1 className="text-5xl font-serif font-bold text-dark mb-4">
            {t('contactPage.title')}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t('contactPage.subtitle')}
          </p>
        </motion.div>

        {/* ================= BLOC PRINCIPAL ================= */}
      
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

          {/* --- COLONNE GAUCHE : Infos --- */}
          <motion.div
            className="lg:w-1/3 bg-dark text-white p-10 md:p-12 flex flex-col justify-between relative overflow-hidden"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            {/* Orbe décoratif en arrière-plan */}
            <motion.div
              className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <div className="relative z-10">
              <h3 className="text-3xl font-serif text-primary mb-8">
                {t('contactPage.contactInfo')}
              </h3>

              <div className="space-y-8">
                {/* Adresse */}
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">{t('contactPage.addressTitle')}</h4>
                    <p className="text-white/70 mt-1 leading-relaxed">
                      {t('contactPage.addressValue')}<br />
                      {t('contactPage.addressNote')}
                    </p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start gap-4">
                  <Phone className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">{t('contactPage.phoneTitle')}</h4>
                    <p className="text-white/70 mt-1">+212 6 30 51 89 84</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">{t('contactPage.emailTitle')}</h4>
                    <p className="text-white/70 mt-1">
                      etoiledusahra@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton WhatsApp */}
            <div className="relative z-10 mt-16">
             
              <motion.a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30"
                whileHover={{ scale: 1.03, y: -3, boxShadow: "0 20px 40px -8px rgba(37, 211, 102, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MessageCircle size={24} />
                {t('contactPage.whatsappBtn')}
              </motion.a>
            </div>
          </motion.div>

          {/* --- COLONNE DROITE : Carte --- */}
         
          <motion.div
            className="lg:w-2/3 min-h-[400px] lg:min-h-full relative bg-gray-200"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
         
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9984.185252339854!2d-9.968355952432786!3d28.935859639424788!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb5070386ffc53f%3A0xe68a22b9e28062f1!2sMaison%20etoile%20du%20desert!5e1!3m2!1sen!2sma!4v1775417064398!5m2!1sen!2sma"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte de localisation Maison Étoile"
            />
          </motion.div>
        </div>

        {/* ================= BLOC ITINÉRAIRE ================= */}
        <motion.div
          className="mt-12 bg-[#FFF8F0] rounded-3xl p-8 md:p-12 border border-[#F4C898]/30 shadow-sm"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Titre */}
          <h2 className="text-3xl font-serif text-dark mb-10 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
            <Map className="text-primary" size={32} />
            {t('contactPage.directionsTitle')}
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-600 leading-relaxed"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {/* Étape 1 */}
            <motion.div
              className="flex gap-5"
              variants={staggerItem}
            >
              <div className="mt-1 p-3 bg-white rounded-full text-primary shadow-sm h-fit shrink-0">
                <Car size={24} />
              </div>
              <div>
                <h4 className="font-bold text-dark text-xl mb-2">{t('contactPage.step1Title')}</h4>
                <p>{t('contactPage.step1Text')}</p>
              </div>
            </motion.div>

            {/* Étape 2 */}
            <motion.div
              className="flex gap-5"
              variants={staggerItem}
            >
              <div className="mt-1 p-3 bg-white rounded-full text-primary shadow-sm h-fit shrink-0">
                <Compass size={24} />
              </div>
              <div>
                <h4 className="font-bold text-dark text-xl mb-2">{t('contactPage.step2Title')}</h4>
                <p>{t('contactPage.step2Text')}</p>
              </div>
            </motion.div>

            {/* Étape 3 */}
            <motion.div
              className="flex gap-5"
              variants={staggerItem}
            >
              <div className="mt-1 p-3 bg-white rounded-full text-primary shadow-sm h-fit shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-dark text-xl mb-2">{t('contactPage.step3Title')}</h4>
                <p>{t('contactPage.step3Text')}</p>
              </div>
            </motion.div>

            {/* Étape 4 */}
            <motion.div
              className="flex gap-5"
              variants={staggerItem}
            >
              <div className="mt-1 p-3 bg-white rounded-full text-primary shadow-sm h-fit shrink-0">
                <Navigation size={24} />
              </div>
              <div>
                <h4 className="font-bold text-dark text-xl mb-2">{t('contactPage.step4Title')}</h4>
                <p className="mb-3">
                 
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=28.94474,-9.95316"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono bg-white px-3 py-1.5 rounded-lg border border-primary/20 text-primary font-bold hover:bg-primary hover:text-white transition-colors"
                  >
                    28.94474, -9.95316
                  </a>
                </p>
                <p>{t('contactPage.step4Text')}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactPage;