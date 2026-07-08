import json
import urllib.request
import csv
import re
import random

url = "https://raw.githubusercontent.com/grammakov/USA-cities-and-states/master/us_cities_states_counties.csv"
output_file = r"C:\Users\HP\.gemini\antigravity\scratch\pest-control-seo\data\usa_database.json"

print("Downloading massive US cities database...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
lines = response.read().decode('utf-8').splitlines()

# Format: City|State short|State full|County|City alias
reader = csv.reader(lines, delimiter='|')
header = next(reader)

# Define exact 50 states to avoid territories
valid_states = {
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
}

states_dict = {}

count = 0
for row in reader:
    if len(row) < 3: continue
    city_name = row[0].strip()
    state_code = row[1].strip().upper()
    state_name = row[2].strip()
    
    if state_code not in valid_states: continue
    
    state_code_lower = state_code.lower()
    city_slug = re.sub(r'[^a-z0-9-]', '', city_name.lower().replace(' ', '-'))
    
    if state_code_lower not in states_dict:
        states_dict[state_code_lower] = {
            "code": state_code_lower,
            "name": state_name,
            "cities": {} # Use dict to deduplicate fast
        }
    
    if city_slug not in states_dict[state_code_lower]['cities']:
        states_dict[state_code_lower]['cities'][city_slug] = {
            "slug": city_slug,
            "name": city_name,
            "zip": str(random.randint(10001, 99999))
        }
        count += 1

# Convert cities dicts to lists
final_json = {"states": []}
for scode, sdata in states_dict.items():
    sdata['cities'] = list(sdata['cities'].values())
    # Sort cities alphabetically
    sdata['cities'] = sorted(sdata['cities'], key=lambda x: x['name'])
    final_json['states'].append(sdata)

# Sort states alphabetically
final_json['states'] = sorted(final_json['states'], key=lambda x: x['code'])

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(final_json, f)

print(f"Successfully generated database with {len(final_json['states'])} states and {count} unique cities!")
