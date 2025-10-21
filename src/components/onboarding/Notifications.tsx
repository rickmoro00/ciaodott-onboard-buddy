import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FormField from "./FormField";

interface NotificationsProps {
  data?: any;
  onChange: (data: any) => void;
}

const NotificationsProps = ({ data = {}, onChange }: NotificationsProps) => {
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Notifiche e comunicazioni</h2>
        <p className="text-muted-foreground">
          Configura quando e come ricevere notifiche e gestisci le comunicazioni ai pazienti.
        </p>
      </div>

      {/* Clinic Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Notifiche alla clinica</h3>
        <p className="text-sm text-muted-foreground">
          Seleziona gli eventi per cui desideri ricevere una notifica via email
        </p>

        <div className="space-y-3">
          {[
            { value: "bookings", label: "Prenotazioni effettuate" },
            { value: "transfers", label: "Trasferimenti di chiamata" },
            { value: "actions", label: "Azioni richieste" },
          ].map((item) => (
            <div key={item.value} className="flex items-center space-x-3">
              <Checkbox
                id={`clinic-notif-${item.value}`}
                checked={(data.clinicNotifications || []).includes(item.value)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("clinicNotifications", item.value, checked as boolean)
                }
              />
              <label
                htmlFor={`clinic-notif-${item.value}`}
                className="text-sm cursor-pointer leading-none"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>

        <FormField
          label="Indirizzi email per le notifiche"
          description="Inserisci uno o più indirizzi email separati da virgola"
          required
        >
          <Input
            type="email"
            placeholder="Es. segreteria@example.com, responsabile@example.com"
            value={data.notificationEmails || ""}
            onChange={(e) => handleChange("notificationEmails", e.target.value)}
          />
        </FormField>
      </div>

      {/* Patient Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Notifiche al paziente</h3>
        <p className="text-sm text-muted-foreground">
          Configura se e come inviare conferme ai pazienti dopo la prenotazione
        </p>

        <FormField label="Conferma prenotazione via WhatsApp">
          <RadioGroup
            value={data.patientNotificationType || "no"}
            onValueChange={(value) => handleChange("patientNotificationType", value)}
          >
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border">
                <RadioGroupItem value="yes" id="patient-notif-yes" />
                <div className="flex-1">
                  <Label htmlFor="patient-notif-yes" className="cursor-pointer font-normal">
                    <div className="font-medium mb-1">
                      Sì, inviare messaggio WhatsApp di conferma
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Il paziente riceverà un messaggio di conferma con i dettagli della prenotazione
                    </div>
                  </Label>
                  {data.patientNotificationType === "yes" && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Personalizza il messaggio di conferma"
                        rows={6}
                        className="mt-2"
                        value={data.whatsappMessage || "Il suo appuntamento per l'ecografia dell'addome completo presso Centro Polidiagnostico è confermato per il 24/10/2025 alle ore 15:15. La invitiamo a seguire le eventuali raccomandazioni fornite durante la chiamata.\n\nQuesto è un messaggio automatico: si prega di non rispondere. Per modifiche o ulteriori informazioni, si prega di ricontattare la clinica."}
                        onChange={(e) => handleChange("whatsappMessage", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        <strong>Nota:</strong> L'invio del messaggio WhatsApp ha un costo di €0.10 per ogni messaggio inviato.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border">
                <RadioGroupItem value="no" id="patient-notif-no" />
                <div className="flex-1">
                  <Label htmlFor="patient-notif-no" className="cursor-pointer font-normal">
                    <div className="font-medium mb-1">No, non inviare messaggio</div>
                    <div className="text-sm text-muted-foreground">
                      Non verrà inviata alcuna conferma automatica ai pazienti
                    </div>
                  </Label>
                </div>
              </div>
            </div>
          </RadioGroup>
        </FormField>
      </div>
    </div>
  );
};

export default NotificationsProps;
