export interface PresetContext {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  prompt: string;
  categories: string[];
  description: string;
  examples: Record<string, string>;
}

export const PRESETS: PresetContext[] = [
  {
    slug: "lorem-ipsum-for-saas",
    title: "SaaS",
    metaTitle: "AI Lorem Ipsum for SaaS Apps — Contextual Placeholder Text",
    metaDescription: "Generate realistic placeholder text for SaaS dashboards, onboarding flows, and settings pages. Better than lorem ipsum for product design.",
    h1: "Placeholder Text for SaaS Applications",
    prompt: "Generate UI copy for a SaaS project management dashboard with team collaboration features",
    categories: ["Header", "Subcopy", "CTA", "Tooltip", "Error Message"],
    description: "Generate realistic placeholder content for SaaS dashboards, pricing pages, onboarding flows, and settings screens.",
    examples: {
      Header: "Track Your Team's Progress in Real Time",
      Subcopy: "Collaborate with your team, assign tasks, and hit every deadline with smart project tracking.",
      CTA: "Start Free Trial",
      Tooltip: "Click to assign this task to a team member",
      "Error Message": "Unable to save changes. Please check your connection and try again.",
    },
  },
  {
    slug: "lorem-ipsum-for-fintech",
    title: "Fintech",
    metaTitle: "AI Lorem Ipsum for Fintech — Realistic Finance Placeholder Text",
    metaDescription: "Generate contextual placeholder text for fintech apps, banking dashboards, and financial reports. AI-powered lorem ipsum alternative.",
    h1: "Placeholder Text for Fintech Applications",
    prompt: "Generate UI copy for a personal finance and banking app with investment tracking",
    categories: ["Header", "Subcopy", "Paragraph", "CTA", "Error Message"],
    description: "Generate realistic placeholder content for banking apps, investment dashboards, and financial reports.",
    examples: {
      Header: "Your Portfolio at a Glance",
      Subcopy: "Monitor investments, track spending patterns, and plan for your financial future — all in one place.",
      Paragraph: "Your diversified portfolio gained 4.2% this quarter, outperforming the market benchmark by 1.1%. We recommend reviewing your asset allocation to maintain your target risk level as market conditions evolve.",
      CTA: "View Transactions",
      "Error Message": "Transaction failed. Your bank may have declined this transfer. Please verify your account details.",
    },
  },
  {
    slug: "placeholder-text-for-forms",
    title: "Forms",
    metaTitle: "Placeholder Text for Forms — AI-Generated Form Copy",
    metaDescription: "Generate realistic form labels, validation messages, helper text, and CTAs. Better than lorem ipsum for designing form UX.",
    h1: "Placeholder Text for Form Design",
    prompt: "Generate UI copy for a multi-step signup form with profile creation and preferences",
    categories: ["Header", "Subcopy", "Tooltip", "Error Message", "CTA"],
    description: "Generate realistic labels, validation messages, helper text, and CTAs for designing forms and user flows.",
    examples: {
      Header: "Complete Your Profile",
      Subcopy: "Tell us a bit about yourself so we can personalize your experience.",
      Tooltip: "We'll use this to send you important account notifications",
      "Error Message": "This email is already associated with an account. Try signing in instead.",
      CTA: "Continue",
    },
  },
  {
    slug: "ux-copy-for-dashboards",
    title: "Dashboards",
    metaTitle: "UX Copy for Dashboards — AI Placeholder Text Generator",
    metaDescription: "Generate contextual dashboard copy: widget headers, KPI labels, empty states, and tooltips. AI-powered alternative to lorem ipsum.",
    h1: "UX Copy for Dashboard Design",
    prompt: "Generate UI copy for an analytics dashboard with KPIs, charts, and data tables",
    categories: ["Header", "Subcopy", "Tooltip", "Body", "CTA"],
    description: "Generate realistic widget headers, KPI labels, empty states, and tooltips for designing analytics dashboards.",
    examples: {
      Header: "Monthly Active Users",
      Subcopy: "User engagement is up 12% compared to last month across all segments.",
      Tooltip: "This metric counts unique users who performed at least one action in the last 30 days",
      Body: "Revenue trends show consistent growth across Q3, driven primarily by enterprise plan upgrades. The average contract value increased by 18%, while churn rate held steady at 2.1%. Consider focusing acquisition efforts on the mid-market segment.",
      CTA: "Export Report",
    },
  },
  {
    slug: "lorem-ipsum-for-ecommerce",
    title: "E-commerce",
    metaTitle: "Lorem Ipsum for E-commerce — AI Product Description Generator",
    metaDescription: "Generate realistic product descriptions, category headers, and checkout copy. AI-powered placeholder text for e-commerce design.",
    h1: "Placeholder Text for E-commerce Design",
    prompt: "Generate UI copy for an e-commerce fashion store with product listings and checkout",
    categories: ["Header", "Subcopy", "Paragraph", "Body", "CTA"],
    description: "Generate realistic product descriptions, category headers, and checkout copy for designing online stores.",
    examples: {
      Header: "New Arrivals This Season",
      Subcopy: "Discover curated pieces that blend comfort with contemporary style.",
      Paragraph: "Crafted from 100% organic cotton, this relaxed-fit crewneck features a brushed interior for all-day comfort. Available in six colorways, it pairs effortlessly with everything from tailored trousers to weekend denim.",
      Body: "Free shipping on all orders over $75. Easy 30-day returns — no questions asked. Every purchase supports our commitment to sustainable, ethically sourced materials. Join our rewards program to earn points on every order and unlock exclusive member pricing.",
      CTA: "Add to Cart",
    },
  },
  {
    slug: "lorem-ipsum-for-ai-products",
    title: "AI Products",
    metaTitle: "Lorem Ipsum for AI Products — Contextual AI App Copy",
    metaDescription: "Generate realistic placeholder text for AI product interfaces, chatbot UIs, and ML dashboards. Context-aware lorem ipsum alternative.",
    h1: "Placeholder Text for AI Product Design",
    prompt: "Generate UI copy for an AI writing assistant with document editing and suggestions",
    categories: ["Header", "Subcopy", "Paragraph", "Tooltip", "CTA"],
    description: "Generate realistic placeholder content for AI product interfaces, chatbot UIs, and ML dashboards.",
    examples: {
      Header: "Write Smarter with AI Assistance",
      Subcopy: "Get real-time suggestions, tone adjustments, and clarity improvements as you write.",
      Paragraph: "Our AI analyzes your writing style and audience to provide contextual suggestions. From grammar corrections to structural improvements, every recommendation is tailored to your voice and goals. Accept, modify, or dismiss suggestions with a single click.",
      Tooltip: "AI confidence score indicates how certain the model is about this suggestion",
      CTA: "Try AI Rewrite",
    },
  },
];
