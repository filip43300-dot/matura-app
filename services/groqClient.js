window.GroqClient = (() => {
  const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
  const MODELS_ENDPOINT = 'https://api.groq.com/openai/v1/models';
  const PREFERRED_MODELS = [
    'llama-3.1-8b-instant',
    'meta-llama/llama-4-scout-17b-16e-instruct',
    'openai/gpt-oss-120b'
  ];
  const PREFERRED_VISION_MODELS = [
    'meta-llama/llama-4-scout-17b-16e-instruct',
    'meta-llama/llama-4-maverick-17b-128e-instruct'
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
      const request = fetch(MODELS_ENDPOINT, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${apiKey}` }
      }).then(response => {
        if (!response.ok) {
          const error = new Error(`Groq models request failed (${response.status})`);
          error.status = response.status;
          error.code = 'MODEL_DISCOVERY_FAILED';
          throw error;
        }
        return response.json();
      }).then(result => Array.isArray(result?.data)
        ? result.data.filter(model => typeof model?.id === 'string')
        : []);
      let cachedRequest;
      cachedRequest = request.catch(error => {
        if (availableModelsPromise === cachedRequest) {
          availableModelsApiKey = null;
          availableModelsPromise = null;
        }
        if (!error.code) error.code = 'MODEL_DISCOVERY_FAILED';
        throw error;
      });
      availableModelsPromise = cachedRequest;
    }
    return availableModelsPromise;
  }

  function getActiveVisionModel(apiKey) {
    return getAvailableModels(apiKey).then(models => {
      const availableIds = new Set(models.map(model => model.id));
      const model = PREFERRED_VISION_MODELS.find(id => availableIds.has(id));
      if (!model) {
        const error = new Error('To konto Groq nie ma dostępu do modeli obsługujących obrazy.');
        error.code = 'VISION_MODEL_UNAVAILABLE';
        throw error;
      }
      localStorage.setItem('groq_active_vision_model', model);
      return model;
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
      const error = new Error(`Groq API (${response.status}) at ${ENDPOINT}: ${message}`);
      error.status = response.status;
      error.model = model;
      error.endpoint = ENDPOINT;
      throw error;
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
    let model;
    try {
      model = await getActiveVisionModel(key);
    } catch (error) {
      if (error.code === 'VISION_MODEL_UNAVAILABLE' || error.code === 'MODEL_DISCOVERY_FAILED') throw error;
      const unavailable = new Error(`Nie udało się sprawdzić dostępu do modelu obrazu: ${error.message}`);
      unavailable.code = 'MODEL_DISCOVERY_FAILED';
      throw unavailable;
    }
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
