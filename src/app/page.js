import HeroSheet from "@/components/home/HeroSheet";
import CreditBand from "@/components/home/CreditBand";
import ScopeSheet from "@/components/home/ScopeSheet";
import DatesSheet from "@/components/home/DatesSheet";
import SpeakersSheet from "@/components/home/SpeakersSheet";
import SdgSheet from "@/components/home/SdgSheet";
import EvidenceSheet from "@/components/home/EvidenceSheet";
import VenueSheet from "@/components/home/VenueSheet";
import OutcomesSheet from "@/components/home/OutcomesSheet";
import VoicesSheet from "@/components/home/VoicesSheet";
import FaqSheet from "@/components/home/FaqSheet";
import ClosingSheet from "@/components/home/ClosingSheet";

export default function Home() {
  return (
    <main className="herb min-h-screen">
      <HeroSheet />
      <CreditBand />
      <ScopeSheet />
      <DatesSheet />
      <SpeakersSheet />
      <SdgSheet />
      <EvidenceSheet />
      <VenueSheet />
      <OutcomesSheet />
      <VoicesSheet />
      <FaqSheet />
      <ClosingSheet />
    </main>
  );
}
