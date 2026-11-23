window.NotationService = (() => {
  const INLINE_DELIMITERS = [
    { open: '\\(', close: '\\)' },
    { open: '$', close: '$' }
  ];

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function normalizeLatex(value) {
    let text = String(value ?? '').replace(/\r\n?/g, '\n');
    text = text.replace(/\\\[([\s\S]*?)\\\]/g, '$$$1$$');
    text = text.replace(/\\\\([{}])/g, '\\$1');
    return text.trim();
  }

  function fallbackFormula(latex, display) {
    const wrapper = document.createElement(display ? 'div' : 'span');
    wrapper.className = display ? 'formula-fallback formula-block' : 'formula-fallback';
    wrapper.textContent = latex;
    wrapper.setAttribute('aria-label', `Zapis formuły: ${latex}`);
    return wrapper;
  }

  function renderFormula(container, latex, display = false) {
    const clean = normalizeLatex(latex);
    if (!clean) return;
    let depth = 0;
    for (const char of clean) {
      if (char === '{') depth += 1;
      if (char === '}') depth -= 1;
      if (depth < 0) {
        container.appendChild(fallbackFormula(clean, display));
        return;
      }
    }
    if (depth !== 0) {
      container.appendChild(fallbackFormula(clean, display));
      return;
    }
    if (!window.katex) {
      container.appendChild(fallbackFormula(clean, display));
      return;
    }
    try {
      const rendered = document.createElement(display ? 'div' : 'span');
      rendered.className = display ? 'notation-block' : 'notation-inline';
      window.katex.render(clean, rendered, {
        displayMode: display,
        throwOnError: true,
        strict: 'ignore',
        trust: false,
        output: 'htmlAndMathml',
        fleqn: false,
        macros: {
          '\\Re': '\\mathbb{R}',
          '\\C': '\\mathbb{C}',
          '\\dif': '\\mathrm{d}'
        }
      });
      container.appendChild(rendered);
    } catch (error) {
      container.appendChild(fallbackFormula(clean, display));
    }
  }

  function appendPlain(container, text) {
    if (!text) return;
    const fragment = document.createDocumentFragment();
    text.split(/\n/).forEach((line, index, lines) => {
      if (index > 0) fragment.appendChild(document.createElement('br'));
      appendInlineMarkdown(fragment, line);
    });
    container.appendChild(fragment);
  }

  function appendInlineMarkdown(container, text) {
    const parts = String(text ?? '').split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    parts.forEach(part => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        const strong = document.createElement('strong');
        strong.textContent = part.slice(2, -2);
        container.appendChild(strong);
      } else if (/^`[^`]+`$/.test(part)) {
        const code = document.createElement('code');
        code.textContent = part.slice(1, -1);
        container.appendChild(code);
      } else {
        appendInlineText(container, part);
      }
    });
  }

  function appendInlineText(container, text) {
    const pattern = /(\$\$[\s\S]*?\$\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$[^$\n]+\$)/g;
    let cursor = 0;
    let match;
    while ((match = pattern.exec(text))) {
      if (match.index > cursor) appendTextAndMarkers(container, text.slice(cursor, match.index));
      const token = match[0];
      if (token.startsWith('$$') && token.endsWith('$$')) {
        renderFormula(container, token.slice(2, -2), true);
      } else if (token.startsWith('\\[') && token.endsWith('\\]')) {
        renderFormula(container, token.slice(2, -2), true);
      } else if (token.startsWith('\\(') && token.endsWith('\\)')) {
        renderFormula(container, token.slice(2, -2), false);
      } else if (token.startsWith('$') && token.endsWith('$')) {
        renderFormula(container, token.slice(1, -1), false);
      }
      cursor = pattern.lastIndex;
    }
    if (cursor < text.length) appendTextAndMarkers(container, text.slice(cursor));
  }

  function appendTextAndMarkers(container, text) {
    String(text).split(/(\\begin\{(?:aligned|cases|pmatrix|bmatrix|matrix|array)\}[\s\S]*?\\end\{(?:aligned|cases|pmatrix|bmatrix|matrix|array)\})/g).forEach(part => {
      if (/^\\begin\{/.test(part)) {
        renderFormula(container, part, true);
      } else {
        appendEscapedText(container, part);
      }
    });
  }

  function appendEscapedText(container, text) {
    String(text).split(/(\n)/).forEach(part => {
      if (part === '\n') container.appendChild(document.createElement('br'));
      else if (part) container.appendChild(document.createTextNode(part));
    });
  }

  function renderInto(element, text) {
    if (!element) return;
    element.textContent = '';
    element.classList.add('notation-content');
    const clean = normalizeLatex(String(text ?? ''));
    appendPlain(element, clean);
  }

  function renderPreview(container) {
    if (!container) return;
    container.querySelectorAll('[data-notation-preview]').forEach(element => {
      renderInto(element, element.dataset.notationPreview);
    });
  }

  function promptInstructions(extra = '') {
    return `Zawsze prezentuj wzory i obliczenia w profesjonalnym LaTeX. Używaj \\(...\\) dla wzorów liniowych i $$...$$ dla blokowych. Nie zapisuj ułamków ukośnikiem; stosuj \\frac. Indeksy zapisuj jako _{}, potęgi jako ^{}. Wyrównuj rozwiązania w środowisku aligned lub cases, gdy to pomocne. W chemii stosuj indeksy H_2SO_4 i ładunki Ca^{2+}, a reakcje jako \\rightarrow. Jednostki zapisuj w \\mathrm{...}. Numeruj ważne wzory i wyróżniaj wynik końcowy. ${extra}`;
  }

  return { normalizeLatex, renderFormula, renderInto, renderPreview, promptInstructions, escapeHtml };
})();
