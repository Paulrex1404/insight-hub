import { useState } from "react";
import {
  Search,
  FileText,
  FileVideo,
  FileAudio,
  File,
  Download,
  Eye,
  FolderOpen,
  Grid3X3,
  List,
} from "lucide-react";

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  category: string;
}

const mockDocuments: Document[] = [
  { id: 1, name: "annual-report-2024.pdf", type: "pdf", size: "2.4 MB", uploadedAt: "2024-12-15", category: "Reports" },
  { id: 2, name: "meeting-notes.docx", type: "document", size: "156 KB", uploadedAt: "2024-12-14", category: "Notes" },
  { id: 3, name: "presentation-q4.pptx", type: "document", size: "5.1 MB", uploadedAt: "2024-12-13", category: "Presentations" },
  { id: 4, name: "podcast-episode-12.mp3", type: "audio", size: "45 MB", uploadedAt: "2024-12-12", category: "Audio" },
  { id: 5, name: "tutorial-video.mp4", type: "video", size: "120 MB", uploadedAt: "2024-12-11", category: "Video" },
  { id: 6, name: "research-data.txt", type: "text", size: "89 KB", uploadedAt: "2024-12-10", category: "Data" },
  { id: 7, name: "project-plan.pdf", type: "pdf", size: "1.2 MB", uploadedAt: "2024-12-09", category: "Reports" },
  { id: 8, name: "interview-recording.mp3", type: "audio", size: "32 MB", uploadedAt: "2024-12-08", category: "Audio" },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "video": return FileVideo;
    case "audio": return FileAudio;
    case "pdf":
    case "document":
    case "text":
      return FileText;
    default: return File;
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case "video": return "text-sky-600";
    case "audio": return "text-sky-500";
    case "pdf": return "text-primary";
    default: return "text-primary";
  }
};

const DocumentsPage = () => {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = mockDocuments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-primary" />
            Documents
          </h1>
          <p className="text-muted-foreground mt-1">
            {filtered.length} files in your library
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-colors ${
              view === "grid" ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition-colors ${
              view === "list" ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search files by name..."
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all duration-200"
        />
      </div>

      {/* Grid/List view */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((doc) => {
            const Icon = getFileIcon(doc.type);
            return (
              <div
                key={doc.id}
                className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <Icon className={`w-6 h-6 ${getIconColor(doc.type)}`} />
                </div>
                <h3 className="text-sm font-medium text-foreground truncate mb-1">
                  {doc.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {doc.size} · {doc.uploadedAt}
                </p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    Open
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((doc) => {
            const Icon = getFileIcon(doc.type);
            return (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${getIconColor(doc.type)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.size} · {doc.uploadedAt}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
