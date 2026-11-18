import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { DemoNote, UploadForm, UploadList } from "../components/Uploads";
import { UPLOAD_CONFIGS } from "../data/uploadConfig";
import { PageBody, Section } from "../components/ui";
import { useUploads, type UploadKind } from "../data/uploads";
import { useSchool } from "../schoolContext";

const PAGES: Record<"notice" | "result" | "download", { title: string; subtitle: string; list: string }> = {
  notice: { title: "Notices & Circulars", subtitle: "सूचनाएँ, छुट्टियाँ और परिपत्र", list: "सभी सूचनाएँ / All notices" },
  result: { title: "Results & Achievements", subtitle: "परीक्षा परिणाम और उपलब्धियाँ", list: "सभी रिज़ल्ट / All results" },
  download: { title: "Downloads", subtitle: "फ़ॉर्म, कैलेंडर और दस्तावेज़", list: "डाउनलोड करें / Files" },
};

export function UploadsPage({ kind }: { kind: Exclude<UploadKind, "photo"> }) {
  const school = useSchool();
  const items = useUploads(school.udise, kind);
  const page = PAGES[kind];
  const config = UPLOAD_CONFIGS[kind];
  return (
    <>
      <SchoolPageHeader title={page.title} subtitle={page.subtitle} />
      <PageBody>
        <div className="space-y-3">
          <UploadForm config={config} />
          <DemoNote />
        </div>
        <Section title={`${page.list} (${items.length})`}>
          <UploadList items={items} empty={config.empty} />
        </Section>
      </PageBody>
    </>
  );
}
