import csv
import json

data = []

with open("Gerningskoder.csv", mode="r", encoding="windows-1252") as f:
    reader = csv.DictReader(f, delimiter=';')
    for row in reader:
        paragraf = row["paragraf"].strip()
        kapitel = row["kapitel"].strip()
        forbrydelse = row["forbrydelse"].strip()
        kode = str(row["kode"]).zfill(5)

        entry = {
            "kode": kode,
            "forbrydelse": forbrydelse,
            "paragraf": paragraf,
            "kapitel": kapitel
        }

        data.append(entry)

with open("gerningskoder_med_kapitler.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✅ Færdig: JSON gemt som 'gerningskoder.json'")
