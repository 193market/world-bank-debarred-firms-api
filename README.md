# World Bank Debarred Firms Screening API

Screen suppliers against the World Bank Group debarment list: fuzzy names, former names, cross-debarments, change feed. Firms only.

**Try it (free tier for evaluation):** [https://rapidapi.com/193market/api/world-bank-debarred-firms-screening](https://rapidapi.com/193market/api/world-bank-debarred-firms-screening) · also on [api.market](https://api.market/store/193market/world-bank-debarred-firms-screening)

Screen a company name against the World Bank Group's list of debarred and cross-debarred firms: matching that ignores legal suffixes, accents and word order, weighs distinctive words over common ones, and checks former names and trading names; sanction basis, dates, cross-debarring bank, registration numbers, and a feed of additions and removals. Firms only.

## Who uses it

Third-party-risk and procurement-compliance platforms, consultancies and contractors bidding on multilateral-bank-financed projects, export-credit and trade-finance compliance teams.

## Quick start

Subscribe to the free BASIC plan on RapidAPI, copy your `X-RapidAPI-Key`, then:

```bash
curl "https://world-bank-debarred-firms-screening.p.rapidapi.com/v1/screen?name=Zhejiang%20Jiangneng%20Construction" \
  -H "X-RapidAPI-Key: $RAPIDAPI_KEY" \
  -H "X-RapidAPI-Host: world-bank-debarred-firms-screening.p.rapidapi.com"
```

Python and Node examples are in [`examples/`](examples/). Both read the key from the `RAPIDAPI_KEY` environment variable.

Other calls worth trying:
- Firms currently on the list from one country: `GET /v1/firms?country=CN&per_page=3`
- What changed since a date: `GET /v1/changes?since=2026-08-01&per_page=3`

## Example response

`GET /v1/screen?name=Zhejiang%20Jiangneng%20Construction` — Screen one company name:

```json
{
  "query": {
    "name": "Zhejiang Jiangneng Construction",
    "normalised": "ZHEJIANG JIANGNENG CONSTRUCTION",
    "country": null,
    "threshold": 0.8
  },
  "matched": true,
  "best_score": 1.0,
  "matches": [
    {
      "match_score": 1.0,
      "matched_name": "ZHEJIANG JIANGNENG CONSTRUCTION CO., LTD.",
      "matched_on": "name",
      "shared_distinctive_words": [
        "ZHEJIANG",
        "JIANGNENG"
      ],
      "id": 1103431,
      "name": "ZHEJIANG JIANGNENG CONSTRUCTION CO., LTD.",
      "entity_type": "firm",
      "other_names": [],
      "native_script_names": [
        "浙江江能建设有限公司"
      ],
      "registration_numbers": [],
      "country": {
        "code": "CN",
        "name": "China"
      },
      "city": "ZHEJIANG",
      "status": "cross_debarred",
      "currently_ineligible": true,
      "ineligible_from": "2026-07-06",
      "ineligible_to": "2029-06-11",
      "permanent": false,
      "basis": "Cross Debarment: ADB",
      "cross_debarment_by": "ADB",
      "controlled_affiliate_of_sanctioned_entity": false,
      "sanction_scope_note": null,
      "listed_since": "2026-07-06",
      "on_current_list": true
    }
  ],
  "data_freshness": {
    "list_checked_at": "2026-09-24T04:33:07+00:00",
    "list_changed_at": "2026-09-24T04:33:03+00:00",
    "firms_on_list": 1249
  },
  "scope": {
    "included": "Firms and consortia on the World Bank Group 'Debarred and cross-debarred firms' list, including controlled affiliates and firms cross-debarred under the 2010 mutual enforcement agreement (ADB, AfDB, EBRD, IDB).",
    "not_included": [
      "individuals",
      "unclassified entries",
      "..."
    ]
  },
  "attribution": {
    "source": "World Bank Group — Debarred and cross-debarred firms",
    "source_url": "https://www.worldbank.org/en/projects-operations/procurement/debarred-firms",
    "changes": "Firms only (individuals removed), street addresses removed, fields renamed to English keys, aliases and registration numbers parsed from the notes column, change history kept by this API.",
  ...
}
```

## Endpoints

| Method | Path | What it does | Parameters (* required) |
|---|---|---|---|
| GET | `/health` | Health check |  |
| GET | `/v1/screen` | Is this company on the World Bank debarment list? | `name`*, `country`, `threshold`, `limit` |
| POST | `/v1/screen/batch` | Screen up to 50 company names in one call | JSON body |
| GET | `/v1/firms` | Firms on the list, filtered by country, basis or dates | `country`, `status`, `cross_debarment_by`, `listed_since`, `ineligible_from_since`, `page`, `per_page` |
| GET | `/v1/firms/{firm_id}` | One firm, with its change history | `firm_id`* |
| GET | `/v1/changes` | Firms added to, removed from or changed on the list | `since`*, `page`, `per_page` |
| GET | `/v1/codes` | What the fields mean |  |

The full OpenAPI 3 specification is in [`openapi.json`](openapi.json).

## Plans

| Plan | Price | Included per month |
|---|---|---|
| BASIC | free | a small monthly quota for evaluation |
| PRO / ULTRA / MEGA | from $49 / month | larger monthly quotas, per-request overage, higher rate limits |

Current prices are always on the [RapidAPI pricing page](https://rapidapi.com/193market/api/world-bank-debarred-firms-screening/pricing). Error responses (4xx/5xx) are not charged on api.market.

## Data source and licence

World Bank Group listing of ineligible firms and individuals (individual rows are excluded). Matching ignores legal suffixes, accents and word order; every hit links back to the World Bank record.

Every response carries an `attribution` object naming the source and the changes made (translation, normalisation, filtering, aggregation). This API is an independent product and is not affiliated with or endorsed by any government agency or regulator.

## Support

Questions, missing fields, or a use case the current plans do not fit: open an issue in this repository or use the Discussions tab on the RapidAPI listing.
