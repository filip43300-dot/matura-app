window.LessonReader = (() => {
  const CODE_MARKERS = [
    /```[\s\S]*```/g,
    /<([a-z!/][^>]*)>/gi,
    /^\s*[\{\[][\s\S]*[\}\]]\s*$/gm,
    /^(const|let|var|function|class|import|export)\b.*$/gm,
    /"[\w]+"\\s*:/g
  ];

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function sanitizeEducationalText(value) {
    let text = String(value ?? '').replace(/\r\n?/g, '\n');
    CODE_MARKERS.forEach(pattern => { text = text.replace(pattern, match => {
      if (/^<([a-z!/][^>]*)>$/i.test(match)) return '';
      if (/```/.test(match)) return match.replace(/```(?:json|javascript|js|html|css|latex|markdown)?/gi, '').replace(/```/g, '').trim();
      return match.includes('"') && match.includes(':') ? 'Treść opisowa.' : '';
    }); });
    text = text.replace(/&lt;\/?[a-z][^&]*&gt;/gi, '')
      .replace(/(?:^|\n)\s*[-*_]{3,}\s*(?=\n|$)/g, '\n')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[(?:[^\]]+)\]\((?:[^)]+)\)/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s{2,}$/gm, '')
      .trim();
    return text || 'Treść tego fragmentu nie jest dostępna w czytelnej formie.';
  }

  function arrays(value) {
    if (Array.isArray(value)) return value.map(item => typeof item === 'string' ? item : item?.title || item?.text || item?.name).filter(Boolean);
    if (typeof value === 'string') return value.split('\n').map(part => part.replace(/^[-*•]\s*/, '').trim()).filter(Boolean);
    return [];
  }

  function sectionTitle(section, index) {
    return sanitizeEducationalText(section.title || section.heading || section.name || `Sekcja ${index + 1}`);
  }

  function buildSections(lesson) {
    const sections = [];
    if (Array.isArray(lesson.sections)) {
      lesson.sections.forEach((section, index) => {
        if (typeof section === 'string') sections.push({ title:`Sekcja ${index + 1}`, content:section });
        else sections.push({
          title: sectionTitle(section, index),
          content: section.content || section.text || section.explanation || '',
          type: section.type || 'text',
          items: arrays(section.items || section.points),
          formulas: arrays(section.formulas),
          table: section.table || null,
          example: section.example || null
        });
      });
    }
    if (lesson.explanation) sections.unshift({ title:'Omówienie zagadnienia', content:lesson.explanation, type:'text' });
    return sections;
  }

  function stripTechnicalBlocks(value) {
    return sanitizeEducationalText(value).replace(/(?:API|JSON|HTML|CSS|JavaScript|LaTeX|Markdown)[^.\n]*(?:\.|$)/gi, match => /^[A-Za-z]/.test(match) ? '' : match);
  }

  function notationHtml(value) {
    if (!value) return '';
    const text = stripTechnicalBlocks(value);
    if (window.NotationService) {
      const host = document.createElement('div');
      host.className = 'lesson-notated-text';
      window.NotationService.renderInto(host, text);
      return host.outerHTML;
    }
    return `<p>${escapeHtml(text).replace(/\n/g,'<br>')}</p>`;
  }

  function renderTable(table) {
    if (!table) return '';
    const headers = Array.isArray(table.headers) ? table.headers : (Array.isArray(table.columns) ? table.columns : []);
    const rows = Array.isArray(table.rows) ? table.rows : [];
    if (!headers.length && !rows.length) return '';
    return `<div class="lesson-table-wrap"><table class="lesson-table">${headers.length?`<thead><tr>${headers.map(header=>`<th>${escapeHtml(stripTechnicalBlocks(header))}</th>`).join('')}</tr></thead>`:''}<tbody>${rows.map(row=>`<tr>${(Array.isArray(row)?row:Object.values(row)).map(cell=>`<td>${escapeHtml(stripTechnicalBlocks(cell))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function renderFormulaList(formulas) {
    const list = arrays(formulas).filter(Boolean);
    if (!list.length) return '';
    return `<div class="lesson-formula-list">${list.map((formula,index)=>`<div class="lesson-formula-card"><span class="lesson-formula-number">${index + 1}</span><div class="lesson-formula notation-host" data-lesson-formula-index="${index}"></div></div>`).join('')}</div>`;
  }

  function renderSolvedProblems(lesson) {
    if (!lesson.example && !lesson.answer) return '';
    return `<article class="lesson-solved-card"><header><span>Rozwiązane zadanie</span></header><div class="lesson-solution-grid">
      ${lesson.example?`<section><h4>Treść zadania</h4>${notationHtml(lesson.example)}</section>`:''}
      ${lesson.answer?`<section><h4>Wynik i obliczenia</h4>${notationHtml(lesson.answer)}</section>`:''}
      ${lesson.explanationOfAnswer?`<section class="lesson-solution-full"><h4>Wyjaśnienie</h4>${notationHtml(lesson.explanationOfAnswer)}</section>`:''}
    </div></article>`;
  }

  function getContextKey(context) {
    return `${context.subjectKey}|${context.topic.title}|${context.subtopic}`.toLowerCase();
  }

  function saveLesson(context) {
    if (!window.EducationStore) return;
    window.EducationStore.update('notes', notes => [{
      id: crypto.randomUUID?.() || String(Date.now()),
      title: context.subtopic,
      subject: context.subject.name,
      topic: context.topic.title,
      context: getContextKey(context),
      createdAt: new Date().toISOString()
    }, ...(notes || [])].filter((item,index,list) => list.findIndex(candidate => candidate.context === item.context) === index).slice(0,100));
    window.EducationStore.recordActivity({ type:'lesson', topic:context.subtopic, subject:context.subject.name });
  }

  function completeLesson(context) {
    if (!window.EducationStore) return;
    window.EducationStore.update('completedTopics', topics => [...new Set([...(topics || []), context.subtopic])].slice(0,200));
    window.EducationStore.recordActivity({ type:'topic', topic:context.subtopic, subject:context.subject.name, score:100 });
  }

  function saveReadingPlace(context, panel) {
    if (!window.EducationStore) return;
    const scrollElement = panel.querySelector('.lesson-reader-grid') || panel;
    window.EducationStore.update('lessonPositions', positions => ({
      ...(positions || {}),
      [getContextKey(context)]: {
        scrollTop: scrollElement.scrollTop,
        updatedAt: new Date().toISOString()
      }
    }));
  }

  function restoreReadingPlace(context, panel) {
    if (!window.EducationStore) return;
    const scrollElement = panel.querySelector('.lesson-reader-grid') || panel;
    const positions = window.EducationStore.read('lessonPositions') || {};
    const position = positions[getContextKey(context)];
    if (position?.scrollTop) requestAnimationFrame(() => { scrollElement.scrollTop = position.scrollTop; });
  }

  function render(context, lesson, options = {}) {
    const panel = document.querySelector('#detailPanel');
    if (!panel) return;
    const normalized = lesson && typeof lesson === 'object' ? lesson : {};
    const sections = buildSections(normalized);
    const objectives = arrays(normalized.objectives || normalized.goals).slice(0,8);
    const keyPoints = arrays(normalized.coreConcepts || normalized.keyTakeaways).slice(0,8);
    const applications = arrays(normalized.applications);
    const mistakes = arrays(normalized.commonMistakes || normalized.warning);
    const formulas = arrays(normalized.formulas);
    const table = normalized.table || null;
    const title = sanitizeEducationalText(normalized.title || context.subtopic);
    const definition = stripTechnicalBlocks(normalized.definition || normalized.summary || '');
    const subjectKey = getContextKey(context);
    const saved = window.EducationStore?.read('notes')?.some(note => note.context === subjectKey);
    const completed = window.EducationStore?.read('completedTopics')?.includes(context.subtopic);

    const toc = [
      ['definicja','Wprowadzenie'],
      ...sections.map((section,index)=>[`sekcja-${index+1}`,sectionTitle(section,index)]),
      ...(formulas.length?[['wzory','Wzory i symbole']]:[]),
      ...(table?[['tabela','Tabela']]:[]),
      ...(normalized.example||normalized.answer?[['zadanie','Rozwiązane zadanie']]:[]),
      ...(keyPoints.length?[['podsumowanie','Podsumowanie']]:[])
    ];

    panel.innerHTML = `<article class="lesson-reader" aria-label="${escapeHtml(title)}">
      <header class="lesson-reader-header">
        <button type="button" class="lesson-reader-close" data-action="close" aria-label="Zamknij lekcję">←</button>
        <div class="lesson-reader-heading">
          <p class="lesson-breadcrumb">${escapeHtml(context.subject.name)} <span>/</span> ${escapeHtml(context.topic.title)}</p>
          <h2>${escapeHtml(title)}</h2>
          <div class="lesson-meta"><span>${escapeHtml(stateLevelLabel())}</span><span>${escapeHtml(context.subtopic)}</span></div>
        </div>
        <div class="lesson-actions">
          <button type="button" id="saveLessonButton" class="lesson-icon-button ${saved?'saved':''}" data-lesson-save>${saved?'Zapisano':'Zapisz'}</button>
          <button type="button" id="completeLessonButton" class="lesson-icon-button ${completed?'saved':''}" data-lesson-complete>${completed?'Ukończono':'Ukończ lekcję'}</button>
        </div>
      </header>
      <div class="lesson-reading-progress"><span id="lessonReadingProgress"></span></div>
      <div class="lesson-reader-grid">
        <aside class="lesson-toc" aria-label="Spis treści"><p>W tej lekcji</p><nav>${toc.map(([id,label])=>`<a href="#${id}" data-lesson-section="${id}">${escapeHtml(label)}</a>`).join('')}</nav></aside>
        <div class="lesson-paper">
          ${definition?`<section id="definicja" class="lesson-opening"><span class="lesson-section-label">Wprowadzenie</span>${notationHtml(definition)}</section>`:''}
          ${objectives.length?`<section class="lesson-objectives"><h3>Cele nauczania</h3><div>${objectives.map(item=>`<div><span>✓</span><p>${escapeHtml(stripTechnicalBlocks(item))}</p></div>`).join('')}</div></section>`:''}
          ${sections.map((section,index)=>`<section id="sekcja-${index+1}" class="lesson-section"><span class="lesson-section-index">${String(index+1).padStart(2,'0')}</span><div><h3>${escapeHtml(sectionTitle(section,index))}</h3>${notationHtml(section.content)}</div></section>`).join('')}
          ${formulas.length?`<section id="wzory" class="lesson-section lesson-formulas-section"><span class="lesson-section-index">WZORY</span><div><h3>Wzory i oznaczenia</h3>${renderFormulaList(formulas)}</div></section>`:''}
          ${table?`<section id="tabela" class="lesson-section"><span class="lesson-section-index">Tabela</span><div><h3>Przegląd danych</h3>${renderTable(table)}</div></section>`:''}
          ${normalized.visualDescription?`<figure class="lesson-visual-card" data-lesson-visual data-mermaid="${escapeHtml(normalized.mermaid||'')}" data-chart="${escapeHtml(typeof normalized.chartjs==='string'?normalized.chartjs:normalized.chartjs?JSON.stringify(normalized.chartjs):'')}" data-svg="${escapeHtml(normalized.svg||'')}" data-description="${escapeHtml(normalized.visualDescription)}"><figcaption>Ilustracja i opis wizualny</figcaption></figure>`:''}
          ${applications.length?`<section class="lesson-section"><span class="lesson-section-index">Zastosowania</span><div><h3>Zastosowania praktyczne</h3><ul class="lesson-content-list">${applications.map(item=>`<li>${escapeHtml(stripTechnicalBlocks(item))}</li>`).join('')}</ul></div></section>`:''}
          ${mistakes.length?`<section class="lesson-caution"><h3>Najczęstsze błędy</h3><ul>${mistakes.map(item=>`<li>${escapeHtml(stripTechnicalBlocks(item))}</li>`).join('')}</ul></section>`:''}
          ${normalized.example||normalized.answer?`<section id="zadanie" class="lesson-section"><span class="lesson-section-index">Przykład</span><div><h3>Rozwiązane zadanie</h3>${renderSolvedProblems(normalized)}</div></section>`:''}
          ${keyPoints.length?`<section id="podsumowanie" class="lesson-summary"><h3>Najważniejsze informacje</h3><ul>${keyPoints.map(item=>`<li>${escapeHtml(stripTechnicalBlocks(item))}</li>`).join('')}</ul></section>`:''}
          ${renderLessonNavigation(context)}
        </div>
      </div>
    </article>`;

    bindReader(context, panel);
    restoreReadingPlace(context, panel);
    renderReaderNotation(panel, formulas);
  }

  function renderReaderNotation(panel, formulas = []) {
    if (!window.NotationService) return;
    panel.querySelectorAll('.lesson-notated-text').forEach(host => {
      const text = host.textContent;
      window.NotationService.renderInto(host, text);
    });
    panel.querySelectorAll('.lesson-formula').forEach(host => {
      const index = Number(host.dataset.lessonFormulaIndex || 0);
      const formula = formulas[index];
      host.textContent = '';
      if (!formula) return;
      window.NotationService.renderFormula(host, formula, true);
    });
  }

  function stateLevelLabel() {
    return window.lessonReaderLevel || 'Podstawowy';
  }

  function renderLoading(context) {
    const panel = document.querySelector('#detailPanel');
    if (!panel) return;
    panel.className = 'detail-panel lesson-reader-open';
    panel.innerHTML = `<article class="lesson-reader lesson-loading"><header class="lesson-reader-header"><button type="button" class="lesson-reader-close" data-action="close">←</button><div class="lesson-reader-heading"><p class="lesson-breadcrumb">${escapeHtml(context.subject.name)} / ${escapeHtml(context.topic.title)}</p><h2>${escapeHtml(context.subtopic)}</h2></div></header><div class="lesson-loading-grid"><span></span><span></span><span></span></div><p>Przygotowywanie profesjonalnej wersji lekcji…</p></article>`;
  }

  function renderLessonNavigation(context) {
    const neighbors = getNeighbors(context);
    return `<nav class="lesson-page-navigation">${neighbors.previous?`<button type="button" data-lesson-neighbor="previous" data-context="${escapeHtml(neighbors.previous.encoded)}"><span>← Poprzednia lekcja</span><strong>${escapeHtml(neighbors.previous.subtopic)}</strong></button>`:'<span></span>'}${neighbors.next?`<button type="button" data-lesson-neighbor="next" data-context="${escapeHtml(neighbors.next.encoded)}"><span>Następna lekcja →</span><strong>${escapeHtml(neighbors.next.subtopic)}</strong></button>`:''}</nav>`;
  }

  function getNeighbors(context) {
    if (typeof options?.getNeighbors !== 'function') return { previous:null,next:null };
    const neighbors = options.getNeighbors(context);
    if (!neighbors) return { previous:null,next:null };
    return {
      previous: neighbors.previous ? { ...neighbors.previous, encoded:encodeNeighbor(neighbors.previous) } : null,
      next: neighbors.next ? { ...neighbors.next, encoded:encodeNeighbor(neighbors.next) } : null
    };
  }

  function bindReader(context, panel) {
    let scrollSaveTimer;
    const scrollElement = panel.querySelector('.lesson-reader-grid') || panel;
    scrollElement.onscroll = () => {
      const progress = document.querySelector('#lessonReadingProgress');
      if (progress) {
        const value = scrollElement.scrollHeight > scrollElement.clientHeight ? scrollElement.scrollTop/(scrollElement.scrollHeight-scrollElement.clientHeight) : 0;
        progress.style.width = `${Math.min(100,Math.max(0,value*100))}%`;
      }
      clearTimeout(scrollSaveTimer);
      scrollSaveTimer = setTimeout(() => saveReadingPlace(context,panel),180);
    };
    panel.querySelectorAll('[data-lesson-section]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      const target = panel.querySelector(`#${link.dataset.lessonSection}`);
      if (target) {
        target.scrollIntoView({ behavior:'smooth', block:'start' });
        saveReadingPlace(context, panel);
        panel.querySelectorAll('[data-lesson-section]').forEach(item => item.classList.remove('active'));
        link.classList.add('active');
      }
    }));
    panel.querySelector('[data-lesson-save]')?.addEventListener('click', event => {
      saveLesson(context);
      event.currentTarget.textContent = 'Zapisano';
      event.currentTarget.classList.add('saved');
    });
    panel.querySelector('[data-lesson-complete]')?.addEventListener('click', event => {
      completeLesson(context);
      event.currentTarget.textContent = 'Ukończono';
      event.currentTarget.classList.add('saved');
    });
    panel.querySelectorAll('[data-lesson-neighbor]').forEach(button => button.addEventListener('click', () => {
      const eventContext = decodeNeighbor(button.dataset.context);
      if (eventContext && typeof options?.open === 'function') options.open(eventContext);
    }));
  }

  let options = null;

  function configure(next) { options = next || {}; }
  function decodeNeighbor(value) {
    try { return JSON.parse(decodeURIComponent(value)); } catch { return null; }
  }
  function encodeNeighbor(value) {
    return encodeURIComponent(JSON.stringify(value));
  }

  return { configure, render, renderLoading, sanitizeEducationalText };
})();
