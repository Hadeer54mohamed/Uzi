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
      className="relative flex flex-col items-center justify-center overflow-hidden min-h-[60vh] md:min-h-[70vh] pt-16 md:pt-20"
    >

      {/* Background with Parallax */}
      <motion.div
        style={{ y: yTransform }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >

        {/* 🌌 Cosmic Overlay */}
        <div className="absolute inset-0 overlay-hero" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center space-y-4 text-center"
        >

          <h1 className="text-[clamp(1.9rem,6vw,3rem)] md:text-[clamp(2.1rem,7vw,3.2rem)] font-bold mb-2 drop-shadow-lg text-fire leading-tight">
            {t("title")} <br className="md:hidden" />
          </h1>

          <div className="w-full max-w-[95%] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 pt-2 pb-10">
            <div className="bg-[#F47A1F]/15 backdrop-blur-md border border-[#F47A1F]/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg shadow-[#F47A1F]/10">
            <p className="text-white text-lg leading-relaxed font-light">
              <span className="font-black text-xl">{t("partBoldStart")}</span>{" "}
              {t("partNormal")}{" "}
              <span className="font-black text-xl">{t("partBoldEnd")}</span>
            </p>
            </div>
          </div>


        </motion.div>

        <MediaSwiper
          customMedia={afterHero}
          height="h-[300px] xs:h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]"
          className="container mx-auto px-4  "
        />

        {/* Booking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 max-w-md mx-auto px-4"
        >
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white py-4 px-8 rounded-2xl shadow-lg shadow-[#F47A1F]/40 flex flex-col items-center justify-center gap-1 transition-all hover:shadow-[#F47A1F]/60 hover:brightness-110"
          >
            <motion.div
              animate={{ x: [0, -6, 6, -6, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <span className="flex items-center gap-3 font-black text-xl">
                <MessageCircle size={28} />
                {t("bookingButton")}
              </span>
              <span className="text-black text-sm font-bold flex items-center gap-5">
                <span>-</span>
                {t("limitedSpots")}
                <span>-</span>
              </span>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
