export interface NewsArticle {
  title: string;
  snippet: string;
}

export interface AnalysisSource {
  title: string;
  uri: string;
}

export interface SocialPost {
  platform: string;
  author: string;
  content: string;
  url: string;
  timestamp: string;
}

export type Vote = 'TRUE' | 'FALSE' | 'UNCERTAIN';

export interface GameAgent {
  name: 'Gemini AI' | 'X (Twitter)';
  vote: Vote;
  reasoning: string;
  payoff: number;
}

export interface GameRound {
  roundNumber: number;
  agents: GameAgent[];
  consensusReached: boolean;
  equilibriumType: 'Nash' | 'None';
}

export interface GameMechanism {
  rounds: GameRound[];
  finalVerdict: Vote;
  totalRewardPool: number;
}

export interface AnalysisResult {
  summary: string;
  factuality: string;
  biasAnalysis: string;
  sourceAnalysis: string;
  sources?: AnalysisSource[];
  gameMechanism: GameMechanism;
}

export interface Block {
  index: number;
  timestamp: string;
  data: AnalysisResult;
  previousHash: string;
  hash: string;
}

export interface PerformanceMetric {
  operation: 'AI Analysis' | 'News Fetch' | 'Ledger Write (Hashing)';
  durationMs: number;
  timestamp: string;
  details?: string;
}

export enum Tab {
  Detector = 'Detector',
  Ledger = 'Ledger',
  Metrics = 'Metrics',
}
