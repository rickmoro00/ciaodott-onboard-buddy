import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Save, CheckCircle2 } from "lucide-react";
import CenterInfo from "@/components/onboarding/CenterInfo";
import BookingFlow from "@/components/onboarding/BookingFlow";
import CallForwarding from "@/components/onboarding/CallForwarding";
import PhoneIntegration from "@/components/onboarding/PhoneIntegration";
import Notifications from "@/components/onboarding/Notifications";
import Summary from "@/components/onboarding/Summary";

const SECTIONS = [
  { id: 1, title: "Informazioni del centro", icon: "🏢" },
  { id: 2, title: "Flusso di prenotazione", icon: "🩺" },
  { id: 3, title: "Inoltro chiamata", icon: "📞" },
  { id: 4, title: "Integrazione telefonica", icon: "☎️" },
  { id: 5, title: "Notifiche", icon: "🔔" },
];

const Onboarding = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const progress = (currentSection / SECTIONS.length) * 100;

  const handleNext = () => {
    // Auto-save simulation
    setLastSaved(new Date());
    toast.success("Progresso salvato automaticamente", {
      icon: <Save className="h-4 w-4" />,
    });

    if (currentSection < SECTIONS.length) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    if (!finalConfirmation) {
      toast.error("Conferma le informazioni prima di procedere");
      return;
    }
    toast.success("Configurazione inviata con successo!", {
      description: "Il team CiaoDott procederà con l'attivazione del servizio.",
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
    });
    console.log("Form data:", formData);
  };

  const updateFormData = (section: string, data: any) => {
    setFormData({ ...formData, [section]: data });
    setLastSaved(new Date());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">CiaoDott.</h1>
              <p className="text-sm text-muted-foreground">Onboarding Centro Medico</p>
            </div>
            {lastSaved && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Save className="h-4 w-4" />
                <span>Salvato {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Sezione {currentSection} di {SECTIONS.length}
              </span>
              <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  currentSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : currentSection > section.id
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.title}</span>
                {currentSection > section.id && <CheckCircle2 className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Intro text (only on first section) */}
        {currentSection === 1 && (
          <Card className="mb-6 p-6 bg-secondary border-secondary-foreground/20">
            <div className="flex gap-3">
              <div className="text-2xl">⏱️</div>
              <div>
                <h3 className="font-semibold text-secondary-foreground mb-1">
                  Tempo di compilazione: 5–7 minuti
                </h3>
                <p className="text-sm text-secondary-foreground/80">
                  Queste informazioni sono fondamentali per configurare correttamente
                  l'assistente virtuale e attivare il servizio senza ritardi.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Form Sections */}
        <Card className="p-6 md:p-8">
          {currentSection === 1 && (
            <CenterInfo data={formData.centerInfo} onChange={(data) => updateFormData("centerInfo", data)} />
          )}
          {currentSection === 2 && (
            <BookingFlow data={formData.bookingFlow} onChange={(data) => updateFormData("bookingFlow", data)} />
          )}
          {currentSection === 3 && (
            <CallForwarding data={formData.callForwarding} onChange={(data) => updateFormData("callForwarding", data)} />
          )}
          {currentSection === 4 && (
            <PhoneIntegration data={formData.phoneIntegration} onChange={(data) => updateFormData("phoneIntegration", data)} />
          )}
          {currentSection === 5 && (
            <Notifications data={formData.notifications} onChange={(data) => updateFormData("notifications", data)} />
          )}
        </Card>

        {/* Summary Section */}
        {currentSection === SECTIONS.length && (
          <Card className="mt-6 p-6 md:p-8">
            <Summary formData={formData} />
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="final-confirmation"
                  checked={finalConfirmation}
                  onCheckedChange={(checked) => setFinalConfirmation(checked as boolean)}
                />
                <label
                  htmlFor="final-confirmation"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  Confermo che le informazioni inserite sono corrette e autorizzo CiaoDott ad
                  avviare la configurazione dell'assistente virtuale.
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-6">
          {currentSection > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              ← Indietro
            </Button>
          )}
          {currentSection < SECTIONS.length ? (
            <Button onClick={handleNext} className="flex-1">
              Continua →
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1" disabled={!finalConfirmation}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Invia dati e avvia configurazione
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
