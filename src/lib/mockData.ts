import { CsvRow } from "./types";

// Demo data — replace with CSV import or live API
export const MOCK_CSV_ROWS: CsvRow[] = [
  // Client: Pizzeria Roma
  { client: "Pizzeria Roma", channel: "meta", ad_name: "Rozvoz pizzy Praha 7", impressions: "42000", clicks: "1890", leads: "134", purchases: "89", spend: "4200" },
  { client: "Pizzeria Roma", channel: "google", ad_name: "Pizza delivery Praha", impressions: "18500", clicks: "1110", leads: "98", purchases: "76", spend: "3100" },
  { client: "Pizzeria Roma", channel: "tiktok", ad_name: "Pizza challenge #roma", impressions: "95000", clicks: "2280", leads: "42", purchases: "18", spend: "1800" },

  // Client: AutoServis Novák
  { client: "AutoServis Novák", channel: "google", ad_name: "Pneuservis Praha - levně", impressions: "12400", clicks: "248", leads: "31", purchases: "28", spend: "2900" },
  { client: "AutoServis Novák", channel: "meta", ad_name: "Zimní přezutí akce", impressions: "28000", clicks: "364", leads: "18", purchases: "14", spend: "1500" },

  // Client: Fit Eshop — BAD performance (needs attention)
  { client: "Fit Eshop", channel: "meta", ad_name: "Proteiny akce 2024", impressions: "65000", clicks: "455", leads: "12", purchases: "8", spend: "5800" },
  { client: "Fit Eshop", channel: "google", ad_name: "Doplňky stravy", impressions: "22000", clicks: "220", leads: "9", purchases: "5", spend: "3200" },
  { client: "Fit Eshop", channel: "tiktok", ad_name: "Workout motivation", impressions: "110000", clicks: "880", leads: "6", purchases: "3", spend: "2100" },

  // Client: Beauty Studio Lenka
  { client: "Beauty Studio Lenka", channel: "meta", ad_name: "Permanentní make-up slevy", impressions: "31000", clicks: "1550", leads: "87", purchases: "0", spend: "2800" },
  { client: "Beauty Studio Lenka", channel: "tiktok", ad_name: "Transformation video", impressions: "88000", clicks: "3520", leads: "124", purchases: "0", spend: "1900" },

  // Client: Realitka Brno — needs attention (high CPL)
  { client: "Realitka Brno", channel: "google", ad_name: "Byty Brno na prodej", impressions: "9800", clicks: "196", leads: "4", purchases: "2", spend: "6200" },
  { client: "Realitka Brno", channel: "meta", ad_name: "Investiční byty 2024", impressions: "41000", clicks: "492", leads: "7", purchases: "3", spend: "4800" },

  // Client: Kavárna Moment
  { client: "Kavárna Moment", channel: "meta", ad_name: "Ranní káva + breakfast", impressions: "22000", clicks: "1320", leads: "98", purchases: "0", spend: "1100" },
  { client: "Kavárna Moment", channel: "tiktok", ad_name: "Latte art video", impressions: "54000", clicks: "2700", leads: "156", purchases: "0", spend: "800" },
];

export const DEFAULT_THRESHOLDS = {
  minCTR: 1.5,    // % — below this is warning
  maxCPL: 150,    // Kč — above this is warning
  maxCPP: 800,    // Kč — above this is warning
};
