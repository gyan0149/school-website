import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PageBody, PageHeader } from "./components/ui";
import { AboutPage } from "./pages/AboutPage";
import { AcademicsPage } from "./pages/AcademicsPage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { ContactPage } from "./pages/ContactPage";
import { DownloadsPage } from "./pages/DownloadsPage";
import { PrincipalPage } from "./pages/PrincipalPage";
import { GalleryPage } from "./pages/GalleryPage";
import { HomePage } from "./pages/HomePage";
import { InfrastructurePage } from "./pages/InfrastructurePage";
import { NoticesPage } from "./pages/NoticesPage";
import { ResultsPage } from "./pages/ResultsPage";
import { SchoolInfoPage } from "./pages/SchoolInfoPage";

function NotFoundPage() {
  return (
    <>
      <PageHeader title="Page not found" />
      <PageBody>
        <p>
          The page you are looking for does not exist.{" "}
          <Link to="/" className="text-brand-600 hover:underline">
            Go to Home
          </Link>
        </p>
      </PageBody>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="school-information" element={<SchoolInfoPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="principal" element={<PrincipalPage />} />
          <Route path="faculty" element={<Navigate to="/principal" replace />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="infrastructure" element={<InfrastructurePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
