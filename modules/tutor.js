window.TutorModule = (() => {
  const modes = [
    ['teacher', 'Nauczyciel', 'Wyjaśnia od podstaw i dostosowuje poziom'],
    ['solver', 'Rozwiązywanie zadań', 'Analizuje dane i prowadzi krok po kroku'],
    ['examiner', 'Egzaminator', 'Zadaje pytania i ocenia odpowiedzi'],
    ['analyst', 'Analityk', 'Wykrywa braki i analizuje błędy'],
    ['generator', 'Generator', 'Tworzy notatki, fiszki, testy i plan'],
    ['mentor', 'Mentor', 'Tworzy cele i harmonogram nauki']
  ];
  let activeMode = 'teacher';
  let modelsLoaded = false;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char]));
  }

  function render(container) {
    const profile = window.EducationStore.read('profile');
    const chats = window.EducationStore.read('tutorChats');
    container.innerHTML = `<section class="workspace-header"><div><p class="workspace-kicker">Osobisty korepetytor</p><h2>AI Tutor</h2></div><div class="workspace-actions"><select id="tutorLevel" aria-label="Poziom"><option>Szkoła podstawowa</option><option>Podstawowy</option><option>Rozszerzony</option><option>Matura</option><option>Studia licencjackie</option><option>Studia magisterskie</option><option>Doktorancki</option></select><label class="notation-toggle"><input id="textbookMode" type="checkbox" checked/> Styl podręcznikowy</label><select id="tutorModel" aria-label="Model AI"><option value="">Automatyczny model</option></select></div></section>
      <div class="tutor-layout"><aside class="tutor-sidebar"><div class="mode-list">${modes.map(([key,label,description])=>`<button type="button" class="tutor-mode ${activeMode===key?'active':''}" data-tutor-mode="${key}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(description)}</span></button>`).join('')}</div></aside>
      <section class="tutor-panel"><div id="tutorMessages" class="tutor-messages" aria-live="polite">${renderMessages(chats)}</div><div class="tutor-composer"><label class="upload-button" title="Dodaj zdjęcie"><input id="tutorImage" type="file" accept="image/*,.pdf" /><span>📎</span></label><textarea id="tutorInput" rows="2" placeholder="Zadaj pytanie, wstaw zadanie lub wybierz tryb…"></textarea><button type="button" id="tutorSend" class="primary-button">Wyślij</button></div></section></div>`;
    container.querySelector('#tutorLevel').value = profile.level === 'Studia / Medycyna' ? 'Studia licencjackie' : (['Podstawowy','Rozszerzony','Matura'].includes(profile.level) ? profile.level : 'Podstawowy');
    container.querySelectorAll('[data-tutor-mode]').forEach(button => button.addEventListener('click', () => {
      activeMode = button.dataset.tutorMode;
      render(container);
    }));
    container.querySelector('#tutorSend').addEventListener('click', send);
    container.querySelector('#tutorInput').addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(); }
    });
    renderNotationHosts(container.querySelector('#tutorMessages'));
    loadModels(container);
  }

  function renderMessages(chats) {
    const list = Array.isArray(chats) ? chats.slice(-30) : [];
    if (!list.length) return '<div class="tutor-empty"><span>🎓</span><h3>W czym mogę pomóc?</h3><p>Wybierz tryb i zadaj pytanie z dowolnego zakresu edukacji.</p></div>';
    return list.map((message,index) => `<article class="tutor-message ${message.role}"><strong>${message.role === 'user' ? 'Ty' : 'AI Tutor'}</strong><div class="notation-host" data-notation-message="${index}">${escapeHtml(message.content)}</div></article>`).join('');
  }

  function renderNotationHosts(container) {
    if (!window.NotationService) return;
    container.querySelectorAll('[data-notation-message]').forEach(host => {
      const index = Number(host.dataset.notationMessage);
      const chats = window.EducationStore.read('tutorChats').slice(-30);
      if (chats[index]) window.NotationService.renderInto(host, chats[index].content);
    });
  }

  async function loadModels(container) {
    if (modelsLoaded) return;
    modelsLoaded = true;
    try {
      const models = await window.AIGateway.models();
      const select = container.querySelector('#tutorModel');
      if (!select) return;
      models.forEach(model => {
        const id = typeof model === 'string' ? model : model.id;
        if (id) select.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(id)}">${escapeHtml(id)}</option>`);
      });
    } catch (_) {}
  }

  async function send() {
    const input = document.querySelector('#tutorInput');
    const image = document.querySelector('#tutorImage');
    const level = document.querySelector('#tutorLevel')?.value || 'Podstawowy';
    const model = document.querySelector('#tutorModel')?.value || undefined;
    const textbook = document.querySelector('#textbookMode')?.checked;
    const text = input?.value.trim();
    if (!text) return;

    const modeLabel = modes.find(item => item[0] === activeMode)?.[1] || 'Nauczyciel';
    window.EducationStore.update('tutorChats', chats => [...(chats || []), { role: 'user', content: text, mode: activeMode, createdAt: new Date().toISOString() }].slice(-100));
    input.value = '';
    const messagesContainer = document.querySelector('#tutorMessages');
    if (messagesContainer) {
      messagesContainer.innerHTML = renderMessages(window.EducationStore.read('tutorChats')) + '<div class="tutor-thinking">AI przygotowuje odpowiedź…</div>';
      renderNotationHosts(messagesContainer);
    }

    let attachment = '';
    const file = image?.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        renderError('Plik przekracza limit 10 MB.');
        return;
      }
      if (file.type.startsWith('image/')) {
        attachment = await fileToDataUrl(file);
      } else if (file.type === 'application/pdf') {
        attachment = '[Załącznik PDF: użyj modułu skanera do pełnego odczytu dokumentu.]';
      }
    }

    const history = window.EducationStore.read('history').slice(0, 12);
    const profile = window.EducationStore.read('profile');
    const prompt = `Jesteś profesjonalnym polskim korepetytorem Matura Master 2.0. Tryb: ${modeLabel}. Poziom: ${level}. Profil ucznia: ${JSON.stringify(profile)}. Wcześniejsza aktywność: ${JSON.stringify(history)}. Odpowiadaj po polsku, precyzyjnie i edukacyjnie. Nie wymyślaj źródeł. W trybie rozwiązywania zadań prowadź krok po kroku i zweryfikuj wynik. ${textbook ? 'Używaj profesjonalnego stylu podręcznikowego: numeruj ważne wzory, oddzielaj dane, szukane, wzór, podstawienie, obliczenia i odpowiedź dla zadań, a długie przekształcenia wyrównuj.' : ''} ${window.NotationService?.promptInstructions('Objaśniaj symbole i podawaj jednostki.') || ''} ${attachment ? `Załącznik: ${attachment.slice(0, 50000)}` : ''}\n\nPytanie użytkownika: ${text}`;
    try {
      const answer = await window.AIGateway.chat([{ role: 'user', content: prompt }], { model, temperature: activeMode === 'solver' ? 0.2 : 0.7, max_tokens: 3500 });
      window.EducationStore.update('tutorChats', chats => [...(chats || []), { role: 'assistant', content: answer, mode: activeMode, createdAt: new Date().toISOString() }].slice(-100));
      window.EducationStore.recordActivity({ type: 'tutor', mode: activeMode, topic: text.slice(0, 120) });
      if (messagesContainer) {
        messagesContainer.innerHTML = renderMessages(window.EducationStore.read('tutorChats'));
        renderNotationHosts(messagesContainer);
      }
    } catch (error) {
      renderError(error instanceof Error ? error.message : String(error));
    }
  }

  function renderError(message) {
    const messagesContainer = document.querySelector('#tutorMessages');
    if (messagesContainer) {
      messagesContainer.innerHTML = renderMessages(window.EducationStore.read('tutorChats')) + `<div class="workspace-error">${escapeHtml(message)}</div>`;
      renderNotationHosts(messagesContainer);
    }
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(`[Załączone zdjęcie Base64: ${String(reader.result).slice(0, 50000)}]`);
      reader.onerror = () => reject(new Error('Nie udało się odczytać zdjęcia.'));
      reader.readAsDataURL(file);
    });
  }

  return { render };
})();
