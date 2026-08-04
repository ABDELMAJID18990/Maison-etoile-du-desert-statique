import storyImage from "../../../public/notre_histoire.JPG";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight, fadeInUp, viewportOnce } from '../../animations';

const StorySection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- COLONNE GAUCHE : Image --- */}
          <motion.div
            className="relative px-8 md:px-12 lg:px-0"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {/*
              La bordure décorative apparaît APRÈS l'image
              avec un léger retard = effet de profondeur
            */}
            <motion.div
              className="absolute inset-0 border-2 border-primary/30 rounded-t-full rounded-b-[2.5rem] -z-10 translate-x-6 translate-y-6 md:translate-x-8 md:translate-y-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            <img
              src={storyImage}
              alt={t('storySection.imageAlt')}
              className="w-full h-[450px] md:h-[600px] object-cover rounded-t-full rounded-b-3xl shadow-2xl"
            />
          </motion.div>

          {/* --- COLONNE DROITE : Texte --- */}
          <motion.div
            className="flex flex-col justify-center"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="text-center md:text-left">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                {t('storySection.eyebrow')}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-dark leading-tight mb-8">
                {t('storySection.title')}
              </h2>
            </div>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
              <p>{t('storySection.paragraph1')}</p>
              <p>{t('storySection.paragraph2')}</p>
            </div>

            {/* Signature - apparaît en dernier avec son propre fadeInUp */}
            <motion.div
              className="mt-10 pt-8 border-t border-gray-100"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: 0.2 }}
            >
              <p className="text-4xl font-serif text-primary italic">
                {t('storySection.hostName')}
              </p>
              <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest font-bold">
                {t('storySection.hostRole')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;