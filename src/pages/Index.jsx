import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ToolsPreviewSection from "../components/ToolsPreviewSection";
import useSeoMeta from "../hooks/useSeoMeta";

export default function Index() {
  useSeoMeta({
    title: "CivicTools — Simple Tools for Public Data",
    description: "Fast, free estimates for permits, property tax, and more — using public data from California cities.",
  });

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
