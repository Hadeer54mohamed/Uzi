"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

// WhatsApp Icon Component
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
import { dummyTrips } from "@/lib/dummyTrips";

const PriceAction = () => {
  const t = useTranslations("priceAction");
  const tTrip = useTranslations("desertTrip");
  const tTripForYou = useTranslations("tripForYou");

  // Get trip data
  const trip = dummyTrips[0];
  const tripKey = trip.translationKey;

  const phoneNumber = "201069836767";
  const tripTitle = tTrip(`trips.${tripKey}.title`);
  const message = tTrip("whatsappMessage", { title: tripTitle });
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const askQuestionMessage = t("askQuestionMessage");
  const askQuestionUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(askQuestionMessage)}`;

  const afterBookingItems = [
    { key: "contact", text: t("afterBooking.contact") },
    { key: "details", text: t("afterBooking.details") },
    { key: "cancel", text: t("afterBooking.cancel") },
  ];

  return (
    <section className="relative h-full min-h-[320px] md:min-h-[400px]" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F47A1F]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#F47A1F]/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full h-full relative z-10 flex flex-col justify-center">
        <div className="w-full space-y-6 md:space-y-8">
           {/* Bedouin Message Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto" 
         
        >
         
        </motion.div>
        
          {/* Price Card */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
  className="bg-gradient-to-r from-[#FDAE53] to-[#F47A1F] rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-[#F47A1F]/30"
>
  {/* Glow Effect */}
  <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 blur-[60px]" />
  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 blur-[60px]" />

  <div className="relative z-10 text-center space-y-5">
    {/* Discount Badge */}
    <div className="inline-block mx-auto px-6 py-2 border border-white/30 rounded-full text-2xl font-black bg-gradient-to-r from-[#FDAE53] to-[#F47A1F] text-white">
      {tTrip("discount")} {tTrip(`trips.${tripKey}.discountAmount`)}
    </div>

    {/* Coupon Code */}
    <p className="text-white font-black text-lg">
      {tTrip("useCode")} <span className="underline">{trip.discountCode}</span>
    </p>

    {/* Small Note */}
    <p className="text-lg font-bold text-white">
      {tTrip("priceAfterDiscount")}
    </p>

    {/* Price */}
    <div className="text-5xl md:text-6xl font-black text-white">
      {trip.price}
      <span className="text-xl font-bold text-white/80 mr-2">{tTrip("currency")}</span>
    </div>

    {/* Old Price */}
    <div className="text-xl font-black text-white line-through">
      {tTrip("insteadOf")} {trip.originalPrice} {tTrip("currency")}
    </div>

    {/* Foreigner Price */}
    <div className="pt-4 mt-4 border-t border-white/20">
      <p className="text-white font-bold text-xl mb-2">{tTrip("foreignerPriceLabel")}</p>
      <div className="text-4xl md:text-5xl font-black text-white">
        {tTrip("foreignerPrice")}
      </div>
    </div>

  
  </div>
</motion.div>
  </div>
      </div>
    </section>
  );
};

export default PriceAction;
