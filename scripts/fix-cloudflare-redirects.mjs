const API = 'https://api.cloudflare.com/client/v4';
const DOMAIN = 'batyspestcontrol.com';
const token = process.env.CLOUDFLARE_API_TOKEN;

if (!token) throw new Error('CLOUDFLARE_API_TOKEN is not configured.');

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

async function api(path, init = {}) {
  const response = await fetch(`${API}${path}`, { ...init, headers: { ...headers, ...(init.headers || {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    const detail = payload.errors?.map((item) => item.message).join('; ') || `${response.status} ${response.statusText}`;
    throw new Error(`${init.method || 'GET'} ${path}: ${detail}`);
  }
  return payload.result;
}

function isMalformedRedirect(value) {
  const text = JSON.stringify(value).toLowerCase();
  return text.includes(':path*') || text.includes('%3apath') || text.includes('/%3apath');
}

const zones = await api(`/zones?name=${encodeURIComponent(DOMAIN)}&status=active`);
const zone = zones?.[0];
if (!zone?.id) throw new Error(`Active Cloudflare zone not found for ${DOMAIN}.`);

let removed = 0;
const findings = [];

// Legacy Page Rules / Forwarding URL rules.
try {
  const pageRules = await api(`/zones/${zone.id}/pagerules?status=active&per_page=100`);
  for (const rule of pageRules || []) {
    if (!isMalformedRedirect(rule)) continue;
    findings.push(`legacy page rule ${rule.id}`);
    await api(`/zones/${zone.id}/pagerules/${rule.id}`, { method: 'DELETE' });
    removed += 1;
  }
} catch (error) {
  console.warn(`Page Rules inspection skipped: ${error.message}`);
}

// Modern Single Redirect rules in zone rulesets.
try {
  const rulesets = await api(`/zones/${zone.id}/rulesets`);
  for (const ruleset of rulesets || []) {
    if (!['http_request_dynamic_redirect', 'http_request_redirect'].includes(ruleset.phase)) continue;
    const detail = await api(`/zones/${zone.id}/rulesets/${ruleset.id}`);
    for (const rule of detail.rules || []) {
      if (!isMalformedRedirect(rule)) continue;
      findings.push(`${ruleset.phase} rule ${rule.id}`);
      await api(`/zones/${zone.id}/rulesets/${ruleset.id}/rules/${rule.id}`, { method: 'DELETE' });
      removed += 1;
    }
  }
} catch (error) {
  console.warn(`Rulesets inspection skipped: ${error.message}`);
}

console.log(findings.length ? `Malformed redirects found: ${findings.join(', ')}` : 'No malformed redirect rule remained in accessible Cloudflare settings.');
console.log(`Removed ${removed} malformed Cloudflare redirect rule(s).`);
