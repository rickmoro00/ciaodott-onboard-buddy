import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormField from "./FormField";

interface CenterInfoProps {
  data?: any;
  onChange: (data: any) => void;
}

const CenterInfo = ({ data = {}, onChange }: CenterInfoProps) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">🏢 Informazioni del centro</h2>
        <p className="text-muted-foreground">
          Inserisci i dati della struttura e del referente operativo principale.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          label="Nome della struttura"
          description="Inserisci il nome completo del centro medico o studio dentistico"
          required
        >
          <Input
            placeholder="Es. Poliambulatorio San Marco"
            value={data.structureName || ""}
            onChange={(e) => handleChange("structureName", e.target.value)}
          />
        </FormField>

        <FormField
          label="Indirizzo completo"
          description="Via, numero civico, città, CAP"
          required
        >
          <Input
            placeholder="Es. Via Roma 123, 20121 Milano MI"
            value={data.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </FormField>

        <FormField
          label="Partita IVA"
          description="Partita IVA della struttura"
          required
        >
          <Input
            placeholder="Es. 12345678901"
            value={data.vatNumber || ""}
            onChange={(e) => handleChange("vatNumber", e.target.value)}
          />
        </FormField>

        <FormField
          label="Nome e cognome referente operativo"
          description="Persona responsabile della gestione quotidiana del servizio"
          required
        >
          <Input
            placeholder="Es. Mario Rossi"
            value={data.contactName || ""}
            onChange={(e) => handleChange("contactName", e.target.value)}
          />
        </FormField>

        <FormField
          label="Email referente"
          description="Indirizzo email per comunicazioni operative"
          required
        >
          <Input
            type="email"
            placeholder="Es. mario.rossi@example.com"
            value={data.contactEmail || ""}
            onChange={(e) => handleChange("contactEmail", e.target.value)}
          />
        </FormField>

        <FormField
          label="Numero di telefono referente"
          description="Numero diretto del referente operativo"
          required
        >
          <Input
            type="tel"
            placeholder="Es. +39 333 1234567"
            value={data.contactPhone || ""}
            onChange={(e) => handleChange("contactPhone", e.target.value)}
          />
        </FormField>

        <FormField
          label="Numero principale su cui si ricevono le chiamate dei pazienti"
          description="Numero che i pazienti chiamano per prenotazioni e informazioni"
          required
        >
          <Input
            type="tel"
            placeholder="Es. +39 02 12345678"
            value={data.mainPhone || ""}
            onChange={(e) => handleChange("mainPhone", e.target.value)}
          />
        </FormField>

        <FormField
          label="Orari di apertura del centro"
          description="Specifica gli orari in cui il centro è operativo"
          required
        >
          <Input
            placeholder="Es. Lun-Ven 8:00-18:00, Sab 9:00-13:00"
            value={data.openingHours || ""}
            onChange={(e) => handleChange("openingHours", e.target.value)}
          />
        </FormField>
      </div>
    </div>
  );
};

export default CenterInfo;
