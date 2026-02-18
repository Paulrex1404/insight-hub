// insight-hub/src/services/api.ts

const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI backend URL

export interface QueryRequest {
  question: string;
  top_k?: number;
}

export interface Citation {
  source: string;
  text: string;
  score: number;
}

export interface QueryResponse {
  answer: string;
  citations: Citation[];
  confidence: number;
  processing_time_seconds: number;
}

export interface IngestResponse {
  status: string;
  filename: string;
  file_type: string;
  chunks_extracted: number;
  chunks_added: number;
  duplicates_skipped: number;
  processing_time_seconds: number;
  message: string;
}

export interface HealthStatus {
  status: string;
  text_vectors: number;
  image_vectors: number;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Health check endpoint
  async healthCheck(): Promise<HealthStatus> {
    return this.request('/health');
  }

  // System status endpoint
  async getStatus() {
    return this.request('/status');
  }

  // Query endpoint
  async query(question: string, top_k: number = 5): Promise<QueryResponse> {
    return this.request('/query', {
      method: 'POST',
      body: JSON.stringify({ question, top_k }),
    });
  }

  // Upload file endpoint
  async uploadFile(file: File, fileType?: string): Promise<IngestResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (fileType) {
      formData.append('file_type', fileType);
    }

    const response = await fetch(`${API_BASE_URL}/ingest`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
  }

  // Helper to determine file type from extension
  getFileTypeFromName(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    
    if (!ext) return 'document';
    
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const audioExts = ['mp3', 'wav', 'm4a', 'flac'];
    const videoExts = ['mp4', 'avi', 'mov', 'mkv'];
    
    if (ext === 'pdf') return 'pdf';
    if (ext === 'docx') return 'docx';
    if (imageExts.includes(ext)) return 'image';
    if (audioExts.includes(ext)) return 'audio';
    if (videoExts.includes(ext)) return 'video';
    
    return 'document';
  }
}

export const api = new ApiService();