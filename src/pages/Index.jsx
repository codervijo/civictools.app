import { useEffect } from "react";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ToolsPreviewSection from "../components/ToolsPreviewSection";
import useSeoMeta from "../hooks/useSeoMeta";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CivicTools",
  "url": "https://civictools.app",
  "description": "Fast, free tools for navigating California building permits, property tax, and civic processes. No sign-up required.",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "featureList": [
    "Permit cost estimator for California cities",
    "Property tax estimator by county",
    "Step-by-step permit process guides",
  ],
};

export default function Index() {
  useSeoMeta({
    title: "CivicTools — Simple Tools for Public Data",
    description: "Fast, free estimates for permits, property tax, and more — using public data from California cities.",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "jsonld-home";
    script.textContent = JSON.stringify(JSON_LD);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ pb: 8 }}>
        <Hero
          chip="The CivicTools platform"
          headline="Simple tools for public data."
          subtext="Fast, free estimates for permits, property tax, and more — using public data from your city."
        />
        <Box sx={{ mt: 4 }}>
          <ToolsPreviewSection />
        </Box>
      </Container>
    </Box>
  );
}
