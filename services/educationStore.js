window.EducationStore = (() => {
  const PREFIX = 'matura2';
  const defaults = {
    profile: { name: '', level: 'Podstawowy', goal: '', subjects: [] },
    history: [],
    completedTopics: [],
    topicMastery: {},
    errors: [],
    notes: [],
    flashcards: [],
    exams: [],
    materials: [],
    tutorChats: [],
    goals: [],
    reviews: [],
    labProgress: {},
    labHistory: [],
    settings: { theme: 'dark', backendUrl: '', aiProvider: 'groq', aiModel: '' }
  };

  function key(name) { return `${PREFIX}:${name}`; }

  function read(name) {
    try {
      const raw = localStorage.getItem(key(name));
      if (!raw) return structuredClone(defaults[name] ?? null);
      const value = JSON.parse(raw);
      if (defaults[name] && typeof defaults[name] === 'object' && !Array.isArray(defaults[name])) {
        return { ...defaults[name], ...(value && typeof value === 'object' ? value : {}) };
      }
      return value ?? structuredClone(defaults[name] ?? null);
    } catch {
      localStorage.removeItem(key(name));
      return structuredClone(defaults[name] ?? null);
    }
  }

  function write(name, value) {
    localStorage.setItem(key(name), JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('education-store-change', { detail: { name } }));
  }

  function update(name, transform) {
    const value = transform(read(name));
    write(name, value);
    return value;
  }

  function recordActivity(activity) {
    const entry = { id: crypto.randomUUID?.() || String(Date.now()), createdAt: new Date().toISOString(), ...activity };
    update('history', history => [entry, ...(Array.isArray(history) ? history : [])].slice(0, 500));
    if (entry.type === 'topic') {
      update('completedTopics', topics => [...new Set([...(topics || []), entry.topic])].slice(-200));
      if (entry.topic && Number.isFinite(Number(entry.score))) {
        update('topicMastery', mastery => ({ ...(mastery || {}), [entry.topic]: {
          score: Number(entry.score),
          updatedAt: entry.createdAt
        }}));
      }
    }
    return entry;
  }

  function recordError(error) {
    update('errors', errors => [{
      id: crypto.randomUUID?.() || String(Date.now()),
      createdAt: new Date().toISOString(),
      resolved: false,
      ...error
    }, ...(errors || [])].slice(0, 300));
  }

  function resolveError(id) {
    update('errors', errors => (errors || []).map(error => error.id === id ? { ...error, resolved: true } : error));
  }

  function addMaterial(material) {
    return update('materials', materials => [{
      id: crypto.randomUUID?.() || String(Date.now()),
      createdAt: new Date().toISOString(),
      ...material
    }, ...(materials || [])].slice(0, 300));
  }

  function exportData() {
    return Object.keys(defaults).reduce((result, name) => {
      result[name] = read(name);
      return result;
    }, {});
  }

  function importData(data) {
    if (!data || typeof data !== 'object') throw new Error('Niepoprawny plik danych.');
    Object.keys(defaults).forEach(name => {
      if (Object.prototype.hasOwnProperty.call(data, name)) write(name, data[name]);
    });
  }

  return { read, write, update, recordActivity, recordError, resolveError, addMaterial, exportData, importData, defaults };
})();
