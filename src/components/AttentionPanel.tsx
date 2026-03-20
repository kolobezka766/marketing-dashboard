"use client";
import { Client } from "@/lib/types";
import { fmtKc, fmt, fmtSpend } from "@/lib/utils";

interface AttentionPanelProps {
  clients: Client[];
}

export function AttentionPanel({ clients }: AttentionPanelProps) {
  const needsAttention = clients.filter((c) => c.status !== "good");

  if (needsAttention.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center gap-3">
        <span className="text-2xl">✅</span>
        <div>
          <p className="text-emerald-400 font-semibold">Všichni klienti jsou v pohodě</p>
          <p className="text-zinc-500 text-sm">Žádné kampaně nevyžadují okamžitou pozornost.</p>
        </div>
      </div>
    );
  }

  const critical = needsAttention.filter((c) => c.status === "critical");
  const warning = needsAttention.filter((c) => c.status === "warning");

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">🚨</span>
        <h2 className="text-base font-bold text-zinc-100">Potřebuje pozornost</h2>
        <span className="ml-auto text-xs text-zinc-500">{needsAttention.length} klientů</span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {[...critical, ...warning].map((client) => (
          <div
            key={client.id}
            className={`rounded-lg border p-3 ${
              client.status === "critical"
                ? "border-red-500/40 bg-red-500/8"
                : "border-amber-500/30 bg-amber-500/5"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-semibold text-zinc-100 text-sm leading-tight">{client.name}</span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                  client.status === "critical"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {client.status === "critical" ? "KRITICKÉ" : "VAROVÁNÍ"}
              </span>
            </div>

            <ul className="space-y-1">
              {client.attentionReasons.map((reason, i) => (
                <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                  <span className={client.status === "critical" ? "text-red-400" : "text-amber-400"}>
                    •
                  </span>
                  {reason}
                </li>
              ))}
            </ul>

            <div className="mt-2 pt-2 border-t border-zinc-700/50 flex gap-3 text-xs text-zinc-500">
              <span>Spend: <strong className="text-zinc-400">{fmtSpend(client.totalSpend)}</strong></span>
              <span>CTR: <strong className="text-zinc-400">{fmt(client.avgCTR, 2)}%</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
