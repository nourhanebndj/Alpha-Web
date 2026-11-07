import {
  SiOdoo,
  SiWordpress,
  SiWoocommerce,
  SiShopify,
  SiWebflow,
  SiPrestashop,
  SiFlutter,
  SiReact,
  SiNextdotjs,
  SiLaravel,
  SiNodedotjs,
} from "react-icons/si";

// Données communes à toutes les langues. Les textes sont dans src/locales/*.json :
// chaque tableau ci-dessous suit le même ordre que la liste correspondante.

export const NAV = [
  { href: "#services", key: "services" },
  { href: "#realisations", key: "projects" },
  { href: "#methode", key: "method" },
  { href: "#avis", key: "reviews" },
];

export const TECHS = [
  { name: "Odoo", icon: SiOdoo },
  { name: "WordPress", icon: SiWordpress },
  { name: "WooCommerce", icon: SiWoocommerce },
  { name: "Shopify", icon: SiShopify },
  { name: "Webflow", icon: SiWebflow },
  { name: "PrestaShop", icon: SiPrestashop },
  { name: "Flutter", icon: SiFlutter },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Laravel", icon: SiLaravel },
  { name: "Node.js", icon: SiNodedotjs },
];

export const SERVICE_ICONS = ["code", "mobile", "chart"];

export const STATS = [
  { n: 10, prefix: "+" },
  { n: 4, prefix: "" },
  { n: 5, prefix: "" },
  { n: 3, prefix: "+" },
];

export const COMMITMENT_ICONS = ["team", "chat", "clock", "shield"];

export const PROJECTS = [
  { image: "/images/projects/khidmacar.webp", url: "https://khidmacar.com/" },
  { image: "/images/projects/pointdelocation.webp", url: "https://lepointdelocation.com/" },
  { image: "/images/projects/legourmettlemcen.webp", url: "https://www.legourmettlemcen.com/" },
];

export const CONTACT = {
  email: "contact@alphaweb.dz",
  phone: "+213 658 93 43 40",
};
