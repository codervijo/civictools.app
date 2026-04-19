import { useState, useEffect, useRef } from "react";
import { useLocation, Navigate } from "react-router-dom";
import {
  Box, Container, Typography, Divider, Card, CardContent,
} from "@mui/material";
import Navbar from "../components/Navbar";
import PermitForm from "../components/PermitForm";
import ResultsCard from "../components/ResultsCard";
import ToolsPreviewSection from "../components/ToolsPreviewSection";
import useSeoMeta from "../hooks/useSeoMeta";
import seoPages from "../data/seoPages.json";

export default function SeoPermitPage() {
  const location = useLocation();
  const page = seoPages.find((p) => p.slug === location.pathname);
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  useSeoMeta({ title: page?.title, description: page?.meta });

  if (!page) return <Navigate to="/permit" replace />;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ pb: 8 }}>
        <Box sx={{ textAlign: "center", pt: { xs: 5, md: 7 }, pb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "1.75rem", sm: "2.2rem", md: "2.8rem" }, fontWeight: 800, mb: 1.5 }}
          >
            {page.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 560, mx: "auto" }}>
            {page.meta}
          </Typography>
        </Box>

        <PermitForm
          onResult={setResult}
          initialCity={page.cityLabel}
          initialType={page.projectType}
          initialValue={page.defaultValuation}
        />

        {result && (
          <Box ref={resultsRef} sx={{ mt: 4, scrollMarginTop: 80 }}>
            <ResultsCard result={result} />
          </Box>
        )}

        <SeoSections page={page} />

        <Box sx={{ mt: 8 }}>
          <ToolsPreviewSection currentSlug="permit" />
        </Box>
      </Container>
    </Box>
  );
}

function SeoSections({ page }) {
  const { sections, cityLabel, projectLabel } = page;
  const items = [
    { heading: `Average permit cost in ${cityLabel}`, body: sections.averageCost },
    { heading: `Steps to get a ${projectLabel} permit in ${cityLabel}`, body: sections.steps },
    { heading: `Timeline for a ${projectLabel} permit in ${cityLabel}`, body: sections.timeline },
  ];

  return (
    <Box sx={{ mt: 6 }}>
      <Divider sx={{ mb: 4 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {items.map((item) => (
          <Card key={item.heading} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                {item.heading}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                {item.body}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
