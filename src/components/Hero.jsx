'use client';
import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { ReserveButton } from './reserve-button';

// Icon component for contact details
const InfoIcon = ({ type }) => {
    const icons = {
        website: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        ),
        calender: (
           <CalendarIcon className="h-5 w-5 text-primary" />
        ),
        address: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
    };
    return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};


// Prop types for the HeroSection component

const HeroSection = React.forwardRef(
  ({ className, logo, slogan, title, subtitle, callToAction, videoUrl, contactInfo, ...props }, ref) => {
    
    // Convert YouTube URL to embed URL
    const getYouTubeEmbedUrl = (url) => {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&\n?#]+)/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1` : '';
    };

    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    // Animation variants for individual text/UI elements
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };
    
    return (
      <motion.section
        ref={ref}
        className={cn(
          "drop-shadow-2xl bg-black sm:bg-[#edf6e1]  relative flex w-full flex-col overflow-hidden  text-foreground md:flex-row",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...props}
      >
        {/* Max-width container for content */}
        <div className="relative z-10 mx-auto w-full max-w-screen-2xl md:flex md:items-stretch">
          {/* Left Side: Content */}
          <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16">
              {/* Top Section: Logo & Main Content */}
              <div>
                  {/* <motion.header className="mb-12" variants={itemVariants}>
                      {logo && (
                          <div className="flex items-center">
                              <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />
                              <div>
                                  {logo.text && <p className="text-lg font-bold text-foreground">{logo.text}</p>}
                                  {slogan && <p className="text-xs tracking-wider text-muted-foreground">{slogan}</p>}
                              </div>
                          </div>
                      )}
                  </motion.header> */}

                  <motion.main variants={containerVariants}>
                      <motion.h1 className="text-4xl font-bold  text-white sm:text-black md:text-5xl" variants={itemVariants}>
                          3<sup>rd</sup> International Conference on <br />
                          <span className="text-primary">Sustainability, Innovation, and Future Technologies</span>
                      </motion.h1>
                      <motion.div className="my-2 h-1 w-20 bg-primary" variants={itemVariants}></motion.div>
                      <motion.p className="mb-8 max-w-md text-base  text-white sm:text-black  " variants={itemVariants}>
                        Sustainable Innovation: Bridging Technology and Environmental Stewardship                      </motion.p>
                      <div className='flex flex-col sm:flex-row gap-3'>
                     <Link href="/registration" >
                      <Button className=" bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full w-full">Register Now</Button>
                    </Link>
                      <Link href="/submission" >
                      <Button className=" bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full w-full ">Submit Paper</Button>
                    </Link>
                    {/* <ReserveButton className={'bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full'}/> */}
                      </div>

                  </motion.main>

              </div>
 <div className="flex flex-wrap gap-3 mt-2   py-4 rounded-3xl ">
              <img
                src="/assets/scopus.png"
                alt=""
                className="h-8 drop-shadow-lg "
              />
              <img
                src="/assets/clarivate.png"
                alt=""
                className="h-8 drop-shadow-sm md:bg-white rounded-3xl"
              />
              {/* <img
                src="assets/cpd2.png"
                alt=""
                className="h-30  drop-shadow-lg mx-auto"
              /> */}
              <img
                src="assets/zepresearch.png"
                alt=""
                className="h-8 drop-shadow-lg"
              />
            </div>
              {/* Bottom Section: Footer Info */}
              <motion.footer className="mt-6 w-full" variants={itemVariants}>
                  <div className="flex flex-col text-white sm:text-black sm:flex-row items-start md:items-center gap-6 text-xs text-muted-foreground ">
                      <div className="flex  items-center">
                          <InfoIcon type="website" />
                          <span>Hybrid Conference</span>
                      </div>
                      <div className="flex items-center">
                          <InfoIcon type="address" />
                          <span>Boracay, Philippines</span>
                      </div>
                      <div className="flex items-center">
                          <InfoIcon type="calender" />
                          <span>August 21<sup>st</sup> - 22<sup>nd</sup>, 2026</span>
                      </div>
                  </div>
              </motion.footer>
          </div>
        </div>

        {/* Right Side: Video Background (Full Width) */}
        <motion.div 
          className="absolute right-0 top-0 h-full w-full md:w-1/2 lg:w-2/4 min-h-[300px] md:min-h-full overflow-hidden"
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.2, ease: "circOut" }}
        >
          {/* YouTube Video Embed - CONTAIN mode (shows full video) */}
          <iframe
            className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain"
            src={getYouTubeEmbedUrl(videoUrl)}
            allow="autoplay; encrypted-media"
            frameBorder="0"
            title="Hero Video"
          />
          
          {/* Gradient Overlay on edges for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 md:from-black" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };