"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Globe } from "lucide-react";
import { NavLink } from "../NavLink";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

const Navbar = ({ transparent = false }) => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const switchLocale = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };


  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-scrolled' : transparent ? 'navbar-transparent' : 'navbar-scrolled'
        }`}
    >
      <div className="relative flex items-center justify-between h-24 md:h-32 px-4 md:px-8">
        <div className="flex-1">
        </div>

        <div className="flex-shrink-0 pt-10">
          <NavLink
            href="/"
            className="flex items-center justify-center gap-2 hover:scale-[1.05] transition-all duration-300"
          >
            <Image 
  src="/TOURS.png"
  alt="Uzer Saif Tours Logo"
  width={78} 
  height={78}
  className="drop-shadow-md object-contain w-[78px] h-[78px] md:w-[78px] md:h-[78px]"
/>
          </NavLink>
        </div>

        <div className="flex-1 flex justify-end items-center gap-2 md:gap-6">
          <button
            onClick={() => switchLocale(locale === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-primary hover:bg-white/10"
            title={locale === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          >
            <Globe size={18} />
            <span className="text-sm font-medium">{locale === 'ar' ? 'EN' : 'ع'}</span>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden bg-black/90 backdrop-blur-md`}
        style={{
          maxHeight: isMobileMenuOpen ? "500px" : "0",
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
      >
        <div className={`py-6 space-y-4 px-6 mobile-menu transition-transform duration-500`}>
          <button
            onClick={() => switchLocale(locale === 'ar' ? 'en' : 'ar')}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-primary bg-white/5"
          >
            <Globe size={18} />
            <span className="font-medium">{locale === 'ar' ? 'English' : 'العربية'}</span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
