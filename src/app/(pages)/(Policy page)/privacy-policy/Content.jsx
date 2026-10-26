import { CONFERENCE } from "@/constants/conference";
import PolicyDocument from "@/components/policy/PolicyDocument";

export default function PrivacyPolicy() {
  return (
    <PolicyDocument
      path="/privacy-policy"
      title="Privacy policy"
      intro={`Simple, clear information about how the ${CONFERENCE.name.trim()} collects, uses and protects your personal information.`}
      sections={[
        {
          title: "How we collect your information",
          body: [
            "We collect information when you:",
            {
              list: [
                "Register for the conference",
                "Submit papers or abstracts",
                "Contact our support team",
                "Take part in surveys",
                "Join our in-person or virtual events",
              ],
            },
            "This typically includes basic details like your name, email, affiliation and research interests. We will always tell you when we need information and why.",
          ],
        },
        {
          title: "What we do with your information",
          body: [
            "Your information helps us:",
            {
              list: [
                "Process your conference registration",
                "Review and publish submitted papers",
                "Keep you updated about the event",
                "Answer your questions",
                "Make our services better",
                "Connect you with other researchers and participants",
              ],
            },
            "We use your data only for these specific purposes.",
          ],
        },
        {
          title: "Sharing your information",
          body: [
            "We only share your information with:",
            {
              list: [
                "Trusted service providers who help run the conference",
                "Academic indexing services for published papers, with your consent",
                "Legal authorities, if required by law",
              ],
            },
            "We never sell your personal information to third parties. Your research may be published in the conference proceedings with your explicit consent.",
          ],
        },
        {
          title: "Keeping your information safe",
          body: [
            "We protect your information by:",
            { list: ["Using secure servers", "Limiting access to authorised staff", "Applying regular security updates", "Encrypting sensitive data"] },
            "While we work hard to protect your data, no online system is completely secure. Use a strong password and keep your login details private.",
          ],
        },
        {
          title: "Cookies",
          body: [
            "We use cookies to:",
            { list: ["Remember your preferences", "Improve your browsing experience", "Analyse how the website is used", "Manage your login session"] },
            "You can control cookies through your browser settings.",
          ],
        },
        {
          title: "Your privacy rights",
          body: [
            "You have the right to:",
            {
              list: [
                "See what information we hold about you",
                "Update your information",
                "Delete your information, except where we are legally required to keep it",
                "Opt out of communications",
                "Withdraw consent for publishing your research",
              ],
            },
            "To exercise these rights, write to info@icsift.com.",
          ],
        },
      ]}
    />
  );
}
