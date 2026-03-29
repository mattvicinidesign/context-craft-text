import { RefreshCw, Copy, Download } from "lucide-react";
import { useState } from "react";
import OutputCard from "./OutputCard";
import { toast } from "sonner";

interface OutputPanelProps {
  categories: string[];
  outputs: Record<string, string>;
  loadingCategories: Set<string>;
  onRegenerateCategory: (category: string) => void;
  onRefreshAll: () => void;
  isGenerating: boolean;
  hasOutputs: boolean;
}

const OutputPanel = ({
  categories,
  outputs,
  loadingCategories,
  onRegenerateCategory,
  onRefreshAll,
  isGenerating,
  hasOutputs,
}: OutputPanelProps) => {
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = async () => {
    const text = categories
      .map((cat) => `[${cat}]\n${outputs[cat] || ""}`)
      .join("\n\n");
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    toast.success("All content copied");
    setTimeout(() => setCopiedAll(false), 1500);
  };

  const handleExportJSON = () => {
    const data: Record<string, string> = {};
    categories.forEach((cat) => {
      data[cat.toLowerCase().replace(/\s+/g, "_")] = outputs[cat] || "";
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contextual-ipsum.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported as JSON");
  };

  const handleExportText = () => {
    const text = categories
      .map((cat) => `${cat.toUpperCase()}\n${"—".repeat(cat.length)}\n${outputs[cat] || ""}`)
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contextual-ipsum.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported as text");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-display font-semibold text-foreground tracking-wide uppercase">
          Output
        </h2>
        {hasOutputs && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopyAll}
              className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
              title="Copy all"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportText}
              className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
              title="Export as text"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportJSON}
              className="px-2 py-1 rounded text-xs font-display text-muted-foreground hover:text-foreground transition-colors border border-border"
              title="Export as JSON"
            >
              JSON
            </button>
            <button
              onClick={onRefreshAll}
              disabled={isGenerating}
              className="p-1.5 rounded text-muted-foreground hover:text-primary transition-colors disabled:opacity-40 ml-1"
              title="Refresh all"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
            </button>
          </div>
        )}
      </div>

      {!hasOutputs && categories.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-sm text-center font-body">
            Add categories and write a prompt to generate contextual content.
          </p>
        </div>
      ) : !hasOutputs ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-sm text-center font-body">
            Hit <span className="font-display text-primary">Generate</span> to create content.
          </p>
        </div>
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <OutputCard
              key={cat}
              category={cat}
              content={outputs[cat] || ""}
              isLoading={loadingCategories.has(cat)}
              onRegenerate={() => onRegenerateCategory(cat)}
              disabled={isGenerating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OutputPanel;
