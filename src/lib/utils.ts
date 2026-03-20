import { Campaign, Channel, ChannelSummary, Client, ClientThresholds, CsvRow, DashboardData, Status } from "./types";
import { DEFAULT_THRESHOLDS } from "./mockData";

export function parseCsvRows(rows: CsvRow[]): DashboardData {
  const clientMap = new Map<string, { campaigns: Campaign[]; thresholds: ClientThresholds }>();

  rows.forEach((row, index) => {
    const clientName = row.client?.trim();
    const channel = row.channel?.trim().toLowerCase() as Channel;
    if (!clientName || !["google", "meta", "tiktok"].includes(channel)) return;

    const impressions = parseFloat(row.impressions) || 0;
    const clicks = parseFloat(row.clicks) || 0;
    const leads = parseFloat(row.leads) || 0;
    const purchases = parseFloat(row.purchases) || 0;
    const spend = parseFloat(row.spend) || 0;

    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const cpl = leads > 0 ? spend / leads : 0;
    const cpp = purchases > 0 ? spend / purchases : 0;

    const campaign: Campaign = {
      id: `${clientName}-${index}`,
      adName: row.ad_name?.trim() || "Bez názvu",
      channel,
      impressions,
      clicks,
      leads,
      purchases,
      spend,
      ctr,
      cpl,
      cpp,
    };

    if (!clientMap.has(clientName)) {
      clientMap.set(clientName, {
        campaigns: [],
        thresholds: { ...DEFAULT_THRESHOLDS },
      });
    }
    clientMap.get(clientName)!.campaigns.push(campaign);
  });

  const clients: Client[] = Array.from(clientMap.entries()).map(([name, data]) => {
    return buildClientFromCampaigns(name, data.campaigns, data.thresholds);
  });

  // Sort: critical first, then warning, then good
  clients.sort((a, b) => {
    const order = { critical: 0, warning: 1, good: 2 };
    return order[a.status] - order[b.status];
  });

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return {
    clients,
    lastUpdated: now.toISOString(),
    dateRange: {
      from: sevenDaysAgo.toLocaleDateString("cs-CZ"),
      to: now.toLocaleDateString("cs-CZ"),
    },
  };
}

function buildClientFromCampaigns(
  name: string,
  campaigns: Campaign[],
  thresholds: ClientThresholds
): Client {
  const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
  const totalLeads = campaigns.reduce((s, c) => s + c.leads, 0);
  const totalPurchases = campaigns.reduce((s, c) => s + c.purchases, 0);
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);

  const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const avgCPL = totalLeads > 0 ? totalSpend / totalLeads : 0;
  const avgCPP = totalPurchases > 0 ? totalSpend / totalPurchases : 0;

  // Build per-channel summaries
  const channelMap = new Map<Channel, Campaign[]>();
  campaigns.forEach((c) => {
    if (!channelMap.has(c.channel)) channelMap.set(c.channel, []);
    channelMap.get(c.channel)!.push(c);
  });

  const channelSummaries: ChannelSummary[] = Array.from(channelMap.entries()).map(
    ([channel, cams]) => {
      const chSpend = cams.reduce((s, c) => s + c.spend, 0);
      const chImpressions = cams.reduce((s, c) => s + c.impressions, 0);
      const chClicks = cams.reduce((s, c) => s + c.clicks, 0);
      const chLeads = cams.reduce((s, c) => s + c.leads, 0);
      const chPurchases = cams.reduce((s, c) => s + c.purchases, 0);
      const chCTR = chImpressions > 0 ? (chClicks / chImpressions) * 100 : 0;
      const chCPL = chLeads > 0 ? chSpend / chLeads : 0;
      const chCPP = chPurchases > 0 ? chSpend / chPurchases : 0;

      return {
        channel,
        spend: chSpend,
        impressions: chImpressions,
        clicks: chClicks,
        leads: chLeads,
        purchases: chPurchases,
        ctr: chCTR,
        cpl: chCPL,
        cpp: chCPP,
        campaigns: cams,
        status: getChannelStatus(chCTR, chCPL, chCPP, thresholds),
      };
    }
  );

  const attentionReasons: string[] = [];

  if (avgCTR < thresholds.minCTR) {
    attentionReasons.push(`Nízké CTR (${fmt(avgCTR, 2)}% < ${thresholds.minCTR}%)`);
  }
  if (avgCPL > thresholds.maxCPL && totalLeads > 0) {
    attentionReasons.push(`Vysoké CPL (${fmtKc(avgCPL)} > ${fmtKc(thresholds.maxCPL)})`);
  }
  if (avgCPP > thresholds.maxCPP && totalPurchases > 0) {
    attentionReasons.push(`Vysoké CPP (${fmtKc(avgCPP)} > ${fmtKc(thresholds.maxCPP)})`);
  }
  if (totalLeads === 0 && totalPurchases === 0 && totalSpend > 0) {
    attentionReasons.push("Žádné konverze při aktivním spend");
  }

  const status = deriveStatus(avgCTR, avgCPL, avgCPP, totalLeads, totalPurchases, totalSpend, thresholds);

  return {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    thresholds,
    campaigns,
    totalSpend,
    totalLeads,
    totalPurchases,
    avgCTR,
    avgCPL,
    avgCPP,
    channelSummaries,
    status,
    attentionReasons,
  };
}

function getChannelStatus(ctr: number, cpl: number, cpp: number, t: ClientThresholds): Status {
  if (ctr < t.minCTR * 0.5) return "critical";
  if (cpl > t.maxCPL * 1.5 || cpp > t.maxCPP * 1.5) return "critical";
  if (ctr < t.minCTR || (cpl > t.maxCPL && cpl > 0) || (cpp > t.maxCPP && cpp > 0)) return "warning";
  return "good";
}

function deriveStatus(
  ctr: number, cpl: number, cpp: number,
  leads: number, purchases: number, spend: number,
  t: ClientThresholds
): Status {
  if (spend > 0 && leads === 0 && purchases === 0) return "critical";
  if (ctr < t.minCTR * 0.5) return "critical";
  if ((cpl > t.maxCPL * 1.5 && leads > 0) || (cpp > t.maxCPP * 1.5 && purchases > 0)) return "critical";
  if (ctr < t.minCTR) return "warning";
  if ((cpl > t.maxCPL && leads > 0) || (cpp > t.maxCPP && purchases > 0)) return "warning";
  return "good";
}

export function fmt(n: number, decimals = 1): string {
  return n.toLocaleString("cs-CZ", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtKc(n: number): string {
  if (n === 0) return "—";
  return n.toLocaleString("cs-CZ", { maximumFractionDigits: 0 }) + " Kč";
}

export function fmtSpend(n: number): string {
  return n.toLocaleString("cs-CZ", { maximumFractionDigits: 0 }) + " Kč";
}

export function statusColor(status: Status): string {
  return status === "good" ? "text-emerald-400" : status === "warning" ? "text-amber-400" : "text-red-400";
}

export function statusBg(status: Status): string {
  return status === "good" ? "bg-emerald-400/10 border-emerald-400/30" : status === "warning" ? "bg-amber-400/10 border-amber-400/30" : "bg-red-400/10 border-red-400/30";
}

export function statusDot(status: Status): string {
  return status === "good" ? "bg-emerald-400" : status === "warning" ? "bg-amber-400" : "bg-red-500";
}
