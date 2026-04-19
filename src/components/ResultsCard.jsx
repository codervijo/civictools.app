import { Card, CardContent, Box, Typography, Divider } from "@mui/material";
import BreakdownList from "./BreakdownList";
import StepsList from "./StepsList";
import TimelineBox from "./TimelineBox";
import StatsList from "./StatsList";
import Disclaimer from "./Disclaimer";

/**
 * Unified ResultsCard for any tool.
 * Expected `result` shape:
 * {
 *   headline: { label, value, subtitle? },
 *   sections: [
 *     { type: "breakdown", title?, items: [{label, amount, note?}] },
 *     { type: "stats",     title?, items: [{label, value}] },
 *     { type: "steps",     title?, items: [string] },
 *     { type: "timeline",  label?, value },
 *     { type: "note",      title?, body },
 *   ],
 *   disclaimer: string,
 * }
 */
export default function ResultsCard({ result }) {
  const sections = result.sections || [];

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1 }}>
            {result.headline.label}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              color: "primary.main", fontWeight: 800, mt: 0.5,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {result.headline.value}
          </Typography>
          {result.headline.subtitle && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {result.headline.subtitle}
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: {
              xs: "1fr",
              md: sections.length > 1 ? "1fr 1fr" : "1fr",
            },
          }}
        >
          {sections.map((section, i) => (
            <Box key={i}>
              <SectionRenderer section={section} />
            </Box>
          ))}
        </Box>

        {result.disclaimer && <Disclaimer text={result.disclaimer} />}
      </CardContent>
    </Card>
  );
}

function SectionRenderer({ section }) {
  switch (section.type) {
    case "breakdown":
      return (
        <>
          <BreakdownList items={section.items} title={section.title} />
          {section.timeline && (
            <Box sx={{ mt: 3 }}>
              <TimelineBox timeline={section.timeline} />
            </Box>
          )}
        </>
      );
    case "stats":
      return <StatsList items={section.items} title={section.title} />;
    case "steps":
      return <StepsList steps={section.items} title={section.title} />;
    case "timeline":
      return <TimelineBox timeline={section.value} />;
    case "note":
      return (
        <Box>
          {section.title && (
            <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1 }}>
              {section.title}
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, lineHeight: 1.7 }}>
            {section.body}
          </Typography>
        </Box>
      );
    default:
      return null;
  }
}
