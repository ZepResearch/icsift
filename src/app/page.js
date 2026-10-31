import Hero from "@/components/signal/Hero";
import Partners from "@/components/signal/Partners";
import Purpose from "@/components/signal/Purpose";
import Participate from "@/components/signal/Participate";
import Dates from "@/components/signal/Dates";
import Speakers from "@/components/signal/Speakers";
import Moments from "@/components/signal/Moments";
import Goals from "@/components/signal/Goals";
import Venue from "@/components/signal/Venue";
import Voices from "@/components/signal/Voices";
import Faq, { FAQS } from "@/components/signal/Faq";
import Closing from "@/components/signal/Closing";
import JsonLd from "@/components/seo/JsonLd";
import { homeMetadata } from "@/components/metadata";
import { eventSchema, faqSchema } from "@/lib/seo";

export const metadata = homeMetadata;

// The home page in the Signal system: fields of forest, cream and signal yellow alternate down the page.
export default function Home() {
  return (
    <main className="sig min-h-screen">
      <JsonLd data={[eventSchema(), faqSchema(FAQS)]} />
      <Hero />
      <Partners />
      <Purpose />
      <Dates />
      <Participate />
      <Speakers />
      <Moments />
      <Goals />
      <Venue />
      <Voices />
      <Faq />
      <Closing />
    </main>
  );
}
