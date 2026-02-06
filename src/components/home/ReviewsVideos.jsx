"use client";

import React, { useState, useId } from "react";
import { motion } from "framer-motion";
import { Play, X, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow, A11y } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const defaultVideos = [
  { id: "QViYDcYGl34" }, { id: "-aUqfhZNjPQ" }, { id: "hkvlJHJEeHs" },
  { id: "jIYepfj2xZk" }, { id: "qBw1QuRw_o" }, { id: "GzfxsGQc1LA" },
  { id: "mmtSc1TVgN4" }, { id: "kUQyvODbExY" }, { id: "yeYdMzvLTXk" },
  { id: "jdI3GoGe9XI" }, { id: "i4w2WfMh-fw" },
];

const VideoCard = React.memo(({ video, isPlaying, onPlay, onClose, isActive }) => {
  const [imgError, setImgError] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${video.id}/${imgError ? "hqdefault" : "maxresdefault"}.jpg`;

  return (
    <div className={`relative aspect-[10/16] w-full rounded-[2.5rem] overflow-hidden bg-black shadow-2xl transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-40'}`}>
      {isPlaying ? (
        <>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center transition-colors hover:bg-[#F47A1F]">
            <X className="w-4 h-4 text-white" />
          </button>
          <iframe src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`} className="absolute inset-0 w-full h-full border-0" allowFullScreen title="Video" />
        </>
      ) : (
        <div className="absolute inset-0 cursor-pointer group" onClick={() => onPlay(video.id)}>
          {/* Hidden img to detect 404 */}
          <img src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`} alt="" className="hidden" onError={() => setImgError(true)} />
          
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `url(${thumbnail})` }} />
          
          {/* Play Icon - Orange Triangle */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="transition-transform group-hover:scale-110">
                <Play className="w-14 h-14 text-[#F47A1F] fill-[#F47A1F] drop-shadow-[0_0_15px_rgba(244,122,31,0.6)]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default function ReviewsVideos({ id, videos = defaultVideos }) {
  const t = useTranslations("reviewsVideos");
  const uniqueId = id || useId().replace(/:/g, "");
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const prevBtnClass = `swiper-prev-${uniqueId}`;
  const nextBtnClass = `swiper-next-${uniqueId}`;

  return (
    <section className="reviews-section py-8 md:py-16 bg-black">
      <div className="max-w-4xl mx-auto px-4 relative">
        
        <div className="absolute inset-0 border-[1px] border-[#F47A1F]/30 bg-gradient-to-b from-[#1a0f08] to-[#080402] rounded-[3rem] md:rounded-[4rem]" />

        <div className="relative z-10 pt-10 pb-12 md:pb-16">
          {/* Header with Framer Motion */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 px-4"
          >
            <div className="inline-block px-8 py-2.5 rounded-full border-2 border-[#F47A1F] mb-4 bg-white/5 backdrop-blur-sm">
              <h2 className="text-[#F47A1F] font-bold text-lg md:text-xl uppercase tracking-wider">{t("title")}</h2>
            </div>
            <p className="text-white/90 text-sm md:text-base font-medium max-w-xl mx-auto">{t("subtitle")}</p>
          </motion.div>

          {/* Swiper Area */}
          <div className="relative">
            <Swiper
              modules={[Pagination, Navigation, EffectCoverflow, A11y]}
              effect="coverflow"
              centeredSlides={true}
              loop={true}
              slidesPerView={1.3}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              breakpoints={{
                768: { 
                  slidesPerView: 3, 
                  coverflowEffect: { stretch: -15, depth: 150, modifier: 1 } 
                },
              }}
              navigation={{ prevEl: `.${prevBtnClass}`, nextEl: `.${nextBtnClass}` }}
              pagination={{ el: `.pagination-${uniqueId}`, clickable: true }}
              className="!overflow-visible"
            >
              {videos.map((video, index) => (
                <SwiperSlide key={`${video.id}-${index}`} className="py-4">
                  {({ isActive }) => (
                    <VideoCard
                      video={video}
                      isActive={isActive}
                      isPlaying={playingVideoId === video.id}
                      onPlay={setPlayingVideoId}
                      onClose={() => setPlayingVideoId(null)}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* نظام التحكم - مسنتر بالمللي */}
            <div className="absolute left-1/2 -bottom-6 flex -translate-x-1/2 items-center z-50 w-full justify-center" dir="ltr">
              <button className={`${prevBtnClass} text-[#F47A1F] hover:scale-110 active:scale-75 transition-all`}>
                <ChevronsLeft size={32} strokeWidth={2.5} />
              </button>

              <div className={`pagination-${uniqueId} custom-dots`} />

              <button className={`${nextBtnClass} text-[#F47A1F] hover:scale-110 active:scale-75 transition-all`}>
                <ChevronsRight size={32} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}