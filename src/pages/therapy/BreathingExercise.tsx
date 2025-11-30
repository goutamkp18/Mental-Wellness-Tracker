import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, Wind } from "lucide-react";

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold1" | "exhale" | "hold2">("inhale");
  const [count, setCount] = useState(4);
  const navigate = useNavigate();

  const phases = {
    inhale: { duration: 4, text: "Breathe In", color: "bg-wellness-calm" },
    hold1: { duration: 4, text: "Hold", color: "bg-wellness-balance" },
    exhale: { duration: 4, text: "Breathe Out", color: "bg-primary" },
    hold2: { duration: 4, text: "Hold", color: "bg-accent" },
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      timer = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            // Move to next phase
            const phaseOrder: Array<"inhale" | "hold1" | "exhale" | "hold2"> = [
              "inhale",
              "hold1",
              "exhale",
              "hold2",
            ];
            const currentIndex = phaseOrder.indexOf(phase);
            const nextPhase = phaseOrder[(currentIndex + 1) % 4];
            setPhase(nextPhase);
            return phases[nextPhase].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const toggleExercise = () => {
    if (!isActive) {
      setPhase("inhale");
      setCount(4);
    }
    setIsActive(!isActive);
  };

  const currentPhase = phases[phase];
  const scale = phase === "inhale" ? "scale-150" : phase === "exhale" ? "scale-75" : "scale-125";

  return (
    <div className="min-h-screen bg-gradient-calm">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/therapy")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Therapy Tools
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Wind className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Box Breathing</span>
            </div>
            <h1 className="text-4xl font-display font-bold">Breathing Exercise</h1>
            <p className="text-muted-foreground">
              Follow the visual guide to practice box breathing technique
            </p>
          </div>

          <Card className="shadow-glow border-primary/20">
            <CardHeader>
              <CardTitle className="text-center text-xl font-display">
                4-4-4-4 Box Breathing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="relative">
                  <div
                    className={`w-64 h-64 rounded-full ${currentPhase.color} transition-all duration-1000 ease-in-out ${
                      isActive ? scale : ""
                    } flex items-center justify-center shadow-glow`}
                  >
                    <div className="text-center text-white">
                      <p className="text-3xl font-display font-bold mb-2">{currentPhase.text}</p>
                      <p className="text-6xl font-bold">{count}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Button
                  onClick={toggleExercise}
                  size="lg"
                  className="w-full bg-gradient-wellness hover:opacity-90"
                >
                  {isActive ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start Exercise
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="p-3 rounded-lg bg-wellness-calm/20 border border-wellness-calm">
                    <p className="font-semibold">Inhale</p>
                    <p className="text-muted-foreground">4 seconds</p>
                  </div>
                  <div className="p-3 rounded-lg bg-wellness-balance/20 border border-wellness-balance">
                    <p className="font-semibold">Hold</p>
                    <p className="text-muted-foreground">4 seconds</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/20 border border-primary">
                    <p className="font-semibold">Exhale</p>
                    <p className="text-muted-foreground">4 seconds</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/20 border border-accent">
                    <p className="font-semibold">Hold</p>
                    <p className="text-muted-foreground">4 seconds</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BreathingExercise;
