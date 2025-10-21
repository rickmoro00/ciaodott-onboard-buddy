import { Card } from "@/components/ui/card";

interface SummaryProps {
  formData: any;
}

const Summary = ({ formData }: SummaryProps) => {
  const { centerInfo, bookingFlow, callForwarding, phoneIntegration, notifications } = formData;

  const SummarySection = ({ title, icon, children }: any) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h3>
      <div className="space-y-2 pl-8">{children}</div>
    </div>
  );

  const SummaryItem = ({ label, value }: any) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    return (
      <div className="text-sm">
        <span className="font-medium text-foreground">{label}:</span>{" "}
        <span className="text-muted-foreground">
          {Array.isArray(value) ? value.join(", ") : value}
        </span>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-2">📋 Riepilogo configurazione</h2>
      <p className="text-muted-foreground mb-6">
        Verifica che tutte le informazioni siano corrette prima di procedere.
      </p>

      <div className="bg-muted/30 rounded-lg p-6">
        {centerInfo && (
          <SummarySection title="Informazioni del centro" icon="🏢">
            <SummaryItem label="Struttura" value={centerInfo.structureName} />
            <SummaryItem label="Indirizzo" value={centerInfo.address} />
            <SummaryItem label="Partita IVA" value={centerInfo.vatNumber} />
            <SummaryItem label="Referente" value={centerInfo.contactName} />
            <SummaryItem label="Email" value={centerInfo.contactEmail} />
            <SummaryItem label="Telefono" value={centerInfo.contactPhone} />
            <SummaryItem label="Numero principale" value={centerInfo.mainPhone} />
            <SummaryItem label="Orari" value={centerInfo.openingHours} />
          </SummarySection>
        )}

        {bookingFlow && (
          <SummarySection title="Flusso di prenotazione" icon="🩺">
            <SummaryItem label="Informazioni paziente da raccogliere" value={bookingFlow.patientInfo} />
            <SummaryItem label="Comunicazioni" value={bookingFlow.communications} />
            <SummaryItem
              label="Saluto"
              value={
                bookingFlow.greetingType === "custom"
                  ? bookingFlow.customGreeting
                  : "Saluto consigliato"
              }
            />
            <SummaryItem
              label="Richiesta voto conversazione"
              value={bookingFlow.askRating ? "Sì" : "No"}
            />
          </SummarySection>
        )}

        {callForwarding && (
          <SummarySection title="Inoltro chiamata" icon="📞">
            <div className="text-sm text-muted-foreground">
              {callForwarding.rules &&
                Object.entries(callForwarding.rules)
                  .filter(([_, rule]: any) => rule.enabled)
                  .map(([key]: any) => (
                    <div key={key} className="mb-1">
                      • Regola attiva: {key}
                    </div>
                  ))}
            </div>
          </SummarySection>
        )}

        {phoneIntegration && (
          <SummarySection title="Integrazione telefonica" icon="☎️">
            <SummaryItem label="Tipo centralino" value={phoneIntegration.pbxType} />
            <SummaryItem label="Numero principale" value={phoneIntegration.mainCallNumber} />
            <SummaryItem label="Numero inoltro" value={phoneIntegration.forwardingNumber} />
            <SummaryItem label="Referente tecnico" value={phoneIntegration.techContactName} />
            <SummaryItem label="Email tecnico" value={phoneIntegration.techContactEmail} />
            <SummaryItem label="Società esterna" value={phoneIntegration.externalProvider} />
          </SummarySection>
        )}

        {notifications && (
          <SummarySection title="Notifiche" icon="🔔">
            <SummaryItem label="Notifiche clinica" value={notifications.clinicNotifications} />
            <SummaryItem label="Email notifiche" value={notifications.notificationEmails} />
            <SummaryItem
              label="WhatsApp pazienti"
              value={notifications.patientNotificationType === "yes" ? "Attivo" : "Non attivo"}
            />
          </SummarySection>
        )}
      </div>
    </div>
  );
};

export default Summary;
