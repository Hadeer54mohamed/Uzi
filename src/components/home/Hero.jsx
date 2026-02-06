"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import MediaSwiper from "@/components/MediaSwiper";
import { afterHero } from "@/data/mediaSwiperData";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const heroRef = useRef(null);
  const y = useMotionValue(0);
  const yTransform = useTransform(y, [0, 300], [0, -45]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => y.set(window.scrollY / 3);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
    ref={heroRef}
    className="relative flex flex-col items-center justify-end overflow-hidden min-h-[85vh] md:min-h-[95vh] pb-12 md:pb-20 w-full max-w-[100vw]"
  >
    <motion.div
      style={{ y: yTransform }}
      className="absolute inset-0 z-0"
    >
      <img 
        src="/moucup2.png" 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0  " />
    </motion.div>
  
    <div className="relative z-10 container mx-auto px-4 text-center">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
       <div className="inline-block bg-white/10 backdrop-blur-md border border-[#f47a1f] rounded-full px-10 py-2 mb-3 shadow-[0_0_20px_rgba(244,122,31,0.2)]">  <h1 className="text-xl md:text-3xl font-bold text-[#f47a1f] tracking-wide">
            {t("title")}
          </h1>
        </div>
  
        <div className="w-full max-w-4xl mx-auto space-y-3">
        <p className="text-white text-lg md:text-xl leading-relaxed drop-shadow-md">
        <span className="font-black ">{t("partBoldStart")}</span>
        {" "}
        <span className="font-medium">{t("partNormal")}</span>
        {" "}
        <span className="font-black ">{t("partBoldEnd")}</span>
      </p>
        </div>
      </motion.div>
  
    </div>
  </section>
  );
};

export default Hero;