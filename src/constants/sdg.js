// The 17 UN Sustainable Development Goals in their official colours. Every paper is filed against
// them; ICSIFT works on the FOCUS_GOALS below.
export const GOALS = [
  { n: 1, name: "No Poverty", color: "#E5243B" },
  { n: 2, name: "Zero Hunger", color: "#DDA63A" },
  { n: 3, name: "Good Health and Well-being", color: "#4C9F38" },
  { n: 4, name: "Quality Education", color: "#C5192D" },
  { n: 5, name: "Gender Equality", color: "#FF3A21" },
  { n: 6, name: "Clean Water and Sanitation", color: "#26BDE2" },
  { n: 7, name: "Affordable and Clean Energy", color: "#FCC30B" },
  { n: 8, name: "Decent Work and Economic Growth", color: "#A21942" },
  { n: 9, name: "Industry, Innovation and Infrastructure", color: "#FD6925" },
  { n: 10, name: "Reduced Inequalities", color: "#DD1367" },
  { n: 11, name: "Sustainable Cities and Communities", color: "#FD9D24" },
  { n: 12, name: "Responsible Consumption and Production", color: "#BF8B2E" },
  { n: 13, name: "Climate Action", color: "#3F7E44" },
  { n: 14, name: "Life Below Water", color: "#0A97D9" },
  { n: 15, name: "Life on Land", color: "#56C02B" },
  { n: 16, name: "Peace, Justice and Strong Institutions", color: "#00689D" },
  { n: 17, name: "Partnerships for the Goals", color: "#19486A" },
];

// ICSIFT's focus goals, each with the line shown beside it on the home page. Headings, the dial and captions count
// them, so adding or removing one here updates every "nine we work on".
export const FOCUS = [
  [4, "Teaching, training and access to learning that lasts."],
  [6, "Clean water, safe sanitation and smarter water management."],
  [7, "Renewable, efficient energy that reaches everyone."],
  [8, "Research that creates fair work and resilient economies."],
  [9, "Technologies and systems that build without depleting."],
  [11, "Cities and communities that are green, safe and inclusive."],
  [12, "Circular design, less waste and cleaner supply chains."],
  [13, "Research that cuts emissions and helps people adapt."],
  [17, "Academia, industry and policymakers working on one agenda."],
];

export const FOCUS_GOALS = FOCUS.map(([n]) => n);

const WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen"];
// "nine", and "Nine" for the start of a sentence.
export const FOCUS_COUNT = WORDS[FOCUS_GOALS.length];
export const FOCUS_COUNT_CAP = FOCUS_COUNT.charAt(0).toUpperCase() + FOCUS_COUNT.slice(1);
