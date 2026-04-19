import { Box, Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";

export default function TimelineBox({ timeline }) {
  return (
    <Box
      sx={{
        display: "flex", alignItems: "center", gap: 1.5,
        p: 2, borderRadius: 2,
        bgcolor: "rgba(14,165,233,0.08)",
        border: "1px solid rgba(14,165,233,0.2)",
      }}
    >
      <ScheduleIcon sx={{ color: "secondary.main" }} />
      <Box>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
          Estimated timeline
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {timeline}
        </Typography>
      </Box>
    </Box>
  );
}
