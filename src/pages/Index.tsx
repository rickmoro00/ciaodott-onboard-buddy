import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/ciaodott-logo.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto flex min-h-screen items-center px-4 py-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center">
          <div>
            <img src={logo} alt="CiaoDott" className="mx-auto h-12 w-auto" />
          </div>

          <div className="w-full rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
                Benvenuto nell'onboarding del tuo assistente virtuale CiaoDott
              </h1>
              <p className="text-base text-muted-foreground md:text-lg">
                In pochi minuti raccoglieremo tutte le informazioni necessarie per iniziare la creazione e la configurazione del tuo assistente virtuale e per collegarlo correttamente al tuo centralino. Ti guideremo passo dopo passo: il processo richiede circa 5–7 minuti ed è composto da 5 semplici step.
              </p>
            </div>

            <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-background/60 p-6">
                <p className="text-sm font-medium uppercase tracking-wide text-primary/80">
                  Struttura del percorso
                </p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Tempo stimato: 5–7 minuti</p>
                  <p className="font-semibold text-foreground">5 step totali</p>
                  <p>
                    Potrai sempre rivedere e modificare le informazioni prima di confermare l'invio al team CiaoDott.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/60 p-6">
                <p className="text-sm font-medium uppercase tracking-wide text-primary/80">
                  Cosa ti chiederemo
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li className="text-foreground">Informazioni sul tuo centro</li>
                  <li className="text-foreground">Flusso di prenotazione e comunicazioni ai pazienti</li>
                  <li className="text-foreground">Regole per l'inoltro delle chiamate</li>
                  <li className="text-foreground">Dettagli tecnici del centralino</li>
                  <li className="text-foreground">Preferenze per notifiche e messaggi WhatsApp</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-left text-sm text-muted-foreground">
              Suggerimento: prepara prima l'elenco delle prestazioni e le linee guida della segreteria, se disponibili.
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <div className="text-sm text-muted-foreground">
                Quando sei pronto, clicca per iniziare la raccolta guidata delle informazioni.
              </div>
              <Button
                size="lg"
                onClick={() => navigate("/onboarding")}
                className="h-12 rounded-full px-8 text-base font-semibold"
              >
                Inizia l'onboarding
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            In caso di dubbi puoi contattare il tuo referente CiaoDott in qualsiasi momento.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
