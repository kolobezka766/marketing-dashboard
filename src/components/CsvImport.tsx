"use client";
import { useRef, useState } from "react";
import Papa from "papaparse";
import { CsvRow } from "@/lib/types";

interface CsvImportProps {
  onImport: (rows: CsvRow[]) => void;
}

const CSV_TEMPLATE = `client,channel,ad_name,impressions,clicks,leads,purchases,spend,daily_budget
Můj Klient,google,Název reklamy Google,10000,300,25,10,2500,400
Můj Klient,meta,Název reklamy Meta,45000,1350,80,0,3200,500
Můj Klient,tiktok,TikTok video,90000,2700,30,5,1800,280`;

const REQUIRED_COLUMNS = ["client", "channel", "ad_name", "impressions", "clicks", "leads", "purchases", "spend", "daily_budget"];

export function CsvImport({ onImport }: CsvImportProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function parseFile(file: File) {
    setError(null);
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length > 0) {
          setError("Chyba při čtení CSV: " + result.errors[0].message);
          return;
        }
        const headers = result.meta.fields ?? [];
        const missing = REQUIRED_COLUMNS.filter((r) => !headers.includes(r));
        if (missing.length > 0) {
          setError(`Chybějící sloupce: ${missing.join(", ")}`);
          return;
        }
        onImport(result.data as CsvRow[]);
      },
    });
  }

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketing_sablona.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) parseFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          dragging ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) parseFile(file);
          }}
        />
        <p className="text-zinc-400 text-sm">
          <span className="text-zinc-200 font-semibold">Přetáhni CSV sem</span> nebo klikni pro výběr
        </p>
        <p className="text-zinc-600 text-xs mt-1">
          Sloupce: client · channel · ad_name · impressions · clicks · leads · purchases · spend · daily_budget
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        onClick={downloadTemplate}
        className="text-xs text-zinc-500 hover:text-zinc-300 underline transition-colors"
      >
        Stáhnout CSV šablonu
      </button>
    </div>
  );
}
