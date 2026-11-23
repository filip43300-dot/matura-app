window.AppShell = (() => {
  let currentView = 'learn';

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char]));
  }

  function init() {
    applyTheme(window.EducationStore.read('settings').theme || 'dark');
    document.querySelectorAll('[data-app-view]').forEach(button => button.addEventListener('click', () => switchView(button.dataset.appView)));
  }

  function switchView(view) {
    currentView = view;
    document.querySelectorAll('[data-app-view]').forEach(button => button.classList.toggle('active', button.dataset.appView === view));
    const learn = document.querySelector('#learnView');
    const workspace = document.querySelector('#workspaceView');
    if (!learn || !workspace) return;
    if (view === 'learn') {
      learn.classList.add('active');
      workspace.classList.remove('active');
      workspace.innerHTML = '';
      return;
    }
    learn.classList.remove('active');
    workspace.classList.add('active');
    if (view === 'dashboard') renderDashboard(workspace);
    if (view === 'tutor') window.TutorModule.render(workspace);
    if (view === 'exams') window.ExamModule.render(workspace);
    if (view === 'generator') window.GeneratorModule.render(workspace);
    if (view === 'library') renderLibrary(workspace);
    if (view === 'labs') window.LabModule.render(workspace);
    if (view === 'profile') renderProfile(workspace);
  }

  function renderDashboard(container) {
    const history = window.EducationStore.read('history');
    const mastery = window.EducationStore.read('topicMastery');
    const errors = window.EducationStore.read('errors');
    const exams = window.EducationStore.read('exams');
    const completed = window.EducationStore.read('completedTopics');
    const labProgress = window.EducationStore.read('labProgress');
    const labHistory = window.EducationStore.read('labHistory');
    const labCount = Object.keys(labProgress).length;
    const labMastery = labCount ? Math.round(Object.values(labProgress).reduce((sum,lab)=>sum+(Number(lab.mastery)||0),0)/labCount) : 0;
    const dueReviews = window.EducationStore.read('flashcards').filter(review => !review.nextReview || new Date(review.nextReview) <= new Date());
    const recent = history.slice(0, 8);
    const avg = exams.length ? Math.round(exams.reduce((sum,exam)=>sum+(Number(exam.percentage)||0),0)/exams.length) : 0;
    container.innerHTML = `<section class="workspace-header"><div><p class="workspace-kicker">Przegląd edukacyjny</p><h2>Dashboard</h2></div><div class="sync-status" id="syncStatus">☁️ Tryb lokalny</div></section>
      <div class="dashboard-grid"><article class="metric-card"><span>Aktywność</span><strong>${history.length}</strong><small>zapisanych działań</small></article><article class="metric-card"><span>Opanowane tematy</span><strong>${completed.length}</strong><small>z ${Object.keys(mastery).length} ocenionych</small></article><article class="metric-card"><span>Średni wynik</span><strong>${avg}%</strong><small>${exams.length} egzaminów</small></article><article class="metric-card"><span>Powtórki</span><strong>${dueReviews.length}</strong><small>termin do wykonania</small></article><article class="metric-card"><span>Laboratoria</span><strong>${labMastery}%</strong><small>${labCount} rozpoczętych, ${labHistory.length} wizyt</small></article></div>
      <div class="dashboard-columns"><section class="workspace-card"><h3>Historia ostatniej nauki</h3>${recent.length?recent.map(item=>`<div class="history-item"><strong>${escapeHtml(item.topic||item.type)}</strong><span>${escapeHtml(item.score!==undefined?item.score+'%':item.type)}</span><small>${escapeHtml(new Date(item.createdAt).toLocaleString('pl-PL'))}</small></div>`).join(''):'<p class="workspace-muted">Aktywność pojawi się po rozpoczęciu nauki.</p>'}</section><section class="workspace-card"><h3>Obszary do powtórki</h3>${errors.filter(error=>!error.resolved).slice(0,8).map(error=>`<div class="review-item"><span>${escapeHtml(error.subject||error.topic||'Błąd')}</span><button type="button" class="soft-button" data-resolve-error="${escapeHtml(error.id)}">Ukończono</button></div>`).join('')||'<p class="workspace-muted">Brak zapisanych błędów.</p>'}<div class="plan-card"><strong>Plan na dziś</strong><p>${dueReviews.length?`Powtórz ${dueReviews.length} zagadnień.`:'Wybierz temat i wykonaj mini-test.'}</p><button type="button" class="soft-button" data-plan-action="tutor">Przejdź do AI Tutora</button></div></section></div>`;
    container.querySelectorAll('[data-resolve-error]').forEach(button=>button.addEventListener('click',()=>{window.EducationStore.resolveError(button.dataset.resolveError);renderDashboard(container);}));
    container.querySelector('[data-plan-action]')?.addEventListener('click',()=>switchView('tutor'));
  }

  function renderLibrary(container) {
    const materials=window.EducationStore.read('materials');
    const flashcards=window.EducationStore.read('flashcards');
    container.innerHTML=`<section class="workspace-header"><div><p class="workspace-kicker">Zapisane zasoby</p><h2>Biblioteka materiałów</h2></div><button type="button" id="exportLibrary" class="soft-button">Eksportuj dane</button></section><div class="library-layout"><section class="workspace-card"><h3>Materiały</h3>${materials.length?materials.map(item=>`<article class="library-item"><div><strong>${escapeHtml(item.topic)}</strong><small>${escapeHtml(item.subject)} · ${escapeHtml(item.type)} · ${escapeHtml(new Date(item.createdAt).toLocaleDateString('pl-PL'))}</small></div><button type="button" class="soft-button" data-print-library="${escapeHtml(item.id)}">PDF</button></article>`).join(''):'<p class="workspace-muted">Brak zapisanych materiałów. Utwórz pierwszy w Generatorze.</p>'}</section><section class="workspace-card"><h3>Inteligentne powtórki</h3>${renderFlashcards(flashcards)}<form id="addFlashcard" class="flashcard-form"><input id="flashFront" placeholder="Pytanie / pojęcie" required/><textarea id="flashBack" rows="3" placeholder="Odpowiedź" required></textarea><button type="button" class="soft-button" id="saveFlashcard">Dodaj fiszkę</button></form></section></div>`;
    container.querySelector('#exportLibrary')?.addEventListener('click',()=>{
      const blob=new Blob([JSON.stringify(window.EducationStore.exportData(),null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='matura-master-backup.json';link.click();URL.revokeObjectURL(url);
    });
    container.querySelector('#saveFlashcard')?.addEventListener('click',()=>{
      const front=document.querySelector('#flashFront').value.trim(),back=document.querySelector('#flashBack').value.trim();
      if(!front||!back)return;
      window.EducationStore.update('flashcards',cards=>[{id:crypto.randomUUID?.()||String(Date.now()),front,back,nextReview:new Date().toISOString(),interval:1,createdAt:new Date().toISOString()},...(cards||[])]);
      renderLibrary(container);
    });
    container.querySelectorAll('[data-flip-card]').forEach(button=>button.addEventListener('click',()=>{
      const card=button.closest('.flashcard');
      const answer=card?.querySelector('p');
      const grades=card?.querySelector('[data-grades]');
      if(answer){
        answer.classList.toggle('hidden');
        const hidden=answer.classList.contains('hidden');
        button.textContent=hidden?'Pokaż odpowiedź':'Ukryj odpowiedź';
        if(grades)grades.classList.toggle('hidden',hidden);
      }
    }));
    container.querySelectorAll('[data-grade]').forEach(button=>button.addEventListener('click',()=>{
      const interval=Number(button.dataset.grade);
      const id=button.dataset.card;
      window.EducationStore.update('flashcards',cards=>(cards||[]).map(card=>{
        if(card.id!==id)return card;
        const next=new Date(Date.now()+interval*86400000);
        return {...card,interval,nextReview:next.toISOString(),lastReviewed:new Date().toISOString()};
      }));
      renderLibrary(container);
    }));
    container.querySelectorAll('[data-print-library]').forEach(button=>button.addEventListener('click',()=>{
      const item=materials.find(material=>material.id===button.dataset.printLibrary);
      if(item)window.GeneratorModule.printMaterial(item);
    }));
  }

  function renderFlashcards(cards) {
    if(!cards?.length)return '<p class="workspace-muted">Brak fiszek.</p>';
    return cards.slice(0,8).map(card=>`<article class="flashcard" data-flashcard="${escapeHtml(card.id)}"><strong>${escapeHtml(card.front)}</strong><p class="hidden">${escapeHtml(card.back)}</p><button type="button" class="soft-button" data-flip-card="${escapeHtml(card.id)}">Pokaż odpowiedź</button><div class="flashcard-grades hidden" data-grades="${escapeHtml(card.id)}"><button type="button" class="soft-button" data-grade="1" data-card="${escapeHtml(card.id)}">Trudne</button><button type="button" class="soft-button" data-grade="3" data-card="${escapeHtml(card.id)}">Dobre</button><button type="button" class="soft-button" data-grade="7" data-card="${escapeHtml(card.id)}">Łatwe</button></div></article>`).join('');
  }

  function renderProfile(container) {
    const profile=window.EducationStore.read('profile');
    const settings=window.EducationStore.read('settings');
    container.innerHTML=`<section class="workspace-header"><div><p class="workspace-kicker">Dane i konfiguracja</p><h2>Profil użytkownika</h2></div></section><div class="profile-grid"><section class="workspace-card"><h3>Dane edukacyjne</h3><div class="form-grid"><label>Imię<input id="profileName" value="${escapeHtml(profile.name)}"/></label><label>Poziom<select id="profileLevel"><option>Podstawowy</option><option>Rozszerzony</option><option>Matura</option><option>Studia licencjackie</option><option>Studia magisterskie</option><option>Doktorancki</option></select></label><label class="span-two">Cel edukacyjny<input id="profileGoal" value="${escapeHtml(profile.goal)}"/></label></div><button type="button" id="saveProfile" class="primary-button">Zapisz profil</button></section><section class="workspace-card"><h3>Motyw i AI</h3><label>Motyw<select id="themeSetting"><option value="dark">Ciemny</option><option value="light">Jasny</option></select></label><label>URL backendu AI<input id="backendUrl" type="url" placeholder="https://projekt.workers.dev" value="${escapeHtml(settings.backendUrl)}"/></label><label>Provider backendu<select id="aiProvider"><option value="openai">OpenAI</option><option value="groq">Groq</option></select></label><label>Model AI<input id="aiModel" placeholder="Automatycznie" value="${escapeHtml(settings.aiModel)}"/></label><button type="button" id="saveSettings" class="primary-button">Zapisz ustawienia</button><hr/><label>Import danych JSON<input id="importData" type="file" accept="application/json"/></label></section></div>`;
    container.querySelector('#profileLevel').value=profile.level||'Podstawowy';
    container.querySelector('#themeSetting').value=settings.theme||'dark';
    container.querySelector('#aiProvider').value=settings.aiProvider||'openai';
    container.querySelector('#saveProfile').addEventListener('click',()=>{
      window.EducationStore.write('profile',{name:document.querySelector('#profileName').value.trim(),level:document.querySelector('#profileLevel').value,goal:document.querySelector('#profileGoal').value.trim(),subjects:profile.subjects||[]});
      window.EducationStore.recordActivity({type:'profile',topic:'Aktualizacja profilu'});
      container.querySelector('#saveProfile').textContent='Zapisano';
    });
    container.querySelector('#saveSettings').addEventListener('click',()=>{
      const next={theme:document.querySelector('#themeSetting').value,backendUrl:document.querySelector('#backendUrl').value.trim().replace(/\/$/,''),aiProvider:document.querySelector('#aiProvider').value,aiModel:document.querySelector('#aiModel').value.trim()};
      window.EducationStore.write('settings',next);applyTheme(next.theme);
      container.querySelector('#saveSettings').textContent='Zapisano';
    });
    container.querySelector('#importData').addEventListener('change',async event=>{
      const file=event.target.files?.[0];if(!file)return;
      try{window.EducationStore.importData(JSON.parse(await file.text()));renderProfile(container);}catch(error){alert(error instanceof Error?error.message:String(error));}
    });
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme=theme;
  }

  return { init, switchView, applyTheme };
})();
