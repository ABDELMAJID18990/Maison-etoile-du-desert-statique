import { useState, useCallback, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next"; // ✅ 1. Import i18n
import { accommodationsData } from "../data/data";
import {
  Wifi,
  ThermometerSun,
  UtensilsCrossed,
  Tv,
  Wind,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import MealsSection from "../components/shared/MealsSection";

/* ============================================================
   VARIANTS D'ANIMATION
   ============================================================ */
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ============================================================
   COMPOSANT PRINCIPAL
   ============================================================ */
function RoomDetailsPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation(); // ✅ 2. Initialisation de la traduction
  const lang = i18n.language;

  // ✅ Helper pratique pour extraire la langue d'un objet (ex: title: { fr: "...", en: "..." })
  const tObj = useCallback((obj) => obj?.[lang] || obj?.fr || "", [lang]);

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    currentIndex: 0,
    zoomLevel: 1,
    position: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
  });

  const containerRef = useRef(null);

  const room = accommodationsData.find((item) => item.id === parseInt(id));

  if (!room) {
    return (
      <div className="text-center py-32 text-2xl font-serif text-dark">
        {t("roomDetails.notFound")} {/* ✅ Traduction */}
      </div>
    );
  }

  const whatsappNumber = "212630518984";

  /* ----------------------------------------------------------
     LIGHTBOX CONTROLS (Intact)
     ---------------------------------------------------------- */
  const openLightbox = useCallback((index) => {
    setLightbox({
      isOpen: true,
      currentIndex: index,
      zoomLevel: 1,
      position: { x: 0, y: 0 },
      isDragging: false,
      dragStart: { x: 0, y: 0 },
    });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = "";
  }, []);

  const goToPrevious = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === 0 ? room.gallery.length - 1 : prev.currentIndex - 1,
      zoomLevel: 1,
      position: { x: 0, y: 0 },
    }));
  }, [room.gallery.length]);

  const goToNext = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === room.gallery.length - 1 ? 0 : prev.currentIndex + 1,
      zoomLevel: 1,
      position: { x: 0, y: 0 },
    }));
  }, [room.gallery.length]);

  const ZOOM_MIN = 0.5;
  const ZOOM_MAX = 2;
  const ZOOM_STEP = 0.25;

  const handleZoomIn = useCallback(() => {
    setLightbox((prev) => ({ ...prev, zoomLevel: Math.min(prev.zoomLevel + ZOOM_STEP, ZOOM_MAX) }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setLightbox((prev) => {
      const newZoom = Math.max(prev.zoomLevel - ZOOM_STEP, ZOOM_MIN);
      return { ...prev, zoomLevel: newZoom, position: newZoom === ZOOM_MIN ? { x: 0, y: 0 } : prev.position };
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setLightbox((prev) => ({ ...prev, zoomLevel: ZOOM_MIN, position: { x: 0, y: 0 } }));
  }, []);

  const handleDoubleClick = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      zoomLevel: prev.zoomLevel > ZOOM_MIN ? ZOOM_MIN : ZOOM_MAX,
      position: { x: 0, y: 0 },
    }));
  }, []);

  const handleWheel = useCallback(
    (e) => {
      if (lightbox.zoomLevel <= ZOOM_MIN) return;
      e.preventDefault();
      e.deltaY < 0 ? handleZoomIn() : handleZoomOut();
    },
    [lightbox.zoomLevel, handleZoomIn, handleZoomOut]
  );

  const handleMouseDown = useCallback((e) => {
    if (lightbox.zoomLevel <= ZOOM_MIN) return;
    e.preventDefault();
    setLightbox((prev) => ({
      ...prev,
      isDragging: true,
      dragStart: { x: e.clientX - prev.position.x, y: e.clientY - prev.position.y },
    }));
  }, [lightbox.zoomLevel]);

  const handleMouseMove = useCallback((e) => {
    if (!lightbox.isDragging) return;
    setLightbox((prev) => ({
      ...prev,
      position: { x: e.clientX - prev.dragStart.x, y: e.clientY - prev.dragStart.y },
    }));
  }, [lightbox.isDragging]);

  const handleMouseUp = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const touchState = useRef({ start: null, end: null, pinchStart: null });

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      touchState.current.pinchStart = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    } else if (e.touches.length === 1) {
      touchState.current.start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && touchState.current.pinchStart) {
      e.preventDefault();
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = distance / touchState.current.pinchStart;
      if (scale > 1.1) {
        handleZoomIn();
        touchState.current.pinchStart = distance;
      } else if (scale < 0.9) {
        handleZoomOut();
        touchState.current.pinchStart = distance;
      }
    } else if (e.touches.length === 1 && touchState.current.start) {
      touchState.current.end = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, [handleZoomIn, handleZoomOut]);

  const handleTouchEnd = useCallback(() => {
    const { start, end } = touchState.current;
    if (start && end && lightbox.zoomLevel <= ZOOM_MIN) {
      const distance = Math.hypot(start.x - end.x, start.y - end.y);
      const isHorizontal = Math.abs(start.x - end.x) > Math.abs(start.y - end.y);
      if (distance > 50 && isHorizontal) {
        end.x < start.x ? goToNext() : goToPrevious();
      }
    }
    touchState.current = { start: null, end: null, pinchStart: null };
  }, [lightbox.zoomLevel, goToNext, goToPrevious]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      switch (e.key) {
        case "Escape": closeLightbox(); break;
        case "ArrowLeft": goToPrevious(); break;
        case "ArrowRight": goToNext(); break;
        case "+": case "=": handleZoomIn(); break;
        case "-": handleZoomOut(); break;
        default: break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, goToPrevious, goToNext, handleZoomIn, handleZoomOut]);

  const getTransformStyle = () => {
    const { zoomLevel, position } = lightbox;
    return {
      transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
      cursor: zoomLevel > ZOOM_MIN ? (lightbox.isDragging ? "grabbing" : "grab") : "zoom-in",
    };
  };

  return (
    <div className="bg-background font-sans pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* ============================================================
            SECTION TITRE & BADGES
            ============================================================ */}
        <motion.div
          className="mb-12 text-center lg:text-left"
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ✅ Utilisation du helper tObj pour le titre de la chambre */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-dark mb-6">
            {tObj(room.title)}
          </h1>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {[
              { icon: "👥", text: `${room.capacity} ${t("roomDetails.persons", "personnes")}` },
              { icon: "📏", text: room.size },
              { icon: "🛏️", text: tObj(room.bed_type) }, // ✅ Type de lit dynamique
              { icon: "🪟", text: tObj(room.view) },     // ✅ Vue dynamique
            ].map((badge, index) => (
              <motion.span
                key={index}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                {badge.icon} {badge.text}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-12">
            
            {/* --- GALERIE D'IMAGES --- */}
            <motion.div
              className="flex flex-col gap-4"
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="group relative rounded-3xl overflow-hidden shadow-xl h-[40vh] md:h-[50vh] cursor-pointer"
                onClick={() => openLightbox(0)}
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
              >
                <img
                  src={room.gallery[0]}
                  alt={`${tObj(room.title)} - ${t("lightbox.main")}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} />
                <motion.div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2" initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }}>
                  <ZoomIn size={14} />
                  {room.gallery.length} {t("lightbox.photos")} {/* ✅ */}
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-3 gap-4">
                {room.gallery.slice(1, 4).map((imgUrl, index) => (
                  <motion.div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden shadow-md h-[15vh] md:h-[20vh] cursor-pointer"
                    onClick={() => openLightbox(index + 1)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${tObj(room.title)} - ${t("lightbox.detail")} ${index}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 2}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* --- DESCRIPTION --- */}
            <motion.div variants={slideUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <h2 className="text-3xl font-serif text-dark mb-4">
                {t("roomDetails.aboutSuite")} {/* ✅ */}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {tObj(room.description)} {/* ✅ Description dynamique */}
              </p>
            </motion.div>

            {/* --- ÉQUIPEMENTS --- */}
            <motion.div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100" variants={slideUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <h2 className="text-2xl font-serif text-dark mb-8">
                {t("roomDetails.includedAmenities")} {/* ✅ */}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 text-dark">
                {[
                  { Icon: Wifi, label: t("roomDetails.features.wifi") },
                  { Icon: Wind, label: t("roomDetails.features.ac") },
                  { Icon: ThermometerSun, label: t("roomDetails.features.heating") },
                  { Icon: UtensilsCrossed, label: t("roomDetails.features.breakfast") },
                  { Icon: Tv, label: t("roomDetails.features.tv") },
                ].map(({ Icon, label }, index) => (
                  <motion.div key={index} className="flex items-center gap-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      <Icon size={20} />
                    </div>
                    <span className="font-sans font-medium">{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <MealsSection />
          </div>

          {/* ============================================================
              COLONNE DROITE - CARTE DE RÉSERVATION
              ============================================================ */}
          <div className="lg:col-span-1">
            <motion.div className="sticky top-32 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100" variants={slideUpVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
              
              <div className="text-center mb-8 border-b border-gray-100 pb-8">
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">
                  {t("roomDetails.rate")} {/* ✅ */}
                </p>
                <motion.span className="text-5xl font-serif font-bold text-primary inline-block" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.7 }}>
                  {room.price_per_night}€
                </motion.span>
                <span className="text-gray-500 font-medium"> {t("roomDetails.perNight")}</span> {/* ✅ */}
              </div>

              <div className="mb-8 text-center space-y-4">
                <h3 className="text-xl font-bold text-dark">
                  {t("roomDetails.bookStay")} {/* ✅ */}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t("roomDetails.bookingInfo")} {/* ✅ */}
                </p>
              </div>

              <motion.a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`${t("roomDetails.whatsappMessage")} ${tObj(room.title)}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={24} />
                {t("roomDetails.bookWhatsapp")} {/* ✅ */}
              </motion.a>

              <div className="mt-8 flex flex-col gap-3 text-sm text-gray-600 font-medium">
                {[
                  { icon: "✨", text: t("roomDetails.reassurance.quickResponse") },
                  { icon: "🐪", text: t("roomDetails.reassurance.bestRate") },
                  { icon: "🔒", text: t("roomDetails.reassurance.payOnSite") },
                ].map((item, index) => (
                  <motion.p key={index} className="flex items-center gap-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + index * 0.1 }}>
                    {item.icon} <span className="text-dark">{item.text}</span>
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============================================================
          LIGHTBOX 
          ============================================================ */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div className="fixed inset-0 z-[100] bg-black/95 flex flex-col" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" onClick={closeLightbox} onWheel={handleWheel}>
            
            <motion.div className="flex items-center justify-between p-4 md:p-6 shrink-0" variants={fadeVariants} initial="hidden" animate="visible">
              <div className="flex items-center gap-3">
                <span className="text-white/90 text-sm font-medium tabular-nums">
                  {lightbox.currentIndex + 1} / {room.gallery.length}
                </span>
                <div className="hidden md:flex items-center gap-1.5">
                  {room.gallery.map((_, index) => (
                    <motion.button key={index} onClick={(e) => { e.stopPropagation(); setLightbox((prev) => ({ ...prev, currentIndex: index, zoomLevel: 1, position: { x: 0, y: 0 } })); }} className={`h-2 rounded-full transition-colors ${index === lightbox.currentIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"}`} animate={{ width: index === lightbox.currentIndex ? 24 : 8 }} />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {lightbox.zoomLevel > ZOOM_MIN && (
                  <motion.button onClick={(e) => { e.stopPropagation(); handleResetZoom(); }} className="text-white/70 hover:text-white transition-colors text-sm font-medium mr-2 hidden sm:block">
                    {t("lightbox.reset")} {/* ✅ */}
                  </motion.button>
                )}
                <motion.button onClick={(e) => { e.stopPropagation(); handleZoomOut(); }} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white" disabled={lightbox.zoomLevel <= ZOOM_MIN} style={{ opacity: lightbox.zoomLevel <= ZOOM_MIN ? 0.3 : 1 }}>
                  <ZoomOut size={18} />
                </motion.button>
                <span className="text-white/70 text-sm min-w-[45px] text-center tabular-nums">
                  {Math.round(lightbox.zoomLevel * 100)}%
                </span>
                <motion.button onClick={(e) => { e.stopPropagation(); handleZoomIn(); }} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white" disabled={lightbox.zoomLevel >= ZOOM_MAX} style={{ opacity: lightbox.zoomLevel >= ZOOM_MAX ? 0.3 : 1 }}>
                  <ZoomIn size={18} />
                </motion.button>
              </div>

              <motion.button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white" whileHover={{ scale: 1.1, rotate: 90 }}>
                <X size={20} />
              </motion.button>
            </motion.div>

            <div ref={containerRef} className="flex-1 flex items-center justify-center relative overflow-hidden" onClick={(e) => e.stopPropagation()} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onDoubleClick={handleDoubleClick}>
              <div style={getTransformStyle()} className="inline-flex">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightbox.currentIndex}
                    src={room.gallery[lightbox.currentIndex]}
                    alt={`${tObj(room.title)} - ${t("lightbox.photo")} ${lightbox.currentIndex + 1}`}
                    className="max-w-[90vw] max-h-[70vh] md:max-w-[80vw] md:max-h-[80vh] object-contain select-none"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} draggable={false}
                  />
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {lightbox.zoomLevel === ZOOM_MIN && (
                  <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white/80 px-4 py-2 rounded-full text-sm flex items-center gap-2 pointer-events-none" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                    <ZoomIn size={14} />
                    {t("lightbox.doubleClickZoom")}
                    <span className="hidden md:inline">• {t("lightbox.navigateArrows")}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div className="flex items-center justify-between p-4 md:p-6 shrink-0" variants={fadeVariants} initial="hidden" animate="visible">
              <motion.button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="flex items-center gap-2 text-white/70 hover:text-white group">
                <ChevronLeft size={20} />
                <span className="hidden md:inline text-sm font-medium">{t("lightbox.previous")}</span>
              </motion.button>

              <div className="flex md:hidden items-center gap-1.5">
                {room.gallery.map((img, index) => (
                  <motion.button key={index} onClick={(e) => { e.stopPropagation(); setLightbox((prev) => ({ ...prev, currentIndex: index, zoomLevel: 1, position: { x: 0, y: 0 } })); }} className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-colors ${index === lightbox.currentIndex ? "border-white" : "border-transparent opacity-50"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>

              <motion.button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="flex items-center gap-2 text-white/70 hover:text-white group">
                <span className="hidden md:inline text-sm font-medium">{t("lightbox.next")}</span>
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RoomDetailsPage;