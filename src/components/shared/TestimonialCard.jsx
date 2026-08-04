import { Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TestimonialCard = ({ quote, author, origin, date, rating, source }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const tObj = (obj) => obj?.[lang] || obj?.fr || obj;

  return (
  
    <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 flex flex-col h-full relative overflow-hidden group">
      
      <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors duration-300">
        <Quote size={80} strokeWidth={1} />
      </div>

      <div className="flex gap-1 mb-6 relative z-10">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={20} className="fill-primary text-primary" />
        ))}
      </div>

      <blockquote className="text-gray-600 text-lg leading-relaxed mb-8 relative z-10 italic">
        "{tObj(quote)}"
      </blockquote>

      <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-end relative z-10">
        <div>
          <h4 className="font-bold text-dark font-serif text-lg">{author}</h4>
          <p className="text-sm text-gray-500">{tObj(origin)} • {date}</p>
        </div>
        
        <span className="text-xs font-bold px-3 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-200">
          ✔ via {source}
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;