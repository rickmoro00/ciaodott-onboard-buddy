import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-primary mb-4">CiaoDott.</h1>
            <p className="text-xl text-muted-foreground">
              Assistente Virtuale per Centri Medici
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Onboarding Centro Medico
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Configura il tuo assistente virtuale in pochi minuti. Raccogli informazioni,
              imposta le preferenze operative e integra il sistema con il tuo centralino.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4">
                <CheckCircle2 className="h-12 w-12 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Semplice</h3>
                <p className="text-sm text-muted-foreground">
                  Compilazione guidata passo-passo
                </p>
              </div>
              <div className="flex flex-col items-center p-4">
                <CheckCircle2 className="h-12 w-12 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Veloce</h3>
                <p className="text-sm text-muted-foreground">Solo 5-7 minuti richiesti</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <CheckCircle2 className="h-12 w-12 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Sicuro</h3>
                <p className="text-sm text-muted-foreground">
                  Salvataggio automatico dei progressi
                </p>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="text-lg px-8 py-6 h-auto"
            >
              Inizia configurazione
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Hai bisogno di supporto? Contatta riccardo@ciaodott.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
