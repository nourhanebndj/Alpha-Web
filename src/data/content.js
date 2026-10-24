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
  SiSwift,
  SiKotlin,
  SiGoogleanalytics,
} from "react-icons/si";


export const NAV = [
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#methode", label: "Méthode" },
  { href: "#avis", label: "Avis clients" },
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

export const SERVICES = [
  {
    icon: "code",
    title: "Sites web",
    text: "Des sites modernes, rapides et adaptés à vos objectifs.",
    items: [
      "Sites vitrines",
      "Sites e-commerce",
      "Sites web sur mesure",
    ],
  },
  {
    icon: "mobile",
    title: "Applications",
    text: "Des applications intuitives pour simplifier le quotidien de vos utilisateurs.",
    items: [
      "Applications mobiles iOS et Android",
      "Applications web",
      "Plateformes sur mesure",
    ],
  },
  {
    icon: "chart",
    title: "Logiciels ERP",
    text: "Des solutions de gestion pour centraliser et optimiser votre activité.",
    items: [
      "Gestion commerciale et des stocks",
      "Gestion des clients et des commandes",
      "Automatisation des processus",
    ],
  },
];

export const STATS = [
  { n: 10, prefix: "+", suffix: "", label: "projets livrés" },
  { n: 4, prefix: "", suffix: " ans", label: "d’expertise digitale" },
  {
    n: 5,
    prefix: "",
    suffix: "%",
    label: "de clients qui continuent avec nous",
  },
  { n: 3, prefix: "+", suffix: "", label: "experts à vos côtés" },
];


export const COMMITMENTS = [
  {
    icon: "team",
    title: "Une approche personnalisée",
    text: "Chaque projet commence par l’écoute de vos besoins afin de concevoir une solution adaptée à vos objectifs et à votre activité.",
  },
  {
    icon: "chat",
    title: "Une communication transparente",
    text: "Vous restez informé à chaque étape grâce à des échanges réguliers et à un suivi clair de l’avancement de votre projet.",
  },
  {
    icon: "clock",
    title: "Des délais maîtrisés",
    text: "Une organisation structurée et une planification précise pour avancer efficacement et respecter les échéances convenues.",
  },
  {
    icon: "shield",
    title: "Fiabilité et évolutivité",
    text: "Des solutions conçues avec soin, faciles à faire évoluer et pensées pour accompagner durablement le développement de votre activité.",
  },
];


export const PROJECTS = [
  {
    kind: "Plateforme web",
    title: "KhidmaCar",
    text: "Une plateforme dédiée aux services de transport, avec une expérience de réservation pensée pour simplifier les déplacements.",
    image: "/images/projects/khidmacar.png",
    alt: "Aperçu de la plateforme web KhidmaCar",
    url: "https://khidmacar.com/",
  },
  {
    kind: "Application mobile",
    title: "Med App",
    text: "Une application mobile dédiée aux services de santé, conçue pour faciliter l’accès aux informations et aux services médicaux.",
    image: "/images/projects/medapp.png",
    alt: "Aperçu de l'application mobile Med App",
  },
  {
    kind: "E-commerce",
    title: "Ayanelle.shop",
    text: "Une boutique en ligne dédiée à la vente de produits, avec un parcours d'achat simple et une présentation soignée.",
    image: "/images/projects/ayanelleshop.png",
    alt: "Aperçu de la boutique en ligne Ayanelle",
    url: "https://ayanelle.shop/",
  },
];

export const STEPS = [
  {
    title: "Comprendre",
    short: "Besoins, objectifs et priorités",
    text: "Nous échangeons sur votre projet, vos objectifs, vos utilisateurs et vos besoins afin de définir une direction claire.",
    tags: ["Analyse des besoins", "Objectifs", "Planification"],
  },
  {
    title: "Concevoir",
    short: "Structure, parcours et maquettes",
    text: "Nous définissons la structure et l’expérience utilisateur, puis réalisons des maquettes que vous pouvez valider avant le développement.",
    tags: ["Architecture", "UX/UI Design", "Prototype"],
  },
  {
    title: "Développer",
    short: "Réalisation, tests et livraison",
    text: "Nous donnons vie au projet avec un développement progressif, des tests réguliers et une mise en ligne préparée avec soin.",
    tags: ["Développement", "Tests et validation", "Livraison"],
  },
  {
    title: "Faire évoluer",
    short: "Suivi, améliorations et pérennité",
    text: "Après la livraison, nous pouvons assurer le suivi du projet, identifier les améliorations utiles et l’adapter à vos nouveaux besoins.",
    tags: ["Suivi", "Améliorations", "Maintenance"],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Une équipe réactive qui a compris notre métier dès le premier atelier. Le site est rapide et nos clients le remarquent.",
    name: "Sarah M.",
    role: "Responsable communication",
    sector: "E-commerce",
  },
  {
    quote:
      "L’application a été livrée dans les délais, avec un vrai suivi après la mise en ligne.",
    name: "Karim B.",
    role: "Directeur général",
    sector: "Logistique",
  },
  {
    quote:
      "Nos demandes sont traitées avec sérieux, même dans l’urgence. Un partenaire de confiance.",
    name: "Yasmine L.",
    role: "Cheffe de projet digital",
    sector: "Santé",
  },
  {
    quote:
      "Notre nouvelle plateforme a fait gagner du temps à toute l’équipe. Le résultat dépasse nos attentes.",
    name: "Nadir H.",
    role: "Directeur des opérations",
    sector: "Industrie",
  },
  {
    quote:
      "Le référencement a doublé nos demandes de devis en quelques mois. Merci pour la transparence des rapports.",
    name: "Amel R.",
    role: "Fondatrice",
    sector: "Services",
  },
];

export const FAQ = [
  {
    q: "Combien coûte un site ou une application ?",
    a: "Le prix dépend de la complexité et des fonctionnalités. Nous établissons un devis détaillé et gratuit après un premier échange.",
  },
  {
    q: "Quels sont vos délais ?",
    a: "Comptez quelques semaines pour un site vitrine et deux à quatre mois pour une application mobile, selon le périmètre.",
  },
  {
    q: "Pourrai-je modifier mon site seul ?",
    a: "Oui. Nous formons votre équipe pour gérer les contenus en autonomie.",
  },
  {
    q: "Assurez-vous la maintenance ?",
    a: "Oui : mises à jour, sauvegardes, sécurité et évolutions après la livraison.",
  },
];

export const PROJECT_TYPES = [
  "Site web",
  "Application mobile",
  "E-commerce",
  "Logiciels ERP",
];

export const CONTACT = {
  email: "contact@alphaweb.dz",
  phone: "+213 658 93 43 40",
};
