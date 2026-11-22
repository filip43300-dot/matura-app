window.GroqClient = (() => {
  const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
  const MODELS = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile'];

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

    for (let index = 0; index < MODELS.length; index += 1) {
      let response;
      try {
        response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: MODELS[index],
            messages: [{ role: 'user', content: prompt }],
            ...options
          })
        });
      } catch (error) {
        throw new Error(`Groq API request failed at ${ENDPOINT}: ${error.message}`);
      }

      if (!response.ok) {
        const message = await getErrorMessage(response);
        if ((response.status === 400 || response.status === 404) && index < MODELS.length - 1) continue;
        throw new Error(`Groq API (${response.status}) at ${ENDPOINT}: ${message}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    }
  }

  return { complete };
})();
