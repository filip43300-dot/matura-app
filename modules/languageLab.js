window.LanguageLab = (() => {
  const LANGUAGES = {
    Angielski: { code: 'en-US', language: 'English' },
    Niemiecki: { code: 'de-DE', language: 'German' },
    Francuski: { code: 'fr-FR', language: 'French' }
  };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));
  const normalize = value => String(value || '').trim().toLocaleLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ');
  let context;
  let speakingHistory = [];
  let listeningExercise = null;
  let drill = null;

  function parseJson(text, label) {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`${label}: AI nie zwróciło poprawnego obiektu JSON.`);
    try {
      return JSON.parse(match[0]);
    } catch (error) {
      throw new Error(`${label}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async function ask(prompt, label) {
    try {
      return await window.GroqClient.complete(prompt, { temperature: 0.4, max_tokens: 1800 });
    } catch (error) {
      throw new Error(`${label}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  function open(subjectName, topicName) {
    context = LANGUAGES[subjectName];
    if (!context) throw new Error(`Nieobsługiwany język: ${subjectName}`);
    speakingHistory = [];
    listeningExercise = null;
    drill = null;
    const panel = document.getElementById('detailPanel');
    panel.classList.remove('hidden');
    panel.innerHTML = `<div class="detail-header"><button type="button" class="close-lesson" data-action="close">←</button><div><p class="detail-kicker">${escapeHtml(subjectName)} · Strefa treningowa</p><h3>Strefa Treningowa</h3></div></div>
      <nav class="language-tabs" role="tablist" aria-label="Ćwiczenia językowe">
        <button type="button" class="language-tab active" data-language-tab="speaking">🎙️ Speaking</button>
        <button type="button" class="language-tab" data-language-tab="listening">🎧 Listening</button>
        <button type="button" class="language-tab" data-language-tab="writing">✍️ Writing</button>
        <button type="button" class="language-tab" data-language-tab="drills">🧩 Ćwiczenia</button>
      </nav>
      <div id="languageLabContent" class="language-lab-content"></div>`;
    renderSpeaking(topicName);
    panel.querySelectorAll('[data-language-tab]').forEach(button => button.addEventListener('click', () => selectTab(button.dataset.languageTab, topicName)));
  }

  function selectTab(tab, topicName) {
    document.querySelectorAll('[data-language-tab]').forEach(button => button.classList.toggle('active', button.dataset.languageTab === tab));
    if (tab === 'speaking') renderSpeaking(topicName);
    if (tab === 'listening') renderListening();
    if (tab === 'writing') renderWriting(topicName);
    if (tab === 'drills') renderDrills();
  }

  function renderSpeaking(topicName) {
    const content = document.getElementById('languageLabContent');
    content.innerHTML = `<section class="detail-box language-exercise"><h4>Rozmowa i płynność</h4>
      <label for="speakingScenario">Scenariusz</label>
      <input id="speakingScenario" value="${escapeHtml(topicName || 'Swobodna rozmowa')}"/>
      <div id="speakingDialogue" class="language-output" aria-live="polite">Wybierz scenariusz i rozpocznij rozmowę.</div>
      <label for="speakingTypedAnswer">Odpowiedź tekstowa</label><textarea id="speakingTypedAnswer" rows="2" placeholder="Wpisz odpowiedź w języku obcym…"></textarea>
      <div class="language-actions"><button type="button" class="soft-button" id="speakingStart">Rozpocznij rozmowę</button><button type="button" class="soft-button" id="speakingListen">🎙️ Odpowiedz głosem</button><button type="button" class="soft-button" id="speakingType">Odpowiedz tekstem</button><button type="button" class="soft-button" id="speakingReplay">🔊 Odsłuchaj</button></div>
      <div id="speakingFeedback" class="language-feedback" aria-live="polite"></div></section>`;
    content.querySelector('#speakingStart').addEventListener('click', () => speakingTurn('Rozpocznij rozmowę', true));
    content.querySelector('#speakingListen').addEventListener('click', listenToSpeaking);
    content.querySelector('#speakingType').addEventListener('click', typedSpeaking);
    content.querySelector('#speakingReplay').addEventListener('click', () => speak(content.querySelector('#speakingDialogue').dataset.speech || '', 1));
  }

  async function speakingTurn(userText, start = false) {
    const dialogue = document.getElementById('speakingDialogue');
    const feedback = document.getElementById('speakingFeedback');
    const scenario = document.getElementById('speakingScenario').value;
    dialogue.textContent = 'AI przygotowuje odpowiedź…';
    try {
      const response = await window.AIService.continueRoleplay({
        language: context.language,
        scenario,
        history: JSON.stringify(speakingHistory),
        userText: start ? 'Zacznij naturalną rozmowę i zadaj krótkie pytanie.' : userText
      });
      speakingHistory.push({ role: 'user', text: userText }, { role: 'assistant', text: response.reply });
      dialogue.textContent = response.reply;
      dialogue.dataset.speech = response.reply;
      speak(response.reply, 1);
      feedback.innerHTML = `<strong>Informacja zwrotna po polsku</strong><p>${escapeHtml(response.subtitlePolish || '')}</p>
        <p><strong>Gramatyka:</strong> ${escapeHtml(response.feedback?.grammar || 'Bez uwag.')}</p>
        <p><strong>Wymowa i płynność:</strong> ${escapeHtml(response.feedback?.pronunciation || response.feedback?.vocabulary || 'Dobra kontynuacja.')}</p>
        ${response.feedback?.betterPhrase ? `<p><strong>Naturalniej:</strong> ${escapeHtml(response.feedback.betterPhrase)}</p>` : ''}`;
    } catch (error) {
      dialogue.textContent = '';
      feedback.textContent = error instanceof Error ? error.message : String(error);
    }
  }

  function listenToSpeaking() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      document.getElementById('speakingFeedback').textContent = 'Ta przeglądarka nie obsługuje rozpoznawania mowy. Użyj Chrome lub trybu odpowiedzi tekstowej.';
      return;
    }
    const recognition = new Recognition();
    recognition.lang = context.code;
    recognition.interimResults = false;
    recognition.onresult = event => speakingTurn(event.results[0][0].transcript);
    recognition.onerror = event => { document.getElementById('speakingFeedback').textContent = `Rozpoznawanie mowy: ${event.error}`; };
    recognition.start();
    document.getElementById('speakingFeedback').textContent = 'Słucham…';
  }

  function typedSpeaking() {
    const answer = document.getElementById('speakingTypedAnswer').value;
    if (answer?.trim()) speakingTurn(answer.trim());
    else document.getElementById('speakingFeedback').textContent = 'Wpisz odpowiedź w polu tekstowym.';
  }

  function renderListening() {
    const content = document.getElementById('languageLabContent');
    content.innerHTML = `<section class="detail-box language-exercise"><h4>Rozumienie ze słuchu</h4>
      <label for="listeningSpeed">Tempo nagrania</label><select id="listeningSpeed"><option value="0.8">0.8x</option><option value="1" selected>1.0x</option></select>
      <div id="listeningOutput" class="language-output">Wygeneruj krótkie nagranie, a następnie odpowiedz na trzy pytania.</div>
      <button type="button" class="soft-button" id="listeningGenerate">Wygeneruj i odtwórz dialog</button>
      <div id="listeningQuestions" class="listening-questions"></div><div id="listeningTranscript" class="language-feedback"></div></section>`;
    content.querySelector('#listeningGenerate').addEventListener('click', generateListening);
  }

  async function generateListening() {
    const output = document.getElementById('listeningOutput');
    const questions = document.getElementById('listeningQuestions');
    output.textContent = 'Przygotowuję dialog…';
    questions.innerHTML = '';
    document.getElementById('listeningTranscript').textContent = '';
    try {
      const text = await ask(`Po ${context.language} napisz krótki dialog lub monolog odpowiedni dla maturzysty. Zwróć JSON: {"transcript":"...", "questions":[{"question":"...","options":["...","...","..."],"answer":"dokładny tekst poprawnej opcji"}]} Dokładnie 3 pytania, każde 3 opcje.`, 'Listening');
      listeningExercise = parseJson(text, 'Listening');
      if (!Array.isArray(listeningExercise.questions) || listeningExercise.questions.length !== 3) throw new Error('Listening: AI nie zwróciło dokładnie trzech pytań.');
      if (typeof listeningExercise.transcript !== 'string' || listeningExercise.questions.some(question => typeof question.question !== 'string' || !Array.isArray(question.options) || question.options.length !== 3 || typeof question.answer !== 'string')) {
        throw new Error('Listening: AI zwróciło niekompletne pytania lub transkrypcję.');
      }
      output.textContent = 'Odtwórz nagranie uważnie. Transkrypcja będzie dostępna po odpowiedzi na wszystkie pytania.';
      speak(listeningExercise.transcript, Number(document.getElementById('listeningSpeed').value));
      questions.innerHTML = listeningExercise.questions.map((item, index) => `<fieldset class="listening-question" data-question-index="${index}"><legend>${index + 1}. ${escapeHtml(item.question)}</legend>${item.options.map(option => `<label><input type="radio" name="listen-${index}" value="${escapeHtml(option)}"/> ${escapeHtml(option)}</label>`).join('')}</fieldset>`).join('') + '<button type="button" class="soft-button" id="listeningCheck">Sprawdź odpowiedzi</button><div id="listeningScore"></div>';
      questions.querySelector('#listeningCheck').addEventListener('click', checkListening);
    } catch (error) {
      output.textContent = error instanceof Error ? error.message : String(error);
    }
  }

  function checkListening() {
    const selected = listeningExercise.questions.map((_, index) => document.querySelector(`input[name="listen-${index}"]:checked`)?.value);
    if (selected.some(answer => !answer)) {
      document.getElementById('listeningScore').textContent = 'Odpowiedz na wszystkie trzy pytania.';
      return;
    }
    const score = selected.reduce((total, answer, index) => total + (normalize(answer) === normalize(listeningExercise.questions[index].answer) ? 1 : 0), 0);
    document.getElementById('listeningScore').textContent = `Wynik: ${score}/3`;
    document.getElementById('listeningTranscript').innerHTML = `<strong>Transkrypcja:</strong><p>${escapeHtml(listeningExercise.transcript)}</p>`;
  }

  function renderWriting(topicName) {
    const content = document.getElementById('languageLabContent');
    content.innerHTML = `<section class="detail-box language-exercise"><h4>Wypowiedź pisemna</h4>
      <div id="writingPrompt" class="language-output">${escapeHtml(topicName || 'Wylosuj zadanie egzaminacyjne.')}</div>
      <button type="button" class="soft-button" id="writingNewPrompt">Losuj polecenie maturalne</button>
      <textarea id="writingAnswer" rows="9" placeholder="Napisz odpowiedź w języku obcym…"></textarea>
      <button type="button" class="soft-button" id="writingGrade">Oceń i popraw tekst</button>
      <div id="writingResult" class="language-feedback" aria-live="polite"></div></section>`;
    content.querySelector('#writingNewPrompt').addEventListener('click', generateWritingPrompt);
    content.querySelector('#writingGrade').addEventListener('click', gradeWriting);
  }

  async function generateWritingPrompt() {
    const prompt = document.getElementById('writingPrompt');
    prompt.textContent = 'Przygotowuję polecenie…';
    try {
      const text = await ask(`Wymyśl jedno realistyczne polecenie maturalne po ${context.language} (e-mail, rozprawka, artykuł lub opis), z 3-4 wymaganymi punktami. Zwróć JSON {"prompt":"pełna treść polecenia"}.`, 'Writing');
      prompt.textContent = parseJson(text, 'Writing').prompt;
    } catch (error) {
      prompt.textContent = error instanceof Error ? error.message : String(error);
    }
  }

  async function gradeWriting() {
    const answer = document.getElementById('writingAnswer').value.trim();
    const result = document.getElementById('writingResult');
    if (!answer) {
      result.textContent = 'Najpierw wpisz swoją wypowiedź.';
      return;
    }
    result.textContent = 'Sprawdzam wypowiedź…';
    try {
      const text = await ask(`Oceń wypowiedź ucznia po ${context.language}. Polecenie: ${document.getElementById('writingPrompt').textContent}. Tekst: ${answer}. Oceń merytorykę, zakres środków językowych, poprawność i spójność. Podaj listę korekt jako obiekty original, corrected, explanation; wersję naturalną na poziomie C1 w języku obcym oraz krótką ocenę po polsku. Zwróć JSON {"score":0,"maxScore":20,"corrections":[{"original":"...","corrected":"...","explanation":"..."}],"c1Version":"...","feedbackPl":"..."}.`, 'Writing');
      const grade = parseJson(text, 'Writing');
      const corrections = Array.isArray(grade.corrections)
        ? grade.corrections.map(item => `<li><mark>${escapeHtml(item.original)} → ${escapeHtml(item.corrected)}</mark> ${escapeHtml(item.explanation)}</li>`).join('')
        : `<li>${escapeHtml(grade.corrections)}</li>`;
      result.innerHTML = `<strong>Wynik: ${escapeHtml(grade.score)}/${escapeHtml(grade.maxScore)}</strong><ul class="writing-corrections">${corrections}</ul><p><strong>Wersja naturalna C1:</strong> ${escapeHtml(grade.c1Version)}</p><p><strong>Informacja po polsku:</strong> ${escapeHtml(grade.feedbackPl)}</p>`;
    } catch (error) {
      result.textContent = error instanceof Error ? error.message : String(error);
    }
  }

  function renderDrills() {
    const content = document.getElementById('languageLabContent');
    content.innerHTML = `<section class="detail-box language-exercise"><h4>Szybkie ćwiczenia</h4>
      <div class="language-actions"><button type="button" class="soft-button" data-drill-type="fill">Uzupełnij lukę</button><button type="button" class="soft-button" data-drill-type="order">Ułóż zdanie</button><button type="button" class="soft-button" data-drill-type="translate">Fiszka tłumaczeniowa</button></div>
      <div id="drillCard" class="language-output">Wybierz rodzaj ćwiczenia.</div><div id="drillFeedback" class="language-feedback"></div></section>`;
    content.querySelectorAll('[data-drill-type]').forEach(button => button.addEventListener('click', () => generateDrill(button.dataset.drillType)));
  }

  async function generateDrill(type) {
    const card = document.getElementById('drillCard');
    const feedback = document.getElementById('drillFeedback');
    card.textContent = 'Przygotowuję ćwiczenie…';
    feedback.textContent = '';
    try {
      const formats = {
        fill: '{"prompt":"zdanie z luką ____","answer":"brakujące słowo","hint":"krótka wskazówka"}',
        order: '{"prompt":"słowa do ułożenia, pomieszane","answer":"poprawne zdanie","hint":"krótka wskazówka"}',
        translate: '{"prompt":"zdanie po polsku","answer":"tłumaczenie w języku obcym","hint":"krótka wskazówka"}'
      };
      const text = await ask(`Stwórz jedno krótkie ćwiczenie ${type} dla ucznia języka ${context.language}. ${type === 'translate' ? 'Polecenie po polsku.' : 'Polecenie i teksty w języku obcym.'} Zwróć JSON ${formats[type]}.`, 'Ćwiczenia');
      drill = parseJson(text, 'Ćwiczenia');
      card.innerHTML = `<p>${escapeHtml(drill.prompt)}</p><input id="drillAnswer" autocomplete="off" placeholder="Twoja odpowiedź"/><button type="button" class="soft-button" id="drillCheck">Sprawdź</button>`;
      card.querySelector('#drillCheck').addEventListener('click', checkDrill);
    } catch (error) {
      card.textContent = error instanceof Error ? error.message : String(error);
    }
  }

  function checkDrill() {
    const answer = normalize(document.getElementById('drillAnswer').value);
    const correct = normalize(drill.answer);
    const matches = answer === correct || (drill.prompt.includes('____') && answer === normalize(drill.answer));
    const feedback = document.getElementById('drillFeedback');
    feedback.className = `language-feedback ${matches ? 'is-correct' : 'is-incorrect'}`;
    feedback.textContent = matches ? `Dobrze! ${drill.hint || ''}` : `Jeszcze raz. Poprawna odpowiedź: ${drill.answer}`;
  }

  function speak(text, rate) {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = context.code;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  }

  return { open };
})();
