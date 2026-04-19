import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0F766E", contrastText: "#ffffff" }, // teal
    secondary: { main: "#0EA5E9" },
    background: { default: "#F8FAFC", paper: "#ffffff" },
    text: { primary: "#0F172A", secondary: "#475569" },
    divider: "#E2E8F0",
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily:
      '"Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, Arial, sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "saturate(180%) blur(12px)",
          color: "#0F172A",
          boxShadow: "none",
          borderBottom: "1px solid #E2E8F0",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E2E8F0",
          boxShadow:
            "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 18, paddingBlock: 10 },
        containedPrimary: {
          boxShadow: "0 6px 16px -6px rgba(15,118,110,0.5)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 10, backgroundColor: "#fff" } },
    },
  },
});

export default theme;
