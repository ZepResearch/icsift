import ConferenceObjectives from "@/components/conference-objectives";
import ConferenceHero from "../components/Hero";
import AboutConference from "@/components/About";
import ConferenceCTACards from "@/components/Cta-multiple";
import ConferenceVenue from "@/components/Venue-cta";
import ConferenceTestimonials from "@/components/Testimonal";
import ConferenceFAQ from "@/components/Faq";
import { ConferenceTimeline } from "@/components/conference-timeline";
import { SpeakerSection } from "@/components/speaker-section";
import Buttons from "@/components/buttons";

export default function Home() {
  return (
   
      <main className="min-h-screen bg-[#f8faf5]">
        <ConferenceHero/>
        <AboutConference/>
        <Buttons/>
        <ConferenceObjectives/>
        <ConferenceTimeline/>
        <SpeakerSection/>
        <ConferenceCTACards/>
        <ConferenceVenue/>
        <ConferenceFAQ/>
        <ConferenceTestimonials/>
  
      </main>
    
  )
}
