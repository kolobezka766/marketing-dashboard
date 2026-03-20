"use client";
import { Channel } from "@/lib/types";

const CHANNEL_CONFIG: Record<Channel, { label: string; color: string; icon: string }> = {
  google: { label: "Google", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: "G" },
  meta: { label: "Meta", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", icon: "M" },
  tiktok: { label: "TikTok", color: "bg-pink-500/20 text-pink-400 border-pink-500/30", icon: "T" },
};

export function ChannelBadge({ channel }: { channel: Channel }) {
  const cfg = CHANNEL_CONFIG[channel];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.color}`}>
      <span className="font-bold">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

export function ChannelIcon({ channel, size = "sm" }: { channel: Channel; size?: "sm" | "md" }) {
  const cfg = CHANNEL_CONFIG[channel];
  const sz = size === "md" ? "w-8 h-8 text-sm" : "w-6 h-6 text-xs";
  return (
    <span className={`inline-flex items-center justify-center rounded-full font-bold border ${sz} ${cfg.color}`}>
      {cfg.icon}
    </span>
  );
}
