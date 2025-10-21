import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormField from "./FormField";

interface CallForwardingProps {
  data?: any;
  onChange: (data: any) => void;
}

interface ForwardingRule {
  id: string;
  label: string;
  description: string;
  hasInput?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
}

const FORWARDING_RULES: ForwardingRule[] = [
  {
    id: "urgent",
    label: "Richiesta urgente",
    description: "Il paziente indica che ha un problema urgente",
  },
  {
    id: "exam-results",
    label: "Domande su esito prestazioni",
    description: "Richieste relative a risultati di esami già effettuati",
  },
  {
    id: "past-services",
    label: "Domande su prestazioni già effettuate",
    description: "Informazioni su visite o trattamenti precedenti",
  },
  {
    id: "operator-request",
    label: "Richiesta esplicita di parlare con un operatore",
    description: "Il paziente chiede esplicitamente un operatore umano",
  },
  {
    id: "keywords",
    label: "Presenza di parole chiave specifiche",
    description: "Inoltra se vengono pronunciate determinate parole",
    hasInput: true,
    inputLabel: "Parole chiave (separate da virgola)",
    inputPlaceholder: "Es. urgente, dolore, assicurazione",
  },
  {
    id: "service-not-found",
    label: "Non viene trovata una prestazione richiesta",
    description: "Il paziente chiede un servizio non presente nella lista",
  },
  {
    id: "no-availability",
    label: "Non viene trovata disponibilità oraria dopo N tentativi",
    description: "Dopo diversi tentativi non ci sono slot disponibili",
    hasInput: true,
    inputLabel: "Numero di tentativi",
    inputPlaceholder: "Es. 3",
  },
  {
    id: "specific-person",
    label: "Viene richiesta una persona specifica",
    description: "Il paziente chiede di parlare con un operatore particolare",
  },
  {
    id: "excluded-services",
    label: "Prestazioni da non gestire",
    description: "Determinate prestazioni devono essere gestite da operatore",
    hasInput: true,
    inputLabel: "Elenco prestazioni (separate da virgola)",
    inputPlaceholder: "Es. chirurgia, day hospital",
  },
  {
    id: "same-day",
    label: "Prestazione per lo stesso giorno",
    description: "Il paziente richiede un appuntamento per oggi",
  },
];

const CallForwarding = ({ data = {}, onChange }: CallForwardingProps) => {
  const handleToggle = (ruleId: string, enabled: boolean) => {
    onChange({
      ...data,
      rules: { ...data.rules, [ruleId]: { enabled, value: data.rules?.[ruleId]?.value || "" } },
    });
  };

  const handleInputChange = (ruleId: string, value: string) => {
    onChange({
      ...data,
      rules: {
        ...data.rules,
        [ruleId]: { enabled: data.rules?.[ruleId]?.enabled || false, value },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Impostazioni di inoltro chiamata</h2>
        <p className="text-muted-foreground">
          Configura quando l'assistente deve inoltrare la chiamata a un operatore umano.
        </p>
      </div>

      <div className="space-y-4">
        {FORWARDING_RULES.map((rule) => (
          <div
            key={rule.id}
            className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Switch
                    id={`rule-${rule.id}`}
                    checked={data.rules?.[rule.id]?.enabled || false}
                    onCheckedChange={(checked) => handleToggle(rule.id, checked)}
                  />
                  <Label htmlFor={`rule-${rule.id}`} className="font-medium cursor-pointer">
                    {rule.label}
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground ml-11">{rule.description}</p>

                {rule.hasInput && data.rules?.[rule.id]?.enabled && (
                  <div className="mt-3 ml-11">
                    <Label className="text-sm mb-2 block">{rule.inputLabel}</Label>
                    <Input
                      placeholder={rule.inputPlaceholder}
                      value={data.rules?.[rule.id]?.value || ""}
                      onChange={(e) => handleInputChange(rule.id, e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallForwarding;
