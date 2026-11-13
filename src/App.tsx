import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SchoolLayout, SchoolNotFound } from "./components/Layout";
import { comingSoonPages } from "./navigation";
import { AboutPage } from "./pages/AboutPage";
import { AcademicsPage } from "./pages/AcademicsPage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { ContactPage } from "./pages/ContactPage";
import { DirectoryPage } from "./pages/DirectoryPage";
import { HomePage } from "./pages/HomePage";
import { PrincipalPage } from "./pages/PrincipalPage";
import { SchoolInfoPage } from "./pages/SchoolInfoPage";

export default function App() {
  return (
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
          {Object.keys(comingSoonPages).map((path) => (
            <Route key={path} path={path} element={<ComingSoonPage />} />
          ))}
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<SchoolNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
