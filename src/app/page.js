import ConferenceObjectives from "@/components/conference-objectives";
import ConferenceHero from "../components/Hero";
import AboutConference from "@/components/About";
import ConferenceCTACards from "@/components/Cta-multiple";
import ConferenceVenue from "@/components/Venue-cta";
import ConferenceTestimonials from "@/components/Testimonal";
import ConferenceFAQ from "@/components/Faq";

export default function Home() {
  return (
   
      <main className="min-h-screen bg-[#f8faf5]">
        <ConferenceHero/>
        <AboutConference/>
        <ConferenceObjectives/>
        <ConferenceCTACards/>
        <ConferenceVenue/>
        <ConferenceFAQ/>
        <ConferenceTestimonials/>
      </main>
    
  )
}
