import PermitForm from "../components/PermitForm";
import PropertyTaxForm from "../components/PropertyTaxForm";
import toolsData from "../data/tools.json";

const COMPONENTS = {
  permit: PermitForm,
  "property-tax": PropertyTaxForm,
};

export const TOOLS = toolsData.tools.map((t) => ({
  ...t,
  component: COMPONENTS[t.slug],
}));

export const getToolBySlug = (slug) => TOOLS.find((t) => t.slug === slug);
