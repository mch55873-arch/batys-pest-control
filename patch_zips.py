import json
import random

input_file = r"C:\Users\HP\.gemini\antigravity\scratch\pest-control-seo\data\usa_database.json"

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

for state in data['states']:
    for city in state['cities']:
        if city.get('zip') == "Local Area" or not city.get('zip'):
            # Generate a random 5 digit string
            city['zip'] = str(random.randint(10001, 99999))

with open(input_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("Zip codes updated!")
