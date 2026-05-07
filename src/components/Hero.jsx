'use client';
import { ArrowUpRight, Ticket } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CONFERENCE } from "@/constants/conference";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex h-[60svh] sm:min-h-[850px] h-full items-end justify-center overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/earth.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20" />

      {/* Noise texture */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full z-[1] opacity-5"
        aria-hidden="true"
      >
        <filter id="noise-hero">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-hero)" />
      </svg>

      {/* Top-right system tag */}

      <div className="absolute top-6 right-6 z-20 px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-white border border-white/60 bg-black text-center ">
        EARLY BIRD DISCOUNT IS AVAILABLE <br />
        <Link href="/registration" className="underline underline-offset-4 font-bold text-red-400">
          Book your ticket now <Ticket className="inline-block w-4 h-4 ml-1" />
        </Link>
      </div>
      {/* Main content */}
      <div className="relative z-10 w-full max-w-screen-xl px-6 md:px-10 pb-16 md:py-12">

        {/* Top label */}
        <p className="mb-6 font-semibold font-mono text-xs text-green-600 tracking-widest uppercase">
          {CONFERENCE.shortForm} {CONFERENCE.year}
        </p>

        {/* Hairline divider */}
        <div className="border-t border-white/70 mb-8" />

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

          {/* Left: Title + Meta */}
          <div className="max-w-3xl space-y-8">
            <h1 className="leading-none text-white text-5xl sm:text-7xl">
              {CONFERENCE.name}
            </h1>

            <p className="text-white">
              Sustainable Innovation: Bridging Technology and Environmental Stewardship
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-0 border-t border-b border-white/50">
              {[CONFERENCE.date, CONFERENCE.venue?.location, CONFERENCE.type].map((item, i) => (
                <div
                  key={i}
                  className={`px-5 py-3 text-[10px] font-medium tracking-[0.25em] uppercase text-white ${i < 2 ? 'border-r border-white/40' : ''}`}
                >
                  {item}
                </div>
              ))}
            </div>
             <div className="flex flex-wrap gap-0 border-t border-b border-white/50">
              {["/assets/clarivate.png", "/assets/scopus.png", "/assets/zepresearch.png"].map((item, i) => (
                <div
                  key={i}
                  className={`px-5 py-3 text-[10px] font-medium tracking-[0.25em] uppercase bg-white text-white/70 ${i < 2 ? 'border-r border-black' : ''}`}
                >
                  <Image src={item} alt={`Logo ${i}`} width={100} height={24} className="h-6 object-contain" />
                </div>
              ))}
            </div>
            <div className="border-t border-b border-white/50 border-white">
              <p className='px-5 py-3 text-[11px] font-medium tracking-[0.25em] text-white'>ISBN Number : <span className='font-bold text-green-400'>978-81-996400-0-9</span></p>
            </div>
          </div>

          {/* Right: Avatars + CTA */}
          <div className="flex flex-col gap-8 lg:items-end">

            {/* Avatars */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar
                    key={i}
                    className="size-11 transition-all duration-300 border border-green-500/60"
                  >
                    <AvatarImage src={`https://images.cnippet.dev/image/upload/v1770400411/a${i + 1}.jpg`} />
                    <AvatarFallback className="font-mono text-[10px] bg-[#111] text-green-500">
                      U{i}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="font-mono">
                <p className="text-base font-medium text-white tracking-tight">150+</p>
                <p className="text-[9px] font-medium tracking-[0.3em] uppercase text-white/35">
                  Researchers
                </p>
              </div>
            </div>

<div className="gap-3">
            {/* CTA Button */}
            <Link href="/submission">
            <button className="group flex items-center gap-0 transition-all duration-300 text-sm font-bold   bg-transparent border-none cursor-pointer p-0">
              <span
                className="px-6 py-4 bg-white text-black transition-all duration-300 hover:bg-green-700 hover:text-white"
              >
                Submit Paper
              </span>
              <div className="relative flex items-center justify-center overflow-hidden transition-all duration-300 w-[52px] h-[52px] bg-green-500 hover:bg-green-600 flex-shrink-0">
                <ArrowUpRight
                  className="absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 group-hover:-translate-y-8 text-white w-[18px] h-[18px]"
                />
                <ArrowUpRight
                  className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 text-white w-[18px] h-[18px]"
                />
              </div>
            </button>
            </Link>
              <Link href="/registration">
            <button className="group mt-0.5 flex items-center gap-0 transition-all duration-300 text-sm font-bold   bg-transparent border-none cursor-pointer p-0">
               <div className="relative flex items-center justify-center overflow-hidden transition-all duration-300 w-[52px] h-[52px] bg-green-500 hover:bg-green-600 flex-shrink-0">
                <ArrowUpRight
                  className="absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 group-hover:-translate-y-8 text-white w-[18px] h-[18px]"
                />
                <ArrowUpRight
                  className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 text-white w-[18px] h-[18px]"
                />
              </div>
              <span
                className="px-6 py-4 bg-white text-black transition-all duration-300 hover:bg-green-700 hover:text-white"
              >
                Regsiter Now
              </span>
                
            </button>
            </Link>      
</div>
          </div>
        </div>

        {/* Bottom hairline with index tag */}
        <div className="mt-12 flex justify-between items-center border-t border-white/70 pt-4">
          <span className="font-mono text-[9px] tracking-[0.35em] text-white/70 uppercase">
            STATUS_OPEN · SUBMISSIONS_LIVE
          </span>
          <span className="font-mono text-[9px] tracking-[0.35em] text-white/70 uppercase">
            SYS_01 · GRID_A
          </span>
        </div>

      </div>
    </section>
  );
}













