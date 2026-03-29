import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter (per IP, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // max requests per window
const RATE_WINDOW_MS = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT;
}

// Input sanitization
function sanitizeText(text: string, maxLen: number): string {
  return text
    .slice(0, maxLen)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "") // strip control chars
    .trim();
}

const VALID_TONES = ["Neutral", "Persuasive", "Formal", "Casual"];
const VALID_LANGUAGES: Record<string, string> = {
  en: "English", es: "Spanish", fr: "French",
  de: "German", pt: "Portuguese", it: "Italian",
};
const MAX_PROMPT_LENGTH = 1000;
const MAX_CATEGORY_LENGTH = 50;
const MAX_CATEGORIES = 15;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(clientIp)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { prompt, tone, categories, includeEmojis, language } = body;

    // Validate language
    const cleanLanguage = language && VALID_LANGUAGES[language] ? language : "en";
    const languageName = VALID_LANGUAGES[cleanLanguage];

    // Validate prompt
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid prompt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanPrompt = sanitizeText(prompt, MAX_PROMPT_LENGTH);
    if (cleanPrompt.length < 3) {
      return new Response(JSON.stringify({ error: "Prompt too short (min 3 characters)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate tone
    const cleanTone = tone && VALID_TONES.includes(tone) ? tone : "Neutral";

    // Validate categories
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return new Response(JSON.stringify({ error: "Missing or empty categories" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (categories.length > MAX_CATEGORIES) {
      return new Response(JSON.stringify({ error: `Max ${MAX_CATEGORIES} categories allowed` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanCategories: string[] = [];
    for (const cat of categories) {
      if (typeof cat !== "string") continue;
      const clean = sanitizeText(cat, MAX_CATEGORY_LENGTH);
      if (clean.length > 0 && /^[a-zA-Z0-9 _-]+$/.test(clean)) {
        cleanCategories.push(clean);
      }
    }

    if (cleanCategories.length === 0) {
      return new Response(JSON.stringify({ error: "No valid categories provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const categoryList = cleanCategories.map((c: string) => `"${c}"`).join(", ");

    const emojiInstruction = includeEmojis
      ? `\n\nEMOJI RULES: Include contextually relevant emojis in the output. Rules:
- Max 1-2 emojis per section
- Place emojis at the start or end of sentences only (never mid-word)
- Match tone: Neutral=minimal/subtle, Persuasive=more expressive, Formal=avoid or very limited, Casual=more frequent
- Emojis must enhance meaning, not be random
- No spammy emoji chains
- Keep outputs professional and usable in real UI`
      : "\n\nDo NOT include any emojis in the output.";

    const systemPrompt = `You are a professional UX copywriter. Generate realistic, context-aware placeholder content for UI design and prototyping. NEVER use lorem ipsum or gibberish. Content must be concise, UI-appropriate, and reflect the given context.

IMPORTANT: You must ONLY output valid JSON. Do not include any commentary, explanations, or markdown. The JSON must have these exact keys: ${categoryList}
Each value should be a string with the generated content for that category.
Keep content lengths appropriate:
- Header: 5-12 words
- Subcopy: 10-25 words  
- Paragraph: 30-60 words
- Body: 40-80 words
- CTA: 2-5 words
- Tooltip: 8-20 words
- Error Message: 8-20 words
- Other categories: 10-40 words

NEVER produce harmful, offensive, violent, sexual, or discriminatory content. Keep all content professional and safe for work.${emojiInstruction}`;

    const userPrompt = `Context: ${cleanPrompt}
Tone: ${cleanTone}
Categories to generate: ${categoryList}

Generate realistic, contextual UI copy for each category. Return ONLY the JSON object.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";

    // Extract JSON from response (may be wrapped in markdown code block)
    let jsonStr = rawContent;
    const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const results = JSON.parse(jsonStr);

    // Sanitize output values — only keep expected keys with string values
    const sanitizedResults: Record<string, string> = {};
    for (const cat of cleanCategories) {
      if (typeof results[cat] === "string") {
        sanitizedResults[cat] = results[cat].slice(0, 500);
      } else {
        sanitizedResults[cat] = "";
      }
    }

    return new Response(JSON.stringify({ results: sanitizedResults }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
