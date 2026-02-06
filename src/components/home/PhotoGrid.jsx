"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  // تم توزيع المواقع بالنسب المئوية لضمان التوازن في الموبايل والديسكتوب
  { src: "/DesertComparison/6.jpg", position: "top-[0%] left-[5%] md:left-[2%]", size: "w-32 h-40 md:w-56 md:h-72", rotate: "-rotate-6" },
  { src: "/DesertComparison/1.jpg", position: "top-[5%] left-[35%] md:left-[25%]", size: "w-36 h-48 md:w-64 md:h-80", rotate: "rotate-3" },
  { src: "/DesertComparison/2.jpg", position: "top-[2%] left-[65%] md:left-[55%]", size: "w-32 h-36 md:w-56 md:h-64", rotate: "-rotate-2" },
  { src: "/DesertComparison/3.jpg", position: "top-[10%] left-[10%] md:left-[80%]", size: "w-28 h-40 md:w-48 md:h-68", rotate: "rotate-6" },
  
  { src: "/DesertComparison/5.jpg", position: "top-[32%] left-[5%] md:left-[8%]", size: "w-36 h-44 md:w-60 md:h-72", rotate: "rotate-4" },
  { src: "/AboutBedouin/19.jpg", position: "top-[38%] left-[40%] md:left-[35%]", size: "w-32 h-40 md:w-52 md:h-64", rotate: "-rotate-3" },
  { src: "/AboutBedouin/20.jpg", position: "top-[35%] left-[70%] md:left-[62%]", size: "w-36 h-44 md:w-64 md:h-80", rotate: "rotate-2" },
  
  { src: "/AboutBedouin/22.jpg", position: "top-[62%] left-[2%] md:left-[5%]", size: "w-32 h-44 md:w-56 md:h-72", rotate: "-rotate-2" },
  { src: "/DesertFeeling/7.jpg", position: "top-[65%] left-[32%] md:left-[28%]", size: "w-36 h-40 md:w-60 md:h-64", rotate: "rotate-5" },
  { src: "/DesertFeeling/8.jpg", position: "top-[58%] left-[62%] md:left-[52%]", size: "w-32 h-44 md:w-56 md:h-72", rotate: "-rotate-4" },
  { src: "/DesertFeeling/9.jpg", position: "top-[65%] left-[15%] md:left-[75%]", size: "w-30 h-40 md:w-56 md:h-72", rotate: "rotate-3" },
];

export default function PhotoGrid() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openImage = (index) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);
  
  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section className="relative pt-10 bg-black overflow-hidden min-h-[700px] md:min-h-[1000px]">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#F47A1F]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 relative h-[600px] md:h-[850px]">
        <div className="relative w-full h-full">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ 
                scale: 1.1, 
                zIndex: 150, 
                rotate: 0,
                transition: { duration: 0.2 } 
              }}
              onClick={() => openImage(index)}
              className={`absolute transition-all duration-500 ease-out overflow-hidden rounded-xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-white/10 cursor-pointer ${photo.position} ${photo.size} ${photo.rotate} active:scale-95`}
            >
              <Image
                src={photo.src}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={closeImage}
          >
            <button onClick={closeImage} className="absolute top-6 right-6 z-[210] p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all">
              <X size={32} />
            </button>

            <button onClick={prevImage} className="absolute left-4 z-[210] p-4 rounded-full bg-white/5 hover:bg-white/10 text-white hidden md:block">
              <ChevronLeft size={40} />
            </button>

            <button onClick={nextImage} className="absolute right-4 z-[210] p-4 rounded-full bg-white/5 hover:bg-white/10 text-white hidden md:block">
              <ChevronRight size={40} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-[60vh] md:h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedIndex].src}
                alt="Selected"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="absolute bottom-10 flex gap-8 md:hidden">
                <button onClick={prevImage} className="p-4 rounded-full bg-white/10 text-white"><ChevronLeft size={30} /></button>
                <button onClick={nextImage} className="p-4 rounded-full bg-white/10 text-white"><ChevronRight size={30} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}