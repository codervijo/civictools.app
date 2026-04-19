import PermitForm from "../components/PermitForm";
import PropertyTaxForm from "../components/PropertyTaxForm";

// Central registry — add a new tool here and it shows up in nav + routes.
export const TOOLS = [
  {
    slug: "permit",
    path: "/permit",
    name: "Permit Cost Tool",
    shortName: "Permit Costs",
    chip: "Permit Cost + Process Tool",
    headline: "Estimate Permit Costs Instantly",
    subtext: "Get permit fees, steps, and timelines for your project in seconds.",
    component: PermitForm,
  },
  {
    slug: "property-tax",
    path: "/property-tax",
    name: "Property Tax Estimator",
    shortName: "Property Tax",
    chip: "Property Tax Estimator",
    headline: "Estimate Your Property Tax",
    subtext: "Get an instant estimate of annual and monthly property tax for your home.",
    component: PropertyTaxForm,
  },
];

export const getToolBySlug = (slug) => TOOLS.find((t) => t.slug === slug);
