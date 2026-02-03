"use client";

import { useTranslations } from "next-intl";

const TripInstructions = () => {
  const t = useTranslations("instructions");
  const items = t.raw("items");

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

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-[#F47A1F]/20 rounded-2xl p-6 space-y-6 container mx-auto my-8">

      <h3 className="text-[#F47A1F] text-3xl font-[900] text-center">
        {t("title").replace(/\*/g, "")}
      </h3>

      <div className="space-y-4 text-white text-lg text-center">
  {items?.map((item, idx) => (
    <div
      key={idx}
      className="flex gap-3 items-start justify-center"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-[#F47A1F] mt-3 flex-shrink-0"></span>
      <span className="max-w-[700px]">
        {renderStyledText(item)}
      </span>
    </div>
  ))}
</div>

    </div>
  );
};

export default TripInstructions;
