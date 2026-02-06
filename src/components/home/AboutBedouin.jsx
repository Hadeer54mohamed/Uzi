"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const AboutBedouin = () => {
  const t = useTranslations("aboutBedouin");

  const renderTextWithHighlight = (text) => {
    if (!text) return null;
    return text.split(/\*(.*?)\*/g).map((part, j) =>
      j % 2 === 1 ? (
        <span key={j} className="font-black text-white">
          {part}
        </span>
      ) : (
        <span key={j}>{part}</span>
      )
    );
  };

  return (
    <section className="relative w-full h-full bg-black overflow-hidden flex">
      <div className="w-full h-full px-4 py-4 md:py-6 relative z-10 flex">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full h-full flex flex-col bg-gradient-to-b from-[#1a1210] to-[#0d0907] border border-[#F47A1F]/30 rounded-3xl p-4 md:p-6 overflow-hidden"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <span className="inline-block text-[#F47A1F] font-bold text-lg md:text-xl px-6 py-2 rounded-full border border-[#F47A1F] bg-fire/10 backdrop-blur-md  tracking-wide">
              {t("badge")}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white text-base md:text-lg leading-relaxed font-medium mb-4 text-center"
          >
            {renderTextWithHighlight(t("description"))}
          </motion.p>

          {/* Image – flexible height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative flex-1 -mx-4 md:-mx-6 mb-4 overflow-hidden rounded-xl"
          >
            <img
              src="/moucup1.png"
              alt="Bedouin of Farafra"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0907]/90 via-[#0d0907]/40 to-transparent" />
          </motion.div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-white text-sm md:text-base leading-relaxed font-medium text-center"
          >
            {renderTextWithHighlight(t("quote"))}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBedouin;
