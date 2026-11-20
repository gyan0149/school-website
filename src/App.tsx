import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LangProvider } from "./components/LangProvider";
import { SchoolLayout, SchoolNotFound } from "./components/Layout";
import { comingSoonPages } from "./navigation";
import { AboutPage } from "./pages/AboutPage";
import { AcademicsPage } from "./pages/AcademicsPage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { ContactPage } from "./pages/ContactPage";
import { DirectoryPage } from "./pages/DirectoryPage";
import { GalleryPage } from "./pages/GalleryPage";
import { HomePage } from "./pages/HomePage";
import { PrincipalPage } from "./pages/PrincipalPage";
import { SchoolInfoPage } from "./pages/SchoolInfoPage";
import { UploadsPage } from "./pages/UploadsPage";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { SchemesPage } from "./pages/SchemesPage";
import { AiChatPage } from "./pages/ai/AiChatPage";
import { AiHubPage } from "./pages/ai/AiHubPage";
import { EnglishPage } from "./pages/ai/EnglishPage";
import { PlannerPage } from "./pages/ai/PlannerPage";
import { QuizPage } from "./pages/ai/QuizPage";

export default function App() {
  return (
    <LangProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route index element={<DirectoryPage />} />
        <Route path=":udise" element={<SchoolLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="school-information" element={<SchoolInfoPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="principal" element={<PrincipalPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="notices" element={<UploadsPage kind="notice" />} />
          <Route path="results" element={<UploadsPage kind="result" />} />
          <Route path="downloads" element={<UploadsPage kind="download" />} />
          <Route path="schemes" element={<SchemesPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="ai" element={<AiHubPage />} />
          <Route path="ai/quiz" element={<QuizPage />} />
          <Route path="ai/planner" element={<PlannerPage />} />
          <Route path="ai/english" element={<EnglishPage />} />
          <Route path="ai/:tool" element={<AiChatPage />} />
          {Object.keys(comingSoonPages).map((path) => (
            <Route key={path} path={path} element={<ComingSoonPage />} />
          ))}
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<SchoolNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </LangProvider>
  );
}
