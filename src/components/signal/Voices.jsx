import Reveal from "@/components/home/Reveal";

const LEAD = {
  quote:
    "ICSIFT provided an exceptional platform for sharing our research on sustainable urban development. The connections we made have led to three international collaborations.",
  name: "Dr. Sarah Chen",
  role: "Urban Planning Researcher",
};

const MORE = [
  {
    quote:
      "As a first-time attendee, I was pleasantly surprised by the conference's organization and depth of content. The sustainable practices implemented throughout the event truly practiced what was preached.",
    name: "Emma Watkins",
    role: "Climate Policy Advisor",
  },
  {
    quote:
      "Partnering with ICSIFT demonstrated our commitment to sustainability, helping us build trust and loyalty with our eco-conscious stakeholders and opening doors to green innovation.",
    name: "Michael Rodriguez",
    role: "Sustainability Director",
  },
  {
    quote:
      "By participating in ICSIFT, we were able to contribute to a greener future and demonstrate our environmental responsibility while gaining valuable insights from global sustainability leaders.",
    name: "Dr. Thomas Mann",
    role: "Environmental Engineer",
  },
];

// Cream field: one quotation set large, three more beneath.
export default function Voices() {
  return (
    <section aria-labelledby="voices-title" className="sig-on-cream bg-[var(--cream)] text-[var(--bark)]">
      <Reveal className="mx-auto max-w-[1400px] px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
        <h2 id="voices-title" data-enter className="sig-h2">
          In their words
        </h2>
        <figure data-enter style={{ "--i": 1 }} className="mt-12 max-w-[62rem]">
          <blockquote className="text-[clamp(1.4rem,1.1rem+1vw,2rem)] leading-[1.3] font-medium text-balance">
            &ldquo;{LEAD.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-[17px]">
            <span className="font-semibold">{LEAD.name}</span>
            <span className="text-[var(--bark-2)]">, {LEAD.role}</span>
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-3 lg:grid-cols-3">
          {MORE.map((item, index) => (
            <figure key={item.name} data-enter style={{ "--i": 2 + index }} className="bg-[var(--cream-deep)] p-6 sm:p-8">
              <blockquote className="text-[17px] leading-relaxed">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-[16px]">
                <span className="font-semibold">{item.name}</span>
                <span className="text-[var(--bark-2)]">, {item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
