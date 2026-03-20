"use client";
import { useState } from "react";
import { Client, ChannelSummary } from "@/lib/types";
import { fmt, fmtKc, fmtSpend, statusBg, statusColor, statusDot } from "@/lib/utils";
import { ChannelBadge, ChannelIcon } from "./ChannelBadge";
import { KpiMetric } from "./KpiMetric";

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded-xl border ${statusBg(client.status)} transition-all duration-200`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        {/* Status dot */}
        <div className="flex-shrink-0 mt-1">
          <span className={`block w-2.5 h-2.5 rounded-full ${statusDot(client.status)} shadow-sm`} />
        </div>

        {/* Client info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-zinc-100 text-base leading-tight">{client.name}</h3>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                client.status === "good"
                  ? "bg-emerald-400/15 text-emerald-400"
                  : client.status === "warning"
                  ? "bg-amber-400/15 text-amber-400"
                  : "bg-red-400/15 text-red-400"
              }`}
            >
              {client.status === "good" ? "OK" : client.status === "warning" ? "Varování" : "Kritické"}
            </span>
          </div>

          {/* Channel pills */}
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            {client.channelSummaries.map((ch) => (
              <ChannelBadge key={ch.channel} channel={ch.channel} />
            ))}
          </div>
        </div>

        {/* Top-level KPIs */}
        <div className="flex gap-4 flex-shrink-0 text-right">
          <KpiMetric
            label="Spend"
            value={fmtSpend(client.totalSpend)}
          />
          <KpiMetric
            label="CTR"
            value={`${fmt(client.avgCTR, 2)}%`}
            status={client.avgCTR < client.thresholds.minCTR ? (client.avgCTR < client.thresholds.minCTR * 0.5 ? "critical" : "warning") : "good"}
          />
          {client.totalLeads > 0 && (
            <KpiMetric
              label="CPL"
              value={fmtKc(client.avgCPL)}
              status={client.avgCPL > client.thresholds.maxCPL ? (client.avgCPL > client.thresholds.maxCPL * 1.5 ? "critical" : "warning") : "good"}
            />
          )}
          {client.totalPurchases > 0 && (
            <KpiMetric
              label="CPP"
              value={fmtKc(client.avgCPP)}
              status={client.avgCPP > client.thresholds.maxCPP ? (client.avgCPP > client.thresholds.maxCPP * 1.5 ? "critical" : "warning") : "good"}
            />
          )}
        </div>

        {/* Expand arrow */}
        <span className={`flex-shrink-0 text-zinc-500 transition-transform duration-200 mt-1 ${expanded ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {/* Expanded detail — per channel */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-zinc-700/30 pt-3 space-y-3">
          {client.channelSummaries.map((ch) => (
            <ChannelDetail key={ch.channel} summary={ch} thresholds={client.thresholds} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChannelDetail({ summary, thresholds }: { summary: ChannelSummary; thresholds: Client["thresholds"] }) {
  return (
    <div className="rounded-lg bg-zinc-900/50 border border-zinc-700/30 p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ChannelIcon channel={summary.channel} size="md" />
          <span className="font-semibold text-zinc-200 text-sm capitalize">{summary.channel}</span>
          <span className={`w-2 h-2 rounded-full ${statusDot(summary.status)}`} />
        </div>
        <span className="text-xs text-zinc-500">{fmtSpend(summary.spend)}</span>
      </div>

      {/* Channel KPIs */}
      <div className="grid grid-cols-4 gap-3 mb-3">
        <KpiMetric
          label="CTR"
          value={`${fmt(summary.ctr, 2)}%`}
          status={summary.ctr < thresholds.minCTR ? (summary.ctr < thresholds.minCTR * 0.5 ? "critical" : "warning") : "good"}
          sub={`${summary.clicks.toLocaleString("cs-CZ")} kliků`}
        />
        {summary.leads > 0 && (
          <KpiMetric
            label="CPL"
            value={fmtKc(summary.cpl)}
            status={summary.cpl > thresholds.maxCPL ? (summary.cpl > thresholds.maxCPL * 1.5 ? "critical" : "warning") : "good"}
            sub={`${summary.leads} leadů`}
          />
        )}
        {summary.purchases > 0 && (
          <KpiMetric
            label="CPP"
            value={fmtKc(summary.cpp)}
            status={summary.cpp > thresholds.maxCPP ? (summary.cpp > thresholds.maxCPP * 1.5 ? "critical" : "warning") : "good"}
            sub={`${summary.purchases} nákupů`}
          />
        )}
        <KpiMetric
          label="Impr."
          value={summary.impressions.toLocaleString("cs-CZ")}
        />
      </div>

      {/* Campaigns */}
      <div className="space-y-1.5">
        {summary.campaigns.map((cam) => (
          <div key={cam.id} className="flex items-center gap-2 text-xs text-zinc-500 bg-zinc-800/40 rounded px-2 py-1.5">
            <span className="flex-1 truncate text-zinc-400">{cam.adName}</span>
            <span className="flex-shrink-0">CTR <strong className="text-zinc-300">{fmt(cam.ctr, 2)}%</strong></span>
            {cam.leads > 0 && (
              <span className="flex-shrink-0">CPL <strong className="text-zinc-300">{fmtKc(cam.cpl)}</strong></span>
            )}
            {cam.purchases > 0 && (
              <span className="flex-shrink-0">CPP <strong className="text-zinc-300">{fmtKc(cam.cpp)}</strong></span>
            )}
            <span className="flex-shrink-0 text-zinc-600">{fmtSpend(cam.spend)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
