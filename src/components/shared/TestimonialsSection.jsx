import TestimonialCard from './TestimonialCard';
import { testimonialsData } from '../../data/data';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, scaleIn, viewportOnce } from '../../animations';

const TestimonialsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* En-tête */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            {t('testimonialsSection.eyebrow')}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-dark leading-tight">
            {t('testimonialsSection.title')}
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            {t('testimonialsSection.subtitle')}
          </p>
        </motion.div>

      
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {testimonialsData.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA - scaleIn pour attirer l'attention */}
        <motion.div
          className="text-center"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.a
            href="https://www.google.com/maps/place/Maison+etoile+du+desert/@28.9413114,-10.0314427,13z/data=!4m18!1m5!2m4!1sHotels!5m2!5m1!1s2025-12-03!3m11!1s0xdb5070386ffc53f:0xe68a22b9e28062f1!5m2!4m1!1i2!8m2!3d28.9413114!4d-9.9593449!9m1!1b1!15sCgZIb3RlbHOSAQtndWVzdF9ob3VzZaoBOhABKgoiBmhvdGVscygAMh4QASIainsixGVQ51rDIRxGAWYdQunD1rZjbCyu2qAyChACIgZob3RlbHPgAQA!16s%2Fg%2F11ll9s7xzd?entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-dark text-dark hover:bg-dark hover:text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {t('testimonialsSection.cta')}
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default TestimonialsSection;