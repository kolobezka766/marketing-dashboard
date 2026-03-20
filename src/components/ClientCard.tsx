"use client";
import { useState } from "react";
import { Client, ChannelSummary, Campaign } from "@/lib/types";
import { fmt, fmtKc, fmtSpend, statusBg, statusColor, statusDot } from "@/lib/utils";
import { ChannelBadge, ChannelIcon } from "./ChannelBadge";
import { KpiMetric } from "./KpiMetric";

export function ClientCard({ client }: { client: Client }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded-xl border ${statusBg(client.status)} transition-all duration-200`}>
      {/* ── Summary row ───────────────────────────────────────────────── */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <div className="flex-shrink-0 mt-1.5">
          <span className={`block w-2.5 h-2.5 rounded-full ${statusDot(client.status)}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-zinc-100 text-base leading-tight">{client.name}</h3>
            <StatusBadge status={client.status} />
          </div>
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            {client.channelSummaries.map((ch) => (
              <ChannelBadge key={ch.channel} channel={ch.channel} />
            ))}
          </div>
        </div>

        {/* Top KPIs */}
        <div className="hidden sm:flex gap-5 flex-shrink-0">
          <KpiMetric label="Spend"  value={fmtSpend(client.totalSpend)} />
          <KpiMetric label="Budget/den" value={fmtSpend(client.totalDailyBudget)} />
          <KpiMetric
            label="CTR"
            value={`${fmt(client.avgCTR, 2)}%`}
            status={client.avgCTR < client.thresholds.minCTR
              ? client.avgCTR < client.thresholds.minCTR * 0.5 ? "critical" : "warning"
              : "good"}
          />
          {client.totalLeads > 0 && (
            <KpiMetric
              label="CPL"
              value={fmtKc(client.avgCPL)}
              status={client.avgCPL > client.thresholds.maxCPL
                ? client.avgCPL > client.thresholds.maxCPL * 1.5 ? "critical" : "warning"
                : "good"}
            />
          )}
          {client.totalPurchases > 0 && (
            <KpiMetric
              label="CPP"
              value={fmtKc(client.avgCPP)}
              status={client.avgCPP > client.thresholds.maxCPP
                ? client.avgCPP > client.thresholds.maxCPP * 1.5 ? "critical" : "warning"
                : "good"}
            />
          )}
          <KpiMetric label="CPM" value={fmtKc(client.avgCPM)} />
          <KpiMetric label="Leads" value={client.totalLeads > 0 ? String(client.totalLeads) : "—"} />
        </div>

        <span className={`flex-shrink-0 text-zinc-500 mt-1 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {/* ── Expanded detail ───────────────────────────────────────────── */}
      {expanded && (
        <div className="border-t border-zinc-700/40 divide-y divide-zinc-800/60">
          {client.channelSummaries.map((ch) => (
            <ChannelSection key={ch.channel} summary={ch} thresholds={client.thresholds} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Channel section with summary + ad table ── */
function ChannelSection({ summary, thresholds }: { summary: ChannelSummary; thresholds: Client["thresholds"] }) {
  return (
    <div className="p-4 space-y-3">
      {/* Channel header */}
      <div className="flex items-center gap-2 flex-wrap">
        <ChannelIcon channel={summary.channel} size="md" />
        <span className="font-semibold text-zinc-200 capitalize">{summary.channel}</span>
        <span className={`w-2 h-2 rounded-full ${statusDot(summary.status)}`} />
        <div className="flex gap-4 ml-auto flex-wrap text-right">
          <KpiMetric label="Spend"      value={fmtSpend(summary.spend)} />
          <KpiMetric label="Budget/den" value={fmtSpend(summary.dailyBudget)} />
          <KpiMetric
            label="CTR"
            value={`${fmt(summary.ctr, 2)}%`}
            status={summary.ctr < thresholds.minCTR
              ? summary.ctr < thresholds.minCTR * 0.5 ? "critical" : "warning"
              : "good"}
          />
          <KpiMetric label="CPM" value={fmtKc(summary.cpm)} />
          {summary.leads > 0 && (
            <KpiMetric
              label="CPL"
              value={fmtKc(summary.cpl)}
              status={summary.cpl > thresholds.maxCPL
                ? summary.cpl > thresholds.maxCPL * 1.5 ? "critical" : "warning"
                : "good"}
              sub={`${summary.leads} leadů`}
            />
          )}
          {summary.purchases > 0 && (
            <KpiMetric
              label="CPP"
              value={fmtKc(summary.cpp)}
              status={summary.cpp > thresholds.maxCPP
                ? summary.cpp > thresholds.maxCPP * 1.5 ? "critical" : "warning"
                : "good"}
              sub={`${summary.purchases} nákupů`}
            />
          )}
          <KpiMetric label="Impressions" value={summary.impressions.toLocaleString("cs-CZ")} />
        </div>
      </div>

      {/* Ad table */}
      <div className="rounded-lg overflow-hidden border border-zinc-800">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-zinc-900 text-zinc-500 uppercase tracking-wider">
              <th className="text-left px-3 py-2 font-medium">Název reklamy</th>
              <th className="text-right px-3 py-2 font-medium">Impressions</th>
              <th className="text-right px-3 py-2 font-medium">CTR</th>
              <th className="text-right px-3 py-2 font-medium">CPM</th>
              <th className="text-right px-3 py-2 font-medium">CPL</th>
              <th className="text-right px-3 py-2 font-medium">CPP</th>
              <th className="text-right px-3 py-2 font-medium">Spend</th>
              <th className="text-right px-3 py-2 font-medium">Budget/den</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {summary.campaigns.map((cam) => (
              <AdRow key={cam.id} campaign={cam} thresholds={summary} />
            ))}
          </tbody>
          {/* Channel totals row */}
          <tfoot>
            <tr className="bg-zinc-900/60 text-zinc-400 font-semibold">
              <td className="px-3 py-2 text-zinc-500 text-[11px] uppercase tracking-wider">Celkem kanál</td>
              <td className="px-3 py-2 text-right">{summary.impressions.toLocaleString("cs-CZ")}</td>
              <td className={`px-3 py-2 text-right ${summary.ctr < 1.5 ? "text-amber-400" : "text-zinc-300"}`}>
                {fmt(summary.ctr, 2)}%
              </td>
              <td className="px-3 py-2 text-right">{fmtKc(summary.cpm)}</td>
              <td className="px-3 py-2 text-right">{summary.leads > 0 ? fmtKc(summary.cpl) : "—"}</td>
              <td className="px-3 py-2 text-right">{summary.purchases > 0 ? fmtKc(summary.cpp) : "—"}</td>
              <td className="px-3 py-2 text-right">{fmtSpend(summary.spend)}</td>
              <td className="px-3 py-2 text-right">{fmtSpend(summary.dailyBudget)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

/* ── Single ad row ── */
function AdRow({ campaign: c, thresholds }: { campaign: Campaign; thresholds: ChannelSummary }) {
  const ctrBad  = c.ctr < 1.5;
  const cplBad  = c.cpl > 150 && c.leads > 0;
  const cppBad  = c.cpp > 800 && c.purchases > 0;

  return (
    <tr className="bg-zinc-950/40 hover:bg-zinc-800/30 transition-colors">
      <td className="px-3 py-2.5 text-zinc-300 max-w-[200px]">
        <span className="block truncate" title={c.adName}>{c.adName}</span>
      </td>
      <td className="px-3 py-2.5 text-right text-zinc-400">
        {c.impressions.toLocaleString("cs-CZ")}
      </td>
      <td className={`px-3 py-2.5 text-right font-medium ${ctrBad ? "text-amber-400" : "text-zinc-300"}`}>
        {fmt(c.ctr, 2)}%
      </td>
      <td className="px-3 py-2.5 text-right text-zinc-400">
        {fmtKc(c.cpm)}
      </td>
      <td className={`px-3 py-2.5 text-right font-medium ${cplBad ? "text-red-400" : c.leads > 0 ? "text-zinc-300" : "text-zinc-700"}`}>
        {c.leads > 0 ? fmtKc(c.cpl) : "—"}
      </td>
      <td className={`px-3 py-2.5 text-right font-medium ${cppBad ? "text-red-400" : c.purchases > 0 ? "text-zinc-300" : "text-zinc-700"}`}>
        {c.purchases > 0 ? fmtKc(c.cpp) : "—"}
      </td>
      <td className="px-3 py-2.5 text-right text-zinc-400">
        {fmtSpend(c.spend)}
      </td>
      <td className="px-3 py-2.5 text-right text-zinc-500">
        {c.dailyBudget > 0 ? fmtSpend(c.dailyBudget) : "—"}
      </td>
    </tr>
  );
}

/* ── Status badge ── */
function StatusBadge({ status }: { status: Client["status"] }) {
  const cfg = {
    good:     { label: "OK",        cls: "bg-emerald-400/15 text-emerald-400" },
    warning:  { label: "Varování",  cls: "bg-amber-400/15 text-amber-400"    },
    critical: { label: "Kritické",  cls: "bg-red-400/15 text-red-400"        },
  }[status];
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}
