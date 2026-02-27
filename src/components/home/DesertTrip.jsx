"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dummyTrips } from "@/lib/dummyTrips";
import { MessageCircle, MapPin, Clock, AlertCircle, Link as LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const DesertTrip = () => {
  const t = useTranslations("desertTrip");
  const [selectedTripId, setSelectedTripId] = useState(dummyTrips[0]?._id);
  const [isLoading, setIsLoading] = useState(true);

  const renderStyledText = (text) => {
    if (!text) return null;

    const processTime = (str) => {
      const timePattern = /(\d{1,2}:\d{2}\s*(?:صباحاً|مساءً|ظهراً|ص|م|ظ|AM|PM|am|pm)?:?)/gi;
      const parts = str.split(timePattern);

      return parts.map((part, i) => {
        const isTime = /^\d{1,2}:\d{2}\s*(?:صباحاً|مساءً|ظهراً|ص|م|ظ|AM|PM|am|pm)?:?$/i.test(part);
        if (isTime) {
          return (
            <span key={`time-${i}`} className="font-heading text-[#F47A1F] font-bold">
            {part.replace(/:$/, '')}:
          </span>
          );
        }
        return part;
      });
    };

    const processBullets = (str) => {
      if (!str.includes('◦')) return processTime(str);

      return str.split('◦').map((part, i) => {
        if (i === 0) return processTime(part);
        return (
          <span key={`bullet-${i}`} className="inline-block align-top">
            <span className="text-[#F47A1F] font-bold mr-1">◦</span>
            {processTime(part.trim())}
          </span>
        );
      });
    };

    const processNewlines = (str) => {
      if (!str.includes('\n')) return processBullets(str);

      const lines = str.split('\n');

      const bulletLineIndexes = lines
        .map((line, idx) => (line.trim().startsWith('◦') ? idx : null))
        .filter((idx) => idx !== null);

      const bulletCount = bulletLineIndexes.length;
      const isOddBullets = bulletCount % 2 === 1;
      const lastBulletIndex = isOddBullets
        ? bulletLineIndexes[bulletCount - 1]
        : null;

      return lines.map((line, i) => {
        const isBulletLine = bulletLineIndexes.includes(i);

        let className = "";
        if (isBulletLine) {
          const isLastOddBullet = isOddBullets && i === lastBulletIndex;
          className = isLastOddBullet
            ? "inline-block w-full mt-1 align-top"
            : "inline-block w-1/2 mt-1 align-top";
        } else if (i > 0) {
          className = "block mt-1";
        }

        return (
          <span key={`line-${i}`} className={className}>
            {processBullets(line)}
          </span>
        );
      });
    };

    if (!text.includes("*")) {
      return <span className="font-[700]">{processNewlines(text)}</span>;
    }

    const parts = text.split(/\*([^*]+)\*/);
    return (
      <span>
        {parts.map((part, idx) =>
          idx % 2 === 1 ? (
            <span key={idx} className="font-[900] text-white">
              {processNewlines(part)}
            </span>
          ) : (
            <span key={idx} className="font-[700]">
              {processNewlines(part)}
            </span>
          )
        )}
      </span>
    );
  };

  const getTripData = (trip) => {
    const key = trip.translationKey;
    return {
      ...trip,
      title: t(`trips.${key}.title`),
      location: t(`trips.${key}.location`),
      duration: t(`trips.${key}.duration`),
      discountAmount: t(`trips.${key}.discountAmount`),
      itinerary: [
        {
          day: t(`trips.${key}.itinerary.day1.title`),
          activities: trip.itineraryIcons.day1.map((icon, i) => ({
            icon,
            text: t(`trips.${key}.itinerary.day1.activities.${i}`),
          })),
        },
        {
          day: t(`trips.${key}.itinerary.day2.title`),
          activities: trip.itineraryIcons.day2.map((icon, i) => ({
            icon,
            text: t(`trips.${key}.itinerary.day2.activities.${i}`),
          })),
        },
        {
          day: t(`trips.${key}.itinerary.day3.title`),
          activities: trip.itineraryIcons.day3.map((icon, i) => ({
            icon,
            text: t(`trips.${key}.itinerary.day3.activities.${i}`),
          })),
        },
      ],
      guarantees: [
        {
          title: t(`trips.${key}.guarantees.food.title`),
          items: [
            t(`trips.${key}.guarantees.food.items.0`),
            t(`trips.${key}.guarantees.food.items.1`),
          ],
        },
        {
          title: t(`trips.${key}.guarantees.sleep.title`),
          items: [
            t(`trips.${key}.guarantees.sleep.items.0`),
            t(`trips.${key}.guarantees.sleep.items.1`),
          ],
        },
        {
          title: t(`trips.${key}.guarantees.cancellation.title`),
          items: [
            t(`trips.${key}.guarantees.cancellation.items.0`),
            t(`trips.${key}.guarantees.cancellation.items.1`),
          ],
        },
        {
          title: t(`trips.${key}.guarantees.safety.title`),
          items: [
            t(`trips.${key}.guarantees.safety.items.0`),
            t(`trips.${key}.guarantees.safety.items.1`),
          ],
        },
      ],
    };
  };

  const trips = dummyTrips.map(getTripData);
  const selectedTrip = trips.find(trip => trip._id === selectedTripId) || trips[0];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingSkeleton t={t} />;

  return (
    <div className=" bg-black min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 space-y-10">

        <AnimatePresence mode="wait">
          {selectedTrip && (
            <motion.div
              key={selectedTripId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Hero Image Card */}
              <div className="relative h-[260px] md:h-[420px] rounded-3xl md:rounded-[40px] overflow-hidden border border-[#F47A1F]/30 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <img
                  src={selectedTrip.image}
                  alt={selectedTrip.title}
                  className="w-full h-full object-cover scale-[1.02]"
                />


                <div className="absolute bottom-4 left-4 right-4 md:bottom-auto md:top-6 md:left-auto md:right-6 flex flex-col gap-3 md:items-end">
                  {/* Title Badge */}
                  <div className="font-heading bg-black/20 md:bg-white/10 backdrop-blur-md border border-[#F47A1F] text-white px-4 md:px-10 py-2 rounded-2xl md:rounded-full font-bold text-base md:text-xl shadow-[0_0_20px_rgba(244,122,31,0.2)] w-fit max-w-full">
                    {selectedTrip.title}
                  </div>

                  {/* Meta Tags */}
                  <div className="flex gap-2 md:gap-3 flex-wrap md:justify-end">
                    <span className="font-heading bg-gradient-to-r from-[#FDAE53] to-[#F47A1F] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-base font-bold shadow-[0_0_10px_rgba(244,122,31,0.5)]">
                      {selectedTrip.duration}
                    </span>


                    <span className="bg-black/20 md:bg-white/10 backdrop-blur-md border border-[#F47A1F] text-white px-3 md:px-4 py-1 rounded-full text-xs md:text-base font-medium">
                      {selectedTrip.location}
                    </span>
                  </div>
                </div>


              </div>

              {/* Itinerary Grid (Day 1 & 2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedTrip.itinerary.slice(0, 2).map((day, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className=" border border-[#F47A1F] rounded-3xl pt-3  p-6 md:p-8  relative bg-gradient-to-b  from-[#2A1608] via-[#1C0F07] to-[#120A05] shadow-[0_0_40px_rgba(244,122,31,0.15)]" >
                    <div className="font-heading absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FDAE53] to-[#F47A1F] text-white border border-[#F47A1F] shadow-[0_0_25px_rgba(244,122,31,0.6)] px-8 py-1.5 rounded-full font-bold text-base md:text-lg whitespace-nowrap">
                      {day.day}
                    </div>
                    <ul className="mt-6 space-y-5">
                      {day.activities.map((act, i) => (
                        <li key={i} className="flex gap-3 text-base md:text-lg leading-relaxed">
                          <span className="text-[#F47A1F] font-black text-lg mt-0.5">•</span>
                          <div className="text-white font-medium">{renderStyledText(act.text)}</div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Day 3 (Full Width Card) */}
              {selectedTrip.itinerary[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border border-[#F47A1F] rounded-3xl p-6 md:p-8 relative bg-gradient-to-b from-[#2A1608] via-[#1C0F07] to-[#120A05] shadow-[0_0_40px_rgba(244,122,31,0.15)]"
                >
                  <div
                    className=" font-heading absolute -top-4 left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FDAE53] to-[#F47A1F] text-white border border-[#F47A1F] shadow-[0_0_25px_rgba(244,122,31,0.6)] px-12 md:px-16  py-1.5 rounded-full font-bold text-base md:text-lg whitespace-nowrap ">
                    {selectedTrip.itinerary[2].day}
                  </div>

                  <ul className="mt-6 space-y-5">
                    {selectedTrip.itinerary[2].activities.map((act, i) => (
                      <li key={i} className="flex gap-3 text-base md:text-lg leading-relaxed">
                        <span className="text-[#F47A1F] font-black text-lg mt-0.5">•</span>
                        <div className="text-white font-medium">{renderStyledText(act.text)}</div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Gathering Point Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-[#F47A1F] rounded-3xl p-6 md:p-8 bg-gradient-to-b from-[#2A1608] via-[#1C0F07] to-[#120A05] shadow-[0_0_35px_rgba(244,122,31,0.15)]"
              >
                <div className="flex justify-center">
                  <div className="inline-block px-8 py-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {t("gatheringPoints")}
                    </h3>
                  </div>
                </div>

                <div className="space-y-5 max-w-4xl mx-auto">
                  {[
                    { label: t("gatheringLocation1"), time: t("gatheringTime1"), url: t("locationUrl1") },
                    { label: t("gatheringLocation2"), time: t("gatheringTime2"), url: t("locationUrl2") },
                  ].map((item, index) => {
                    const hasLocationUrl =
                      typeof item.url === "string" &&
                      /^https?:\/\//.test(item.url);

                    return (
                    <div key={index} className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <MapPin className="text-[#F47A1F] w-6 h-6 shrink-0" />
                        <span className="text-white font-medium text-base md:text-lg">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between flex-1">
                        <div className="flex items-center gap-2">
                          <Clock className="text-[#F47A1F] w-5 h-5" />
                          <span className="text-white font-medium text-base md:text-lg">
                            {item.time}
                          </span>
                        </div>
                        {hasLocationUrl && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-[#F47A1F]/20 hover:bg-[#F47A1F]/40 transition-colors text-white px-4 md:px-5 py-2 rounded-full border border-[#F47A1F] hover:border-[#F47A1F]"
                          >
                            <LinkIcon size={14} className="flex-shrink-0" />
                            <span className="font-medium text-sm">{t("Location")}</span>
                          </a>
                        )}
                      </div>
                    </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Image */}
              <div className="relative w-full h-[200px] md:h-[500px] rounded-3xl overflow-hidden -mt-4">
                <Image
                  src="/moucup4.png"
                  className="object-contain"
                  alt="PhotoGrid"
                  fill
                  sizes="500vw"
                />
              </div>

              {/* Booking Section */}
              {selectedTrip.bookingSteps && (
                <div className="space-y-6">
                  {/* Important Note Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border border-[#F47A1F]/40 rounded-3xl p-6 bg-gradient-to-br from-[#F47A1F]/20 to-[#F47A1F]/5 backdrop-blur-md"
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <AlertCircle className="w-6 h-6 text-[#F47A1F]" />
                      <span className="font-heading text-[#F47A1F] font-bold text-lg md:text-xl">
                        {t("importantNoteTitle")}
                      </span>
                    </div>
                    <p className="text-white font-medium text-center text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                      {t("importantNote")}
                    </p>
                  </motion.div>


                  {/* Booking Details Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border border-[#F47A1F]/40 rounded-3xl overflow-hidden bg-gradient-to-b from-[#F47A1F]/15 to-[#F47A1F]/5"
                  >
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-[#FDAE53] to-[#F47A1F] py-3 text-center">
                      <h3 className="text-white text-lg md:text-xl font-bold">
                        {t("title").replace(/\*/g, "")}
                      </h3>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                      {/* Payment Info */}
                      <div className="space-y-4 text-center">
                        <div className="text-white/90 text-base md:text-lg leading-relaxed font-medium">
                          {renderStyledText(t("paymentInfo"))}
                        </div>
                        <div className="inline-block bg-[#F47A1F]/20 px-6 py-2 border border-[#F47A1F]/30 text-[#F47A1F] font-bold text-sm md:text-base">
                          {renderStyledText(t("paymentMethods"))}
                        </div>
                      </div>

                      <hr className="border-[#F47A1F]/20 w-1/2 mx-auto" />

                      {/* Notices Section */}
                      <div className="space-y-5">
                        <div className="flex justify-center">
                          <div className="inline-block bg-gradient-to-r from-[#FDAE53] to-[#F47A1F]  text-black border border-[#F47A1F]  rounded-full px-6 py-2 ">
                            <h3 className="text-base md:text-lg font-bold text-white">
                              {t("noticeTitle").replace(/\*/g, "")}
                            </h3>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {t.raw("notices")?.map((item, idx) => (
                            <div key={idx} className="flex gap-3 items-start bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-[#F47A1F]/30 transition-colors">
                              <span className="font-sans bg-[#F47A1F] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 text-sm">
                                {idx + 1}
                              </span>
                              <span className="font-sans text-white/90 text-sm md:text-base leading-relaxed font-medium">
                                {renderStyledText(item)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Booking CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8"
                  >
                    <motion.a
                      href="#booking"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#F47A1F] to-[#FFB85C] text-white py-4 rounded-full shadow-xl shadow-[#F47A1F]/20 flex flex-col items-center justify-center gap-1 transition-all"
                    >
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center"
                      >
                        <span className="flex items-center gap-3 font-bold text-lg md:text-xl">
                          <MessageCircle size={24} strokeWidth={2.5} />
                          {t("bookingButton")}
                        </span>
                        <div className="flex items-center gap-2 opacity-90">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40"></span>
                          <span className="text-black/70 text-xs md:text-sm font-medium">
                            {t("limitedSpots")}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40"></span>
                        </div>
                      </motion.div>
                    </motion.a>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LoadingSkeleton = ({ t }) => (
  <div className="min-h-screen bg-black flex items-center justify-center" dir="rtl">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#F47A1F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[#F47A1F] font-bold">{t ? t("loading") : "جاري التحميل..."}</p>
    </div>
  </div>
);

export default DesertTrip;