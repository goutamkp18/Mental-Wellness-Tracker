import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ArrowLeft, Download, Brain, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssessmentResult {
  overallScore: number;
  scores: Record<string, number>;
  insights: string;
  metrics: Record<string, number>;
  assessmentId: string;
}

interface Question {
  id: number;
  text: string;
  category: string;
}

const questionBank = [
  { id: 1, text: "How would you rate your overall mood today?", category: "emotional" },
  { id: 2, text: "How well did you sleep last night?", category: "sleep" },
  { id: 3, text: "How stressed do you feel right now?", category: "stress" },
  { id: 4, text: "How satisfied are you with your social connections?", category: "social" },
  { id: 5, text: "How would you rate your energy levels?", category: "physical" },
  { id: 6, text: "How balanced do you feel between work and personal life?", category: "balance" },
  { id: 7, text: "How well are you taking care of yourself?", category: "selfcare" },
  { id: 8, text: "How clear and focused is your thinking today?", category: "mental" },
  { id: 9, text: "How well do you handle challenges?", category: "resilience" },
  { id: 10, text: "How satisfied are you with your life overall?", category: "satisfaction" },
];

const scaleLabels: Record<string, string> = {
  "1": "Very Poor",
  "2": "Poor",
  "3": "Fair",
  "4": "Good",
  "5": "Excellent",
};

const AssessmentResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [assessmentHistory, setAssessmentHistory] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    const resultsData = (location.state as any)?.results;
    const responsesData = (location.state as any)?.responses;
    const selectedQuestionsData = (location.state as any)?.selectedQuestions;
    
    if (resultsData) {
      setResults(resultsData);
    }
    if (responsesData) {
      setResponses(responsesData);
    }
    // Store selected questions to prioritize them in the table
    if (selectedQuestionsData) {
      // We'll use these to show the actual questions asked
    }
    setLoading(false);
  }, [location]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUserId(session.user.id);
    fetchAssessmentHistory(session.user.id);
  };

  const fetchAssessmentHistory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("mood_assessments")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      if (data) {
        setAssessmentHistory(data);
      }
    } catch (error: any) {
      console.error("Error fetching history:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-calm">
        <div className="animate-pulse-soft">
          <Brain className="w-12 h-12 text-primary" />
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center">
        <Card className="shadow-glow border-primary/20">
          <CardHeader>
            <CardTitle>No Assessment Data</CardTitle>
            <CardDescription>Please complete an assessment first.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/mood-assessment")}>
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare chart data from assessment history
  const chartData = assessmentHistory.slice().reverse().map((assessment, index) => ({
    name: `Assessment ${index + 1}`,
    score: assessment.overall_score,
    date: new Date(assessment.created_at).toLocaleDateString(),
  }));

  // Prepare table data from current responses
  const tableData = Object.entries(responses).map(([questionId, answer]) => {
    const questionNum = parseInt(questionId);
    const question = questionBank.find((q) => q.id === questionNum);
    return {
      questionId: questionNum,
      question: question?.text || "Unknown question",
      category: question?.category || "Unknown",
      answer: scaleLabels[answer] || answer,
      score: parseInt(answer),
    };
  });

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 40) return "text-green-500";
    if (score >= 30) return "text-blue-500";
    if (score >= 20) return "text-yellow-500";
    return "text-red-500";
  };

  const downloadResults = () => {
    const content = `
Assessment Results
Date: ${new Date().toLocaleString()}
Overall Score: ${results.overallScore}/50

Insights:
${results.insights}

Questions & Answers:
${tableData.map((row) => `Q: ${row.question}\nA: ${row.answer}\n`).join("\n")}
    `.trim();

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", `assessment-results-${Date.now()}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-wellness-calm/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
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
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Score Card */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-glow border-primary/20 col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Overall Score
                </CardTitle>
                <CardDescription>Assessment Result</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className={`text-5xl font-display font-bold ${getScoreColor(results.overallScore)}`}>
                    {results.overallScore}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">/50</div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Assessed on {new Date().toLocaleString()}
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-glow border-accent/20">
              <CardHeader>
                <CardTitle className="text-sm">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(results.scores).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground capitalize">{key}</span>
                    <span className="font-semibold text-sm">{value as number}/10</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights Summary */}
            <Card className="shadow-glow border-wellness-energy/20">
              <CardHeader>
                <CardTitle className="text-sm">AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground line-clamp-6">{results.insights}</p>
              </CardContent>
            </Card>
          </div>

          {/* Assessment History Chart */}
          {chartData.length > 1 && (
            <Card className="shadow-glow border-primary/20">
              <CardHeader>
                <CardTitle>Assessment Trend</CardTitle>
                <CardDescription>Your score progression over recent assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" />
                      <YAxis stroke="rgba(0,0,0,0.5)" domain={[0, 50]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          borderRadius: "8px",
                          border: "1px solid rgba(0,0,0,0.1)",
                        }}
                        formatter={(value) => [`Score: ${value}`, ""]}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#8B5CF6"
                        dot={{ fill: "#8B5CF6", r: 6 }}
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Current Assessment Breakdown */}
          <Card className="shadow-glow border-primary/20">
            <CardHeader>
              <CardTitle>Assessment Breakdown</CardTitle>
              <CardDescription>Your responses to each question</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Question</TableHead>
                      <TableHead className="text-center">Category</TableHead>
                      <TableHead className="text-center">Your Response</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row, idx) => (
                      <TableRow key={idx} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-sm">{row.question}</TableCell>
                        <TableCell className="text-center text-xs capitalize text-muted-foreground">
                          {row.category}
                        </TableCell>
                        <TableCell className="text-center text-sm">{row.answer}</TableCell>
                        <TableCell className="text-center font-semibold">{row.score}/5</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pb-8">
            <Button onClick={downloadResults} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download Results
            </Button>
            <Button
              onClick={() => navigate("/mood-assessment")}
              className="bg-gradient-wellness hover:opacity-90"
            >
              Take Another Assessment
            </Button>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssessmentResults;
