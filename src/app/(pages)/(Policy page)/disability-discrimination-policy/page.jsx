import { CONFERENCE } from "@/constants/conference";
import PolicyDocument from "@/components/policy/PolicyDocument";
import { disabilityMetadata } from "@/components/metadata";


export const metadata = disabilityMetadata;

export default function DisabilityPolicy() {
  return (
    <PolicyDocument
      path="/disability-discrimination-policy"
      title="Disability discrimination policy"
      intro={`The ${CONFERENCE.name.trim()} (${CONFERENCE.shortForm}) is committed to an inclusive, accessible, discrimination-free environment for all participants, regardless of physical, sensory, intellectual or mental health conditions.`}
      sections={[
        {
          title: "Policy statement",
          body: [
            `The ${CONFERENCE.shortForm} strictly prohibits any form of discrimination, harassment or exclusion based on disability. All organisers, staff and participants are expected to support inclusivity and equal access to conference activities, both in person and online.`,
          ],
        },
        {
          title: "Accessibility commitment",
          body: [
            {
              terms: [
                ["Venue", "The venue will comply with international accessibility standards, including barrier-free access to conference halls, restrooms and networking areas."],
                ["Virtual access", "The online platform will work with assistive technologies such as screen readers, and sessions will be captioned wherever feasible."],
                ["Materials", "Conference materials, including programmes and presentations, are available in accessible formats on request."],
              ],
            },
          ],
        },
        {
          title: "Reasonable accommodations",
          body: [
            `The ${CONFERENCE.shortForm} provides reasonable accommodations so people with disabilities can take full part. These may include:`,
            {
              list: [
                "Reserved or accessible seating",
                "Help with mobility or orientation at the venue",
                "Sign language interpretation or live captioning, on prior request",
                "Adapted schedules for participants with particular needs",
              ],
            },
            { note: "If you need an accommodation, tell the Organizing Committee in advance at info@icsift.com so it can be arranged in time." },
          ],
        },
        {
          title: "Non-discrimination and anti-harassment",
          body: [
            {
              list: [
                "Discriminatory behaviour, harassment or stigmatisation based on disability will not be tolerated.",
                "Complaints or concerns are handled promptly and confidentially by the conference's designated Accessibility and Inclusion Officer.",
              ],
            },
          ],
        },
        {
          title: "Reporting and support",
          body: [
            "If you experience or witness disability-related discrimination, report it to the Organizing Committee through the official email or the helpdesk. Appropriate action will be taken to resolve the matter and protect the safety and dignity of everyone involved.",
          ],
        },
        {
          title: "Compliance and review",
          body: [
            "This policy is aligned with the UN Convention on the Rights of Persons with Disabilities (CRPD) and relevant national laws. The Organizing Committee reviews and updates it periodically to keep pace with best practice in inclusivity.",
          ],
        },
      ]}
    />
  );
}
