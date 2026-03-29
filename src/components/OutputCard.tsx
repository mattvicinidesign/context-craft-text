import { Copy, RefreshCw, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface OutputCardProps {
  category: string;
  content: string;
  isLoading?: boolean;
  onRegenerate: () => void;
  disabled?: boolean;
}

const OutputCard = ({ category, content, isLoading, onRegenerate, disabled }: OutputCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface/50">
        <span className="text-xs font-display font-semibold text-primary tracking-wider uppercase">
          {category}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={onRegenerate}
            disabled={disabled || isLoading}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
            title="Regenerate"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleCopy}
            disabled={!content}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
            title="Copy"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      <div className="px-4 py-3 min-h-[60px]">
        {isLoading && !content ? (
          <div className="space-y-2">
            <div className="h-3 bg-secondary rounded animate-pulse w-3/4" />
            <div className="h-3 bg-secondary rounded animate-pulse w-1/2" />
          </div>
        ) : (
          <p className="text-sm text-card-foreground leading-relaxed font-body whitespace-pre-wrap">
            {content || <span className="text-muted-foreground italic">Awaiting generation...</span>}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default OutputCard;
