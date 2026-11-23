window.AIGateway = (() => {
  function getSettings() {
    return window.EducationStore?.read('settings') || {};
  }

  function setBackendUrl(url) {
    const clean = String(url || '').trim().replace(/\/$/, '');
    window.EducationStore.update('settings', settings => ({ ...settings, backendUrl: clean }));
  }

  async function chat(messages, options = {}) {
    const settings = getSettings();
    if (settings.backendUrl) {
      const response = await fetch(`${settings.backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          model: options.model || settings.aiModel || undefined,
          provider: settings.aiProvider || 'openai',
          temperature: options.temperature,
          max_tokens: options.max_tokens
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Backend AI zwrócił błąd ${response.status}.`);
      return data.content || '';
    }

    if (window.GroqClient) {
      const prompt = Array.isArray(messages)
        ? messages.map(message => `${message.role === 'user' ? 'Użytkownik' : 'Asystent'}: ${message.content}`).join('\n\n')
        : String(messages);
      return window.GroqClient.complete(prompt, options);
    }

    throw new Error('Nie skonfigurowano połączenia AI.');
  }

  async function models() {
    const settings = getSettings();
    if (!settings.backendUrl) return [];
    const response = await fetch(`${settings.backendUrl}/api/models`);
    if (!response.ok) throw new Error(`Nie udało się pobrać modeli (${response.status}).`);
    const data = await response.json();
    return Array.isArray(data.models) ? data.models : [];
  }

  return { chat, models, getSettings, setBackendUrl };
})();
