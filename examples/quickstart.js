// World Bank Debarred Firms Screening API — quick start (Node 18+, built-in fetch).
// Set RAPIDAPI_KEY to the key shown on world-bank-debarred-firms-screening at rapidapi.com after subscribing to the free plan.
const HOST = "world-bank-debarred-firms-screening.p.rapidapi.com";
const KEY = process.env.RAPIDAPI_KEY;

async function call(path) {
  const res = await fetch(`https://${HOST}${path}`, {
    headers: { "X-RapidAPI-Key": KEY, "X-RapidAPI-Host": HOST },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

// Screen one company name
call("/v1/screen?name=Zhejiang%20Jiangneng%20Construction").then((d) => console.log(JSON.stringify(d, null, 2).slice(0, 2000)));
