import { useLocation } from "react-router-dom";
import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { ComingSoonNote, PageBody } from "../components/ui";
import { comingSoonPages } from "../navigation";

export function ComingSoonPage() {
  const { pathname } = useLocation();
  const key = pathname.split("/").filter(Boolean).pop() ?? "";
  const page = comingSoonPages[key] ?? { title: "Coming soon", text: "This section will be added soon." };
  return (
    <>
      <SchoolPageHeader title={page.title} />
      <PageBody>
        <ComingSoonNote text={page.text} />
      </PageBody>
    </>
  );
}
