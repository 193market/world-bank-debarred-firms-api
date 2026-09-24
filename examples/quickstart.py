"""World Bank Debarred Firms Screening API — quick start (Python, requests).
Set RAPIDAPI_KEY to the key shown on world-bank-debarred-firms-screening at rapidapi.com after subscribing to the free plan."""
import os
import requests

HOST = "world-bank-debarred-firms-screening.p.rapidapi.com"
KEY = os.environ["RAPIDAPI_KEY"]

def call(path: str):
    r = requests.get(f"https://{HOST}{path}",
                     headers={"X-RapidAPI-Key": KEY, "X-RapidAPI-Host": HOST}, timeout=30)
    r.raise_for_status()
    return r.json()

if __name__ == "__main__":
    # Screen one company name
    data = call("/v1/screen?name=Zhejiang%20Jiangneng%20Construction")
    import json
    print(json.dumps(data, ensure_ascii=False, indent=2)[:2000])
