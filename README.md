# Marketing Dashboard

Přehled marketingových statistik pro všechny klienty na jednom místě.
Kanály: Google Ads, Meta, TikTok. KPIs: CTR, CPL, CPP.

## Rychlý start

```bash
# 1. Nainstaluj závislosti
npm install

# 2. Spusť lokálně
npm run dev
# → otevři http://localhost:3000
```

## Deploy na Vercel (zdarma, nefunguje lokálně = cloud)

```bash
# 1. Vytvoř účet na vercel.com
# 2. Nainstaluj Vercel CLI
npm i -g vercel

# 3. Deploy
vercel

# Nebo propoj GitHub repo a Vercel nasadí automaticky při každém push
```

## CSV Import

Exportuj data z Google Ads / Meta / TikTok do CSV a naimportuj přes tlačítko v dashboardu.

**Formát CSV:**
```csv
client,channel,ad_name,impressions,clicks,leads,purchases,spend
Klient ABC,google,Reklama 1,10000,300,25,10,2500
Klient ABC,meta,Reklama 2,45000,1350,80,0,3200
Klient ABC,tiktok,Video reklama,90000,2700,30,5,1800
```

- `channel`: `google` / `meta` / `tiktok`
- `spend`: v Kč (nebo jakékoli měně, konzistentně)
- `leads`: počet leadů (0 pokud není lead gen kampaň)
- `purchases`: počet nákupů (0 pokud není e-commerce kampaň)

## Live API integrace (budoucí fáze)

Zkopíruj `.env.local.example` jako `.env.local` a vyplň API klíče.

### Google Ads
1. Jdi na [Google Ads API Center](https://ads.google.com/aw/apicenter)
2. Požádej o Developer Token (schválení 1–3 dny)
3. Vytvoř OAuth2 credentials v [Google Cloud Console](https://console.cloud.google.com)

### Meta
1. Vytvoř app na [Meta for Developers](https://developers.facebook.com)
2. Přidej Marketing API produkt
3. Vygeneruj User Access Token s `ads_read` permission

### TikTok
1. Registruj se na [TikTok for Business](https://business-api.tiktok.com/portal)
2. Vytvoř app a požádej o schválení (1–2 týdny)

## Přenositelnost

Celý projekt je v této složce. Pro přesun na jiný počítač:
1. Zkopíruj složku `marketing-dashboard/`
2. Spusť `npm install`
3. Spusť `npm run dev`

Pro cloud (bez závislosti na počítači):
- Deploy na Vercel — app běží v cloudu 24/7 zdarma
- Kód na GitHub — záloha a přístup odkudkoli
