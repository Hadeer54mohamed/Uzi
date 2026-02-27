"use client";

import Hero from "@/components/home/Hero";
import FAQ from "@/components/home/FAQ";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";
import AboutBedouin from "@/components/home/AboutBedouin";
import DesertTrip from "@/components/home/DesertTrip";
import MediaSwiper from "@/components/MediaSwiper";
import { hotelGallery } from "@/data/mediaSwiperData";
import ReviewsVideos from "@/components/home/ReviewsVideos";
import TripForYou from "@/components/home/TripForYou";
import PriceAction from "@/components/home/PriceAction";
import ContactForm from "@/components/home/ContactForm";
import Image from "next/image";

const Home = () => {

  return (
    <>

      <div className="min-h-screen relative z-10 w-full overflow-x-hidden">
        <Navbar transparent />
        <Hero />
        <div className="bg-black">

          <div className="md:hidden">
            <TripForYou />
          </div>

          <div className="md:hidden px-4 py-6">
            <div className="relative w-full h-[250px] rounded-3xl overflow-hidden">
              <Image
                src="/moucup3.png"
                className="w-full h-full object-cover"
                alt="PhotoGrid"
                fill
                sizes="100vw"
              />
            </div>
          </div>

          <div className="md:hidden">
            <AboutBedouin />
          </div>

          <div className="hidden md:flex md:flex-row md:items-stretch">
            <div className="w-1/3 flex">
              <TripForYou />
            </div>
            <div className="w-2/3 flex">
              <AboutBedouin />
            </div>
          </div>

          <div className="hidden md:block px-6 py-10">
            <div className="relative w-full h-[400px] lg:h-[450px] rounded-3xl overflow-hidden max-w-5xl mx-auto">
              <Image
                src="/moucup3.png"
                className="w-full h-full object-cover"
                alt="PhotoGrid"
                fill
                sizes="80vw"
              />
            </div>
          </div>
        </div>
        <SectionDivider />

        <DesertTrip />
        <div className="flex flex-col md:flex-row md:flex-nowrap md:items-stretch w-full container mx-auto px-4 gap-4 md:gap-3">
          <div className="w-full md:w-1/2 md:min-w-0 flex flex-col md:overflow-hidden">
            <MediaSwiper
              customMedia={hotelGallery}
              height="h-[400px] md:h-[460px]"
              className="w-full flex-1 min-h-0 pt-8 md:max-w-full"
              objectFit="cover"
              intervalDefault={5}
            />
          </div>
          <div className="w-full md:w-1/2 md:min-w-0 flex flex-col md:h-full">
            <PriceAction />
          </div>
        </div>
        <ContactForm />

        <ReviewsVideos
          id="reviews"
          videos={[
            { id: "QViYDcYGl34" },
            { id: "-aUqfhZNjPQ" },
            { id: "hkvlJHJEeHs" },
            { id: "jIYepfj2xZk" },
            { id: "qBw1QuRwz_o" },
            { id: "GzfxsGQc1LA" },
            { id: "mmtSc1TVgN4" },
            { id: "kUQyvODbExY" },
            { id: "yeYdMzvLTXk" },
            { id: "jdI3GoGe9XI" },
            { id: "i4w2WfMh-fw" },
            { id: "teb8R0GzsZY" },
            { id: "I6bBE2nX3o4" },
            { id: "yYJvqp7E7Fc" },
            { id: "va6gEAnAF8s" },
            { id: "9gBoQJT9FdY" },
            { id: "WnfyS2w89Eo" },
            { id: "hwMn050Og5c" },
            { id: "7asO-BWZZ0w" },
            { id: "59R8g9EeNeQ" },
            { id: "CserZezSSew" },
          ]} />

        <FAQ />
        
        <Footer />
      </div>
    </>
  );
};

export default Home;
