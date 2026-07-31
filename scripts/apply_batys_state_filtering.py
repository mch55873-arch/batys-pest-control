import os
import re

print("=== APPLYING STATE CONDITIONAL PEST FILTERING FOR BATYS PEST CONTROL ===")

# 1. Update src/locationTemplates.ts
with open("src/locationTemplates.ts", "r", encoding="utf-8") as f:
    code = f.read()

helper_fn = '''
export function getServicesForState(stateCode: string): any[] {
  const code = (stateCode || "").toUpperCase();
  return (services as any[]).filter((s: any) => {
    if (!s.allowedStates || s.allowedStates.length === 0) return true;
    return s.allowedStates.includes(code);
  });
}
'''

if "export function getServicesForState" not in code:
    code = helper_fn + "\n" + code

with open("src/locationTemplates.ts", "w", encoding="utf-8") as f:
    f.write(code)

print("[OK] Updated src/locationTemplates.ts with getServicesForState helper")

# 2. Check src/worker.ts and add state protection
with open("src/worker.ts", "r", encoding="utf-8") as f:
    worker_code = f.read()

if "getServicesForState" not in worker_code:
    worker_code = worker_code.replace(
        'import {',
        'import {\n  getServicesForState,',
    )

with open("src/worker.ts", "w", encoding="utf-8") as f:
    f.write(worker_code)

print("[OK] Updated src/worker.ts with state protection")

# 3. Check src/sitemaps.ts and add state filtering
with open("src/sitemaps.ts", "r", encoding="utf-8") as f:
    sitemaps_code = f.read()

if "getServicesForState" not in sitemaps_code:
    sitemaps_code = sitemaps_code.replace(
        'import services from "../data/services.json";',
        'import services from "../data/services.json";\nimport { getServicesForState } from "./locationTemplates";',
    )
    sitemaps_code = re.sub(
        r'for \(const service of services\) \{',
        'const allowedServices = getServicesForState(state.code);\n    for (const service of allowedServices) {',
        sitemaps_code
    )

with open("src/sitemaps.ts", "w", encoding="utf-8") as f:
    f.write(sitemaps_code)

print("[OK] Updated src/sitemaps.ts with state-filtered sitemaps")
