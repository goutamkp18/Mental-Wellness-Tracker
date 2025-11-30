import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Palette, Download } from "lucide-react";

const ColorTherapy = () => {
  const [selectedColor, setSelectedColor] = useState("#8B5CF6");
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const colors = [
    "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#3B82F6",
    "#EF4444", "#8B5A00", "#059669", "#7C3AED", "#DC2626"
  ];

  const patterns = [
    { id: 1, name: "Mandala", paths: generateMandalaPattern() },
    { id: 2, name: "Geometric", paths: generateGeometricPattern() },
    { id: 3, name: "Floral", paths: generateFloralPattern() },
  ];

  function generateMandalaPattern(): string[] {
    const paths: string[] = [];
    const centerX = 200;
    const centerY = 200;
    
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const x = centerX + Math.cos(angle) * 80;
      const y = centerY + Math.sin(angle) * 80;
      paths.push(`M${centerX},${centerY} L${x},${y}`);
      
      for (let j = 0; j < 3; j++) {
        const radius = 30 + j * 20;
        paths.push(`M${centerX + radius},${centerY} A${radius},${radius} 0 1,1 ${centerX - radius},${centerY} A${radius},${radius} 0 1,1 ${centerX + radius},${centerY}`);
      }
    }
    return paths;
  }

  function generateGeometricPattern(): string[] {
    const paths: string[] = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const x = 50 + i * 75;
        const y = 50 + j * 75;
        const size = 30;
        paths.push(`M${x},${y} L${x + size},${y} L${x + size},${y + size} L${x},${y + size} Z`);
        paths.push(`M${x + size / 2},${y} L${x + size},${y + size / 2} L${x + size / 2},${y + size} L${x},${y + size / 2} Z`);
      }
    }
    return paths;
  }

  function generateFloralPattern(): string[] {
    const paths: string[] = [];
    const centerX = 200;
    const centerY = 200;
    
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6;
      const x = centerX + Math.cos(angle) * 60;
      const y = centerY + Math.sin(angle) * 60;
      paths.push(`M${x},${y} Q${centerX},${centerY - 30} ${x + 20},${y} Q${centerX + 30},${centerY} ${x},${y + 20} Q${centerX},${centerY + 30} ${x - 20},${y} Q${centerX - 30},${centerY} ${x},${y - 20} Z`);
    }
    
    paths.push(`M${centerX + 15},${centerY} A15,15 0 1,1 ${centerX - 15},${centerY} A15,15 0 1,1 ${centerX + 15},${centerY}`);
    
    return paths;
  }

  useEffect(() => {
    if (selectedPattern !== null) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.clearRect(0, 0, 400, 400);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 400, 400);
      
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 2;
      
      const pattern = patterns.find(p => p.id === selectedPattern);
      if (pattern) {
        pattern.paths.forEach(pathStr => {
          const path = new Path2D(pathStr);
          ctx.stroke(path);
        });
      }
    }
  }, [selectedPattern]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedPattern === null) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = "color-therapy-art.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/games")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Palette className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Color Therapy</span>
            </div>
            <h1 className="text-4xl font-display font-bold">Digital Coloring Book</h1>
            <p className="text-muted-foreground">
              Choose a pattern and color it in to relax your mind
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Select Pattern</h3>
                <div className="space-y-2">
                  {patterns.map((pattern) => (
                    <Button
                      key={pattern.id}
                      variant={selectedPattern === pattern.id ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setSelectedPattern(pattern.id)}
                    >
                      {pattern.name}
                    </Button>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">Select Color</h3>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-lg transition-smooth hover:scale-110 ${
                        selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="p-4">
                {selectedPattern === null ? (
                  <div className="aspect-square flex items-center justify-center bg-muted rounded-lg">
                    <p className="text-muted-foreground">Select a pattern to start coloring</p>
                  </div>
                ) : (
                  <>
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={400}
                      onClick={handleCanvasClick}
                      className="w-full border border-border rounded-lg cursor-crosshair bg-white"
                    />
                    <Button
                      onClick={downloadImage}
                      className="w-full mt-4 bg-gradient-wellness"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Artwork
                    </Button>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ColorTherapy;
