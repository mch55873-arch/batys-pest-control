import json

input_file = r"C:\Users\HP\.gemini\antigravity\scratch\pest-control-seo\data\usa_database.json"

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_states = {s['code'] for s in data['states']}

state_abbrevs = {
    "Alabama": "al", "Alaska": "ak", "Arizona": "az", "Arkansas": "ar", "California": "ca",
    "Colorado": "co", "Connecticut": "ct", "Delaware": "de", "Florida": "fl", "Georgia": "ga",
    "Hawaii": "hi", "Idaho": "id", "Illinois": "il", "Indiana": "in", "Iowa": "ia",
    "Kansas": "ks", "Kentucky": "ky", "Louisiana": "la", "Maine": "me", "Maryland": "md",
    "Massachusetts": "ma", "Michigan": "mi", "Minnesota": "mn", "Mississippi": "ms", "Missouri": "mo",
    "Montana": "mt", "Nebraska": "ne", "Nevada": "nv", "New Hampshire": "nh", "New Jersey": "nj",
    "New Mexico": "nm", "New York": "ny", "North Carolina": "nc", "North Dakota": "nd", "Ohio": "oh",
    "Oklahoma": "ok", "Oregon": "or", "Pennsylvania": "pa", "Rhode Island": "ri", "South Carolina": "sc",
    "South Dakota": "sd", "Tennessee": "tn", "Texas": "tx", "Utah": "ut", "Vermont": "vt",
    "Virginia": "va", "Washington": "wa", "West Virginia": "wv", "Wisconsin": "wi", "Wyoming": "wy"
}

capital_cities = {
    "al": "Montgomery", "ak": "Juneau", "az": "Phoenix", "ar": "Little Rock", "ca": "Sacramento",
    "co": "Denver", "ct": "Hartford", "de": "Dover", "fl": "Tallahassee", "ga": "Atlanta",
    "hi": "Honolulu", "id": "Boise", "il": "Springfield", "in": "Indianapolis", "ia": "Des Moines",
    "ks": "Topeka", "ky": "Frankfort", "la": "Baton Rouge", "me": "Augusta", "md": "Annapolis",
    "ma": "Boston", "mi": "Lansing", "mn": "St. Paul", "ms": "Jackson", "mo": "Jefferson City",
    "mt": "Helena", "ne": "Lincoln", "nv": "Carson City", "nh": "Concord", "nj": "Trenton",
    "nm": "Santa Fe", "ny": "Albany", "nc": "Raleigh", "nd": "Bismarck", "oh": "Columbus",
    "ok": "Oklahoma City", "or": "Salem", "pa": "Harrisburg", "ri": "Providence", "sc": "Columbia",
    "sd": "Pierre", "tn": "Nashville", "tx": "Austin", "ut": "Salt Lake City", "vt": "Montpelier",
    "va": "Richmond", "wa": "Olympia", "wv": "Charleston", "wi": "Madison", "wy": "Cheyenne"
}

added = 0
for name, code in state_abbrevs.items():
    if code not in existing_states:
        city_name = capital_cities.get(code, "City")
        city_slug = city_name.lower().replace(' ', '-')
        
        data['states'].append({
            "code": code,
            "name": name,
            "cities": [
                {"slug": city_slug, "name": city_name, "zip": "Local Area"}
            ]
        })
        added += 1

# Sort states alphabetically by code
data['states'] = sorted(data['states'], key=lambda s: s['code'])

with open(input_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print(f"Added {added} missing states. Total states now: {len(data['states'])}")
