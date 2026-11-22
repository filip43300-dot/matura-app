window.GroqService = (() => {
  const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
  const getKey = () => localStorage.getItem('groq_api_key') || '';

  async function expandTopic(context) {
    const key = getKey();
    if (!key) throw new Error('Brak klucza Groq API. Dodaj go w ustawieniach kluczy.');

    const cacheKey = `matura:groq-topic:${context.subject}|${context.topic}`.toLowerCase();
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    const prompt = `Wypisz WYŁĄCZNIE JSON-tablicę 15-30 najważniejszych szczegółowych podtematów dla polskiego sylabusu lub programu CKE. Przedmiot: ${context.subject}. Temat: ${context.topic}. Nie dodawaj opisów, numeracji ani powtórzeń. Każdy element musi być konkretną, pełną nazwą zagadnienia.`;
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], temperature: 0.2, max_tokens: 3000 })
    });

    if (!response.ok) throw new Error(`Groq API (${response.status})`);
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '[]';
    let list;
    try { list = JSON.parse(text.replace(/```json|```/g, '').trim()); }
    catch { list = text.split('\n').map(v => v.replace(/^[-*\d.)\s]+/, '').trim()).filter(Boolean); }

    list = [...new Set(list.map(item => typeof item === 'string' ? item.trim() : item.name).filter(Boolean))];
    localStorage.setItem(cacheKey, JSON.stringify(list));
    return list;
  }

  return { getKey, expandTopic };
})();
