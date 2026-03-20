"use client";
import { useState, useEffect } from "react";
import { DashboardData, CsvRow } from "@/lib/types";
import { parseCsvRows } from "@/lib/utils";
import { MOCK_CSV_ROWS } from "@/lib/mockData";
import { AttentionPanel } from "./AttentionPanel";
import { ClientCard } from "./ClientCard";
import { CsvImport } from "./CsvImport";

type View = "all" | "critical" | "warning" | "good";

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [view, setView] = useState<View>("all");
  const [showImport, setShowImport] = useState(false);
  const [search, setSearch] = useState("");

  // Load mock data on mount
  useEffect(() => {
    setData(parseCsvRows(MOCK_CSV_ROWS));
  }, []);

  function handleImport(rows: CsvRow[]) {
    setData(parseCsvRows(rows));
    setShowImport(false);
  }

  function handleLoadDemo() {
    setData(parseCsvRows(MOCK_CSV_ROWS));
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Načítám...</div>
      </div>
    );
  }

  const filtered = data.clients.filter((c) => {
    const matchesView = view === "all" || c.status === view;
    const matchesSearch = search === "" || c.name.toLowerCase().includes(search.toLowerCase());
    return matchesView && matchesSearch;
  });

  const counts = {
    all: data.clients.length,
    critical: data.clients.filter((c) => c.status === "critical").length,
    warning: data.clients.filter((c) => c.status === "warning").length,
    good: data.clients.filter((c) => c.status === "good").length,
  };

  const totalSpend = data.clients.reduce((s, c) => s + c.totalSpend, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top bar */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">📊</span>
            <div>
              <h1 className="font-bold text-zinc-100 text-base leading-tight">Marketing Dashboard</h1>
              <p className="text-[11px] text-zinc-500">
                {data.dateRange.from} — {data.dateRange.to} · Posledních 7 dní
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-3 text-xs text-zinc-500 border-r border-zinc-700 pr-3 mr-1">
              <span>Celkový spend: <strong className="text-zinc-300">{totalSpend.toLocaleString("cs-CZ")} Kč</strong></span>
              <span>{data.clients.length} klientů</span>
            </div>
            <button
              onClick={() => setShowImport(!showImport)}
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
            >
              {showImport ? "✕ Zavřít" : "📂 Import CSV"}
            </button>
            <button
              onClick={handleLoadDemo}
              className="text-xs px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/30 transition-colors"
            >
              Demo data
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* CSV Import panel */}
        {showImport && (
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 space-y-2">
            <h2 className="text-sm font-semibold text-zinc-300">Import dat z CSV</h2>
            <CsvImport onImport={handleImport} />
          </div>
        )}

        {/* Attention panel */}
        <AttentionPanel clients={data.clients} />

        {/* Filter bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Hledat klienta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-40 max-w-xs text-sm px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
          />
          <div className="flex gap-1.5 ml-auto">
            {(["all", "critical", "warning", "good"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                  view === v
                    ? v === "critical"
                      ? "bg-red-500/20 border-red-500/40 text-red-400"
                      : v === "warning"
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                      : v === "good"
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                      : "bg-zinc-700 border-zinc-600 text-zinc-200"
                    : "bg-zinc-900 border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
                }`}
              >
                {v === "all" ? "Všichni" : v === "critical" ? "🔴 Kritické" : v === "warning" ? "🟡 Varování" : "🟢 OK"}
                <span className="opacity-60">
                  ({v === "all" ? counts.all : v === "critical" ? counts.critical : v === "warning" ? counts.warning : counts.good})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Clients list */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-zinc-600">Žádní klienti neodpovídají filtru.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-zinc-700 pt-4">
          Aktualizováno: {new Date(data.lastUpdated).toLocaleString("cs-CZ")}
        </footer>
      </main>
    </div>
  );
}
