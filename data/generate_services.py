import json
import re

raw_list = """
High Priority (Must Have)
Pest Control
Exterminator Services
Emergency Pest Control
Same Day Pest Control
Residential Pest Control
Commercial Pest Control
Eco-Friendly Pest Control
Pest Inspection
Pest Prevention
Pest Extermination
Integrated Pest Management (IPM)
Termite
Termite Control
Termite Inspection
Termite Treatment
Termite Extermination
Termite Prevention
Drywood Termite Treatment
Subterranean Termite Treatment
Pre-Construction Termite Treatment
Post-Construction Termite Treatment
Rodents
Rodent Control
Rat Removal
Mouse Removal
Rat Extermination
Rodent Exclusion
Crawl Space Rodent Removal
Attic Rodent Removal
Bed Bugs
Bed Bug Treatment
Bed Bug Heat Treatment
Bed Bug Inspection
Bed Bug Extermination
Cockroaches
Cockroach Control
German Cockroach Treatment
Roach Extermination
Ants
Ant Control
Carpenter Ant Control
Fire Ant Control
Ant Extermination
Mosquitoes
Mosquito Control
Mosquito Fogging
Mosquito Yard Treatment
Mosquito Prevention
Bees & Wasps
Bee Removal
Bee Hive Removal
Honey Bee Relocation
Wasp Removal
Wasp Nest Removal
Hornet Removal
Yellow Jacket Removal
Carpenter Bee Removal
Wildlife
Wildlife Removal
Animal Removal
Raccoon Removal
Squirrel Removal
Bat Removal
Bird Control
Pigeon Control
Snake Removal
Skunk Removal
Opossum Removal
Mole Control
Gopher Control
Groundhog Removal
Common Household Pests
Spider Control
Flea Control
Tick Control
Silverfish Control
Cricket Control
Earwig Control
Centipede Control
Millipede Control
Stink Bug Control
Boxelder Bug Control
Aphid Control
Beetle Control
Carpet Beetle Control
Pantry Pest Control
Clothes Moth Control
Weevil Control
Mite Control
Drain Fly Control
Fruit Fly Control
Fly Control
Gnat Control
Commercial Services
Restaurant Pest Control
Hotel Pest Control
Apartment Pest Control
Office Pest Control
School Pest Control
Hospital Pest Control
Warehouse Pest Control
Food Processing Pest Control
Manufacturing Facility Pest Control
Specialty Services
Crawl Space Pest Control
Attic Pest Control
Basement Pest Control
Yard Pest Control
Lawn Pest Control
Outdoor Pest Control
Indoor Pest Control
Perimeter Pest Treatment
Fumigation Services
Crawl Space Encapsulation
Moisture Control
Pest Damage Assessment
"""

categories = [
    "High Priority (Must Have)",
    "Termite",
    "Rodents",
    "Bed Bugs",
    "Cockroaches",
    "Ants",
    "Mosquitoes",
    "Bees & Wasps",
    "Wildlife",
    "Common Household Pests",
    "Commercial Services",
    "Specialty Services"
]

services = []

for line in raw_list.split('\n'):
    line = line.strip()
    if not line:
        continue
    if line in categories:
        continue
    
    # Generate slug
    # Remove anything that isn't alphanumeric or space
    slug = re.sub(r'[^a-zA-Z0-9 ]', '', line).lower()
    # Replace spaces with hyphens
    slug = re.sub(r'\s+', '-', slug)
    
    desc = f"Professional {line.lower()} tailored to protect your property. We guarantee fast response times, expert technicians, and complete elimination of pests to restore your peace of mind."
    
    services.append({
        "name": line,
        "slug": slug,
        "description": desc
    })

with open("services.json", "w") as f:
    json.dump(services, f, indent=2)

print(f"Generated {len(services)} services in services.json")
