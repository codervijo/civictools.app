import { useState, useRef, useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ResultsCard from "../components/ResultsCard";
import ToolsPreviewSection from "../components/ToolsPreviewSection";
import { getToolBySlug } from "../tools/registry";
import useSeoMeta from "../hooks/useSeoMeta";

export default function ToolPage() {
  const params = useParams();
  const location = useLocation();
  // Slug comes from /tools/:slug, or from the leading path segment for /permit, /property-tax
  const slug = params.slug || location.pathname.replace(/^\//, "").split("/")[0];
  const tool = getToolBySlug(slug);
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);

  // Reset result when switching tools
  useEffect(() => { setResult(null); }, [slug]);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  useSeoMeta({ title: tool?.pageTitle, description: tool?.meta });

  if (!tool) return <Navigate to="/" replace />;

  const ToolForm = tool.component;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ pb: 8 }}>
        <Hero chip={tool.chip} headline={tool.headline} subtext={tool.subtext} />
        <ToolForm onResult={setResult} />

        {result && (
          <Box ref={resultsRef} sx={{ mt: 4, scrollMarginTop: 80 }}>
            <ResultsCard result={result} />
          </Box>
        )}

        <Box sx={{ mt: 8 }}>
          <ToolsPreviewSection currentSlug={tool.slug} />
        </Box>
      </Container>
    </Box>
  );
}
