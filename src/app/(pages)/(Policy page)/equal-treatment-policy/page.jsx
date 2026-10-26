import { CONFERENCE } from "@/constants/conference";
import PolicyDocument from "@/components/policy/PolicyDocument";

export const metadata = {
  title: "Equal Treatment Policy | ICSIFT",
  description: "How ICSIFT ensures every participant is treated fairly and without discrimination across all conference activities.",
};

export default function EqualTreatmentPolicy() {
  return (
    <PolicyDocument
      path="/equal-treatment-policy"
      title="Equal treatment policy"
      intro={`The ${CONFERENCE.name.trim()} (${CONFERENCE.shortForm}) is committed to an inclusive, respectful and equitable environment, where every author, presenter, delegate, session chair, reviewer, organiser and sponsor is treated fairly and without discrimination.`}
      sections={[
        {
          title: "Purpose",
          body: [
            "This policy exists to:",
            {
              list: [
                "Promote diversity, inclusivity and fairness throughout all conference activities.",
                "Prevent discrimination and make participation equally available to all.",
                "Maintain a professional, welcoming environment for academic and professional engagement.",
              ],
            },
          ],
        },
        {
          title: "Scope",
          body: [
            "This policy applies to:",
            {
              list: [
                "All conference participants, on site and online",
                "Organizing committees, scientific committees, reviewers and session chairs",
                `All ${CONFERENCE.shortForm} events, including presentations, workshops, networking sessions and social gatherings`,
              ],
            },
          ],
        },
        {
          title: "Our commitment",
          body: [
            `The ${CONFERENCE.shortForm} ensures:`,
            {
              terms: [
                [
                  "Non-discrimination",
                  "No participant is discriminated against on the basis of race, ethnicity, nationality, gender, gender identity, sexual orientation, religion, age, disability, marital status, socio-economic status or academic background.",
                ],
                ["Equal opportunities", "Everyone has equal access to submit papers, take part in sessions, present research and attend all activities."],
                ["Inclusive review", "Submissions are reviewed anonymously and solely on academic merit."],
                ["Accessibility", "The conference strives to accommodate particular needs or disabilities so everyone can take full part."],
                ["Respectful environment", "Harassment, discrimination or other inappropriate behaviour is strictly prohibited and results in removal from the event."],
              ],
            },
          ],
        },
        {
          title: "Reporting and resolution",
          body: [
            `If you experience or witness unfair treatment, harassment or discrimination, report it to the ${CONFERENCE.shortForm} Organizing Committee.`,
            "All complaints are handled confidentially, with impartial investigation and appropriate action.",
          ],
        },
        {
          title: "Responsibility",
          body: [
            {
              terms: [
                ["Participants", "All participants share responsibility for upholding this policy."],
                ["Committee", "The Organizing Committee monitors compliance and acts promptly on violations."],
              ],
            },
          ],
        },
      ]}
    />
  );
}
