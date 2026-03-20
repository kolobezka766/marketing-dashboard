/**
 * API Route: /api/metrics
 *
 * Tato route bude sloužit pro budoucí live data z reklamních platforem.
 * Zatím vrací prázdnou odpověď — data se načítají přes CSV import.
 *
 * BUDOUCÍ INTEGRACE:
 * - Google Ads: vyžaduje GOOGLE_ADS_DEVELOPER_TOKEN + GOOGLE_ADS_CUSTOMER_ID + OAuth2
 * - Meta: vyžaduje META_ACCESS_TOKEN + META_AD_ACCOUNT_ID
 * - TikTok: vyžaduje TIKTOK_ACCESS_TOKEN + TIKTOK_ADVERTISER_ID
 *
 * Všechny klíče se nastaví jako Environment Variables ve Vercelu.
 */

import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Implement live API fetching here once credentials are configured
  // Each platform requires setup — see README.md for instructions

  const hasGoogle = !!(process.env.GOOGLE_ADS_DEVELOPER_TOKEN && process.env.GOOGLE_ADS_CUSTOMER_ID);
  const hasMeta = !!(process.env.META_ACCESS_TOKEN && process.env.META_AD_ACCOUNT_ID);
  const hasTikTok = !!(process.env.TIKTOK_ACCESS_TOKEN && process.env.TIKTOK_ADVERTISER_ID);

  return NextResponse.json({
    status: "ready",
    integrations: {
      google: hasGoogle ? "configured" : "not_configured",
      meta: hasMeta ? "configured" : "not_configured",
      tiktok: hasTikTok ? "configured" : "not_configured",
    },
    message: "Live integrations coming soon. Use CSV import for now.",
  });
}
