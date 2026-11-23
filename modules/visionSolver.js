window.VisionSolver = (() => {
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
      <input id="visionImage" type="file" accept="image/*" capture="environment" required />
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
      if (!file.type.startsWith('image/')) {
        modal.querySelector('#visionResult').textContent = 'Wybierz prawidłowy plik obrazu.';
        fileInput.value = '';
        preview.classList.add('hidden');
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
    result.textContent = 'Analizuję zdjęcie…';
    try {
      const imageDataUrl = await readImage(file);
      const prompt = `Jesteś polskim nauczycielem. Przeanalizuj dokładnie załączone zdjęcie zadania, równania, reakcji, schematu anatomicznego lub tekstu. ${modal.querySelector('#visionPrompt').value.trim()} Odpowiedz po polsku: najpierw krótko rozpoznaj treść, następnie wyjaśnij rozwiązanie krok po kroku i zakończ odpowiedzią. Zapisuj wzory jako KaTeX w delimitatorach \\(...\\) lub $$...$$. Jeśli fragment jest nieczytelny, zaznacz to i nie zgaduj.`;
      const answer = await window.GroqClient.completeVision(prompt, imageDataUrl, { temperature: 0.2, max_tokens: 3000 });
      result.innerHTML = `<div class="vision-answer">${escapeHtml(answer).replace(/\n/g, '<br>')}</div>`;
      if (window.renderMathInElement) {
        window.renderMathInElement(result, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
      }
    } catch (error) {
      result.textContent = error instanceof Error ? error.message : String(error);
    } finally {
      button.disabled = false;
    }
  }

  return { open };
})();
