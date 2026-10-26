import { CONFERENCE } from "@/constants/conference";
import PolicyDocument from "@/components/policy/PolicyDocument";

export const metadata = {
  title: "ICSIFT | Health and Safety Policy",
  description:
    "Join global experts at ICSIFT, a premier conference dedicated to exploring cutting-edge scientific innovations and emerging technologies shaping our future.",
};

export default function HealthSafetyPolicy() {
  return (
    <PolicyDocument
      path="/health-and-safety-policy"
      title="Health and safety policy"
      intro={`The Organizing Committee of the ${CONFERENCE.shortForm} is committed to the health, safety and well-being of everyone taking part: delegates, speakers, exhibitors, sponsors and staff.`}
      closing={`By attending the ${CONFERENCE.shortForm}, all participants agree to follow this Health and Safety Policy, so the conference stays secure and professional for everyone.`}
      sections={[
        {
          title: "Our commitment",
          body: [
            {
              list: [
                "Compliance with all local, national and international health and safety regulations.",
                "Preventive measures to reduce potential risks and hazards during the conference.",
                "Continuous monitoring of health advisories and emergency protocols from local authorities and the World Health Organization (WHO).",
              ],
            },
          ],
        },
        {
          title: "Venue safety measures",
          body: [
            "The venue will be equipped with:",
            {
              terms: [
                ["Emergency infrastructure", "Clearly marked emergency exits and evacuation routes; fire safety equipment and certified personnel."],
                ["Medical support", "Accessible first-aid stations and on-site medical support."],
                ["Facility standards", "Regular inspections to keep facilities clean, hazard-free and accessible."],
              ],
            },
          ],
        },
        {
          title: "Emergency preparedness",
          body: [
            {
              terms: [
                ["Response team", "Available during all sessions for immediate assistance."],
                ["Evacuation", "Plans and procedures are explained to participants at the start of the conference."],
                ["Medical coordination", "Direct coordination with local hospitals and emergency services for rapid help."],
              ],
            },
          ],
        },
        {
          title: "Health precautions",
          body: [
            {
              list: [
                "Good hygiene practices, such as hand sanitising and masks where applicable",
                "Sanitisation points at the venue",
                "Monitoring for symptoms of illness and arranging medical help where needed",
                "Following public health guidelines in case of an outbreak or pandemic",
              ],
            },
          ],
        },
        {
          title: "Your responsibilities",
          body: [
            {
              list: [
                "Follow venue safety rules and health protocols.",
                "Tell the organisers immediately about any health or safety concern.",
                "If you have a pre-existing health condition, take the precautions you need and carry your medication.",
              ],
            },
          ],
        },
        {
          title: "Continuous improvement",
          body: [
            "The Organizing Committee reviews and updates its health and safety measures as needed, and uses participant feedback to improve safety at future conferences.",
          ],
        },
      ]}
    />
  );
}
