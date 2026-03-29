import { useState, useCallback } from "react";
import { Sparkles, Zap, Smile } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PromptInput from "@/components/PromptInput";
import ToneSelector, { type Tone } from "@/components/ToneSelector";
import CategoryBuilder from "@/components/CategoryBuilder";
import OutputPanel from "@/components/OutputPanel";
import FAQSection from "@/components/FAQSection";
import ExampleShowcase from "@/components/ExampleShowcase";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_CATEGORIES = ["Header", "Subcopy", "Paragraph", "Body"];

// Client-side rate limiting
let lastGenerateTime = 0;
const MIN_INTERVAL_MS = 3000;

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState<Tone>("Neutral");
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [outputs, setOutputs] = useState<Record<string, string>>({});
  const [loadingCategories, setLoadingCategories] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = useCallback(
    async (categoriesToGenerate: string[]) => {
      const trimmed = prompt.trim();
      if (!trimmed) {
        toast.error("Please enter a prompt first");
        return;
      }
      if (trimmed.length < 3) {
        toast.error("Prompt must be at least 3 characters");
        return;
      }
      if (trimmed.length > 1000) {
        toast.error("Prompt must be under 1000 characters");
        return;
      }
      if (categoriesToGenerate.length === 0) {
        toast.error("Add at least one category");
        return;
      }
      if (categoriesToGenerate.length > 15) {
        toast.error("Maximum 15 categories allowed");
        return;
      }

      // Client-side rate limit
      const now = Date.now();
      if (now - lastGenerateTime < MIN_INTERVAL_MS) {
        toast.error("Please wait a moment before generating again");
        return;
      }
      lastGenerateTime = now;

      setIsGenerating(true);
      setLoadingCategories(new Set(categoriesToGenerate));

      try {
        const { data, error } = await supabase.functions.invoke("generate-content", {
          body: { prompt: trimmed, tone, categories: categoriesToGenerate },
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
            <p className="text-base font-display font-bold text-foreground tracking-tight">
              Contextual Ipsum
            </p>
            <p className="text-xs text-muted-foreground font-body">
              AI-powered lorem ipsum alternative for UI design
            </p>
          </div>
        </div>
      </header>

      {/* Hero / H1 */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight mb-2">
          Generate Realistic Placeholder Text
          <span className="text-primary"> (Context-Aware Placeholder Text)</span>
        </h1>
        <p className="text-sm text-muted-foreground font-body max-w-2xl leading-relaxed">
          Stop using meaningless filler text. This AI lorem ipsum generator creates context-aware
          placeholder content for your UI — headers, CTAs, error messages, and more — tailored to
          your product scenario.
        </p>
      </section>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 min-h-[calc(100vh-280px)]">
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

      {/* Example Showcase */}
      <ExampleShowcase />

      {/* FAQ */}
      <FAQSection />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Contextual Ipsum — AI Lorem Ipsum Generator",
            url: "https://context-craft-text.lovable.app",
            description:
              "AI-powered lorem ipsum alternative that generates realistic, context-aware placeholder text for UI design and prototyping.",
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is lorem ipsum?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lorem ipsum is placeholder text commonly used in design and publishing to fill space before final copy is written.",
                },
              },
              {
                "@type": "Question",
                name: "What is a better alternative to lorem ipsum?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Contextual placeholder text generated by AI is a better alternative. Tools like Contextual Ipsum generate realistic copy based on your product scenario.",
                },
              },
              {
                "@type": "Question",
                name: "How does the AI lorem ipsum generator work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Describe your product scenario, choose a tone, and select content categories. The AI generates contextually appropriate copy for each category in seconds.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
};

export default Index;
