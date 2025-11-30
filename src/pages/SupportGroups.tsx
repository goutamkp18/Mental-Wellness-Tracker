import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Lock, Clock } from "lucide-react";

const SupportGroups = () => {
  const navigate = useNavigate();

  const groups = [
    {
      id: 1,
      name: "Anxiety Support",
      description: "A safe space to discuss anxiety and coping strategies",
      members: 124,
      online: 12,
      topic: "Mental Health",
    },
    {
      id: 2,
      name: "Depression Recovery",
      description: "Share experiences and support each other through depression",
      members: 98,
      online: 8,
      topic: "Mental Health",
    },
    {
      id: 3,
      name: "Stress Management",
      description: "Learn and share stress management techniques",
      members: 156,
      online: 15,
      topic: "Wellness",
    },
    {
      id: 4,
      name: "Mindfulness Practice",
      description: "Daily mindfulness exercises and meditation discussions",
      members: 89,
      online: 10,
      topic: "Mindfulness",
    },
    {
      id: 5,
      name: "Sleep Support",
      description: "Tips and support for better sleep hygiene",
      members: 67,
      online: 5,
      topic: "Health",
    },
    {
      id: 6,
      name: "Work-Life Balance",
      description: "Discuss strategies for maintaining healthy work-life balance",
      members: 112,
      online: 9,
      topic: "Lifestyle",
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
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Support Groups</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold">Join Support Groups</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with others in anonymous, topic-based support communities
            </p>
          </div>

          <Card className="border-primary/20 bg-wellness-calm/10">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Safe & Anonymous</h3>
                  <p className="text-sm text-muted-foreground">
                    All support groups are moderated and maintain strict anonymity. Share openly in
                    a judgment-free environment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <Card
                key={group.id}
                className="group hover:shadow-glow transition-smooth border-primary/20 hover:border-primary/40"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{group.topic}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{group.online} online</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-display">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{group.members} members</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-wellness hover:opacity-90"
                      onClick={() => {
                        // This would navigate to the group chat in a real implementation
                        alert("Support group chat feature coming soon!");
                      }}
                    >
                      Join Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-muted bg-muted/20">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Support groups are moderated 24/7 to ensure a safe and supportive environment. If
                you're experiencing a crisis, please contact emergency services or a crisis hotline
                immediately.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SupportGroups;
