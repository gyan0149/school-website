import { useSchoolPath } from "../schoolContext";
import { PageHeader } from "./ui";

export function SchoolPageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const to = useSchoolPath();
  return <PageHeader title={title} subtitle={subtitle} homeTo={to()} />;
}
