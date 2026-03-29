import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is lorem ipsum?",
    a: "Lorem ipsum is placeholder text commonly used in design and publishing to fill space before final copy is written. It originates from a 1st-century Latin text by Cicero. While useful for layout, lorem ipsum tells you nothing about how real content will look and feel in your UI.",
  },
  {
    q: "What is a lorem ipsum generator?",
    a: "A lorem ipsum generator is a tool that produces placeholder text for design mockups and prototypes. Traditional generators output meaningless Latin-based text. Contextual Ipsum is different — it generates realistic, scenario-specific content that matches your actual product context.",
  },
  {
    q: "What is a better alternative to lorem ipsum?",
    a: "Contextual placeholder text is a better alternative. Instead of generic Latin filler, tools like Contextual Ipsum generate realistic copy based on your product scenario — so headers, CTAs, error messages, and body text all feel authentic. This helps designers and developers make better layout decisions.",
  },
  {
    q: "How does the AI lorem ipsum generator work?",
    a: "You describe your product or scenario (e.g., 'a fintech dashboard' or 'an e-commerce checkout flow'), choose a tone, and select content categories like Header, CTA, or Error Message. The AI generates contextually appropriate copy for each category in seconds.",
  },
  {
    q: "Is this free to use?",
    a: "Yes, Contextual Ipsum is free to use. Simply enter your prompt, select categories, and generate realistic placeholder text instantly. No account required.",
  },
  {
    q: "Can I use the generated text in my projects?",
    a: "Absolutely. All generated content is yours to use in mockups, prototypes, design systems, or production. Copy individual sections or export everything as JSON or plain text.",
  },
];

const FAQSection = () => {
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-lg font-display font-bold text-foreground mb-6 tracking-tight">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border">
            <AccordionTrigger className="text-sm font-body text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground font-body leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
