import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Users, ArrowRight } from "lucide-react";

const RoomCard = ({ id, title, price_per_night, image, capacity }) => {
  const { t, i18n } = useTranslation();
  const currentTitle = title[i18n.language] || title.fr;

  return (
    
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-100/80 flex flex-col h-full">
      
      {/* ================= IMAGE & PRIX ================= */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/400"}
          alt={currentTitle}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
        
        {/* Badge Prix - restera en CSS, pas besoin de motion ici */}
        <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl text-dark shadow-xl flex items-baseline gap-1">
          <span className="font-serif font-bold text-2xl text-primary leading-none">
            {Number(price_per_night)}
          </span>
          <span className="font-serif font-bold text-lg text-primary leading-none">
            €
          </span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1.5">
            / {t("roomCard.perNight", "nuit")}
          </span>
        </div>
      </div>

      {/* ================= CONTENU ================= */}
      <div className="p-6 md:p-8 flex flex-col flex-grow bg-white relative">
        
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="text-2xl font-serif font-bold text-dark group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {currentTitle}
          </h3>
          
          <div className="shrink-0 flex items-center gap-1.5 bg-gray-50 text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 group-hover:border-primary/30 group-hover:text-primary transition-colors">
            <Users size={16} />
            <span className="text-sm font-bold">{capacity}</span>
          </div>
        </div>

        
        <div className="w-12 h-0.5 bg-primary/30 rounded-full mb-6 group-hover:w-full transition-all duration-700 ease-out" />

        <div className="mt-auto pt-2">
          <Link
            to={`/chambres/${id}`}
            className="group/btn flex justify-between items-center w-full bg-gray-50 hover:bg-primary text-dark hover:text-white font-bold py-3.5 px-6 rounded-xl border border-gray-100 hover:border-primary transition-all duration-300"
          >
            <span className="tracking-wide text-sm">{t("roomCard.viewDetails", "Voir détails")}</span>
            <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default React.memo(RoomCard);