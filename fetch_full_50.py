import json
import urllib.request
import re

url = "https://gist.githubusercontent.com/Lwdthe1/81818d30d23f012628aac1cdf672627d/raw/c295cda2f85bd8648942afc830dd546d149c59ca/USCities.json"
output_file = r"C:\Users\HP\.gemini\antigravity\scratch\pest-control-seo\data\usa_database.json"

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
    "Virginia": "va", "Washington": "wa", "West Virginia": "wv", "Wisconsin": "wi", "Wyoming": "wy",
    "District of Columbia": "dc"
}

print("Downloading full 50-state database...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
raw_data = response.read().decode('utf-8')

# Sometimes the JSON has weird formatting, let's try to parse
data = json.loads(raw_data)

states_dict = {}

for city_obj in data:
    # Based on generic formats, it might be {"city": "New York", "state": "New York"}
    # Let's handle different possible keys
    city_name = city_obj.get('city') or city_obj.get('name')
    state_name = city_obj.get('state') or city_obj.get('state_name')
    
    if not city_name or not state_name:
        continue
        
    city_name = city_name.strip()
    state_name = state_name.strip()
    
    state_code = state_abbrevs.get(state_name)
    if not state_code:
        continue # Ignore non-50 states
        
    city_slug = re.sub(r'[^a-z0-9-]', '', city_name.lower().replace(' ', '-'))
    
    if state_code not in states_dict:
        states_dict[state_code] = {
            "code": state_code,
            "name": state_name,
            "cities": []
        }
        
    if not any(c['slug'] == city_slug for c in states_dict[state_code]['cities']):
        states_dict[state_code]['cities'].append({
            "slug": city_slug,
            "name": city_name,
            "zip": "Local Area"
        })

# If this failed to get 50 states, let's inject at least the missing states with a capital city so we strictly have 50.
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

for name, code in state_abbrevs.items():
    if code == "dc": continue
    if code not in states_dict:
        city_name = capital_cities.get(code, "City")
        city_slug = city_name.lower().replace(' ', '-')
        states_dict[code] = {
            "code": code,
            "name": name,
            "cities": [{"slug": city_slug, "name": city_name, "zip": "Local Area"}]
        }

final_json = {
    "states": list(states_dict.values())
}

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(final_json, f)

print(f"Successfully generated database with {len(states_dict)} states and {sum(len(s['cities']) for s in final_json['states'])} cities.")
