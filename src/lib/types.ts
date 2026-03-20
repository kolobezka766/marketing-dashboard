export type Channel = "google" | "meta" | "tiktok";

export type Status = "good" | "warning" | "critical";

export interface Campaign {
  id: string;
  adName: string;
  channel: Channel;
  impressions: number;
  clicks: number;
  leads: number;
  purchases: number;
  spend: number;
  dailyBudget: number;
  // Calculated
  ctr: number;   // (clicks / impressions) * 100
  cpm: number;   // (spend / impressions) * 1000
  cpl: number;   // spend / leads  (0 if no leads)
  cpp: number;   // spend / purchases  (0 if no purchases)
}

export interface ClientThresholds {
  minCTR: number;
  maxCPL: number;
  maxCPP: number;
}

export interface ChannelSummary {
  channel: Channel;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  purchases: number;
  dailyBudget: number;
  ctr: number;
  cpm: number;
  cpl: number;
  cpp: number;
  campaigns: Campaign[];
  status: Status;
}

export interface Client {
  id: string;
  name: string;
  thresholds: ClientThresholds;
  campaigns: Campaign[];
  totalSpend: number;
  totalLeads: number;
  totalPurchases: number;
  totalDailyBudget: number;
  avgCTR: number;
  avgCPM: number;
  avgCPL: number;
  avgCPP: number;
  channelSummaries: ChannelSummary[];
  status: Status;
  attentionReasons: string[];
}

export interface DashboardData {
  clients: Client[];
  lastUpdated: string;
  dateRange: { from: string; to: string };
}

export interface CsvRow {
  client: string;
  channel: string;
  ad_name: string;
  impressions: string;
  clicks: string;
  leads: string;
  purchases: string;
  spend: string;
  daily_budget: string;
}
