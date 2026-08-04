import React from 'react';
import { Coffee, Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MealsSection = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#FFF8F0] p-8 rounded-3xl shadow-sm border border-[#F4C898]/30 mt-12">
      <h2 className="text-2xl font-serif text-dark mb-6 flex items-center gap-3">
        {t('mealsSection.title')}
      </h2>
      
      <div className="space-y-6">
        
        {/* Option 1 : Dîner */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#F4C898]/20 pb-4 gap-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-full text-primary shadow-sm mt-1">
              <Utensils size={20} />
            </div>
            <div>
              <h4 className="font-bold text-dark text-lg">{t('mealsSection.dinner.title')}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {t('mealsSection.dinner.description')}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <span className="font-bold text-primary text-2xl">{t('mealsSection.dinner.pricePerPerson')}</span>
            <span className="text-sm text-gray-500 block">10 € / pers.</span>
          </div>
        </div>

        {/* Option 2 : Petit-déjeuner */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 gap-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-full text-primary shadow-sm mt-1">
              <Coffee size={20} />
            </div>
            <div>
              <h4 className="font-bold text-dark text-lg">{t('mealsSection.breakfast.title')}</h4>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {t('mealsSection.breakfast.description')}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <span className="font-bold text-primary text-2xl">{t('mealsSection.breakfast.pricePerPerson')}</span>
            <span className="text-sm text-gray-500 block">5 € / pers.</span>
          </div>
        </div>
        
      </div>
      
      {/* Note d'information */}
      <div className="mt-6 bg-white/60 p-4 rounded-xl text-sm italic text-gray-600 border border-white">
        <span className="font-bold text-primary">💡 {t('mealsSection.note.label')}</span> {t('mealsSection.note.text')}
      </div>
    </div>
  );
};

export default MealsSection;