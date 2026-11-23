window.ExamModule = (() => {
  let activeExam = null;
  let timerId = null;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char]));
  }

  function render(container) {
    const exams = window.EducationStore.read('exams');
    container.innerHTML = `<section class="workspace-header"><div><p class="workspace-kicker">Przygotowanie i ocena</p><h2>Egzaminy i testy</h2></div><button type="button" id="createExam" class="primary-button">Utwórz egzamin</button></section>
      <div class="exam-layout"><section class="workspace-card"><h3>Nowy egzamin próbny</h3><div class="form-grid"><label>Przedmiot<select id="examSubject"><option>Matematyka</option><option>Fizyka</option><option>Chemia</option><option>Biologia</option><option>Język polski</option><option>Historia</option><option>Geografia</option><option>Angielski</option></select></label><label>Poziom<select id="examLevel"><option>Podstawowy</option><option>Rozszerzony</option><option>Studia</option></select></label><label>Czas (minuty)<input id="examMinutes" type="number" min="5" max="180" value="30"/></label><label>Licba pytań<input id="examCount" type="number" min="3" max="30" value="10"/></label></div><button type="button" id="generateExam" class="soft-button">Generuj test przez AI</button><div id="examArea"></div></section>
      <section class="workspace-card"><h3>Historia egzaminów</h3><div id="examHistory">${renderHistory(exams)}</div></section></div>`;
    container.querySelector('#createExam').addEventListener('click', () => container.querySelector('#examSubject').focus());
    container.querySelector('#generateExam').addEventListener('click', generate);
  }

  async function generate() {
    const subject = document.querySelector('#examSubject').value;
    const level = document.querySelector('#examLevel').value;
    const minutes = Math.max(5, Math.min(180, Number(document.querySelector('#examMinutes').value) || 30));
    const count = Math.max(3, Math.min(30, Number(document.querySelector('#examCount').value) || 10));
    const area = document.querySelector('#examArea');
    area.innerHTML = '<p class="workspace-loading">Generowanie egzaminu…</p>';
    const prompt = `Wygeneruj ${count} pytań maturalnych wielokrotnego wyboru po polsku dla przedmiotu ${subject}, poziom ${level}. Zwróć WYŁĄCZNIE JSON-tablicę obiektów: {"question":"...","options":["A","B","C","D"],"answer":"dokładny tekst poprawnej opcji","explanation":"..."}. ${window.NotationService?.promptInstructions('W pytaniach i odpowiedziach używaj LaTeX, a szczególnie dla wzorów, reakcji i jednostek.') || ''}`;
    try {
      const text = await window.AIGateway.chat([{ role:'user', content:prompt }], { temperature:0.2, max_tokens:5000 });
      const match = text.match(/\[[\s\S]*\]/);
      if (!match) throw new Error('AI nie zwróciło listy pytań.');
      const questions = JSON.parse(match[0]).slice(0,count);
      if (!Array.isArray(questions) || !questions.length) throw new Error('Nie udało się utworzyć pytań.');
      activeExam = { id: crypto.randomUUID?.() || String(Date.now()), subject, level, minutes, createdAt:new Date().toISOString(), questions, answers:{}, endsAt:Date.now()+minutes*60000 };
      startTimer(area);
      renderExam(area);
    } catch (error) {
      area.innerHTML = `<div class="workspace-error">${escapeHtml(error instanceof Error ? error.message : String(error))}</div>`;
    }
  }

  function startTimer(area) {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {
      const timer = document.querySelector('#examTimer');
      if (!timer || !activeExam) return;
      const remaining = Math.max(0, activeExam.endsAt-Date.now());
      timer.textContent = `${Math.floor(remaining/60000)}:${String(Math.floor((remaining%60000)/1000)).padStart(2,'0')}`;
      if (remaining <= 0) { clearInterval(timerId); submit(); }
    }, 1000);
  }

  function renderExam(area) {
    area.innerHTML = `<div class="exam-running"><div class="exam-toolbar"><strong>${escapeHtml(activeExam.subject)}</strong><span id="examTimer">${activeExam.minutes}:00</span></div>${activeExam.questions.map((question,index)=>`<fieldset class="exam-question" data-exam-index="${index}"><legend>${index+1}. <span class="notation-host" data-exam-question="${index}">${escapeHtml(question.question)}</span></legend>${question.options.map((option,optionIndex)=>`<label><input type="radio" name="exam-${index}" value="${escapeHtml(option)}"/> <span class="notation-host" data-exam-option="${index}-${optionIndex}">${escapeHtml(option)}</span></label>`).join('')}</fieldset>`).join('')}<button type="button" id="submitExam" class="primary-button">Zakończ egzamin</button></div>`;
    area.querySelector('#submitExam').addEventListener('click', submit);
    renderExamNotation(area);
  }

  function renderExamNotation(root) {
    if (!window.NotationService) return;
    root.querySelectorAll('[data-exam-question]').forEach(host=>{
      const index=Number(host.dataset.examQuestion);
      window.NotationService.renderInto(host,activeExam.questions[index].question);
    });
    root.querySelectorAll('[data-exam-option]').forEach(host=>{
      const [questionIndex,optionIndex]=host.dataset.examOption.split('-').map(Number);
      window.NotationService.renderInto(host,activeExam.questions[questionIndex].options[optionIndex]);
    });
  }

  function submit() {
    if (!activeExam) return;
    activeExam.questions.forEach((question,index)=>{
      activeExam.answers[index]=document.querySelector(`input[name="exam-${index}"]:checked`)?.value || null;
    });
    const correct = activeExam.questions.reduce((score,question,index)=>score+(activeExam.answers[index]===question.answer?1:0),0);
    const percentage = Math.round(correct/activeExam.questions.length*100);
    const result = { ...activeExam, score:correct, percentage, answers:activeExam.answers, submittedAt:new Date().toISOString() };
    window.EducationStore.update('exams', exams => [result, ...(exams || [])].slice(0,100));
    window.EducationStore.recordActivity({ type:'exam', topic:activeExam.subject, score:percentage, subject:activeExam.subject });
    activeExam.questions.forEach((question,index)=>{
      if(activeExam.answers[index]!==question.answer) window.EducationStore.recordError({ type:'exam', subject:activeExam.subject, topic:question.question, correctAnswer:question.answer, selectedAnswer:activeExam.answers[index] });
    });
    if (timerId) clearInterval(timerId);
    const area=document.querySelector('#examArea');
    if(area) {
      area.innerHTML=`<div class="exam-result"><h3>Wynik: ${percentage}%</h3><p>${correct}/${activeExam.questions.length} poprawnych odpowiedzi</p>${activeExam.questions.map((question,index)=>`<div class="exam-review ${activeExam.answers[index]===question.answer?'correct':'incorrect'}"><strong>${index+1}. <span class="notation-host" data-result-question="${index}">${escapeHtml(question.question)}</span></strong><p>Twoja odpowiedź: <span class="notation-host" data-result-answer="${index}-mine">${escapeHtml(activeExam.answers[index]||'Brak odpowiedzi')}</span></p><p>Poprawna odpowiedź: <span class="notation-host" data-result-answer="${index}-correct">${escapeHtml(question.answer)}</span></p><p class="notation-host" data-result-explanation="${index}">${escapeHtml(question.explanation)}</p></div>`).join('')}</div>`;
      if(window.NotationService){
        area.querySelectorAll('[data-result-question]').forEach(host=>window.NotationService.renderInto(host,activeExam.questions[Number(host.dataset.resultQuestion)].question));
        area.querySelectorAll('[data-result-answer]').forEach(host=>{
          const [index,kind]=host.dataset.resultAnswer.split('-');
          window.NotationService.renderInto(host,kind==='mine'?(activeExam.answers[index]||'Brak odpowiedzi'):activeExam.questions[index].answer);
        });
        area.querySelectorAll('[data-result-explanation]').forEach(host=>window.NotationService.renderInto(host,activeExam.questions[Number(host.dataset.resultExplanation)].explanation));
      }
    }
    const history=document.querySelector('#examHistory');
    if(history) history.innerHTML=renderHistory(window.EducationStore.read('exams'));
  }

  function renderHistory(exams) {
    if (!exams?.length) return '<p class="workspace-muted">Brak zapisanych egzaminów.</p>';
    return exams.slice(0,10).map(exam=>`<article class="history-item"><strong>${escapeHtml(exam.subject)}</strong><span>${escapeHtml(exam.percentage)}%</span><small>${escapeHtml(new Date(exam.submittedAt).toLocaleString('pl-PL'))}</small></article>`).join('');
  }

  return { render };
})();
