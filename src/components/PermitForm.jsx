import { useState, useEffect } from "react";
import {
  Card, CardContent, Box, TextField, MenuItem, Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CITIES, PROJECT_TYPES, estimatePermit } from "../data/permitData";

const fmt = (n) => `$${Number(n).toLocaleString()}`;

function buildPermitResult(estimate) {
  return {
    headline: {
      label: "Estimated Permit Cost",
      value: fmt(estimate.total),
      subtitle: `for your project in ${estimate.city}`,
    },
    sections: [
      {
        type: "breakdown",
        title: "Breakdown",
        items: estimate.breakdown,
        timeline: estimate.timeline,
      },
      {
        type: "steps",
        title: "Process Steps",
        items: estimate.steps,
      },
    ],
    disclaimer:
      "Estimates only. Not official city guidance. Always confirm with your local building department.",
    meta: { city: estimate.city },
  };
}

export default function PermitForm({ onResult, initialCity = "", initialType = "", initialValue = "" }) {
  const [city, setCity] = useState(initialCity);
  const [projectType, setProjectType] = useState(initialType);
  const [projectValue, setProjectValue] = useState(initialValue ? String(initialValue) : "");
  const [submitting, setSubmitting] = useState(false);

  // Auto-submit when all initial values are provided
  useEffect(() => {
    if (initialCity && initialType && initialValue) {
      const estimate = estimatePermit({ city: initialCity, projectType: initialType, projectValue: initialValue });
      onResult(buildPermitResult(estimate));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const valid = city && projectType && Number(projectValue) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setTimeout(() => {
      const estimate = estimatePermit({ city, projectType, projectValue });
      onResult(buildPermitResult(estimate));
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
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            }}
          >
            <TextField
              select fullWidth label="City"
              value={city} onChange={(e) => setCity(e.target.value)}
            >
              {CITIES.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </TextField>
            <TextField
              select fullWidth label="Project Type"
              value={projectType} onChange={(e) => setProjectType(e.target.value)}
            >
              {PROJECT_TYPES.map((p) => (
                <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth label="Project Value" type="number"
              value={projectValue} onChange={(e) => setProjectValue(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              placeholder="25,000"
            />
          </Box>
          <Button
            type="submit" variant="contained" color="primary"
            fullWidth size="large" disabled={!valid || submitting}
            startIcon={<SearchIcon />}
            sx={{ py: 1.4, fontSize: "1rem", mt: 2 }}
          >
            Estimate Permit Cost
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
