const fs = require('fs');
let p1 = 'app/subdomain/[subdomain]/page.tsx';
let c1 = fs.readFileSync(p1, 'utf8');
c1 = c1.replace(/location/g, 'subdomain').replace(/Location/g, 'Subdomain');
c1 = c1.replace(/\/areas-we-serve\/\$\{subdomain\}\//g, '/');
c1 = c1.replace(/\/areas-we-serve\//g, '/');
c1 = c1.replace(/href=\{\`\/\$\{city\.slug\}-\$\{parentState\.code\}\`\}/g, 'href={`http://${city.slug}-${parentState.code}.localhost:3000`}');
fs.writeFileSync(p1, c1);

let p2 = 'app/subdomain/[subdomain]/[service]/page.tsx';
let c2 = fs.readFileSync(p2, 'utf8');
c2 = c2.replace(/location/g, 'subdomain').replace(/Location/g, 'Subdomain');
c2 = c2.replace(/\/areas-we-serve\/\$\{subdomain\}\//g, '/');
c2 = c2.replace(/\/areas-we-serve\/\$\{subdomain\}/g, '/');
c2 = c2.replace(/\/areas-we-serve\//g, '/');
c2 = c2.replace(/href=\{\`\/\$\{city\.slug\}-\$\{parentState\.code\}\/\$\{serviceSlug\}\`\}/g, 'href={`http://${city.slug}-${parentState.code}.localhost:3000/${serviceSlug}`}');
fs.writeFileSync(p2, c2);
