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
  let availableModelsApiKey = null;
  let availableModelsPromise = null;

  function getActiveGroqModel(apiKey) {
    if (resolvedApiKey === apiKey && resolvedModelPromise) return resolvedModelPromise;
    resolvedApiKey = apiKey;
    resolvedModelPromise = getAvailableModels(apiKey).then(models => {
      const availableIds = models.map(model => model.id).filter(id => !/whisper|guard/i.test(id));
      const model = PREFERRED_MODELS.find(id => availableIds.includes(id)) || availableIds[0] || FALLBACK_MODEL;
      localStorage.setItem('groq_active_model', model);
      return model;
    }).catch(() => {
      localStorage.setItem('groq_active_model', FALLBACK_MODEL);
      return FALLBACK_MODEL;
    });
    return resolvedModelPromise;
  }

  function getAvailableModels(apiKey) {
    if (!availableModelsPromise || availableModelsApiKey !== apiKey) {
      availableModelsApiKey = apiKey;
      availableModelsPromise = fetch(MODELS_ENDPOINT, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${apiKey}` }
      }).then(response => {
        if (!response.ok) throw new Error(`Groq models request failed (${response.status})`);
        return response.json();
      }).then(result => Array.isArray(result?.data)
        ? result.data.filter(model => typeof model?.id === 'string')
        : []);
    }
    return availableModelsPromise;
  }

  function getActiveVisionModel(apiKey) {
    return getAvailableModels(apiKey).then(models => {
      const visionModels = models
        .map(model => model.id)
        .filter(id => /vision|scout/i.test(id) && !/whisper|guard/i.test(id));
      const preferred = 'meta-llama/llama-4-scout-17b-16e-instruct';
      const model = visionModels.includes(preferred) ? preferred : visionModels[0];
      if (!model) throw new Error('Nie znaleziono aktywnego modelu Groq obsługującego obrazy.');
      localStorage.setItem('groq_active_vision_model', model);
      return model;
    }).catch(error => {
      throw new Error(`Nie udało się wykryć modelu Groq do analizy obrazów: ${error.message}`);
    });
  }

  async function postChat(apiKey, model, messages, options) {
    let response;
    try {
      response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages, ...options })
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

  function requireKey() {
    const key = localStorage.getItem('groq_api_key') || '';
    if (!key) throw new Error('Brak klucza Groq AI. Kliknij „⚙️ Klucz API” i wklej klucz zaczynający się od gsk_.');
    return key;
  }

  async function complete(prompt, options = {}) {
    const key = requireKey();
    const model = await getActiveGroqModel(key);
    return postChat(key, model, [{ role: 'user', content: prompt }], options);
  }

  async function completeVision(prompt, imageDataUrl, options = {}) {
    const key = requireKey();
    const model = await getActiveVisionModel(key);
    return postChat(key, model, [{
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: imageDataUrl } }
      ]
    }], options);
  }

  async function getErrorMessage(response) {
    const text = await response.text();
    try {
      const message = JSON.parse(text).error?.message;
      if (typeof message === 'string' && message) return message;
    } catch {}
    return text || response.statusText || 'Unknown error';
  }

  return { complete, completeVision, getActiveGroqModel, getActiveVisionModel };
})();
