import { Box, Typography, Divider } from "@mui/material";

export default function StatsList({ items, title }) {
  return (
    <Box>
      {title && (
        <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1 }}>
          {title}
        </Typography>
      )}
      <Box sx={{ mt: 1 }}>
        {items.map((item, i) => (
          <Box key={item.label}>
            <Box
              sx={{
                display: "flex", justifyContent: "space-between",
                alignItems: "baseline", py: 1.25, gap: 2,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
              >
                {item.value}
              </Typography>
            </Box>
            {i < items.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
