export interface NewsArticle {
  title: string;
  snippet: string;
}

export interface AnalysisSource {
  title: string;
  uri: string;
}

export interface AnalysisResult {
  summary: string;
  credibilityScore: number;
  factuality: string;
  biasAnalysis: string;
  sourceAnalysis: string;
  sources?: AnalysisSource[];
}

export interface Block {
  index: number;
  timestamp: number;
  data: AnalysisResult;
  previousHash: string;
  hash: string;
}

export enum Tab {
  Detector = 'Detector',
  Ledger = 'Ledger',
}
