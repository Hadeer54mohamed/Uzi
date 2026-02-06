"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  generateStars,
  generateMeteors,
} from "@/components/SpaceElements";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();
  const [showPopup, setShowPopup] = useState(false);
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const handleSubmit = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  useEffect(() => {
    setStars(generateStars(60));
    setMeteors(generateMeteors(3, { delayMultiplier: 6, baseRepeatDelay: 15 }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

 
  return (
    <footer className="relative overflow-hidden">


      <div className="relative z-10 container mx-auto px-4 pt-4 pb-4 sm:pt-6 sm:pb-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
         

        </motion.div>

        {/* Divider */}
        <div className="mb-3  sm:mb-4 h-px section-divider-fire" />

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-sm flex items-center gap-2 text-muted">
            © {currentYear} &nbsp; {t("copyright")}
            <span className="font-black text-gradient-fire" dir="ltr">
              UzerSaif
            </span>
          </p>

          <span
            className="text-sm flex items-center gap-1 text-muted"
            dir="ltr"
          >
            {t("designedBy")}
            <a
              href="https://www.facebook.com/ENSEGYPTEG"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black hover:underline transition-colors text-fire"
            >
              ENS
            </a>
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
