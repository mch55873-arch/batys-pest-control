const fs = require('fs');
const path = require('path');

const services = [
  "Emergency Pest Control Services", "24/7 Emergency Pest Control", "General Pest Control", "Residential Pest Control", "Commercial Pest Control", "Pest Inspection Services", "Pest Prevention Services", "Pest Extermination Services", "Eco-Friendly Pest Control", "Organic Pest Control", "Same Day Pest Control", "Monthly Pest Control Services", "Quarterly Pest Control Services", "Annual Pest Control Plans", "Ant Control Services", "Carpenter Ant Control", "Fire Ant Control", "Bed Bug Treatment", "Bed Bug Heat Treatment", "Bed Bug Inspection", "Cockroach Control", "German Cockroach Treatment", "Flea Control Services", "Tick Control Services", "Mosquito Control", "Mosquito Fogging Services", "Fly Control Services", "Fruit Fly Control", "Wasp Nest Removal", "Bee Removal Services", "Hornet Nest Removal", "Yellow Jacket Removal", "Spider Control Services", "Black Widow Spider Control", "Brown Recluse Spider Control", "Silverfish Control", "Earwig Control", "Cricket Control", "Centipede Control", "Millipede Control", "Stink Bug Control", "Boxelder Bug Control", "Asian Lady Beetle Removal", "Aphid Control", "Beetle Control Services", "Pantry Pest Control", "Moth Control Services", "Clothes Moth Treatment", "Carpet Beetle Control", "Termite Inspection", "Termite Treatment", "Termite Extermination", "Termite Prevention", "Subterranean Termite Treatment", "Drywood Termite Treatment", "Rodent Control", "Rat Control Services", "Mouse Control Services", "Mice Removal", "Rat Removal", "Rodent Proofing", "Rodent Exclusion Services", "Wildlife Removal", "Raccoon Removal", "Squirrel Removal", "Opossum Removal", "Skunk Removal", "Bat Removal", "Bird Control Services", "Bird Nest Removal", "Pigeon Control", "Snake Removal", "Mole Control", "Gopher Control", "Groundhog Removal", "Vole Control", "Possum Removal", "Crawl Space Pest Control", "Attic Pest Control", "Basement Pest Control", "Yard Pest Control", "Lawn Pest Control", "Outdoor Pest Control", "Indoor Pest Control", "Warehouse Pest Control", "Restaurant Pest Control", "Hotel Pest Control", "Office Pest Control", "Apartment Pest Control", "School Pest Control", "Hospital Pest Control", "Industrial Pest Control", "Food Processing Facility Pest Control", "Fumigation Services", "Crawl Space Encapsulation", "Pest Damage Assessment", "Sanitation & Pest Prevention", "Insect Nest Removal", "Wildlife Exclusion Services", "Pest Monitoring Services", "Integrated Pest Management (IPM)", "Seasonal Pest Control", "Preventive Pest Control", "Pest Barrier Treatment", "Crawl Space Moisture Control", "Exterior Perimeter Pest Treatment", "Interior Pest Treatment"
];

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const data = services.map(name => ({
  name,
  slug: slugify(name),
  description: `Professional ${name.toLowerCase()} tailored to protect your property. We guarantee fast response times, expert technicians, and complete elimination of pests to restore your peace of mind.`
}));

const destPath = path.join(__dirname, 'data', 'services.json');
fs.writeFileSync(destPath, JSON.stringify(data, null, 2));
console.log('Successfully created', destPath);
