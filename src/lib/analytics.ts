declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackCtaClick(buttonName: string, location: string) {
  if (typeof window.gtag === "function") {
    window.gtag("event", "cta_click", {
      button_name: buttonName,
      location,
    });
  }
}
