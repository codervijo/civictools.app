import { Typography } from "@mui/material";

export default function Disclaimer({ text }) {
  return (
    <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 3 }}>
      {text || "Estimates only. Not official guidance."}
    </Typography>
  );
}
