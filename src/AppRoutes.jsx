import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import SeoPermitPage from "./pages/SeoPermitPage.jsx";
import NotFound from "./pages/NotFound.tsx";
import seoPages from "./data/seoPages.json";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/permit" element={<ToolPage />} />
      <Route path="/property-tax" element={<ToolPage />} />
      <Route path="/tools/:slug" element={<ToolPage />} />
      {seoPages.map((p) => (
        <Route key={p.slug} path={p.slug} element={<SeoPermitPage />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
