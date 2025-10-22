import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FormField from "./FormField";
import FileUpload from "./FileUpload";

interface BookingFlowProps {
  data?: any;
  onChange: (data: any) => void;
}

const BookingFlow = ({ data = {}, onChange }: BookingFlowProps) => {
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentValues = data[field] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v: string) => v !== value);
    onChange({ ...data, [field]: newValues });
  };

  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const patientInfoOptions = [
    { value: "Nome e cognome", label: "Nome e cognome" },
    { value: "Codice fiscale", label: "Codice fiscale" },
    {
      value: "Numero di telefono",
      label: "Numero di telefono",
      description:
        "Il numero del chiamante viene raccolto automaticamente. Richiedilo solo se il paziente è diverso dal chiamante.",
    },
    { value: "Data di nascita", label: "Data di nascita" },
    { value: "Sesso", label: "Sesso" },
    { value: "Comune di nascita", label: "Comune di nascita" },
    { value: "Quesito diagnostico", label: "Quesito diagnostico" },
    { value: "Preferenza per il medico", label: "Preferenza per il medico" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Flusso di prenotazione e configurazione assistente
        </h2>
        <p className="text-muted-foreground">
          Configura le informazioni da raccogliere e le comunicazioni da inviare ai pazienti.
        </p>
      </div>

      {/* Patient Information */}
      <FormField
        label="Informazioni da chiedere al paziente"
        description="Seleziona i dati che l'assistente deve raccogliere durante la prenotazione"
        required
      >
        <div className="space-y-3 mt-3">
          {patientInfoOptions.map((option) => (
            <div key={option.value} className="flex items-start space-x-3">
              <Checkbox
                id={`patient-info-${option.value}`}
                checked={(data.patientInfo || []).includes(option.value)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("patientInfo", option.value, checked as boolean)
                }
              />
              <label
                htmlFor={`patient-info-${option.value}`}
                className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span>{option.label}</span>
                {option.description && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </label>
            </div>
          ))}
        </div>
      </FormField>

      {/* Communications to Patient */}
      <FormField
        label="Comunicazioni al paziente"
        description="Informazioni da comunicare automaticamente durante la prenotazione"
      >
        <div className="space-y-3 mt-3">
          {["Prezzo della prestazione", "Preparazione necessaria"].map((item) => (
            <div key={item} className="flex items-center space-x-3">
              <Checkbox
                id={`communication-${item}`}
                checked={(data.communications || []).includes(item)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("communications", item, checked as boolean)
                }
              />
              <label
                htmlFor={`communication-${item}`}
                className="text-sm cursor-pointer leading-none"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </FormField>

      <FormField
        label="Istruzioni aggiuntive"
        description="Altre comunicazioni da inviare sempre ai pazienti"
      >
        <Textarea
          placeholder="Es. Si prega di presentarsi 15 minuti prima dell'appuntamento..."
          rows={4}
          value={data.otherInstructions || ""}
          onChange={(e) => handleChange("otherInstructions", e.target.value)}
        />
      </FormField>

      {/* Greeting Configuration */}
      <FormField
        label="Saluto iniziale dell'assistente"
        description="Scegli come l'assistente si presenta ai pazienti"
        required
      >
        <RadioGroup
          value={data.greetingType || "default"}
          onValueChange={(value) => handleChange("greetingType", value)}
        >
          <div className="flex items-start space-x-3 p-4 rounded-lg border border-border">
            <RadioGroupItem value="default" id="greeting-default" />
            <div className="flex-1">
              <Label htmlFor="greeting-default" className="cursor-pointer font-normal">
                <div className="font-medium mb-1">Usa saluto consigliato</div>
                <div className="text-sm text-muted-foreground">
                  "{data.structureName || "[Nome centro medico]"}, buongiorno. Sono Anna, come
                  posso aiutarla?"
                </div>
              </Label>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 rounded-lg border border-border">
            <RadioGroupItem value="custom" id="greeting-custom" />
            <div className="flex-1">
              <Label htmlFor="greeting-custom" className="cursor-pointer font-normal">
                Inserisci saluto personalizzato
              </Label>
              {data.greetingType === "custom" && (
                <Input
                  placeholder="Es. Salve, sono Maria dell'assistenza virtuale..."
                  className="mt-3"
                  value={data.customGreeting || ""}
                  onChange={(e) => handleChange("customGreeting", e.target.value)}
                />
              )}
            </div>
          </div>
        </RadioGroup>
      </FormField>

      {/* Optional Features */}
      <FormField
        label="Aggiunte facoltative"
        description="Funzionalità aggiuntive per migliorare il servizio"
      >
        <div className="space-y-3 mt-3">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="ask-rating"
              checked={(data.additionalOptions || []).includes("ask-rating")}
              onCheckedChange={(checked) =>
                handleCheckboxChange("additionalOptions", "ask-rating", checked as boolean)
              }
            />
            <label htmlFor="ask-rating" className="text-sm cursor-pointer leading-none">
              Chiedere voto alla conversazione
            </label>
          </div>
        </div>
      </FormField>

      {/* Document Uploads */}
      <div className="space-y-4">
        <FormField
          label="Upload lista prestazioni del centro"
          description="Carica un file con l'elenco completo delle prestazioni offerte (PDF, Excel o Word). In alternativa puoi inviarlo via email a riccardo@ciaodott.com"
        >
          <FileUpload
            value={data.servicesList}
            onChange={(file) => handleChange("servicesList", file)}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
          />
        </FormField>

        <FormField
          label="Upload linee guida per la segreteria"
          description="Documenti con procedure e protocolli da seguire (PDF o Word)"
        >
          <FileUpload
            value={data.guidelines}
            onChange={(file) => handleChange("guidelines", file)}
            accept=".pdf,.doc,.docx"
          />
        </FormField>
      </div>

      <FormField
        label="Situazioni da NON gestire mai"
        description="Descrivi le richieste che devono sempre essere inoltrate alla segreteria (es. risultati esami, urgenze, assicurazioni)"
        required
      >
        <Textarea
          placeholder="Es. Richieste di risultati esami, urgenze mediche, pratiche assicurative, reclami..."
          rows={4}
          value={data.dontHandle || ""}
          onChange={(e) => handleChange("dontHandle", e.target.value)}
        />
      </FormField>
    </div>
  );
};

export default BookingFlow;
