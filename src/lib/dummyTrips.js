// Trip data with only non-translatable values
// Text content is handled via translations in messages/ar.json and messages/en.json

export const dummyTrips = [
  {
    _id: "white-desert-premium",
    slug: "white-desert-premium",
    translationKey: "white-desert-premium",
    image: "/trip-desert.jpg", 
    
    // Prices and discounts (numbers only)
    price: 6499,
    originalPrice: 9800,
    discountCode: "farfra26",

    // Booking info
    bookingSteps: {
      deposit: "25%",
      method: "InstaPay أو Vodafone Cash",
      number: "01011879549",
      accountName: "ساهر عابد عمر سيد",
    },

    // Day icons for itinerary
    itineraryIcons: {
      day1: ["🕳️", "🍳", "🚙", "🌅", "🔥"],
      day2: ["🌅", "🚐", "🏨", "🍽️", "🏛️", "🌿", "🎨", "🎶"],
      day3: ["🍳", "💎", "☕", "🌋", "🛍️", "🏠"],
    },

    // Gathering icons
    gatheringIcons: ["📍", "🚐", "⛽"],
  },
];
