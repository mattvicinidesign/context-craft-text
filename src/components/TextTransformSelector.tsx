const TRANSFORMS = ["None", "AP Title Case"] as const;

export type TextTransform = (typeof TRANSFORMS)[number];

interface TextTransformSelectorProps {
  value: TextTransform;
  onChange: (transform: TextTransform) => void;
  disabled?: boolean;
}

const TextTransformSelector = ({ value, onChange, disabled }: TextTransformSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-display font-medium text-foreground tracking-wide uppercase">
        Text Transform
      </label>
      <div className="flex flex-wrap gap-2">
        {TRANSFORMS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            disabled={disabled}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 border ${
              value === t
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-surface text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TextTransformSelector;
