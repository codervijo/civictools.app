import { Box, Typography, Chip } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";

export default function Hero({ chip, headline, subtext }) {
  return (
    <Box sx={{ textAlign: "center", pt: { xs: 5, md: 8 }, pb: { xs: 3, md: 4 } }}>
      {chip && (
        <Chip
          icon={<BoltIcon sx={{ fontSize: 16 }} />}
          label={chip}
          size="small"
          sx={{
            mb: 2, bgcolor: "rgba(15,118,110,0.08)", color: "primary.main",
            fontWeight: 600, border: "1px solid rgba(15,118,110,0.2)",
          }}
        />
      )}
      <Typography
        variant="h2"
        sx={{ fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" }, mb: 1.5 }}
      >
        {headline}
      </Typography>
      {subtext && (
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", maxWidth: 560, mx: "auto", fontSize: "1.05rem" }}
        >
          {subtext}
        </Typography>
      )}
    </Box>
  );
}
