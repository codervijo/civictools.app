import data from "./permitData.json";

export const CITIES = data.cities;
export const PROJECT_TYPES = data.projectTypes;

export function estimatePermit({ city, projectType, projectValue }) {
  const cfg = data.typeConfig[projectType];
  const mult = data.cityMultiplier[city] ?? 1;
  const value = Number(projectValue) || 0;

  const baseFee = Math.round(cfg.base * mult);
  const valueFee = Math.round(value * cfg.rate * mult);
  const otherFees = Math.round(cfg.other * mult);
  const total = baseFee + valueFee + otherFees;

  return {
    total,
    breakdown: [
      { label: "Base permit fee", amount: baseFee },
      { label: "Value-based fee", amount: valueFee, note: `${(cfg.rate * 100).toFixed(2)}% of project value` },
      { label: "Plan check & other fees", amount: otherFees },
    ],
    steps: cfg.steps,
    timeline: cfg.timeline,
    city,
  };
}
