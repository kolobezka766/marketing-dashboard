import { CsvRow } from "./types";

export const MOCK_CSV_ROWS: CsvRow[] = [
  // ── Pizzeria Roma ──────────────────────────────────────────────────────────
  { client: "Pizzeria Roma", channel: "meta",   ad_name: "Rozvoz pizzy Praha 7 – video",  impressions: "42000",  clicks: "1890", leads: "134", purchases: "89", spend: "4200",  daily_budget: "600" },
  { client: "Pizzeria Roma", channel: "meta",   ad_name: "Rozvoz pizzy Praha 7 – statika", impressions: "18000", clicks: "612",  leads: "41",  purchases: "29", spend: "1800",  daily_budget: "300" },
  { client: "Pizzeria Roma", channel: "google", ad_name: "Pizza delivery Praha – search",  impressions: "12400", clicks: "868",  leads: "78",  purchases: "61", spend: "2600",  daily_budget: "400" },
  { client: "Pizzeria Roma", channel: "google", ad_name: "Pizza Roma brand",               impressions: "6100",  clicks: "242",  leads: "20",  purchases: "15", spend: "500",   daily_budget: "100" },
  { client: "Pizzeria Roma", channel: "tiktok", ad_name: "Pizza challenge #roma",          impressions: "95000", clicks: "2280", leads: "42",  purchases: "18", spend: "1800",  daily_budget: "250" },

  // ── AutoServis Novák ───────────────────────────────────────────────────────
  { client: "AutoServis Novák", channel: "google", ad_name: "Pneuservis Praha – levně",   impressions: "12400", clicks: "248", leads: "31", purchases: "28", spend: "2900", daily_budget: "450" },
  { client: "AutoServis Novák", channel: "google", ad_name: "Servis auta Praha",          impressions: "7800",  clicks: "140", leads: "18", purchases: "16", spend: "1600", daily_budget: "250" },
  { client: "AutoServis Novák", channel: "meta",   ad_name: "Zimní přezutí – akce",       impressions: "28000", clicks: "364", leads: "18", purchases: "14", spend: "1500", daily_budget: "200" },

  // ── Fit Eshop (špatný výkon) ───────────────────────────────────────────────
  { client: "Fit Eshop", channel: "meta",   ad_name: "Proteiny akce 2024 – video",   impressions: "65000",  clicks: "455", leads: "12", purchases: "8",  spend: "5800", daily_budget: "850" },
  { client: "Fit Eshop", channel: "meta",   ad_name: "Proteiny akce 2024 – statika", impressions: "22000",  clicks: "110", leads: "3",  purchases: "2",  spend: "1900", daily_budget: "280" },
  { client: "Fit Eshop", channel: "google", ad_name: "Doplňky stravy – search",      impressions: "22000",  clicks: "220", leads: "9",  purchases: "5",  spend: "3200", daily_budget: "480" },
  { client: "Fit Eshop", channel: "tiktok", ad_name: "Workout motivation #fitlife",  impressions: "110000", clicks: "880", leads: "6",  purchases: "3",  spend: "2100", daily_budget: "300" },

  // ── Beauty Studio Lenka ────────────────────────────────────────────────────
  { client: "Beauty Studio Lenka", channel: "meta",   ad_name: "Permanentní make-up slevy",  impressions: "31000", clicks: "1550", leads: "87", purchases: "0", spend: "2800", daily_budget: "400" },
  { client: "Beauty Studio Lenka", channel: "meta",   ad_name: "Microblading – before/after", impressions: "19000", clicks: "1140", leads: "63", purchases: "0", spend: "1700", daily_budget: "250" },
  { client: "Beauty Studio Lenka", channel: "tiktok", ad_name: "Transformation video",        impressions: "88000", clicks: "3520", leads: "124","purchases": "0", spend: "1900", daily_budget: "280" },

  // ── Realitka Brno (vysoké CPL) ─────────────────────────────────────────────
  { client: "Realitka Brno", channel: "google", ad_name: "Byty Brno na prodej",         impressions: "9800",  clicks: "196", leads: "4", purchases: "2", spend: "6200", daily_budget: "900" },
  { client: "Realitka Brno", channel: "google", ad_name: "Pronájem bytu Brno",          impressions: "5200",  clicks: "78",  leads: "2", purchases: "1", spend: "2800", daily_budget: "400" },
  { client: "Realitka Brno", channel: "meta",   ad_name: "Investiční byty 2024 – video", impressions: "41000", clicks: "492", leads: "7", purchases: "3", spend: "4800", daily_budget: "700" },

  // ── Kavárna Moment ─────────────────────────────────────────────────────────
  { client: "Kavárna Moment", channel: "meta",   ad_name: "Ranní káva + breakfast",  impressions: "22000", clicks: "1320", leads: "98",  purchases: "0", spend: "1100", daily_budget: "160" },
  { client: "Kavárna Moment", channel: "tiktok", ad_name: "Latte art video",          impressions: "54000", clicks: "2700", leads: "156", purchases: "0", spend: "800",  daily_budget: "115" },
  { client: "Kavárna Moment", channel: "tiktok", ad_name: "Barista challenge",        impressions: "38000", clicks: "1520", leads: "89",  purchases: "0", spend: "560",  daily_budget: "80"  },
];

export const DEFAULT_THRESHOLDS = {
  minCTR: 1.5,
  maxCPL: 150,
  maxCPP: 800,
};
