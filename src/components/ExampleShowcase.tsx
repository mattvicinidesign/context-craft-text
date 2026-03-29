import { PRESETS } from "@/lib/presets";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ExampleShowcase = () => {
  const showcase = PRESETS.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-lg font-display font-bold text-foreground mb-2 tracking-tight">
        Example Use Cases
      </h2>
      <p className="text-sm text-muted-foreground font-body mb-6">
        Pre-built prompts for common design scenarios. Click to try one.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {showcase.map((preset) => (
          <Link
            key={preset.slug}
            to={`/${preset.slug}`}
            className="group bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors"
          >
            <h3 className="text-sm font-display font-semibold text-foreground mb-2">
              {preset.title}
            </h3>
            <p className="text-xs text-muted-foreground font-body mb-3 leading-relaxed">
              {preset.description}
            </p>
            <div className="space-y-2 mb-4">
              {Object.entries(preset.examples).slice(0, 2).map(([cat, text]) => (
                <div key={cat} className="bg-surface rounded-md px-3 py-2">
                  <span className="text-[10px] font-display text-primary uppercase tracking-wider">
                    {cat}
                  </span>
                  <p className="text-xs text-surface-foreground font-body mt-0.5 line-clamp-2">
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-primary font-display group-hover:gap-2 transition-all">
              Try this preset <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {PRESETS.slice(3).map((preset) => (
          <Link
            key={preset.slug}
            to={`/${preset.slug}`}
            className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:text-foreground transition-colors font-display"
          >
            {preset.title}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ExampleShowcase;
