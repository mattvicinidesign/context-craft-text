const APP_VERSION = "v1.0.0";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>Matt Vicini LLC™ © {currentYear}</span>
        <span>Version {APP_VERSION}</span>
      </div>
    </footer>
  );
};

export default Footer;
