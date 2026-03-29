const TONES = ["Neutral", "Persuasive", "Formal", "Casual"] as const;

export type Tone = (typeof TONES)[number];

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
  disabled?: boolean;
}

const ToneSelector = ({ value, onChange, disabled }: ToneSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-display font-medium text-foreground tracking-wide uppercase">
        Tone
      </label>
      <div className="flex flex-wrap gap-2">
        {TONES.map((tone) => (
          <button
            key={tone}
            onClick={() => onChange(tone)}
            disabled={disabled}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 border ${
              value === tone
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-surface text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {tone}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
