"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dummyTrips } from "@/lib/dummyTrips";
import { MessageCircle, MapPin, Clock, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const DesertTrip = () => {
  const t = useTranslations("desertTrip");
  const [selectedTripId, setSelectedTripId] = useState(dummyTrips[0]?._id);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to render text with *bold* parts (white text, bold 900 for highlighted)
  const renderStyledText = (text) => {
    if (!text || !text.includes("*")) {
      return <span className="font-[700]">{text}</span>;
    }
    const parts = text.split(/\*([^*]+)\*/);
    return (
      <span>
        {parts.map((part, idx) =>
          idx % 2 === 1 ? (
            <span key={idx} className="font-[900]">
              {part}
            </span>
          ) : (
            <span key={idx} className="font-[700]">
              {part}
            </span>
          )
        )}
      </span>
    );
  };

  // Helper function to get translated trip data
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

  // Get translated trips (recalculated when t changes - i.e., when language changes)
  const trips = dummyTrips.map(getTripData);
  const selectedTrip = trips.find(trip => trip._id === selectedTripId) || trips[0];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingSkeleton t={t} />;

  return (
    <div className="py-8 relative" dir="rtl">
      <div className="container mx-auto px-4 lg:px-6 relative z-10">


        <AnimatePresence mode="wait">
          {selectedTrip && (
            <motion.div
              key={selectedTripId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5"
            >
              {/* Hero Image */}
              <div className="relative h-[220px] sm:h-[280px] md:h-[400px] rounded-2xl overflow-hidden border border-[#F47A1F]/20 shadow-xl shadow-[#F47A1F]/10">
                <img src={selectedTrip.image} className="w-full h-full object-cover" alt={selectedTrip.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute top-0 left-0 w-10 h-10 sm:w-16 sm:h-16 border-t-2 border-l-2 border-[#F47A1F]/30 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-10 h-10 sm:w-16 sm:h-16 border-t-2 border-r-2 border-[#F47A1F]/30 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-16 sm:h-16 border-b-2 border-l-2 border-[#F47A1F]/30 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-16 sm:h-16 border-b-2 border-r-2 border-[#F47A1F]/30 rounded-br-2xl" />
                <div className="absolute bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-6 text-white">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-4 py-1.5 rounded-full text-base sm:text-lg font-bold bg-gradient-to-r from-[#F47A1F] to-[#FFB85C]">{selectedTrip.duration}</span>
                    <span className="px-4 py-1.5 rounded-full text-base sm:text-lg font-bold bg-black/60 backdrop-blur-md border border-[#F47A1F]/30">{selectedTrip.location}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F7FA]">{selectedTrip.title}</h1>
                </div>
              </div>

              {/* نقطة التجمع */}
              <div className="bg-black/90 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5">
                <h3 className="text-3xl font-bold text-fire mb-4 text-center">{t("gatheringPoints")}</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3 bg-[#F47A1F]/10 rounded-xl p-4 flex-1">
                    <MapPin className="w-7 h-7 text-[#F47A1F]" />
                    <span className="text-white font-bold text-xl">{t("gatheringLocation")}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-[#F47A1F]/10 rounded-xl p-4 flex-1">
                    <Clock className="w-7 h-7 text-[#F47A1F]" />
                    <span className="text-white font-bold text-xl">{t("gatheringTime")}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5 order-2">
                <h3 className="text-4xl font-black text-fire text-center">{t("tripProgram")}</h3>
                <div className="space-y-4">
                  {selectedTrip.itinerary?.map((day, idx) => (
                    <div key={idx} className="border border-[#F47A1F]/20 bg-black/80 rounded-xl p-5 backdrop-blur-sm">
                      <h4 className="text-[#F47A1F] font-black text-2xl mb-4 border-b border-[#F47A1F]/20 pb-3">
                        {day.day}
                      </h4>
                      <div className="space-y-4 pr-4 border-r-2 border-[#F47A1F]/30">
                        {day.activities?.map((act, i) => {
                          // Check if activity has sub-items (separated by |)
                          if (act.text.includes('|')) {
                            const parts = act.text.split('|');
                            const title = parts[0];
                            const subItems = parts.slice(1);
                            return (
                              <div key={i} className="text-white text-lg">
                                <div className="flex gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#F47A1F] mt-2.5 flex-shrink-0"></span>
                                  {renderStyledText(title)}
                                </div>
                                <div className="pr-6 mt-3 space-y-2.5">
                                  {subItems.map((item, j) => (
                                    <div key={j} className="flex gap-2 items-start">
                                      <span className="w-2 h-2 rounded-full bg-white/60 flex-shrink-0 mt-2.5"></span>
                                      <span className="font-medium">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          return (
                            <div key={i} className="flex gap-2 text-white text-lg">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#F47A1F] mt-2.5 flex-shrink-0"></span>
                              {renderStyledText(act.text)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* طريقة الحجز */}
              {selectedTrip.bookingSteps && (
                <div className="bg-black/90 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-5">

                  {/* ملاحظة */}
                  <div className="py-5 px-6 bg-gradient-to-r from-[#FFB85C]/10 to-[#F47A1F]/10 border border-[#F47A1F]/30 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <AlertCircle className="w-7 h-7 text-[#F47A1F]" />
                      <span className="text-[#F47A1F] font-black text-2xl">
                        {t("importantNoteTitle")}
                      </span>
                    </div>
                    <p className="text-white font-medium text-center text-lg leading-relaxed">
                      {t("importantNote")}
                    </p>
                  </div>

                  {/* قسم الحجز والدفع */}
                  <div className="mt-6 bg-black/60 border border-[#F47A1F]/20 rounded-xl p-5 space-y-5">
                    <h3 className="text-[#F47A1F] text-2xl font-[900] text-center">
                      {t("title").replace(/\*/g, "")}
                    </h3>

                    <div className="space-y-3 text-white text-lg leading-relaxed text-center">
                      <p>{renderStyledText(t("paymentInfo"))}</p>
                      <p>{renderStyledText(t("paymentMethods"))}</p>
                    </div>

                    <hr className="border-[#F47A1F]/20" />

                    <h3 className="text-[#F47A1F] text-2xl font-[900] text-center">
                      {t("noticeTitle").replace(/\*/g, "")}
                    </h3>

                    <div className="space-y-3 text-white text-lg pr-4">
                      {t.raw("notices")?.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <span className="text-[#F47A1F] font-[900] text-xl mt-0.5">
                            {idx + 1}/
                          </span>
                          <span>{renderStyledText(item)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 w-full"
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
              )}


            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LoadingSkeleton = ({ t }) => (
  <div className="min-h-[40vh] flex items-center justify-center" dir="rtl">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-[#F47A1F]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#F47A1F]" />
      </motion.div>
      <p className="text-2xl font-bold text-[#F5F7FA]">{t ? t("loading") : "جاري التحميل..."}</p>
    </motion.div>
  </div>
);

export default DesertTrip;
