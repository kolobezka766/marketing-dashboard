"use client";
import { Status } from "@/lib/types";
import { statusColor } from "@/lib/utils";

interface KpiMetricProps {
  label: string;
  value: string;
  status?: Status;
  sub?: string;
}

export function KpiMetric({ label, value, status, sub }: KpiMetricProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">{label}</span>
      <span className={`text-sm font-bold ${status ? statusColor(status) : "text-zinc-100"}`}>
        {value}
      </span>
      {sub && <span className="text-[10px] text-zinc-600">{sub}</span>}
    </div>
  );
}
