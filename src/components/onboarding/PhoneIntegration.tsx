import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import FormField from "./FormField";

interface PhoneIntegrationProps {
  data?: any;
  onChange: (data: any) => void;
}

const PhoneIntegration = ({ data = {}, onChange }: PhoneIntegrationProps) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const showWarning = data.mainCallNumber && data.forwardingNumber && 
    data.mainCallNumber === data.forwardingNumber;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ☎️ Dettagli centralino e integrazione telefonica
        </h2>
        <p className="text-muted-foreground">
          Informazioni necessarie per integrare l'assistente con il centralino della struttura.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          label="Tipo di centralino utilizzato"
          description="Indica il modello o il fornitore del centralino (es. Wildix, 3CX, Asterisk)"
          required
        >
          <Input
            placeholder="Es. Wildix UC&C"
            value={data.pbxType || ""}
            onChange={(e) => handleChange("pbxType", e.target.value)}
          />
        </FormField>

        <FormField
          label="Numero principale su cui arrivano le chiamate"
          description="Il numero che i pazienti chiamano per contattare il centro"
          required
        >
          <Input
            type="tel"
            placeholder="Es. +39 02 12345678"
            value={data.mainCallNumber || ""}
            onChange={(e) => handleChange("mainCallNumber", e.target.value)}
          />
        </FormField>

        <FormField
          label="Numero alternativo per inoltro diretto alla segreteria"
          description="Numero su cui l'assistente inoltra le chiamate quando necessario"
          required
        >
          <Input
            type="tel"
            placeholder="Es. +39 02 87654321"
            value={data.forwardingNumber || ""}
            onChange={(e) => handleChange("forwardingNumber", e.target.value)}
          />
        </FormField>

        {showWarning && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Attenzione:</strong> Questo numero non può essere lo stesso del numero principale,
              altrimenti si genera un loop e l'assistente non potrà inoltrare correttamente le chiamate.
            </AlertDescription>
          </Alert>
        )}

        <div className="pt-4 border-t border-border">
          <h3 className="font-semibold text-foreground mb-4">Referente tecnico</h3>
          <div className="space-y-4">
            <FormField
              label="Nome e cognome referente tecnico"
              description="Persona responsabile degli aspetti tecnici dell'integrazione"
              required
            >
              <Input
                placeholder="Es. Luigi Bianchi"
                value={data.techContactName || ""}
                onChange={(e) => handleChange("techContactName", e.target.value)}
              />
            </FormField>

            <FormField
              label="Email referente tecnico"
              description="Email per comunicazioni tecniche"
              required
            >
              <Input
                type="email"
                placeholder="Es. luigi.bianchi@example.com"
                value={data.techContactEmail || ""}
                onChange={(e) => handleChange("techContactEmail", e.target.value)}
              />
            </FormField>

            <FormField
              label="Numero di telefono referente tecnico"
              description="Numero diretto del referente tecnico"
              required
            >
              <Input
                type="tel"
                placeholder="Es. +39 333 9876543"
                value={data.techContactPhone || ""}
                onChange={(e) => handleChange("techContactPhone", e.target.value)}
              />
            </FormField>

            <FormField
              label="Società esterna che gestisce il centralino"
              description="Se il centralino è gestito da terzi, indica il nome della società (opzionale)"
            >
              <Input
                placeholder="Es. TelcoService Srl"
                value={data.externalProvider || ""}
                onChange={(e) => handleChange("externalProvider", e.target.value)}
              />
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneIntegration;
