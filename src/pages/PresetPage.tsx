import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { Sparkles, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PromptInput from "@/components/PromptInput";
import ToneSelector, { type Tone } from "@/components/ToneSelector";
import CategoryBuilder from "@/components/CategoryBuilder";
import OutputPanel from "@/components/OutputPanel";
import FAQSection from "@/components/FAQSection";
import { PRESETS } from "@/lib/presets";
import { supabase } from "@/integrations/supabase/client";

const PresetPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const preset = PRESETS.find((p) => p.slug === slug);

  if (!preset) return <Navigate to="/" replace />;

  const [prompt, setPrompt] = useState(preset.prompt);
  const [tone, setTone] = useState<Tone>("Neutral");
  const [categories, setCategories] = useState<string[]>(preset.categories);
  const [outputs, setOutputs] = useState<Record<string, string>>(preset.examples);
  const [loadingCategories, setLoadingCategories] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (preset) {
      setPrompt(preset.prompt);
      setCategories(preset.categories);
      setOutputs(preset.examples);
    }
  }, [preset]);

  const generateContent = useCallback(
    async (categoriesToGenerate: string[]) => {
      if (!prompt.trim()) {
        toast.error("Please enter a prompt first");
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
        toast.error(err.message || "Failed to generate content");
      } finally {
        setIsGenerating(false);
        setLoadingCategories(new Set());
      }
    },
    [prompt, tone]
  );

  const hasOutputs = Object.keys(outputs).length > 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Link to="/" className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
            <Zap className="w-4 h-4 text-primary" />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-display font-bold text-foreground tracking-tight">
              {preset.h1}
            </h1>
            <p className="text-xs text-muted-foreground font-body">
              AI-powered contextual placeholder text — better than lorem ipsum
            </p>
          </div>
          <Link to="/" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-display transition-colors">
            <ArrowLeft className="w-3 h-3" /> All presets
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Intro text for SEO */}
        <div className="mb-6 max-w-2xl">
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            {preset.description} Powered by AI, this lorem ipsum generator creates realistic placeholder text
            tailored to {preset.title.toLowerCase()} scenarios. Edit the prompt below or hit Generate for new variations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 min-h-[calc(100vh-220px)]">
          <div className="space-y-5">
            <PromptInput value={prompt} onChange={setPrompt} disabled={isGenerating} />
            <ToneSelector value={tone} onChange={setTone} disabled={isGenerating} />
            <CategoryBuilder categories={categories} onChange={setCategories} disabled={isGenerating} />
            <Button
              onClick={() => generateContent(categories)}
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

          <div className="bg-card border border-border rounded-xl p-5">
            <OutputPanel
              categories={categories}
              outputs={outputs}
              loadingCategories={loadingCategories}
              onRegenerateCategory={(cat) => generateContent([cat])}
              onRefreshAll={() => generateContent(categories)}
              isGenerating={isGenerating}
              hasOutputs={hasOutputs}
            />
          </div>
        </div>
      </main>

      <FAQSection />
    </div>
  );
};

export default PresetPage;
