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
            <span key={j} className="text-[#F47A1F] font-black">
              {part}
            </span>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </span>
    ));
  };

  return (
    <section className="relative py-12 bg-black overflow-hidden">
      {/* توهج خلفي */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F47A1F]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F47A1F]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* الصورة */}
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
                height="h-[400px] md:h-[500px] lg:h-[600px]"
                className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
              
            {/* بطاقة الخبرة */}
           {/*  <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#F47A1F] to-[#FFB85C] p-4 rounded-2xl shadow-2xl shadow-[#F47A1F]/40 z-20 hidden md:block"
            >
              <p className="text-3xl font-black text-white">+26</p>
              <p className="text-xs text-white/80 font-bold">سنة خبرة</p>
            </motion.div> */}
          </motion.div>

          {/* النص */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-right order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-black/60 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-6"
            >
              <span className="inline-block text-[#F47A1F] font-bold text-[clamp(1.1rem,3vw,1.5rem)] mb-4 px-4 py-2 rounded-full bg-[#F47A1F]/10 border border-[#F47A1F]/30">
                {t("badge")}
              </span>
              
              <p className="text-white text-[clamp(1rem,3vw,1.25rem)] leading-relaxed mb-5 font-medium">
                {renderTextWithHighlight(t("description"))}
              </p>
              
              <div className="relative pr-5 border-r-4 border-[#F47A1F] rounded-sm bg-white/5 py-4 px-3">
                <p className="text-white leading-relaxed text-[clamp(0.95rem,2.5vw,1.1rem)] font-bold">
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