import { CONFERENCE } from "@/constants/conference";
import PolicyDocument from "@/components/policy/PolicyDocument";

export default function ComplaintsPolicy() {
  return (
    <PolicyDocument
      path="/complaints-policy"
      title="Complaints policy"
      intro="How to raise a concern about the conference, and how we handle it: fairly, consistently and promptly."
      sections={[
        {
          title: "Introduction",
          body: [
            `The Organizing Committee of the ${CONFERENCE.name.trim()} (${CONFERENCE.shortForm}) is committed to a professional, respectful and inclusive environment for all participants. We aim to handle all complaints fairly, consistently and promptly to maintain the integrity and quality of the conference.`,
          ],
        },
        {
          title: "Scope of the policy",
          body: [
            "This policy applies to all participants, including authors, reviewers, session chairs, keynote speakers, attendees, volunteers and sponsors. Complaints may relate to, but are not limited to:",
            {
              list: [
                "Conference content or programme issues",
                "The review process or editorial fairness",
                "Speaker or participant behaviour",
                "Technical or logistical problems",
                "Discrimination or harassment",
              ],
            },
          ],
        },
        {
          title: "Lodging a complaint",
          body: [
            "Complaints must be submitted in writing and include:",
            { list: ["Name and contact details of the complainant", "A clear description of the issue", "Supporting evidence, if any"] },
            {
              terms: [
                ["Send to", "info@icsift.com"],
                ["Subject line", `Formal Complaint – ${CONFERENCE.shortForm} ${CONFERENCE.year}`],
              ],
            },
          ],
        },
        {
          title: "Review process",
          body: [
            {
              list: [
                "An acknowledgment is sent within 3 working days of receipt.",
                "The complaint is reviewed confidentially by the Conference Ethics and Integrity Panel.",
                "A response is provided within 10 to 15 working days, depending on the nature and complexity of the issue.",
                "If required, further investigation or mediation is initiated.",
              ],
            },
          ],
        },
        {
          title: "Resolution and outcomes",
          body: [
            "Depending on the findings, the Organizing Committee may take appropriate action, such as:",
            {
              list: [
                "Issuing an apology",
                "Re-reviewing submissions, if applicable",
                "Disqualifying or removing participants from the event",
                "Restricting future participation",
              ],
            },
          ],
        },
        {
          title: "Confidentiality",
          body: [
            "All complaints and investigations are treated with the utmost confidentiality. Personal data is processed in accordance with applicable privacy laws and shared only with those directly involved in the resolution.",
          ],
        },
        {
          title: "Appeals",
          body: [
            "If you are not satisfied with the outcome, you may submit an appeal in writing within 7 days of the decision. An independent subcommittee reviews the appeal, and a final decision is communicated within 10 working days.",
          ],
        },
      ]}
    />
  );
}
