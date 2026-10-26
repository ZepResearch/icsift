import { CONFERENCE } from "@/constants/conference";
import PolicyDocument from "@/components/policy/PolicyDocument";

export default function CancellationPolicy() {
  return (
    <PolicyDocument
      path="/cancellation-policy"
      title="Cancellation policy"
      intro={`Our refund and cancellation terms for the ${CONFERENCE.shortForm}. Please read them before you register.`}
      sections={[
        {
          title: "Overview",
          body: [
            `We understand that plans can change. This policy is designed to be fair to everyone involved. Please read it carefully before registering for the ${CONFERENCE.name.trim()} (${CONFERENCE.shortForm}).`,
          ],
        },
        {
          title: "Cancellation fees",
          body: [
            {
              table: {
                head: ["When you cancel", "Refund"],
                rows: [
                  ["60 or more days before the conference", "100% refund, minus the processing fee"],
                  ["Less than 60 days before the conference", "No refund"],
                ],
              },
            },
          ],
        },
        {
          title: "How to cancel",
          body: [
            "Submit your cancellation request through your conference account, or by email to info@icsift.com.",
            "Approved refunds are paid to the original form of payment within 10 business days of approval.",
          ],
        },
      ]}
    />
  );
}
