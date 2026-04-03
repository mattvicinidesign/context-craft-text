declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __GA_DISABLED__?: boolean;
  }
}

function isTrackingEnabled(): boolean {
  return !window.__GA_DISABLED__ && typeof window.gtag === "function";
}

export function trackCtaClick(buttonName: string, location: string) {
  if (isTrackingEnabled()) {
    window.gtag!("event", "cta_click", {
      button_name: buttonName,
      location,
    });
  }
}
