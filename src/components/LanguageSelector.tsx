import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "pt", label: "Portuguese" },
  { code: "it", label: "Italian" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

interface LanguageSelectorProps {
  value: LanguageCode;
  onChange: (lang: LanguageCode) => void;
  disabled?: boolean;
}

const LanguageSelector = ({ value, onChange, disabled }: LanguageSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-display font-medium text-foreground tracking-wide uppercase">
        Language
      </label>
      <Select value={value} onValueChange={(v) => onChange(v as LanguageCode)} disabled={disabled}>
        <SelectTrigger className="w-full bg-surface border-border">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
