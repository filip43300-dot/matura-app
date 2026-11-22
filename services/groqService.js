window.GroqService = (() => {
  const getKey = () => localStorage.getItem('groq_api_key') || '';

  async function expandTopic(context) {
    const key = getKey();
    if (!key) throw new Error('Brak klucza Groq API. Dodaj go w ustawieniach kluczy.');

    const cacheKey = `matura:groq-topic:${context.subject}|${context.topic}`.toLowerCase();
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const cachedItems = JSON.parse(cached);
        if (Array.isArray(cachedItems) && cachedItems.length) return cachedItems;
      } catch {}
      localStorage.removeItem(cacheKey);
    }

    const prompt = `Wypisz WYŁĄCZNIE JSON-tablicę 15-30 najważniejszych szczegółowych podtematów dla polskiego sylabusu lub programu CKE. Przedmiot: ${context.subject}. Temat: ${context.topic}. Nie dodawaj opisów, numeracji ani powtórzeń. Każdy element musi być konkretną, pełną nazwą zagadnienia.`;
    const text = await window.GroqClient.complete(prompt, { temperature: 0.2, max_tokens: 3000 });
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('Odpowiedź AI nie zawiera listy zagadnień w formacie JSON.');

    let parsed;
    try {
      parsed = JSON.parse(match[0]);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Nie udało się odczytać listy zagadnień z odpowiedzi AI: ${message}`);
    }
    if (!Array.isArray(parsed)) throw new Error('Odpowiedź AI nie zawiera tablicy zagadnień.');

    const list = [...new Set(parsed
      .map(item => typeof item === 'string' ? item.trim() : typeof item?.name === 'string' ? item.name.trim() : '')
      .filter(Boolean))];
    if (!list.length) throw new Error('Odpowiedź AI nie zawiera żadnych zagadnień.');

    localStorage.setItem(cacheKey, JSON.stringify(list));
    return list;
  }

  return { getKey, expandTopic };
})();
