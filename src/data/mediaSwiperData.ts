type MediaItem = {
  type: "video" | "image";
  video?: string;
  image?: string;
  imageMobile?: string;
  poster?: string;
};

type MediaGallery = {
  media: MediaItem[];
};

export const afterHero: MediaGallery = {
  media: [
    {
      type: "image",
      image: "/hero.png",
    },
  ],
};

export const hotelGallery: MediaGallery = {
  media: [
    { type: "image", image: "/hotel/hotel1.jpg", imageMobile: "/hotel1.jpg" },
    { type: "image", image: "/hotel/hotel2.jpg", imageMobile: "/hotel2.jpg" },
    { type: "image", image: "/hotel/hotel3.jpg", imageMobile: "/hotel3.jpg" },
    { type: "image", image: "/hotel4.jpg", imageMobile: "/hotel4.jpg" },
  ],
};
