import { CONFERENCE } from "@/constants/conference";
import PolicyDocument from "@/components/policy/PolicyDocument";

export default function TermsAndConditions() {
  return (
    <PolicyDocument
      path="/terms-and-conditions"
      title="Terms and conditions"
      intro={`The terms that govern your participation in the ${CONFERENCE.name.trim()} and your use of our services. Please read them before you register.`}
      closing={`By registering for the ${CONFERENCE.shortForm}, you acknowledge that you have read, understood and agree to be bound by these Terms and Conditions.`}
      sections={[
        {
          title: "Acceptance of terms",
          body: [
            "By registering for the International Conference on Sustainability, Innovation and Future Technologies (ICSIFT), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to them, please do not register for or attend the conference.",
          ],
        },
        {
          title: "Registration and payment",
          body: [
            "Registration is confirmed only when full payment is received. All fees must be paid in the currency specified on the registration form. The organisers reserve the right to refuse admission if payment is not received before the conference. Fees may vary by participant category and registration date.",
          ],
        },
        {
          title: "Cancellation and refunds",
          body: [
            "Cancellations must be received in writing by email to info@icsift.com. Refunds are issued as follows: 100% refund for cancellations more than 60 days before the conference, 50% refund for cancellations 30 to 60 days before the conference, and no refund for cancellations less than 30 days before the conference. All refunds are subject to a processing fee.",
          ],
        },
        {
          title: "Conference programme",
          body: [
            "The organisers reserve the right to modify the programme, speakers, venue and schedule without prior notice. If a speaker cancels, the organisers will make every effort to find a suitable replacement. The programme is subject to change because of unforeseen circumstances.",
          ],
        },
        {
          title: "Intellectual property",
          body: [
            "All materials presented at the conference are protected by copyright. Attendees may not record, photograph or reproduce any session without the express written consent of the organisers and the respective speakers. Papers submitted for the proceedings may be published in indexed journals with proper attribution to the authors.",
          ],
        },
        {
          title: "Liability",
          body: [
            "The organisers are not responsible for any loss, injury or damage to any person or property, whatever the cause. Attendees should make their own arrangements for personal insurance, travel and accommodation. The organisers are not liable for theft of or damage to personal belongings during the conference.",
          ],
        },
        {
          title: "Code of conduct",
          body: [
            "All attendees are expected to behave professionally and respectfully throughout the conference. The organisers may remove any attendee without refund if their behaviour is inappropriate or disruptive. Harassment of any kind will not be tolerated and may result in immediate expulsion.",
          ],
        },
        {
          title: "Data protection",
          body: [
            "By registering, you agree that your personal information may be used for conference administration. We will not share it with third parties without your consent, except as required by law. Your contact details may be used to send important updates about the conference and future ICSIFT events.",
          ],
        },
        {
          title: "Force majeure",
          body: [
            "If the conference is postponed or cancelled because of circumstances beyond the organisers' control, including acts of God, war, disaster, pandemic or government regulation, the organisers will not be liable for damages or losses incurred by attendees. In such cases, they will make reasonable efforts to reschedule or provide alternative arrangements.",
          ],
        },
        {
          title: "Amendments",
          body: [
            "The organisers may amend these Terms and Conditions at any time without prior notice. The current version is always available on the conference website. Attendees are responsible for reviewing these terms periodically.",
          ],
        },
      ]}
    />
  );
}
