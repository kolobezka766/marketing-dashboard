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
  // Calculated fields
  ctr: number;   // (clicks / impressions) * 100
  cpl: number;   // spend / leads  (0 if no leads)
  cpp: number;   // spend / purchases  (0 if no purchases)
}

export interface ClientThresholds {
  minCTR: number;   // below this = warning
  maxCPL: number;   // above this = warning
  maxCPP: number;   // above this = warning
}

export interface ChannelSummary {
  channel: Channel;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  purchases: number;
  ctr: number;
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
  // Aggregated
  totalSpend: number;
  totalLeads: number;
  totalPurchases: number;
  avgCTR: number;
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

// For CSV import
export interface CsvRow {
  client: string;
  channel: string;
  ad_name: string;
  impressions: string;
  clicks: string;
  leads: string;
  purchases: string;
  spend: string;
}
