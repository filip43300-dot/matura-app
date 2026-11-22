const app = {
  mode: 'liceum', subject: null, topic: null, subtopic: null,
  expandedSubjects: new Set(), expandedTopics: new Set(), difficulty: 'podstawowy', quizIndex: 0
};

const el = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[char]));
const normalize = (value) => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

async function explainConceptWithAI(query) {
  const key = window.APP_CONFIG?.GEMINI_API_KEY?.trim();
  if (!key) throw new Error('Brakuje klucza Gemini API. Uzupełnij GEMINI_API_KEY w config.js.');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`;
  const response = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: `Odpowiedz po polsku jako podręcznik: ${query}. Zwróć JSON z polami definition, basic, advanced, medical, formula, example, answer, visual.` }] }] })
  });
  if (!response.ok) throw new Error(`Gemini API zwróciło ${response.status}`);
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text).join('\n') || '';
  try {
    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
    return parsed;
  } catch {
    return { definition: text, basic: text, advanced: text, medical: text, formula: '', example: '', answer: '', visual: 'AI: schemat koncepcyjny — wpisz termin, aby rozwinąć zależności.' };
  }
}

function getMode() { return window.KNOWLEDGE_BASE[app.mode]; }

function renderSubjects() {
  const container = el('subjectsContainer');
  const mode = getMode();
  const level = el('levelFilter').value;
  container.innerHTML = Object.entries(mode.subjects).map(([key, subject]) => {
    const topics = subject.topics.filter((topic) => level === 'all' || level === 'specjalizacja' && topic.level === 'studia' || topic.level === level);
    const expanded = app.expandedSubjects.has(key);
    return `<article class="subject-card">
      <button type="button" class="subject-header" data-subject="${key}" aria-expanded="${expanded}">
        <span class="subject-name"><span class="subject-icon">${subject.icon}</span>${escapeHtml(subject.name)}</span>
        <span class="subject-meta"><span>${topics.length} tematy</span></span>
      </button>
      <div class="subject-body ${expanded ? '' : 'hidden'}">
        ${topics.map((topic) => {
          const topicKey = `${key}:${topic.title}`;
          const topicExpanded = app.expandedTopics.has(topicKey);
          return `<article class="subject-topic">
            <button type="button" class="topic-header" data-topic="${topicKey}" aria-expanded="${topicExpanded}">
              <span><strong>${escapeHtml(topic.title)}</strong></span><span class="topic-badge ${topic.level}">${topic.level}</span>
            </button>
            <div class="subtopic-list ${topicExpanded ? '' : 'hidden'}">
              ${topic.subtopics.map((subtopic) => `<button type="button" class="subtopic-button" data-subject="${key}" data-topic="${escapeHtml(topic.title)}" data-subtopic="${escapeHtml(subtopic.name)}">${escapeHtml(subtopic.name)}</button>`).join('')}
            </div>
          </article>`;
        }).join('')}
      </div>
    </article>`;
  }).join('');
}

function flattenEntries() {
  const entries = [];
  Object.entries(getMode().subjects).forEach(([subjectKey, subject]) => {
    subject.topics.forEach((topic) => topic.subtopics.forEach((subtopic) => entries.push({ subjectKey, subject, topic, subtopic })));
  });
  return entries;
}

function renderSearchResults(query) {
  const box = el('suggestions');
  const term = normalize(query);
  if (!term) { box.classList.add('hidden'); box.innerHTML = ''; return; }
  const matches = flattenEntries().map((entry) => {
    const haystack = normalize([entry.subject.name, entry.topic.title, entry.subtopic.name, ...(entry.subtopic.keywords || [])].join(' '));
    const exact = haystack.includes(term);
    const words = term.split(/\s+/).filter(Boolean);
    const coverage = words.filter((word) => haystack.includes(word)).length / words.length;
    return { ...entry, score: exact ? coverage : coverage * 0.8 };
  }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);

  box.innerHTML = matches.map(({ subject, topic, subtopic }) => `
    <button type="button" class="search-suggestion-item" data-subject="${subject.name}" data-topic="${escapeHtml(topic.title)}" data-subtopic="${escapeHtml(subtopic.name)}">
      <span class="search-suggestion-title">${escapeHtml(subtopic.name)}</span>
      <span class="search-suggestion-meta">${escapeHtml(subject.name)} • ${escapeHtml(topic.title)} • definicja, schemat i zadania</span>
    </button>`).join('') + `
    <button type="button" class="search-suggestion-item ai-search" data-ai-query="${escapeHtml(query)}">
      <span class="search-suggestion-title">Szukaj głęboko z AI</span>
      <span class="search-suggestion-meta">Wyszukaj “${escapeHtml(query)}” w encyklopedii Google Gemini</span>
    </button>`;
  box.classList.remove('hidden');
}

function findLesson(subjectName, topicName, subtopicName) {
  for (const [subjectKey, subject] of Object.entries(getMode().subjects)) {
    if (subjectName && subjectName !== subject.name && subjectName !== subjectKey) continue;
    for (const topic of subject.topics) {
      if (topicName && topic.title !== topicName) continue;
      const subtopic = topic.subtopics.find((item) => item.name === subtopicName);
      if (subtopic) return { subjectKey, subject, topic, subtopic };
    }
  }
  return flattenEntries().find((entry) => entry.subtopic.name === subtopicName) || null;
}

function openLesson(subjectName, topicName, subtopicName) {
  const found = findLesson(subjectName, topicName, subtopicName);
  if (!found) return;
  app.subject = found.subjectKey; app.topic = found.topic.title; app.subtopic = subtopicName;
  app.difficulty = app.mode === 'medical' ? 'medycyna' : 'podstawowy';
  renderLesson(found);
  renderQuiz();
}

function renderLesson(found) {
  const lesson = found.subtopic.lessons[app.difficulty] || found.subtopic.lessons.podstawowy;
  const panel = el('detailPanel');
  panel.innerHTML = `<div class="detail-header">
    <button type="button" class="close-lesson" data-close-lesson>←</button>
    <div><p class="detail-kicker">${escapeHtml(found.subject.name)} · ${escapeHtml(found.topic.title)}</p><h3>${escapeHtml(found.subtopic.name)}</h3></div>
  </div>
  <div class="difficulty-switcher">
    ${[['podstawowy','Podstawowy'],['rozszerzony','Rozszerzony'],['medycyna','Studia / Medycyna'],['olimpiada','Olimpiada']].map(([key,label]) => `<button type="button" class="difficulty-button ${app.difficulty === key ? 'active':''}" data-difficulty="${key}">${label}</button>`).join('')}
  </div>
  <div class="detail-body lesson-layout">
    <section class="detail-box span-2"><div class="definition-topline">Definicja</div><p class="definition-main"><strong>${escapeHtml(found.subtopic.name)}</strong>: ${escapeHtml(lesson.definition)}</p></section>
    <section class="detail-box span-2"><h4>Wyjaśnienie</h4><p>${escapeHtml(lesson.content)}</p></section>
    <section class="detail-box span-2"><h4>Wzory i oznaczenia</h4><div class="formula-list"><div class="formula-item"><div class="formula-line">${escapeHtml(lesson.formulas.join('<br>'))}</div></div></div></section>
    <section class="detail-box span-2"><h4>Graficzne podsumowanie</h4><div class="lesson-visual"><div class="diagram-wrap"><div class="lesson-visual-glyph">${escapeHtml(lesson.visual)}</div></div></div></section>
    <section class="detail-box span-2"><h4>Przykład</h4><p><strong>Zadanie:</strong> ${escapeHtml(lesson.example)}</p><p><strong>Rozwiązanie:</strong> ${escapeHtml(lesson.answer)}</p><p><strong>Uzasadnienie:</strong> ${escapeHtml(lesson.explanation)}</p></section>
  </div>`;
  panel.classList.remove('hidden');
  document.querySelector('.main-panel').classList.add('lesson-open');
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderQuiz() {
  const quiz = el('quizCard');
  let questions = [];
  const mode = getMode();
  if (app.subject) {
    const selectedSubject = mode.subjects[app.subject];
    if (selectedSubject) {
      for (const topic of selectedSubject.topics) {
        const subtopic = topic.subtopics.find((item) => item.name === app.subtopic);
        if (subtopic?.questions?.length) {
          questions = subtopic.questions;
          break;
        }
      }
    }
  }
  if (!questions.length) {
    const fallback = flattenEntries().find((entry) => entry.subtopic.questions?.length)?.subtopic.questions || [];
    questions = fallback;
  }
  app.quizIndex = app.quizIndex % questions.length;
  const question = questions[app.quizIndex];
  if (!question) { quiz.innerHTML = '<p>Wybierz podtemat, aby wczytać pytania.</p>'; return; }
  quiz.innerHTML = `<span class="quiz-tag">${escapeHtml(app.subtopic || 'Mini test')}</span><h3>${escapeHtml(question.question)}</h3><ul class="answer-list">${question.options.map((option) => `<li><button type="button" data-answer="${escapeHtml(option)}">${escapeHtml(option)}</button></li>`).join('')}</ul>`;
  quiz.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
    const correct = button.dataset.answer === question.answer;
    quiz.querySelectorAll('[data-answer]').forEach((item) => { item.disabled = true; if (item.dataset.answer === question.answer) item.classList.add('correct'); });
    if (!correct) button.classList.add('incorrect');
    quiz.insertAdjacentHTML('beforeend', `<div class="quiz-explanation"><strong>${correct ? 'Poprawna odpowiedź!' : 'Niepoprawna odpowiedź.'}</strong> ${escapeHtml(question.explanation)}</div>`);
  }));
}

async function openAIResult(query) {
  const panel = el('detailPanel');
  panel.innerHTML = `<div class="detail-header"><button type="button" class="close-lesson" data-close-lesson>←</button><h3>${escapeHtml(query)} — AI Encyclopedia</h3></div><div class="detail-body"><div class="detail-box span-2">Ładowanie wyjaśnienia z Gemini…</div></div>`;
  panel.classList.remove('hidden');
  try {
    const ai = await explainConceptWithAI(query);
    panel.innerHTML = `<div class="detail-header"><button type="button" class="close-lesson" data-close-lesson>←</button><h3>${escapeHtml(query)} — AI Encyclopedia</h3></div>
      <div class="detail-body"><div class="detail-box span-2"><div class="definition-topline">Definicja</div><p class="definition-main">${escapeHtml(ai.definition)}</p></div>
      <div class="detail-box"><h4>Podstawowy</h4><p>${escapeHtml(ai.basic)}</p></div><div class="detail-box"><h4>Zaawansowany</h4><p>${escapeHtml(ai.advanced)}</p></div>
      <div class="detail-box"><h4>Medicina / Studia</h4><p>${escapeHtml(ai.medical)}</p></div><div class="detail-box span-2"><h4>Schemat</h4><div class="lesson-visual"><div class="lesson-visual-glyph">${escapeHtml(ai.visual)}</div></div></div>
      ${ai.formula ? `<div class="detail-box span-2"><h4>Wzór</h4><div class="formula-line">${escapeHtml(ai.formula)}</div></div>` : ''}</div>`;
  } catch (error) {
    panel.innerHTML = `<div class="detail-header"><button type="button" class="close-lesson" data-close-lesson>←</button><h3>${escapeHtml(query)}</h3></div><div class="detail-body"><div class="detail-box span-2"><strong>AI Encyclopedia nie jest jeszcze podłączona.</strong><p>${escapeHtml(error.message)}</p></div></div>`;
  }
}

el('searchInput').addEventListener('input', (event) => renderSearchResults(event.target.value));
el('searchInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') { event.prevent(); renderSearchResults(event.target.value); }
});
el('subjectFilter').addEventListener('change', renderSubjects);
el('levelFilter').addEventListener('change', renderSubjects);
el('toggleAll').addEventListener('click', () => {
  const subjectKeys = Object.keys(getMode().subjects);
  const allSubjectsExpanded = subjectKeys.every((key) => app.expandedSubjects.has(key));
  subjectKeys.forEach((key) => allSubjectsExpanded ? app.expandedSubjects.delete(key) : app.expandedSubjects.add(key));
  renderSubjects();
});
el('nextQuestion').addEventListener('click', () => { app.quizIndex += 1; renderQuiz(); });

document.addEventListener('click', (event) => {
  const subjectButton = event.target.closest('[data-subject]:not([data-subtopic]):not([data-ai-query])');
  if (subjectButton?.matches('.subject-header')) { const key = subjectButton.dataset.subject; app.expandedSubjects.has(key) ? app.expandedSubjects.delete(key) : app.expandedSubjects.add(key); renderSubjects(); return; }
  const topicButton = event.target.closest('[data-topic]:not(.subject-topic):not(.search-suggestion-item)');
  if (topicButton) { const key = topicButton.dataset.topic; app.expandedTopics.has(key) ? app.expandedTopics.delete(key) : app.expandedTopics.add(key); renderSubjects(); return; }
  const subtopicButton = event.target.closest('.subtopic-button');
  if (subtopicButton) { openLesson(subtopicButton.dataset.subject, subtopicButton.dataset.topic, subtopicButton.dataset.subtopic); el('suggestions').classList.add('hidden'); return; }
  const suggestion = event.target.closest('.search-suggestion-item');
  if (suggestion?.dataset.aiQuery) { openAIResult(suggestion.dataset.aiQuery); el('suggestions').classList.add('hidden'); return; }
  if (suggestion) { openLesson(suggestion.dataset.subject, suggestion.dataset.topic, suggestion.dataset.subtopic); el('suggestions').classList.add('hidden'); return; }
  const difficulty = event.target.closest('[data-difficulty]');
  if (difficulty) {
    app.difficulty = difficulty.dataset.difficulty;
    const found = findLesson(app.subject, app.topic, app.subtopic);
    if (found) renderLesson(found);
    return;
  }
  if (event.target.closest('[data-close-lesson]')) { el('detailPanel').classList.add('hidden'); document.querySelector('.main-panel').classList.remove('lesson-open'); return; }
  const modeButton = event.target.closest('[data-mode]');
  if (modeButton) { app.mode = modeButton.dataset.mode; app.expandedSubjects.clear(); app.expandedTopics.clear(); app.subject = null; app.topic = null; app.subtopic = null; app.difficulty = app.mode === 'medical' ? 'medycyna' : 'podstawowy'; document.querySelectorAll('[data-mode]').forEach((button) => button.classList.toggle('active', button === modeButton)); renderSubjects(); renderQuiz(); return; }
  if (!event.target.closest('.search-box')) el('suggestions').classList.add('hidden');
});

function renderStats() {
  const mode = getMode();
  const subjects = Object.values(mode.subjects);
  const topics = subjects.reduce((sum, subject) => sum + subject.topics.length, 0);
  const subtopics = subjects.reduce((sum, subject) => sum + subject.topics.reduce((total, topic) => total + topic.subtopics.length, 0), 0);
  el('statsGrid').innerHTML = `<div class="stat-card"><span class="label">Tryb</span><span class="value">${escapeHtml(mode.label)}</span></div><div class="stat-card"><span class="label">Przedmioty</span><span class="value">${subjects.length}</span></div><div class="stat-card"><span class="label">Tematy</span><span class="value">${topics}</span></div><div class="stat-card"><span class="label">Podtematy</span><span class="value">${subtopics}</span></div>`;
}

renderSubjects();
renderStats();
renderQuiz();
