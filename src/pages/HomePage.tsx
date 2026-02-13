import { useState } from "react";
import { Send, Volume2, VolumeX, FileText, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  query: string;
  response: string;
  sources: string[];
  timestamp: Date;
}

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);

    // Mock response — will connect to backend
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now(),
        query: query,
        response:
          "Based on the uploaded documents, here is the relevant information you requested. The document contains detailed analysis and insights that match your query. This is a mock response that will be replaced with actual AI-generated content from your backend.",
        sources: ["report-2024.pdf", "analysis-summary.docx", "data-notes.txt"],
        timestamp: new Date(),
      };
      setMessages((prev) => [newMessage, ...prev]);
      setIsLoading(false);
    }, 1500);

    setQuery("");
  };

  const toggleVoice = (id: number) => {
    if (isPlaying === id) {
      setIsPlaying(null);
      window.speechSynthesis.cancel();
    } else {
      const msg = messages.find((m) => m.id === id);
      if (msg) {
        const utterance = new SpeechSynthesisUtterance(msg.response);
        utterance.onend = () => setIsPlaying(null);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(id);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Ask Your Documents
        </h1>
        <p className="text-muted-foreground mt-1">
          Query your uploaded files and get AI-powered answers
        </p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mb-6">
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Start a conversation
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Ask any question about your uploaded documents and get instant, intelligent responses.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-3" />
            <div className="h-4 bg-muted rounded w-1/2 mb-3" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="space-y-4">
            {/* User query */}
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl rounded-br-md max-w-lg shadow-sky">
                <p className="text-sm">{msg.query}</p>
              </div>
            </div>

            {/* Response card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300">
              <div className="flex items-start justify-between gap-4 mb-4">
                <p className="text-foreground leading-relaxed flex-1">
                  {msg.response}
                </p>
                <button
                  onClick={() => toggleVoice(msg.id)}
                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isPlaying === msg.id
                      ? "gradient-sky text-primary-foreground shadow-sky"
                      : "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                  title={isPlaying === msg.id ? "Stop reading" : "Read aloud"}
                >
                  {isPlaying === msg.id ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Source files */}
              <div className="border-t border-border pt-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Sources
                </p>
                <div className="flex flex-wrap gap-2">
                  {msg.sources.map((source, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      <FileText className="w-4 h-4" />
                      {source}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div className="p-4 border-t border-border bg-card">
        <form onSubmit={handleSend} className="flex gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question about your documents..."
              className="w-full h-12 px-5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all duration-200"
            />
          </div>
          <Button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="h-12 px-5 gradient-sky text-primary-foreground shadow-sky hover:opacity-90 transition-opacity rounded-xl"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
