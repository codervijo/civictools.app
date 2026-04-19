import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ToolsPreviewSection from "../components/ToolsPreviewSection";

export default function Index() {
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
