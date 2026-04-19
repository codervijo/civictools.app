import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Card, CardContent, Chip, CardActionArea } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ConstructionIcon from "@mui/icons-material/Construction";
import { TOOLS } from "../tools/registry";

const ICONS = {
  permit: <ConstructionIcon />,
  "property-tax": <ReceiptLongIcon />,
};

const COMING_SOON = [
  { icon: <DirectionsCarIcon />, title: "DMV Appointment Finder", desc: "Find the soonest DMV slot near you." },
  { icon: <HomeWorkIcon />,      title: "Zoning Lookup",          desc: "Check what you can build on any parcel." },
  { icon: <MoreHorizIcon />,     title: "More tools coming",      desc: "We're building the simplest civic toolkit." },
];

export default function ToolsPreviewSection({ currentSlug }) {
  const otherTools = TOOLS.filter((t) => t.slug !== currentSlug);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">
          {currentSlug ? "More CivicTools" : "All Tools"}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          The CivicTools platform
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {otherTools.map((t) => (
          <Card key={t.slug} sx={{ height: "100%", borderRadius: 3 }}>
            <CardActionArea component={RouterLink} to={t.path} sx={{ height: "100%" }}>
              <CardContent>
                <ToolIcon>{ICONS[t.slug]}</ToolIcon>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {t.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
                  {t.subtext}
                </Typography>
                <Chip label="Open tool" size="small" color="primary" variant="outlined" />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        {COMING_SOON.map((t) => (
          <Card key={t.title} sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent>
              <ToolIcon>{t.icon}</ToolIcon>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {t.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
                {t.desc}
              </Typography>
              <Chip label="Coming soon" size="small" sx={{ bgcolor: "rgba(15,23,42,0.06)" }} />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

function ToolIcon({ children }) {
  return (
    <Box
      sx={{
        width: 40, height: 40, borderRadius: 2, mb: 1.5,
        bgcolor: "rgba(15,118,110,0.08)", color: "primary.main",
        display: "grid", placeItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
