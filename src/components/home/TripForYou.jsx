"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

const TripForYou = () => {
  const t = useTranslations("tripForYou");

  const forYouItems = [
    "psychological",
    "travelOften",
    "quietPlace",
    "leavePhone",
    "respectPlace",
    "images",
  ];

  const renderTextWithHighlight = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, i) => (
      <span key={i} className="block">
        {line.split(/\*(.*?)\*/g).map((part, j) =>
          j % 2 === 1 ? (
            <span key={j} className="text-white font-black text-2xl">
              {part}
            </span>
          ) : (
            <span key={j} className="text-white font-bold text-xl">{part}</span>
          )
        )}
      </span>
    ));
  };

  return (
    <section className="relative py-10  overflow-hidden bg-black text-white">
      {/* Ambient Glow - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F47A1F]/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="p-6 sm:p-8 rounded-2xl border border-[#F47A1F]/20 bg-gradient-to-br from-[#F47A1F]/5 to-transparent backdrop-blur-sm">
            <h3 className="text-[clamp(1.5rem,5vw,2.5rem)] font-bold mb-6 flex items-center gap-3 md:text-2xl">
              <div className="w-10 h-10 rounded-full bg-[#F47A1F]/20 flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              {t("forYouTitle")}
            </h3>
            <ul className="space-y-4">
              {forYouItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3 text-white/80"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#F47A1F] flex-shrink-0" />
                  <span className="leading-relaxed text-[clamp(1rem,3vw,1.25rem)] md:text-base">
                    {renderTextWithHighlight(t(`forYou.${item}`))}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TripForYou;
