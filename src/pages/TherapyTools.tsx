import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Wind, Music, Activity, ArrowLeft } from "lucide-react";

const TherapyTools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Journal",
      description: "Write private journal entries and track your thoughts over time",
      icon: BookOpen,
      color: "from-primary to-wellness-calm",
      path: "/therapy/journal",
    },
    {
      title: "Breathing Exercise",
      description: "Guided box breathing technique to help you relax and focus",
      icon: Wind,
      color: "from-wellness-calm to-wellness-balance",
      path: "/therapy/breathing",
    },
    {
      title: "Music Therapy",
      description: "Curated collection of calming music to soothe your mind",
      icon: Music,
      color: "from-wellness-balance to-accent",
      path: "/therapy/music",
    },
    {
      title: "Yoga Therapy",
      description: "Guided yoga sessions for physical and mental wellness",
      icon: Activity,
      color: "from-accent to-primary",
      path: "/therapy/yoga",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-wellness-calm/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      </div>

      <header className="relative border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-display font-bold">Therapy Tools</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of guided tools to support your mental wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.path}
                  className="group hover:shadow-glow transition-smooth cursor-pointer border-primary/20 hover:border-primary/40"
                  onClick={() => navigate(tool.path)}
                >
                  <CardHeader>
                    <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth shadow-soft`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-display">{tool.title}</CardTitle>
                    <CardDescription className="text-base">{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TherapyTools;
