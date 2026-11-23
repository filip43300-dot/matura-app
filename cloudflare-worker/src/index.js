const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
};
const rateWindow = new Map();

function applyRateLimit(request, env) {
  if (!env.RATE_LIMIT_ENABLED || env.RATE_LIMIT_ENABLED === 'false') return null;
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
  const now = Date.now();
  const limit = Math.max(1, Number(env.RATE_LIMIT_REQUESTS || 60));
  const windowMs = Math.max(60000, Number(env.RATE_LIMIT_WINDOW_MS || 3600000));
  const state = rateWindow.get(ip);
  if (!state || now - state.startedAt >= windowMs) {
    rateWindow.set(ip, { startedAt: now, count: 1 });
    return null;
  }
  if (state.count >= limit) return `Limit zapytań przekroczony. Spróbuj ponownie za ${Math.ceil((windowMs-(now-state.startedAt))/60000)} min.`;
  state.count += 1;
  return null;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || !messages.length || messages.length > 40) return false;
  return messages.every(message =>
    message && typeof message.content === 'string' &&
    message.content.length <= 30000 &&
    ['system', 'user', 'assistant'].includes(message.role)
  );
}

async function openAiChat(env, body) {
  const model = body.model || env.OPENAI_MODEL || 'gpt-4o-mini';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: body.messages,
      temperature: Math.max(0, Math.min(2, Number(body.temperature ?? 0.7))),
      max_tokens: Math.max(64, Math.min(8000, Number(body.max_tokens ?? 2000)))
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `OpenAI zwróciło błąd ${response.status}`);
  return { content: data.choices?.[0]?.message?.content || '', model };
}

async function groqChat(env, body) {
  const model = body.model || env.GROQ_MODEL || 'llama-3.1-8b-instant';
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: body.messages,
      temperature: Math.max(0, Math.min(2, Number(body.temperature ?? 0.7))),
      max_tokens: Math.max(64, Math.min(8000, Number(body.max_tokens ?? 2000)))
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Groq zwróciło błąd ${response.status}`);
  return { content: data.choices?.[0]?.message?.content || '', model };
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/api/models') {
      try {
        if (env.OPENAI_API_KEY) {
          const response = await fetch('https://api.openai.com/v1/models', { headers: { 'Authorization': `Bearer ${env.OPENAI_API_KEY}` } });
          if (response.ok) {
            const data = await response.json();
            const chatModels = (data.data || []).filter(model => /^gpt-|^o1|^o3|^o4/.test(model.id)).map(model => model.id).slice(0, 30);
            if (chatModels.length) return json({ models: chatModels });
          }
        }
        if (env.GROQ_API_KEY) {
          const response = await fetch('https://api.groq.com/openai/v1/models', { headers: { 'Authorization': `Bearer ${env.GROQ_API_KEY}` } });
          if (response.ok) {
            const data = await response.json();
            return json({ models: (data.data || []).map(model => model.id).filter(id => !/whisper|guard/i.test(id)).slice(0,30) });
          }
        }
        return json({ models: [] });
      } catch (error) {
        return json({ error: error instanceof Error ? error.message : 'Nie udało się pobrać modeli.' }, 502);
      }
    }
    if (request.method !== 'POST' || url.pathname !== '/api/chat') return json({ error: 'Not found' }, 404);
    const limitError = applyRateLimit(request, env);
    if (limitError) return json({ error: limitError }, 429);
    let body;
    try { body = await request.json(); } catch { return json({ error: 'Niepoprawny JSON.' }, 400); }
    if (!validateMessages(body.messages)) return json({ error: 'Niepoprawne lub zbyt duże wiadomości.' }, 400);
    try {
      if (body.provider === 'groq') {
        if (!env.GROQ_API_KEY) return json({ error: 'Brak sekretu GROQ_API_KEY.' }, 503);
        return json(await groqChat(env, body));
      }
      if (!env.OPENAI_API_KEY) return json({ error: 'Brak sekretu OPENAI_API_KEY.' }, 503);
      return json(await openAiChat(env, body));
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : 'Błąd połączenia z AI.' }, 502);
    }
  }
};
