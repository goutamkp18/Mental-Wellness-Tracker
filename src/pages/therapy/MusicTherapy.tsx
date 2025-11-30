import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Music, Play } from "lucide-react";

const MusicTherapy = () => {
  const navigate = useNavigate();

  const musicVideos = [
    {
      id: "1",
      title: "Peaceful Piano Music",
      videoId: "lTRiuFIWV54",
      description: "Relaxing piano melodies for stress relief",
    },
    {
      id: "2",
      title: "Nature Sounds & Meditation",
      videoId: "eKFTSSKCzWA",
      description: "Calming nature sounds with gentle music",
    },
    {
      id: "3",
      title: "Deep Sleep Music",
      videoId: "1ZYbU82GVz4",
      description: "Soothing music for deep relaxation and sleep",
    },
    {
      id: "4",
      title: "Stress Relief Music",
      videoId: "VgEaLCskZqQ",
      description: "Healing music for anxiety and stress",
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
              <Music className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Music Therapy</span>
            </div>
            <h1 className="text-4xl font-display font-bold">Calming Music</h1>
            <p className="text-muted-foreground">
              Curated collection of soothing music for relaxation and stress relief
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {musicVideos.map((video) => (
              <Card key={video.id} className="border-primary/20 hover:shadow-glow transition-smooth">
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <Play className="w-5 h-5 text-primary" />
                    {video.title}
                  </CardTitle>
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

export default MusicTherapy;
