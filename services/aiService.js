window.AIService = (() => {
  const getKey = () => localStorage.getItem('groq_api_key') || '';

  async function request(prompt) {
    const key = getKey();
    if (!key) throw new Error('Brak klucza Groq AI. Kliknij „⚙️ Klucz API” i wklej klucz zaczynający się od gsk_.');
    return window.GroqClient.complete(prompt, { temperature: 0.7, top_p: 0.9, max_tokens: 4000 });
  }

  function cacheKey(prefix, parts) { return `matura:${prefix}:${parts.join('|').toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi,'-')}`; }

  async function generateLesson(context) {
    const key = cacheKey('lesson',[context.subject,context.topic,context.subtopic,context.level]);
    const cached = localStorage.getItem(key);
    if (cached) return JSON.parse(cached);
    const prompt = `Jesteś polskim ekspertem EdTech i przygotowujesz kompedium. Wygeneruj WYŁĄCZNIE poprawny JSON po polsku dla lekcji. Klucz: title, definition, explanation, formulas, visualDescription, example, answer, explanationOfAnswer, summary, coreConcepts. ` +
      `Kontekst: przedmiot=${context.subject}; dział=${context.topic}; podtemat=${context.subtopic}; poziom=${context.level}. ` +
      `Wymagania: textbook-grade, ściśle odpowiadaj tylko na ten podtemat, wzory w składni KaTeX, korelacje kliniczne dla medycyny, podaj 3-5 kluczowych definicji i rozwiązane zadanie z pełnym uzasadnieniem.`;
    const text = await request(prompt);
    let lesson;
    try { lesson = JSON.parse(text.replace(/```json|```/g,'').trim()); } catch { lesson = {title:context.subtopic,definition:text,explanation:'',formulas:[],visualDescription:'Schemat zależności tematu',example:'',answer:'',explanationOfAnswer:'',summary:'',coreConcepts:[context.subtopic]}; }
    localStorage.setItem(key, JSON.stringify(lesson));
    return lesson;
  }

  async function generateQuiz(context) {
    const key = cacheKey('quiz',[context.subject,context.topic,context.subtopic,context.level,Date.now()]);
    void key;
    const prompt = `Wygeneruj WYŁĄCZNIE JSON jako tablicę 5 unikalnych pytań wielokrotnego wyboru. Każdy element ma: question, options (4), answer (dokładny tekst opcji), explanation. Kontekst: przedmiot ${context.subject}, dział ${context.topic}, podtemat ${context.subtopic}, poziom ${context.level}. Zadania nie mogą się powtarzać. Odpowiedź po polsku.`;
    const text = await request(prompt);
    try { return JSON.parse(text.replace(/```json|```/g,'').trim()).slice(0,5); } catch { throw new Error('AI zwróciło odpowiedź quizową w niepoprawnym formacie. Spróbuj ponownie.'); }
  }

  async function explainConcept(query, level='Rozszerzony') {
    const key = cacheKey('search',[query,level]);
    const cached = localStorage.getItem(key);
    if (cached) return JSON.parse(cached);
    const prompt = `Podaj encyklopedyczne, szkoleniowo-tekstowe wyjaśnienie po polsku dla hasła „${query}”, poziom „${level}”. Zwróć WYŁĄCZNIE JSON z title, definition, explanation, formulas, examples, clinicalCorrelation, visualDescription, summary.`;
    const text = await request(prompt);
    let result;
    try { result=JSON.parse(text.replace(/```json|```/g,'').trim()); } catch { result={title:query,definition:text,explanation:'',formulas:[],examples:[],clinicalCorrelation:'',visualDescription:'Schemat pojęcia',summary:''}; }
    localStorage.setItem(key, JSON.stringify(result));
    return result;
  }

  async function continueRoleplay(payload) {
    const prompt = `Kontynuuj realistyczną rozmowę telefoniczną po ${payload.language}. Scenariusz: ${payload.scenario}. Historia: ${payload.history}. Odpowiedz WYŁĄCZNIE JSON: reply, subtitlePolish, feedback (grammar, vocabulary, pronunciation, betterPhrase), difficultyHint. Krótko kontynuuj rozmowę i reaguj na wypowiedź użytkownika: ${payload.userText}.`;
    const text = await request(prompt);
    try { return JSON.parse(text.replace(/```json|```/g,'').trim()); } catch { return {reply:'Could you repeat that more slowly?',subtitlePolish:'Czy możesz powtórzyć wolniej?',feedback:{grammar:'Brak danych',vocabulary:'Brak danych',pronunciation:'Brak danych',betterPhrase:''},difficultyHint:''}; }
  }

  return { getKey, generateLesson, generateQuiz, explainConcept, continueRoleplay, cacheKey };
})();
