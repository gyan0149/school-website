import { useLocation } from "react-router-dom";
import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { ComingSoonNote, PageBody } from "../components/ui";
import { useLang } from "../i18n";
import { comingSoonPages } from "../navigation";

export function ComingSoonPage() {
  const { pathname } = useLocation();
  const { t } = useLang();
  const key = pathname.split("/").filter(Boolean).pop() ?? "";
  const page = comingSoonPages[key];
  return (
    <>
      <SchoolPageHeader title={page ? t(page.title, page.titleHi) : t("Coming soon", "जल्द आ रहा है")} />
      <PageBody>
        <ComingSoonNote text={page ? t(page.text, page.textHi) : t("This section will be added soon.", "यह भाग जल्द जोड़ा जाएगा।")} />
      </PageBody>
    </>
  );
}
