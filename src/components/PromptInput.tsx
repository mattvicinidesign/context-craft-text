import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PromptInput = ({ value, onChange, disabled }: PromptInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-display font-medium text-foreground tracking-wide uppercase">
        Prompt
      </label>
      <Textarea
        placeholder='e.g. "Create issue language for VoteOnIssues app (users creating political issues)"'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="min-h-[120px] bg-surface border-border text-foreground placeholder:text-muted-foreground font-body resize-none focus:ring-1 focus:ring-primary focus:border-primary"
      />
    </div>
  );
};

export default PromptInput;