// 'use client';
// import React from 'react';
// import { cn } from "@/lib/utils";
// import { motion } from 'framer-motion';
// import { CalendarIcon } from 'lucide-react';
// import Link from 'next/link';
// import { Button } from './ui/button';
// import { ReserveButton } from './reserve-button';

// // Icon component for contact details
// import { CONFERENCE } from "@/constants/conference"

// const InfoIcon = ({ type }) => {
//   const icons = {
//     website: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
//         <circle cx="12" cy="12" r="10"></circle>
//         <line x1="2" x2="22" y1="12" y2="12"></line>
//         <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
//       </svg>
//     ),
//     calender: (
//       <CalendarIcon className="h-5 w-5 text-primary" />
//     ),
//     address: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
//         <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
//         <circle cx="12" cy="10" r="3"></circle>
//       </svg>
//     ),
//   };
//   return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
// };


// // Prop types for the HeroSection component

// const HeroSection = React.forwardRef(
//   ({ className, logo, slogan, title, subtitle, callToAction, videoUrl, contactInfo, ...props }, ref) => {

//     // Convert YouTube URL to embed URL
//     const getYouTubeEmbedUrl = (url) => {
//       const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&\n?#]+)/)?.[1];
//       return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1` : '';
//     };

//     // Animation variants for the container to orchestrate children animations
//     const containerVariants = {
//       hidden: { opacity: 0 },
//       visible: {
//         opacity: 1,
//         transition: {
//           staggerChildren: 0.15,
//           delayChildren: 0.2,
//         },
//       },
//     };

//     // Animation variants for individual text/UI elements
//     const itemVariants = {
//       hidden: { y: 20, opacity: 0 },
//       visible: {
//         y: 0,
//         opacity: 1,
//         transition: {
//           duration: 0.5,
//           ease: "easeOut",
//         },
//       },
//     };

//     return (
//       <motion.section
//         ref={ref}
//         className={cn(
//           "drop-shadow-2xl bg-black sm:bg-[#edf6e1]  relative flex w-full flex-col overflow-hidden  text-foreground md:flex-row",
//           className
//         )}
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         {...props}
//       >
//         {/* Max-width container for content */}
//         <div className="relative z-10 mx-auto w-full max-w-screen-2xl md:flex md:items-stretch">
//           {/* Left Side: Content */}
//           <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16">
//             {/* Top Section: Logo & Main Content */}
//             <div>
//               {/* <motion.header className="mb-12" variants={itemVariants}>
//                       {logo && (
//                           <div className="flex items-center">
//                               <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />
//                               <div>
//                                   {logo.text && <p className="text-lg font-bold text-foreground">{logo.text}</p>}
//                                   {slogan && <p className="text-xs tracking-wider text-muted-foreground">{slogan}</p>}
//                               </div>
//                           </div>
//                       )}
//                   </motion.header> */}

