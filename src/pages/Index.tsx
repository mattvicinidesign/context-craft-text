import { useState, useCallback } from "react";
import { Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PromptInput from "@/components/PromptInput";
import ToneSelector, { type Tone } from "@/components/ToneSelector";
import CategoryBuilder from "@/components/CategoryBuilder";
import OutputPanel from "@/components/OutputPanel";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_CATEGORIES = ["Header", "Subcopy", "Paragraph", "Body"];

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState<Tone>("Neutral");
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [outputs, setOutputs] = useState<Record<string, string>>({});
  const [loadingCategories, setLoadingCategories] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = useCallback(
    async (categoriesToGenerate: string[]) => {
      if (!prompt.trim()) {
        toast.error("Please enter a prompt first");
        return;
      }
      if (categoriesToGenerate.length === 0) {
        toast.error("Add at least one category");
        return;
      }

      setIsGenerating(true);
      setLoadingCategories(new Set(categoriesToGenerate));

      try {
        const { data, error } = await supabase.functions.invoke("generate-content", {
          body: { prompt: prompt.trim(), tone, categories: categoriesToGenerate },
        });

        if (error) throw error;

        if (data?.results) {
          setOutputs((prev) => ({ ...prev, ...data.results }));
        }
      } catch (err: any) {
        console.error("Generation error:", err);
        toast.error(err.message || "Failed to generate content");
      } finally {
        setIsGenerating(false);
        setLoadingCategories(new Set());
      }
    },
    [prompt, tone]
  );

  const handleGenerate = () => generateContent(categories);
  const handleRefreshAll = () => generateContent(categories);
  const handleRegenerateCategory = (category: string) => generateContent([category]);

  const hasOutputs = Object.keys(outputs).length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-display font-bold text-foreground tracking-tight">
              Contextual Ipsum
            </h1>
            <p className="text-xs text-muted-foreground font-body">
              Structured placeholder content, not lorem ipsum
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 min-h-[calc(100vh-120px)]">
          {/* Left Panel */}
          <div className="space-y-5">
            <PromptInput value={prompt} onChange={setPrompt} disabled={isGenerating} />
            <ToneSelector value={tone} onChange={setTone} disabled={isGenerating} />
            <CategoryBuilder categories={categories} onChange={setCategories} disabled={isGenerating} />

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim() || categories.length === 0}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold tracking-wide"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>

          {/* Right Panel */}
          <div className="bg-card border border-border rounded-xl p-5">
            <OutputPanel
              categories={categories}
              outputs={outputs}
              loadingCategories={loadingCategories}
              onRegenerateCategory={handleRegenerateCategory}
              onRefreshAll={handleRefreshAll}
              isGenerating={isGenerating}
              hasOutputs={hasOutputs}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
