import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import theme from "./theme.js";
import Index from "./pages/Index.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import SeoPermitPage from "./pages/SeoPermitPage.jsx";
import NotFound from "./pages/NotFound.tsx";
import seoPages from "./data/seoPages.json";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Backwards-compat: old single-tool URL */}
            <Route path="/permit" element={<ToolPage />} />
            <Route path="/property-tax" element={<ToolPage />} />
            {/* Generic tool route by slug */}
            <Route path="/tools/:slug" element={<ToolPage />} />
            {/* SEO permit cost pages */}
            {seoPages.map((p) => (
              <Route key={p.slug} path={p.slug} element={<SeoPermitPage />} />
            ))}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
