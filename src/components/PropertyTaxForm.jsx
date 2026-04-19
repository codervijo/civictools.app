import { useState } from "react";
import {
  Card, CardContent, Box, TextField, MenuItem, Button, InputAdornment,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import { PROPERTY_TAX_AREAS, estimatePropertyTax } from "../data/propertyTaxData";
import ResultsCard from "./ResultsCard";

const fmt = (n) => `$${Number(n).toLocaleString()}`;

function buildResult(estimate) {
  return {
    headline: {
      label: "Estimated Annual Property Tax",
      value: fmt(estimate.annual),
      subtitle: `for a home in ${estimate.areaLabel}`,
    },
    sections: [
      {
        type: "stats",
        title: "At a glance",
        items: [
          { label: "Annual", value: fmt(estimate.annual) },
          { label: "Monthly equivalent", value: fmt(estimate.monthly) },
          { label: "Effective tax rate", value: `${(estimate.rate * 100).toFixed(2)}%` },
        ],
      },
      {
        type: "note",
        title: "How this is calculated",
        body: `Based on the average effective property tax rate in ${estimate.areaLabel} (${(estimate.rate * 100).toFixed(2)}%). Actual taxes may vary based on assessed value, exemptions, and local assessments.`,
      },
    ],
    disclaimer: "Estimate only. Not official tax assessment.",
  };
}

export default function PropertyTaxForm({ onResult }) {
  const [area, setArea] = useState("");
  const [homeValue, setHomeValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const valid = area && Number(homeValue) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setTimeout(() => {
      const estimate = estimatePropertyTax({ area, homeValue });
      onResult(buildResult(estimate));
      setSubmitting(false);
    }, 200);
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            }}
          >
            <TextField
              select fullWidth label="City / County"
              value={area} onChange={(e) => setArea(e.target.value)}
            >
              {PROPERTY_TAX_AREAS.map((a) => (
                <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth label="Home Value" type="number"
              value={homeValue} onChange={(e) => setHomeValue(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              placeholder="750,000"
            />
          </Box>
          <Button
            type="submit" variant="contained" color="primary"
            fullWidth size="large" disabled={!valid || submitting}
            startIcon={<CalculateIcon />}
            sx={{ py: 1.4, fontSize: "1rem", mt: 2 }}
          >
            Estimate Property Tax
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// Re-export the result renderer so ToolPage can use a single ResultsCard
export { ResultsCard };
