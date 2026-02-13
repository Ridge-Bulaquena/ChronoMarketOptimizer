
export interface CampaignInput {
  campaignName: string;
  niche: string;
  targetAudience: string;
  budgetRange: string;
  primaryChannel: string;
  historicalContext?: string;
  goals: string;
}

export interface PredictionPoint {
  time: string;
  engagementScore: number;
}

export interface Recommendation {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface PredictionResult {
  optimalLaunchDate: string;
  optimalLaunchTime: string;
  confidenceScore: number;
  rationale: string;
  forecastData: PredictionPoint[];
  recommendations: Recommendation[];
  sentimentAnalysis: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
