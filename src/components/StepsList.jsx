import { Box, Typography, Stack } from "@mui/material";

export default function StepsList({ steps, title = "Process Steps" }) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1 }}>
        {title}
      </Typography>
      <Stack spacing={1.25} sx={{ mt: 1 }}>
        {steps.map((s, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <Box
              sx={{
                flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                bgcolor: "rgba(15,118,110,0.1)", color: "primary.main",
                display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700,
              }}
            >
              {i + 1}
            </Box>
            <Typography variant="body2" sx={{ pt: 0.25 }}>{s}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
