const API = 'https://api.cloudflare.com/client/v4';
const DOMAIN = 'batyspestcontrol.com';
const STATE_URL = `https://indiana.${DOMAIN}/`;
const token = process.env.CLOUDFLARE_API_TOKEN;

if (!token) throw new Error('CLOUDFLARE_API_TOKEN is not configured.');

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

async function api(path, init = {}) {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: { ...headers, ...(init.headers || {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    const detail = payload.errors?.map((item) => item.message).join('; ') || `${response.status} ${response.statusText}`;
    throw new Error(`${init.method || 'GET'} ${path}: ${detail}`);
  }
  return payload.result;
}

async function trace(label, start, requestHeaders = {}) {
  let current = start;
  console.log(`\n${label}: ${current}`);
  for (let hop = 0; hop < 10; hop += 1) {
    const response = await fetch(current, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Batys-Route-Diagnostic/1.0',
        ...requestHeaders,
      },
    });
    const location = response.headers.get('location');
    const cache = response.headers.get('cf-cache-status');
    const age = response.headers.get('age');
    const ray = response.headers.get('cf-ray');
    console.log(`Hop ${hop + 1}: ${response.status} ${current}${location ? ` -> ${location}` : ''} | cf-cache=${cache || '-'} age=${age || '-'} ray=${ray || '-'}`);
    if (response.status < 300 || response.status >= 400 || !location) {
      const body = await response.text();
      console.log(`Final response snippet: ${body.slice(0, 300).replace(/\s+/g, ' ')}`);
      break;
    }
    current = new URL(location, current).toString();
  }
}

const zones = await api(`/zones?name=${encodeURIComponent(DOMAIN)}&status=active`);
const zone = zones?.[0];
if (!zone?.id) throw new Error(`Active Cloudflare zone not found for ${DOMAIN}.`);

console.log(`Cloudflare zone: ${zone.name} (${zone.id})`);

try {
  const pageRules = await api(`/zones/${zone.id}/pagerules?status=active&per_page=100`);
  console.log(`Active Page Rules: ${pageRules?.length || 0}`);
  for (const rule of pageRules || []) {
    console.log(JSON.stringify({ id: rule.id, targets: rule.targets, actions: rule.actions }, null, 2));
  }
} catch (error) {
  console.warn(`Page Rules audit skipped: ${error.message}`);
}

try {
  const rulesets = await api(`/zones/${zone.id}/rulesets`);
  for (const ruleset of rulesets || []) {
    if (!['http_request_dynamic_redirect', 'http_request_redirect'].includes(ruleset.phase)) continue;
    const detail = await api(`/zones/${zone.id}/rulesets/${ruleset.id}`);
    console.log(`Redirect ruleset ${ruleset.phase}: ${detail.name || detail.id}`);
    for (const rule of detail.rules || []) {
      if (rule.enabled === false) continue;
      console.log(JSON.stringify({
        id: rule.id,
        description: rule.description,
        expression: rule.expression,
        action: rule.action,
        action_parameters: rule.action_parameters,
      }, null, 2));
    }
  }
} catch (error) {
  console.warn(`Redirect rules audit skipped: ${error.message}`);
}

try {
  const routes = await api(`/zones/${zone.id}/workers/routes`);
  console.log('Worker routes:');
  for (const route of routes || []) {
    console.log(JSON.stringify({ id: route.id, pattern: route.pattern, script: route.script }, null, 2));
  }
} catch (error) {
  console.warn(`Worker routes audit skipped: ${error.message}`);
}

try {
  await api(`/zones/${zone.id}/purge_cache`, {
    method: 'POST',
    body: JSON.stringify({ purge_everything: true }),
  });
  console.log('Cloudflare cache purge: success');
} catch (error) {
  console.warn(`Cloudflare cache purge skipped: ${error.message}`);
}

await trace('Bare URL with normal headers', STATE_URL);
await trace('Bare URL with no-cache headers', STATE_URL, {
  'Cache-Control': 'no-cache, no-store, max-age=0',
  Pragma: 'no-cache',
});
await trace('Cache-busting URL', `${STATE_URL}?cfdiag=${Date.now()}`, {
  'Cache-Control': 'no-cache, no-store, max-age=0',
  Pragma: 'no-cache',
});
