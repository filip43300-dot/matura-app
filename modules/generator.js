window.GeneratorModule = (() => {
  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char]));
  }

  function render(container) {
    container.innerHTML = `<section class="workspace-header"><div><p class="workspace-kicker">Materiały do nauki</p><h2>Generator</h2></div></section><div class="generator-grid"><section class="workspace-card"><h3>Utwórz materiał</h3><div class="form-grid"><label>Typ<select id="generatorType"><option value="notes">Notatki</option><option value="flashcards">Fiszki</option><option value="quiz">Quiz</option><option value="tasks">Zadania</option><option value="mindmap">Mapa myśli</option><option value="revision">Zestaw powtórek</option></select></label><label>Przedmiot<input id="generatorSubject" value="Matematyka"/></label><label>Poziom<select id="generatorLevel"><option>Podstawowy</option><option>Rozszerzony</option><option>Matura</option><option>Studia</option></select></label><label class="span-two">Temat<input id="generatorTopic" placeholder="Np. funkcja kwadratowa"/></label></div><button type="button" id="generateMaterial" class="primary-button">Wygeneruj i zapisz</button></section><section class="workspace-card"><h3>Wygenerowany materiał</h3><div id="generatedMaterial" class="generated-material"><p class="workspace-muted">Wybierz typ i temat.</p></div></section></div>`;
    container.querySelector('#generateMaterial').addEventListener('click', generate);
  }

  async function generate() {
    const type = document.querySelector('#generatorType').value;
    const subject = document.querySelector('#generatorSubject').value.trim();
    const level = document.querySelector('#generatorLevel').value;
    const topic = document.querySelector('#generatorTopic').value.trim();
    const output = document.querySelector('#generatedMaterial');
    if (!topic) { output.innerHTML = '<div class="workspace-error">Wpisz temat materiału.</div>'; return; }
    const typeDescriptions = { notes:'szczegółowe uporządkowane notatki', flashcards:'10 fiszek w JSON jako tablica {front,back}', quiz:'10 pytań quizowych w JSON jako tablica {question,options,answer,explanation}', tasks:'8 zadań z rozwiązaniami i wskazówkami', mindmap:'mapę myśli w prostym JSON', revision:'zestaw powtórek rozłożonych w dniach' };
    output.innerHTML = '<p class="workspace-loading">Generowanie materiału…</p>';
    const prompt = `Przygotuj po polsku ${typeDescriptions[type]}. Przedmiot: ${subject}. Poziom: ${level}. Temat: ${topic}. Materiał musi być merytorycznie poprawny i nie zawierać fikcyjnych źródeł. ${window.NotationService?.promptInstructions('W quizach odpowiedzi i rozwiązania mogą zawierać wzory LaTeX. W notatkach numeruj ważne wzory i oddzielaj definicje od przykładów.') || ''}`;
    try {
      const content = await window.AIGateway.chat([{ role:'user', content:prompt }], { temperature:0.5, max_tokens:5000 });
      output.innerHTML = `<article class="material-output notation-host"></article><div class="material-actions"><button type="button" class="soft-button" id="saveGenerated">Zapisz w bibliotece</button><button type="button" class="soft-button" id="printGenerated">Eksport / PDF</button></div>`;
      window.NotationService?.renderInto(output.querySelector('.material-output'), content);
      const material = { type, subject, level, topic, content };
      output.querySelector('#saveGenerated').addEventListener('click', () => {
        window.EducationStore.addMaterial(material);
        window.EducationStore.recordActivity({ type:'material', topic, subject, subtype:type });
        output.querySelector('#saveGenerated').textContent='Zapisano';
      });
      output.querySelector('#printGenerated').addEventListener('click', () => printMaterial(material));
    } catch (error) {
      output.innerHTML = `<div class="workspace-error">${escapeHtml(error instanceof Error ? error.message : String(error))}</div>`;
    }
  }

  function printMaterial(material) {
    const windowRef = window.open('', '_blank');
    if (!windowRef) { alert('Przeglądarka zablokowała okno eksportu PDF.'); return; }
    const temp=document.createElement('article');
    temp.className='notation-content';
    window.NotationService?.renderInto(temp,material.content);
    windowRef.document.write(`<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>${escapeHtml(material.topic)}</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;color:#111}h1{font-size:24px}.meta{color:#555;margin-bottom:24px}.notation-block,.formula-block{overflow-x:auto;margin:12px 0}.notation-content{white-space:normal;line-height:1.65}@media print{button{display:none}}</style></head><body><h1>${escapeHtml(material.topic)}</h1><p class="meta">${escapeHtml(material.subject)} · ${escapeHtml(material.level)}</p>${temp.outerHTML}<script>window.onload=()=>window.print()<\\/script></body></html>`);
    windowRef.document.close();
  }

  return { render, printMaterial };
})();
