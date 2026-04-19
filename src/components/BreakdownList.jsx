import { Box, Typography, Divider } from "@mui/material";

const fmt = (n) => `$${Number(n).toLocaleString()}`;

export default function BreakdownList({ items, title = "Breakdown" }) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1 }}>
        {title}
      </Typography>
      <Box sx={{ mt: 1 }}>
        {items.map((item, i) => (
          <Box key={item.label}>
            <Box
              sx={{
                display: "flex", justifyContent: "space-between",
                alignItems: "baseline", py: 1.25, gap: 2,
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.label}
                </Typography>
                {item.note && (
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {item.note}
                  </Typography>
                )}
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                {fmt(item.amount)}
              </Typography>
            </Box>
            {i < items.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
