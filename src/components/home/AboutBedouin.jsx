"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import MediaSwiper from "../MediaSwiper";
import { AboutBedouin as AboutBedouinMedia } from "@/data/mediaSwiperData";

const AboutBedouin = () => {
  const t = useTranslations("aboutBedouin");

  const renderTextWithHighlight = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, i) => (
      <span key={i} className="block">
        {line.split(/\*(.*?)\*/g).map((part, j) =>
          j % 2 === 1 ? (
            <span key={j} className="text-[#F47A1F] font-black text-[1.1em]">
              {part}
            </span>
          ) : (
            <span key={j} className="font-bold">{part}</span>
          )
        )}
      </span>
    ));
  };

  return (
    <section className="relative py-12 sm:py-16 bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F47A1F]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative group order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden border border-[#F47A1F]/20 shadow-xl shadow-[#F47A1F]/10">
              <MediaSwiper
                customMedia={AboutBedouinMedia}
                height="h-[350px] sm:h-[400px] md:h-[500px] lg:h-[550px]"
                className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-5 text-right order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-black/60 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5 sm:p-6"
            >
              <span className="inline-block text-[#F47A1F] font-black text-[clamp(1.25rem,4vw,1.75rem)] mb-4 px-4 py-2 rounded-full bg-[#F47A1F]/10 border border-[#F47A1F]/30">
                {t("badge")}
              </span>
              
              <p className="text-white text-[clamp(1.1rem,3.5vw,1.4rem)] leading-relaxed mb-5">
                {renderTextWithHighlight(t("description"))}
              </p>
              
              <div className="relative pr-5 border-r-4 border-[#F47A1F] rounded-sm bg-[#F47A1F]/5 py-4 px-4">
                <p className="text-white leading-relaxed text-[clamp(1rem,3vw,1.2rem)]">
                  {renderTextWithHighlight(t("quote"))}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutBedouin;