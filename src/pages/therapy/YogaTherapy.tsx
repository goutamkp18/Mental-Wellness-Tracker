import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Activity, Play } from "lucide-react";

const YogaTherapy = () => {
  const navigate = useNavigate();

  const yogaVideos = [
    {
      id: "1",
      title: "Morning Yoga for Beginners",
      videoId: "VaoV1PrYft4",
      description: "Gentle 20-minute yoga flow to start your day",
      duration: "20 min",
    },
    {
      id: "2",
      title: "Yoga for Stress Relief",
      videoId: "JEJQPy8Zrfk",
      description: "Calming poses to release tension and anxiety",
      duration: "15 min",
    },
    {
      id: "3",
      title: "Bedtime Yoga for Better Sleep",
      videoId: "BiWDsfZ3zbo",
      description: "Relaxing stretches before bed",
      duration: "18 min",
    },
    {
      id: "4",
      title: "Yoga for Lower Back Pain",
      videoId: "VgEaLCskZqQ",
      description: "Gentle movements to ease back discomfort",
      duration: "25 min",
    },
  ];

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
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Yoga Therapy</span>
            </div>
            <h1 className="text-4xl font-display font-bold">Guided Yoga Sessions</h1>
            <p className="text-muted-foreground">
              Practice yoga for physical and mental wellness
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {yogaVideos.map((video) => (
              <Card key={video.id} className="border-primary/20 hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-display flex items-center gap-2">
                      <Play className="w-5 h-5 text-primary" />
                      {video.title}
                    </CardTitle>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {video.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="border-0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default YogaTherapy;
