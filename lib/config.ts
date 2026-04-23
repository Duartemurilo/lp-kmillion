/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 * 
 * Customize your landing page by editing the values below.
 * All text, links, and settings are centralized here for easy editing.
 */

export const siteConfig = {
  // Brand
  name: "Circular",
  tagline: "Build Faster, Ship with Confidence",
  description: "The modern platform for teams who want to move fast without breaking things",
  
  // URLs
  url: "https://example.com",
  twitter: "@circular",
  
  // Navigation
  nav: {
    cta: {
      text: "Try for free",
      href: "#",
    },
    signIn: {
      text: "Sign in",
      href: "#",
    },
  },
};

export const heroConfig = {
  badge: "Now Available",
  headline: {
    line1: "Build Faster",
    line2: "Ship with",
    accent: "Confidence",
  },
  subheadline: "The modern platform for teams who want to move fast without breaking things",
  cta: {
    text: "Get Started",
    href: "#",
  },
};

export const blurHeadlineConfig = {
  text: "O Motor Promocional Kmillion é uma camada inteligente que conecta:",
};

export const testimonialsConfig = {
  title: "Trusted by teams worldwide",
  autoplayInterval: 10000, // milliseconds
};

export const howItWorksConfig = {
  title: "How it works",
  description: "Your platform, configured by experts and launched on an Enterprise plan, ready to grow with you.",
  cta: {
    text: "Schedule kickoff",
    href: "#",
  },
};

export const pricingConfig = {
  title: "Diferencial Técnico Real",
  description: "Comparativo técnico entre o padrão do mercado e a autonomia do Kmillion.",
  billingNote: "",
};

export const faqConfig = {
  title: "Everything you need to know",
  description: "Can't find the answer you're looking for? Reach out!",
  cta: {
    primary: {
      text: "Get Started",
      href: "#",
    },
    secondary: {
      text: "Contact Support",
      href: "#",
    },
  },
};

export const footerConfig = {
  cta: {
    headline: "Start building something amazing today",
    placeholder: "Enter your email",
    button: "Join Waitlist",
  },
  copyright: `© ${new Date().getFullYear()} Circular. All rights reserved.`,
};

/**
 * ============================================================================
 * FEATURE FLAGS
 * ============================================================================
 * 
 * Toggle features on/off without touching component code.
 */

export const features = {
  smoothScroll: true,
  testimonialAutoplay: true,
  parallaxHero: true,
  blurInHeadline: true,
};

/**
 * ============================================================================
 * THEME CONFIGURATION
 * ============================================================================
 * 
 * Colors are defined in globals.css using CSS custom properties.
 * This config controls which theme features are enabled.
 */

export const themeConfig = {
  defaultTheme: "system" as "light" | "dark" | "system",
  enableSystemTheme: true,
};