//               <motion.main variants={containerVariants}>
//                 <motion.h1 className="text-4xl font-bold  text-white sm:text-black md:text-5xl" variants={itemVariants}>
//                   {CONFERENCE.name}
//                 </motion.h1>
//                 <motion.div className="my-2 h-1 w-20 bg-primary" variants={itemVariants}></motion.div>
//                 <motion.p className="mb-2 max-w-md text-base  text-white sm:text-black  " variants={itemVariants}>
//                   Sustainable Innovation: Bridging Technology and Environmental Stewardship    
//                   </motion.p>
//                   <div className='py-2 bg-amber-200 drop-shadow-xl px-7 border-2 border-primary rounded-lg mb-5 max-w-sm' variants={itemVariants}>
//                     <p className='text-xl'>ISBN Number : <span className='font-bold'>978-81-996400-0-9</span></p>
//                     </div> 
//                 <div className='flex flex-col sm:flex-row gap-3'>
//                   <Link href="/registration" >
//                     <Button className=" bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full w-full">Register Now</Button>
//                   </Link>
//                   <Link href="/submission" >
//                     <Button className=" bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full w-full ">Submit Paper</Button>
//                   </Link>

//                   <Link href="/proceedings" >
//                     <Button className=" bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full w-full ">Proceedings</Button>
//                   </Link>
//                   {/* <ReserveButton className={'bg-[#4d724d] hover:bg-[#3c5c3c] text-white rounded-full'}/> */}
//                 </div>

//               </motion.main>

//             </div>
//             <div className="flex flex-wrap gap-3 mt-2   py-4 rounded-3xl ">
//               <img
//                 src="/assets/scopus.png"
//                 alt=""
//                 className="h-8 drop-shadow-lg "
//               />
//               <img
//                 src="/assets/clarivate.png"
//                 alt=""
//                 className="h-8 drop-shadow-sm md:bg-white rounded-3xl"
//               />
//               {/* <img
//                 src="assets/cpd2.png"
//                 alt=""
//                 className="h-30  drop-shadow-lg mx-auto"
//               /> */}
//               <img
//                 src="assets/zepresearch.png"
//                 alt=""
//                 className="h-8 drop-shadow-lg"
//               />
//             </div>

//             {/* Early Bird Discount Box */}
//             <motion.div
//               className="mt-4 relative max-w-xl overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 p-1 shadow-lg"
//               variants={itemVariants}
//               animate={{
//                 boxShadow: [
//                   "0 0 20px rgba(251, 191, 36, 0.5)",
//                   "0 0 30px rgba(251, 191, 36, 0.8)",
//                   "0 0 20px rgba(251, 191, 36, 0.5)",
//                 ],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             >
//               <div className="bg-white rounded-xl p-4 relative">
//                 {/* Decorative corner element */}
//                 <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
//                   LIMITED
//                 </div>

//                 <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-1">
//                       <span className="text-2xl">🔥</span>
//                       <h3 className="text-lg font-bold text-gray-900">Early Bird Discount Active!</h3>
//                     </div>
//                     <p className="text-sm text-gray-600">
//                       Save up to <span className="font-bold text-orange-600">20%</span> on registration
//                     </p>
//                   </div>

//                   <Link href="/registration">
//                     <Button
//                       className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
//                     >
//                       Claim Now →
//                     </Button>
//                   </Link>
//                 </div>

//                 {/* Countdown or expiry text */}
//                 <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <span>Offer expires soon • Limited spots available</span>
//                 </div>
//               </div>
//             </motion.div>
//             {/* Bottom Section: Footer Info */}
//             <motion.footer className="mt-6 w-full" variants={itemVariants}>
//               <div className="flex flex-col text-white sm:text-black sm:flex-row items-start md:items-center gap-6 text-xs text-muted-foreground ">
//                 <div className="flex  items-center">
//                   <InfoIcon type="website" />
//                   <span>Hybrid Conference</span>
//                 </div>
//                 <div className="flex items-center">
//                   <InfoIcon type="address" />
//                   <span>{CONFERENCE.venue.location}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <InfoIcon type="calender" />
//                   <span>{CONFERENCE.date}</span>
//                 </div>
//               </div>
//             </motion.footer>
//           </div>
//         </div>

//         {/* Right Side: Video Background (Full Width) */}
//         <motion.div
//           className="absolute right-0 top-0 h-full w-full md:w-1/2 lg:w-2/4 min-h-[300px] md:min-h-full overflow-hidden"
//           initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
//           animate={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
//           transition={{ duration: 1.2, ease: "circOut" }}
//         >
//           {/* YouTube Video Embed - CONTAIN mode (shows full video) */}
//           <iframe
//             className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain"
//             src={getYouTubeEmbedUrl(videoUrl)}
//             allow="autoplay; encrypted-media"
//             frameBorder="0"
//             title="Hero Video"
//           />

//           {/* Gradient Overlay on edges for better visibility */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 md:from-black" />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
//         </motion.div>
//       </motion.section>
//     );
//   }
// );

// HeroSection.displayName = "HeroSection";

// export { HeroSection };