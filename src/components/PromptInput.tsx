import { Textarea } from "@/components/ui/textarea";
import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";

const RANDOM_PROMPTS: Record<string, string[]> = {
  en: [
    "Create onboarding copy for a fintech app helping users track subscriptions and recurring payments",
    "Write dashboard UI text for a healthcare platform that connects patients with telehealth providers",
    "Generate copy for an AI-powered writing assistant that helps teams draft professional emails",
    "Create e-commerce checkout flow copy for a sustainable fashion marketplace",
    "Write notification and alert messages for a project management tool used by remote teams",
    "Generate landing page copy for a social fitness app that pairs workout buddies by skill level",
    "Create error states and empty states for a government benefits application portal",
    "Write onboarding tooltips for a SaaS analytics dashboard tracking marketing campaign performance",
    "Generate copy for a food delivery app expanding into grocery delivery services",
    "Create settings and preferences UI copy for a privacy-focused messaging application",
    "Write copy for a productivity app that uses AI to prioritize tasks based on deadlines and energy levels",
    "Generate account creation flow copy for an online learning platform targeting adult professionals",
  ],
  es: [
    "Crear textos de incorporación para una aplicación fintech que ayuda a los usuarios a gestionar sus suscripciones",
    "Escribir textos de interfaz para un panel de control de una plataforma de salud digital con telemedicina",
    "Generar textos para una aplicación de comercio electrónico de moda sostenible durante el proceso de compra",
    "Crear mensajes de notificación para una herramienta de gestión de proyectos para equipos remotos",
    "Escribir textos de página de inicio para una aplicación social de fitness que conecta compañeros de entrenamiento",
    "Generar estados de error y estados vacíos para un portal de solicitud de beneficios gubernamentales",
  ],
  fr: [
    "Créer du contenu d'intégration pour une application fintech aidant les utilisateurs à suivre leurs abonnements",
    "Rédiger les textes d'interface pour un tableau de bord d'analyse marketing destiné aux équipes SaaS",
    "Générer du contenu pour une application de livraison de repas qui s'étend à la livraison de courses",
    "Créer du contenu de page d'accueil pour une application de fitness sociale axée sur les débutants",
    "Rédiger des messages d'erreur et des états vides pour un portail de services gouvernementaux en ligne",
    "Générer du contenu pour un assistant d'écriture IA aidant les équipes à rédiger des emails professionnels",
  ],
  de: [
    "Onboarding-Texte für eine Fintech-App erstellen, die Nutzern hilft, ihre Abonnements zu verwalten",
    "Dashboard-UI-Texte für eine Gesundheitsplattform schreiben, die Patienten mit Telemedizin-Anbietern verbindet",
    "Texte für einen KI-gestützten Schreibassistenten generieren, der Teams beim Verfassen professioneller E-Mails unterstützt",
    "Fehlerzustände und leere Zustände für ein Online-Portal für Regierungsleistungen erstellen",
    "Benachrichtigungstexte für ein Projektmanagement-Tool für Remote-Teams schreiben",
    "Landingpage-Texte für eine soziale Fitness-App generieren, die Trainingspartner nach Niveau zusammenbringt",
  ],
  pt: [
    "Criar textos de integração para um aplicativo fintech que ajuda os usuários a gerenciar assinaturas",
    "Escrever textos de interface para um painel de saúde digital com telemedicina",
    "Gerar textos para um e-commerce de moda sustentável durante o fluxo de checkout",
    "Criar mensagens de notificação para uma ferramenta de gestão de projetos para equipes remotas",
    "Escrever textos de página inicial para um aplicativo social de fitness voltado para iniciantes",
    "Gerar estados de erro e estados vazios para um portal de serviços governamentais online",
  ],
  it: [
    "Creare testi di onboarding per un'app fintech che aiuta gli utenti a gestire gli abbonamenti",
    "Scrivere testi dell'interfaccia per una dashboard di analisi marketing per team SaaS",
    "Generare contenuti per un'app di consegna pasti che si espande alla consegna di generi alimentari",
    "Creare contenuti per una landing page di un'app social di fitness per principianti",
    "Scrivere messaggi di errore e stati vuoti per un portale di servizi governativi online",
    "Generare contenuti per un assistente di scrittura IA che aiuta i team a redigere email professionali",
  ],
};

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  language?: string;
}

const PromptInput = ({ value, onChange, disabled, language = "en" }: PromptInputProps) => {
  const handleRandom = () => {
    const prompts = RANDOM_PROMPTS[language] || RANDOM_PROMPTS.en;
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    onChange(randomPrompt);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-display font-medium text-foreground tracking-wide uppercase">
          Prompt
        </label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRandom}
          disabled={disabled}
          className="h-7 px-2.5 text-xs font-display font-medium text-muted-foreground hover:text-foreground gap-1.5"
        >
          <Dices className="w-3.5 h-3.5" />
          Random
        </Button>
      </div>
      <Textarea
        placeholder='e.g. "Create issue language for VoteOnIssues app (users creating political issues)"'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="min-h-[120px] bg-surface border-border text-foreground placeholder:text-muted-foreground font-body resize-none focus:ring-1 focus:ring-primary focus:border-primary"
      />
    </div>
  );
};

export default PromptInput;
