import ConferenceObjectives from "@/components/conference-objectives";
import AboutConference from "@/components/About";
import ConferenceCTACards from "@/components/Cta-multiple";
import ConferenceVenue from "@/components/Venue-cta";
import ConferenceTestimonials from "@/components/Testimonal";
import ConferenceFAQ from "@/components/Faq";
import { ConferenceTimeline } from "@/components/conference-timeline";
import { SpeakerSection } from "@/components/speaker-section";
import Buttons from "@/components/buttons";
import SDGS from "@/components/SDGS";import Organizer from "@/components/Organizer";
import CPD from "@/components/cpd";
import WhyAttendConference from "@/components/WhyAttend";
import FutureOpportunities from "@/components/FutureOpportunities";
import { HeroSection } from "@/components/Hero";


;

export default function Home() {
  return (
   
      <main className="min-h-screen bg-[#f8faf5]">
         <div className="w-full">
      <HeroSection
        logo={{
            url: "https://vucvdpamtrjkzmubwlts.supabase.co/storage/v1/object/public/users/user_2zMtrqo9RMaaIn4f8F2z3oeY497/avatar.png",
            alt: "Company Logo",
            text: "Your Logo"
        }}
        slogan="ELEVATE YOUR PERSPECTIVE"
        title={
          <>
            Each Peak <br />
            <span className="text-primary">Teaches Something</span>
          </>
        }
        subtitle="Discover breathtaking landscapes and challenge yourself with our guided mountain expeditions. Join a community of adventurers."
        callToAction={{
          text: "JOIN US TO EXPLORE",
          href: "#explore",
        }}
        videoUrl="https://www.youtube.com/watch?v=WrYrSB41BPg" // Replace with your YouTube video URL
        contactInfo={{
            website: "yourwebsite.com",
            phone: "+1 (555) 123-4567",
            address: "20 Fieldstone Dr, Roswell, GA",
        }}
      />
    </div>
        {/* <Organizer/> */}
        <AboutConference/>
        <Buttons/>
        <ConferenceObjectives/>
        <ConferenceTimeline/>
        <SpeakerSection/>
        <ConferenceCTACards/>
        <WhyAttendConference/>
        <SDGS/>
        <ConferenceVenue/>
        <FutureOpportunities/>
        <ConferenceFAQ/>
        <ConferenceTestimonials/>
  
      </main>
    
  )
}
