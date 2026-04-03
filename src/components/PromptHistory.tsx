import { useState, useEffect } from "react";
import { History, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPromptHistory, clearPromptHistory, type PromptHistoryItem } from "@/lib/promptHistory";

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

interface PromptHistoryProps {
  onSelect: (prompt: string) => void;
  refreshKey: number;
}

const PromptHistory = ({ onSelect, refreshKey }: PromptHistoryProps) => {
  const [items, setItems] = useState<PromptHistoryItem[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setItems(getPromptHistory());
  }, [refreshKey]);

  const handleClear = () => {
    clearPromptHistory();
    setItems([]);
  };

  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center gap-2 text-sm font-display font-medium text-foreground tracking-wide uppercase hover:text-primary transition-colors"
        >
          <History className="w-4 h-4 text-muted-foreground" />
          History
          <span className="text-xs text-muted-foreground font-body normal-case">
            ({items.length})
          </span>
        </button>
        {expanded && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-7 px-2.5 text-xs font-display font-medium text-muted-foreground hover:text-destructive gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </Button>
        )}
      </div>

      {expanded && (
        <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
          {items.map((item, i) => (
            <button
              key={`${item.timestamp}-${i}`}
              type="button"
              onClick={() => onSelect(item.prompt_text)}
              className="w-full text-left px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted border border-transparent hover:border-border transition-colors group"
            >
              <p className="text-sm text-foreground font-body line-clamp-2 group-hover:text-primary transition-colors">
                {item.prompt_text}
              </p>
              <span className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                {timeAgo(item.timestamp)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromptHistory;
