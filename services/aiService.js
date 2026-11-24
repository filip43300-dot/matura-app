window.AIService = (() => {
  const getKey = () => localStorage.getItem('groq_api_key') || '';

  function readCache(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }

  async function request(prompt) {
    if (window.AIGateway?.getSettings().backendUrl) {
      return window.AIGateway.chat([{ role: 'user', content: prompt }], { temperature: 0.7, max_tokens: 4000 });
    }
    const key = getKey();
    if (!key) throw new Error('Brak klucza Groq AI. Kliknij „⚙️ Klucz API” i wklej klucz zaczynający się od gsk_.');
    return window.GroqClient.complete(prompt, { temperature: 0.7, top_p: 0.9, max_tokens: 4000 });
  }

  function cacheKey(prefix, parts) { return `matura:${prefix}:${parts.join('|').toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi,'-')}`; }

  async function generateLesson(context) {
    const key = cacheKey('lesson-v2',[context.subject,context.topic,context.subtopic,context.level]);
    const cached = readCache(key);
    if (cached) return cached;
    const notationInstructions = window.NotationService?.promptInstructions('W polach explanation, formulas i answer używaj poprawnego LaTeX. Odpowiadaj profesjonalnie podręcznikowo.') || '';
    const prompt = `Jesteś polskim ekspertem EdTech i przygotowujesz kompletną lekcję szkolną. Wygeneruj WYŁĄCZNIE poprawny JSON po polsku dla lekcji. Klucze: title, objectives, definition, sections (tablica obiektów title, content, type, items, formulas, example), explanation, formulas, table, applications, commonMistakes, visualDescription, example, answer, explanationOfAnswer, summary, coreConcepts, clinicalTip, warning, mermaid, chartjs, svg. ${notationInstructions} ` +
      `Zwróć gotową treść edukacyjną, nie HTML, nie CSS, nie JavaScript, nie Markdown-techniczny, nie instrukcje dla modelu i nie surową odpowiedź API. Każdy tekst musi być bezpieczny do pokazania uczniowi. ` +
      `Kontekst: przedmiot=${context.subject}; dział=${context.topic}; podtemat=${context.subtopic}; poziom=${context.level}. ` +
      `Wymagania: textbook-grade, ściśle odpowiadaj tylko na ten podtemat, oznaczaj kluczowe pojęcia znacznikami **pogrubienia**, wzory zapisuj w składni KaTeX, podaj 3-5 kluczowych definicji i rozwiązane zadanie z pełnym uzasadnieniem. ` +
      `Jeśli temat obejmuje proces biologiczny, fizjologiczny, kliniczny algorytm lub mapę pojęć, wpisz w mermaid poprawny kod Mermaid flowchart; w innym przypadku mermaid ma być pustym tekstem. ` +
      `Jeśli temat dotyczy funkcji, geometrii, zjawiska fizycznego lub krzywej medycznej, wpisz w chartjs konfigurację JSON Chart.js z type, data i options; w innym przypadku chartjs ma być null. ` +
      `Jeśli anatomia lub geometria skorzysta na schemacie, podaj prosty, samodzielny inline SVG w polu svg; nigdy nie umieszczaj skryptów, obcych zasobów ani HTML. ` +
      `Uzupełnij clinicalTip korelacją kliniczną albo wskazówką maturalną, a warning częstym błędem lub pustym tekstem.`;
    const text = await request(prompt);
    let lesson;
    try { lesson = JSON.parse(text.replace(/```json|```/g,'').trim()); } catch {
      const cleaned = String(text)
        .replace(/```(?:json|javascript|js|html|css|latex|markdown)?/gi,'')
        .replace(/```/g,'')
        .replace(/^\s*[\{\[][\s\S]*[\}\]]\s*$/,'')
        .trim();
      lesson = {
        title: context.subtopic,
        objectives: [],
        definition: cleaned && !/^[-*_`{[]/.test(cleaned) ? cleaned : 'Podsumowanie lekcji będzie dostępne po ponownym wygenerowaniu.',
        sections: [],
        explanation: '',
        formulas: [],
        table: null,
        applications: [],
        commonMistakes: [],
        visualDescription: 'Schemat zależności tematu',
        example: '',
        answer: '',
        explanationOfAnswer: '',
        summary: '',
        coreConcepts: [context.subtopic]
      };
    }
    localStorage.setItem(key, JSON.stringify(lesson));
    return lesson;
  }

  async function generateQuiz(context) {
    const key = cacheKey('quiz',[context.subject,context.topic,context.subtopic,context.level,Date.now()]);
    void key;
    const prompt = `Wygeneruj WYŁĄCZNIE JSON jako tablicę 5 unikalnych pytań wielokrotnego wyboru. Każdy element ma: question, options (4), answer (dokładny tekst opcji), explanation. Kontekst: przedmiot ${context.subject}, dział ${context.topic}, podtemat ${context.subtopic}, poziom ${context.level}. Zadania nie mogą się powtarzać. Odpowiedź po polsku. ${window.NotationService?.promptInstructions('W pytaniach i rozwiązaniach zapisuj wszystkie wzory jako LaTeX.') || ''}`;
    const text = await request(prompt);
    try { return JSON.parse(text.replace(/```json|```/g,'').trim()).slice(0,5); } catch { throw new Error('AI zwróciło odpowiedź quizową w niepoprawnym formacie. Spróbuj ponownie.'); }
  }

  async function explainConcept(query, level='Rozszerzony') {
    const key = cacheKey('search',[query,level]);
    const cached = readCache(key);
    if (cached) return cached;
    const prompt = `Podaj encyklopedyczne, szkoleniowo-tekstowe wyjaśnienie po polsku dla hasła „${query}”, poziom „${level}”. Zwróć WYŁĄCZNIE JSON z title, definition, explanation, formulas, examples, clinicalCorrelation, visualDescription, summary. ${window.NotationService?.promptInstructions('Wzory zapisuj jako poprawny LaTeX i objaśniaj symbole.') || ''}`;
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
