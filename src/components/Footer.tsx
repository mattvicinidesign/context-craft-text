import { APP_VERSION } from "@/lib/version";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          <a
            href="http://www.mattvicinidesign.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-foreground transition-colors"
          >
            Matt Vicini Design LLC
          </a>
          ™ © {currentYear}
        </span>
        <span>Version {APP_VERSION}</span>
      </div>
    </footer>
  );
};

export default Footer;
