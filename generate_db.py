import csv
import json

# The file downloaded is markdown at the top, csv starts at line 9.
input_file = r"C:\Users\HP\.gemini\antigravity\brain\a3d1bdd7-a1f7-4bfd-af74-6fb5f0699f83\.system_generated\steps\322\content.md"
output_file = r"C:\Users\HP\.gemini\antigravity\scratch\pest-control-seo\data\usa_database.json"

states_dict = {}

with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# find where csv starts
csv_start = 0
for i, line in enumerate(lines):
    if line.startswith("ID,STATE_CODE"):
        csv_start = i
        break

reader = csv.DictReader(lines[csv_start:])

for row in reader:
    state_code = row['STATE_CODE'].lower().strip()
    state_name = row['STATE_NAME'].strip()
    city_name = row['CITY'].strip()
    
    if not state_code or not city_name:
        continue
        
    city_slug = city_name.lower().replace(' ', '-').replace("'", "").replace(".", "").replace(",", "")
    
    if state_code not in states_dict:
        states_dict[state_code] = {
            "code": state_code,
            "name": state_name,
            "cities": []
        }
    
    # Check for duplicates
    if not any(c['slug'] == city_slug for c in states_dict[state_code]['cities']):
        states_dict[state_code]['cities'].append({
            "slug": city_slug,
            "name": city_name,
            "zip": "Local Area" # Since we don't have zip in this dataset
        })

final_json = {
    "states": list(states_dict.values())
}

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(final_json, f)

print(f"Successfully generated database with {len(states_dict)} states and {sum(len(s['cities']) for s in final_json['states'])} cities.")
