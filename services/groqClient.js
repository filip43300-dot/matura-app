window.GroqClient = (() => {
  const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
  const MODELS_ENDPOINT = 'https://api.groq.com/openai/v1/models';
  const PREFERRED_MODELS = [
    'llama-3.1-8b-instant',
    'meta-llama/llama-4-scout-17b-16e-instruct',
    'openai/gpt-oss-120b'
  ];
  const FALLBACK_MODEL = 'llama-3.1-8b-instant';
  let resolvedApiKey = null;
  let resolvedModelPromise = null;

  function getActiveGroqModel(apiKey) {
    if (resolvedApiKey === apiKey && resolvedModelPromise) return resolvedModelPromise;
    resolvedApiKey = apiKey;
    resolvedModelPromise = resolveActiveGroqModel(apiKey);
    return resolvedModelPromise;
  }

  async function resolveActiveGroqModel(apiKey) {
    let models;
    try {
      const response = await fetch(MODELS_ENDPOINT, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      if (!response.ok) return cacheModel(FALLBACK_MODEL);
      models = await response.json();
    } catch {
      return cacheModel(FALLBACK_MODEL);
    }

    const availableModels = Array.isArray(models?.data)
      ? models.data
        .map(model => model?.id)
        .filter(id => typeof id === 'string' && !/whisper|guard/i.test(id))
      : [];
    const model = PREFERRED_MODELS.find(id => availableModels.includes(id))
      || availableModels[0]
      || FALLBACK_MODEL;
    return cacheModel(model);
  }

  function cacheModel(model) {
    localStorage.setItem('groq_active_model', model);
    return model;
  }

  async function getErrorMessage(response) {
    const text = await response.text();
    try {
      const message = JSON.parse(text).error?.message;
      if (typeof message === 'string' && message) return message;
    } catch {}
    return text || response.statusText || 'Unknown error';
  }

  async function complete(prompt, options) {
    const key = localStorage.getItem('groq_api_key') || '';
    if (!key) throw new Error('Brak klucza Groq AI. Kliknij „⚙️ Klucz API” i wklej klucz zaczynający się od gsk_.');

    const model = await getActiveGroqModel(key);
    let response;
    try {
      response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          ...options
        })
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Groq API request failed at ${ENDPOINT}: ${message}`);
    }

    if (!response.ok) {
      const message = await getErrorMessage(response);
      throw new Error(`Groq API (${response.status}) at ${ENDPOINT}: ${message}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  return { complete, getActiveGroqModel };
})();
