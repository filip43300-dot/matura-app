window.VisionSolver = (() => {
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));

  function readImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== 'string') {
          reject(new Error('Nie udało się zakodować zdjęcia do Base64.'));
          return;
        }
        resolve(reader.result);
      };
      reader.onerror = () => reject(new Error('Nie udało się odczytać wybranego zdjęcia.'));
      reader.readAsDataURL(file);
    });
  }

  function open() {
    let modal = document.getElementById('visionModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'visionModal';
      modal.className = 'api-modal';
      document.body.appendChild(modal);
    }
    if (modal.dataset.previewUrl) URL.revokeObjectURL(modal.dataset.previewUrl);

    modal.innerHTML = `<section class="api-dialog vision-dialog" role="dialog" aria-modal="true" aria-labelledby="visionTitle">
      <button type="button" class="close-lesson" data-vision-close aria-label="Zamknij">×</button>
      <h3 id="visionTitle">📷 Rozwiąż zadanie ze zdjęcia</h3>
      <p>Dodaj zdjęcie równania, reakcji, schematu lub strony z podręcznika.</p>
      <input id="visionImage" type="file" accept="image/*,.pdf" capture="environment" required />
      <label for="visionPrompt">Dodatkowa instrukcja (opcjonalnie)</label>
      <textarea id="visionPrompt" rows="2" placeholder="Np. Rozwiąż krok po kroku"></textarea>
      <img id="visionPreview" class="vision-preview hidden" alt="Podgląd wybranego zdjęcia" />
      <button type="button" id="solveImageButton" class="soft-button">Analizuj zdjęcie</button>
      <div id="visionResult" class="vision-result" aria-live="polite"></div>
    </section>`;
    modal.classList.add('open');

    const fileInput = modal.querySelector('#visionImage');
    const preview = modal.querySelector('#visionPreview');
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        modal.querySelector('#visionResult').textContent = 'Wybierz obraz PNG/JPG lub dokument PDF.';
        fileInput.value = '';
        preview.classList.add('hidden');
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        modal.querySelector('#visionResult').textContent = 'Plik przekracza limit 15 MB.';
        fileInput.value = '';
        preview.classList.add('hidden');
        return;
      }
      if (file.type === 'application/pdf') {
        preview.classList.add('hidden');
        modal.querySelector('#visionResult').textContent = 'Wybrano dokument PDF. Treść zostanie odczytana przy analizie.';
        return;
      }
      if (modal.dataset.previewUrl) URL.revokeObjectURL(modal.dataset.previewUrl);
      modal.dataset.previewUrl = URL.createObjectURL(file);
      preview.src = modal.dataset.previewUrl;
      preview.classList.remove('hidden');
    });
    const close = () => {
      modal.classList.remove('open');
      if (modal.dataset.previewUrl) {
        URL.revokeObjectURL(modal.dataset.previewUrl);
        delete modal.dataset.previewUrl;
      }
    };
    modal.querySelector('[data-vision-close]').addEventListener('click', close);
    modal.onclick = event => {
      if (event.target === modal) close();
    };
    modal.querySelector('#solveImageButton').addEventListener('click', () => solve(modal));
  }

  async function readPdfText(file) {
    if (!window.pdfjsLib) throw new Error('Biblioteka PDF.js nie została załadowana.');
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    const arrayBuffer = await file.arrayBuffer();
    const documentPdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const textParts = [];
    for (let pageNumber = 1; pageNumber <= Math.min(documentPdf.numPages, 30); pageNumber += 1) {
      const page = await documentPdf.getPage(pageNumber);
      const content = await page.getTextContent();
      textParts.push(content.items.map(item => item.str).join(' '));
    }
    return textParts.join('\n\n');
  }

  async function solve(modal) {
    const fileInput = modal.querySelector('#visionImage');
    const file = fileInput.files?.[0];
    const result = modal.querySelector('#visionResult');
    const button = modal.querySelector('#solveImageButton');
    if (!file) {
      result.textContent = 'Najpierw wybierz zdjęcie do analizy.';
      return;
    }

    button.disabled = true;
    const userPrompt = modal.querySelector('#visionPrompt').value.trim();
    const instructions = `Jesteś polskim nauczycielem. ${userPrompt} Odpowiedz po polsku: najpierw krótko rozpoznaj treść, następnie wyjaśnij rozwiązanie krok po kroku i zakończ odpowiedzią. ${window.NotationService?.promptInstructions('Objaśnij symbole i jednostki.') || 'Zapisuj wzory jako KaTeX w delimitatorach \\(...\\) lub $$...$$.'} Jeśli fragment jest nieczytelny, zaznacz to i nie zgaduj.`;
    try {
      let answer;
      try {
        if (file.type === 'application/pdf') {
          result.textContent = '📄 Odczytywanie dokumentu PDF...';
          const pdfText = await readPdfText(file);
          if (!pdfText.trim()) throw new Error('PDF nie zawiera odczytywalnego tekstu. Użyj obrazu albo zeskanuj dokument OCR.');
          result.textContent = '🧠 Analizuję treść dokumentu...';
          const pdfPrompt = `${instructions}\n\nTreść dokumentu PDF:\n${pdfText.slice(0,12000)}\n\nRozpoznaj przedmiot i zagadnienie, wskaż wzory lub wykresy oraz rozwiązuj zadania krok po kroku.`;
          answer = await window.AIGateway.chat([{ role: 'user', content: pdfPrompt }], { temperature: 0.2, max_tokens: 3000 });
        } else {
          result.textContent = '🧠 Analizuję zdjęcie...';
          const imageDataUrl = await readImage(file);
          const prompt = `Przeanalizuj dokładnie załączone zdjęcie zadania, równania, reakcji, schematu anatomicznego lub tekstu. ${instructions}`;
          if (window.AIGateway?.getSettings().backendUrl) {
            answer = await window.AIGateway.chat([{ role:'user', content:`${prompt}\nZałączone zdjęcie jest dostępne jako Base64 w tej samej treści: ${imageDataUrl.slice(0,50000)}` }], { temperature: 0.2, max_tokens: 3000 });
          } else {
            answer = await window.GroqClient.completeVision(prompt, imageDataUrl, { temperature: 0.2, max_tokens: 3000 });
          }
        }
      } catch (error) {
        if (!shouldUseOcrFallback(error)) throw error;
        if (!window.Tesseract || typeof window.Tesseract.recognize !== 'function') {
          throw new Error('Model obrazu jest niedostępny, a moduł OCR Tesseract.js nie został załadowany.');
        }

        result.textContent = '🔍 Odczytywanie tekstu ze zdjęcia...';
        const recognition = await window.Tesseract.recognize(file, 'pol+eng');
        const recognizedText = recognition?.data?.text?.trim();
        if (!recognizedText) throw new Error('OCR nie rozpoznał tekstu na zdjęciu. Spróbuj użyć wyraźniejszego obrazu.');

        result.textContent = '🧠 Rozwiązywanie zadania...';
        const ocrPrompt = `${instructions}\n\nTreść odczytana ze zdjęcia (OCR; mogą występować błędy rozpoznawania):\n${recognizedText}\n\nRozwiąż zadanie na podstawie odczytanej treści. Jeśli OCR jest niejednoznaczny, wskaż niepewne fragmenty.`;
        answer = await window.GroqClient.complete(ocrPrompt, { temperature: 0.2, max_tokens: 3000 });
      }

      result.innerHTML = `<div class="vision-answer notation-host"></div>`;
      if (window.NotationService) window.NotationService.renderInto(result.querySelector('.vision-answer'), answer);
      else result.querySelector('.vision-answer').innerHTML = escapeHtml(answer).replace(/\n/g, '<br>');
      if (window.renderMathInElement) window.renderMathInElement(result, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.textContent = `Nie udało się rozwiązać zdjęcia: ${message}`;
    } finally {
      button.disabled = false;
    }
  }

  function shouldUseOcrFallback(error) {
    if (error?.code === 'VISION_MODEL_UNAVAILABLE' || error?.code === 'MODEL_DISCOVERY_FAILED') return true;
    if (error?.status !== 400 && error?.status !== 404) return false;
    return /model|vision|image|multimodal|access|not exist|not found|does not/i.test(error.message || '');
  }

  return { open };
})();
