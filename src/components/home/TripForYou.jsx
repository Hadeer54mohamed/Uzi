"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const TripForYou = () => {
  const t = useTranslations("tripForYou");

  const forYouItems = [
    "psychological",
    "quietPlace",
    "leavePhone",
  ];

  const renderTextWithHighlight = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, i) => (
      <span key={i} className="block">
        {line.split(/\*(.*?)\*/g).map((part, j) =>
          j % 2 === 1 ? (
            <span key={j} className="text-white font-black text-lg md:text-xl">
              {part}
            </span>
          ) : (
            <span key={j} className="text-white font-medium text-lg md:text-xl">{part}</span>
          )
        )}
      </span>
    ));
  };

  return (
    <section className="relative  overflow-hidden bg-black text-white">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#F47A1F]/5 blur-[100px] pointer-events-none" />
  
    <div className="relative z-10 container mx-auto px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mr-4 ml-auto md:mx-auto  md:text-center" 
      >
        
        <div className="flex justify-center mb-5">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-[#F47A1F] rounded-full px-10 py-2 shadow-[0_0_20px_rgba(244,122,31,0.2)]">
            <h3 className="text-xl md:text-3xl font-bold text-[#F47A1F] tracking-wide">
              {t("forYouTitle")}
            </h3>
          </div>
        </div>
        <ul className="space-y-6 md:space-y-8">
  {forYouItems.map((item, index) => (
    <motion.li
      key={item}
       initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-4 text-right md:justify-center md:text-center"
    >
      {/* Bullet */}
      <div className="mt-2 w-3 h-3 rounded-full bg-[#F47A1F] flex-shrink-0" />

      {/* Text */}
      <div className="text-lg md:text-xl font-medium text-white leading-relaxed">
  {renderTextWithHighlight(t(`forYou.${item}`))}
</div>

    </motion.li>
  ))}
</ul>
 </motion.div>
    </div>
  </section>
  );
};

export default TripForYou;
