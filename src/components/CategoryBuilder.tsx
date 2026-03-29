import { X, Plus, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DEFAULT_PRESETS = ["Header", "Subcopy", "Paragraph", "Body", "CTA", "Tooltip", "Error Message"];

interface CategoryBuilderProps {
  categories: string[];
  onChange: (categories: string[]) => void;
  disabled?: boolean;
}

const CategoryBuilder = ({ categories, onChange, disabled }: CategoryBuilderProps) => {
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      onChange([...categories, trimmed]);
      setNewCategory("");
    }
  };

  const removeCategory = (index: number) => {
    onChange(categories.filter((_, i) => i !== index));
  };

  const addPreset = (preset: string) => {
    if (!categories.includes(preset)) {
      onChange([...categories, preset]);
    }
  };

  const availablePresets = DEFAULT_PRESETS.filter((p) => !categories.includes(p));

  return (
    <div className="space-y-3">
      <label className="text-sm font-display font-medium text-foreground tracking-wide uppercase">
        Categories
      </label>

      <div className="space-y-1.5">
        {categories.map((cat, i) => (
          <div
            key={cat}
            className="flex items-center gap-2 bg-surface rounded-md px-3 py-2 border border-border group"
          >
            <GripVertical className="w-3.5 h-3.5 text-muted-foreground opacity-40" />
            <span className="text-sm text-foreground flex-1 font-medium">{cat}</span>
            <button
              onClick={() => removeCategory(i)}
              disabled={disabled}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add custom category..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
          disabled={disabled}
          className="bg-surface border-border text-foreground placeholder:text-muted-foreground text-sm"
        />
        <Button
          onClick={addCategory}
          disabled={disabled || !newCategory.trim()}
          size="sm"
          variant="outline"
          className="border-border text-muted-foreground hover:text-foreground shrink-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {availablePresets.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {availablePresets.map((preset) => (
            <button
              key={preset}
              onClick={() => addPreset(preset)}
              disabled={disabled}
              className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground hover:text-foreground transition-colors border border-transparent hover:border-border disabled:opacity-50"
            >
              + {preset}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBuilder;
