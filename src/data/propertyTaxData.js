import propertyTaxRates from "./propertyTaxRates.json";

export const PROPERTY_TAX_AREAS = Object.keys(propertyTaxRates).map((key) => ({
  value: key,
  label: key.replace(/([A-Z])/g, " $1").trim(),
  rate: propertyTaxRates[key],
}));

export function estimatePropertyTax({ area, homeValue }) {
  const rate = propertyTaxRates[area];
  const value = Number(homeValue) || 0;
  const annual = Math.round(value * rate);
  const monthly = Math.round(annual / 12);
  const areaLabel = area.replace(/([A-Z])/g, " $1").trim();

  return {
    annual,
    monthly,
    rate,
    area,
    areaLabel,
  };
}
