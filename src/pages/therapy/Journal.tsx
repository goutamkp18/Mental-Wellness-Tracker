import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, BookOpen, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  content: string;
  created_at: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndLoadEntries();
  }, []);

  const checkAuthAndLoadEntries = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUserId(session.user.id);
    loadEntries(session.user.id);
  };

  const loadEntries = async (uid: string) => {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading entries:", error);
    } else if (data) {
      setEntries(data);
    }
  };

  const handleSave = async () => {
    if (!userId || !newEntry.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("journal_entries").insert({
        user_id: userId,
        content: newEntry,
      });

      if (error) throw error;

      toast({
        title: "Entry Saved",
        description: "Your journal entry has been saved.",
      });

      setNewEntry("");
      loadEntries(userId);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Entry Deleted",
        description: "Your journal entry has been deleted.",
      });
      if (userId) loadEntries(userId);
    }
  };

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
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Private Journal</span>
            </div>
            <h1 className="text-4xl font-display font-bold">Your Journal</h1>
            <p className="text-muted-foreground">Express your thoughts and track your journey</p>
          </div>

          <Card className="shadow-glow border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl font-display">New Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Write your thoughts here..."
                className="min-h-[200px] resize-none"
              />
              <Button
                onClick={handleSave}
                disabled={loading || !newEntry.trim()}
                className="w-full bg-gradient-wellness"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold">Past Entries</h2>
            {entries.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No journal entries yet. Start writing to track your thoughts!
                </CardContent>
              </Card>
            ) : (
              entries.map((entry) => (
                <Card key={entry.id} className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">
                        {new Date(entry.created_at).toLocaleDateString()} at{" "}
                        {new Date(entry.created_at).toLocaleTimeString()}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(entry.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{entry.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;
