import AboutCoOrganizersPage from "./Content";
import { CONFERENCE } from "@/constants/conference";

export const metadata = {
  title: `Co-organisers | ${CONFERENCE.shortForm}`,
  description: `The universities and academic bodies that co-organise the ${CONFERENCE.name.trim()}, and how your institution can join them.`,
};

export default function Page() {
  return <AboutCoOrganizersPage />;
}
