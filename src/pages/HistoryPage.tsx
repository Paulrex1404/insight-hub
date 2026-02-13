import { Clock, MessageSquare, ChevronRight, Search } from "lucide-react";

interface ChatHistory {
  id: number;
  query: string;
  preview: string;
  timestamp: string;
  sources: number;
}

const mockHistory: ChatHistory[] = [
  { id: 1, query: "What are the key findings in the annual report?", preview: "The annual report highlights significant growth in Q3 and Q4, with revenue increasing by 23%...", timestamp: "Today, 2:30 PM", sources: 3 },
  { id: 2, query: "Summarize the meeting notes from December", preview: "The December meeting covered project milestones, budget allocation, and team restructuring...", timestamp: "Today, 11:15 AM", sources: 1 },
  { id: 3, query: "What topics were discussed in the podcast?", preview: "Episode 12 covered emerging trends in AI technology, including large language models and...", timestamp: "Yesterday, 4:45 PM", sources: 1 },
  { id: 4, query: "Extract data points from the research file", preview: "The research data contains 450 data points across 12 categories, with the highest concentration...", timestamp: "Yesterday, 10:20 AM", sources: 2 },
  { id: 5, query: "What is the project timeline mentioned in the plan?", preview: "The project plan outlines a 6-month timeline starting January 2025 with three major phases...", timestamp: "Dec 13, 3:00 PM", sources: 1 },
  { id: 6, query: "Compare the Q3 and Q4 performance metrics", preview: "Q4 showed a 15% improvement over Q3 in customer retention, while acquisition costs decreased by...", timestamp: "Dec 12, 9:30 AM", sources: 2 },
];

const HistoryPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary" />
          Chat History
        </h1>
        <p className="text-muted-foreground mt-1">
          Your previous conversations and queries
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          placeholder="Search your history..."
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all duration-200"
        />
      </div>

      {/* History list */}
      <div className="space-y-3">
        {mockHistory.map((item) => (
          <button
            key={item.id}
            className="w-full text-left p-5 bg-card border border-border rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {item.query}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.preview}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-accent text-accent-foreground">
                    {item.sources} source{item.sources > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
