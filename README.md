# Matura Master 2.0

Matura Master to statyczna aplikacja edukacyjna hostowana na GitHub Pages. Projekt zachowuje dotychczasową bazę przedmiotów, wyszukiwarkę, lekcje, mini-testy, Language Lab i skaner zdjęć, a nowe moduły rozszerzają go o dashboard, AI Tutor, egzaminy, generator materiałów, bibliotekę, laboratoria i PWA.

## Uruchomienie lokalne

```powershell
cd C:\Users\filip\Documents\matura-app
python -m http.server 8000
```

Otwórz `http://127.0.0.1:8000/index.html`.

## Główne moduły

- **Nauka** — istniejąca baza przedmiotów, filtrowanie, wyszukiwarka i lekcje AI.
- **Dashboard** — aktywność, opanowane tematy, wyniki egzaminów i błędy do powtórki.
- **AI Tutor** — nauczyciel, rozwiązanie zadań, egzaminator, analityk, generator i mentor.
- **Egzaminy** — generowane pytania, licznik czasu, zapis odpowiedzi i analiza wyniku.
- **Generator** — notatki, fiszki, quizy, zadania, mapy myśli i zestawy powtórek.
- **Biblioteka** — zapisane materiały, eksport JSON i fiszki z spaced repetition.
- **Laboratoria** — komórka, układ okresowy, ruch prostoliniowy i funkcja kwadratowa.
- **Profil** — dane użytkownika, motyw, provider AI i adres backendu.
- **PWA** — instalacja, cache podstawowych zasobów i tryb offline.

Dane ucznia są lokalnie zapisywane przez `localStorage`. Eksport i import pełnego pliku danych są dostępne w profilu i bibliotece.

## Bezpieczny backend AI

Publiczny frontend nie zawiera kluczy OpenAI ani Groq. Backend znajduje się w `cloudflare-worker/`.

### Wymagania

- Konto Cloudflare
- Node.js i Wrangler
- Konto OpenAI albo Groq

### Konfiguracja

```powershell
npm install -g wrangler
cd cloudflare-worker
wrangler login
wrangler secret put OPENAI_API_KEY
```

Dla Groq zamiast OpenAI:

```powershell
wrangler secret put GROQ_API_KEY
```

Opcjonalnie zmień modele i limity w `wrangler.toml`, a następnie uruchom:

```powershell
wrangler deploy
```

Po wdrożeniu skopiuj adres URL Workera i wpisz go w aplikacji:

`Profil -> Motyw i AI -> URL backendu AI`

Nie wpisuj klucza API w tym polu ani w plikach frontendowych.

### Endpointy

- `POST /api/chat` — wiadomości do modelu
- `GET /api/models` — lista dostępnych modeli

Przykład z konsoli:

```javascript
fetch("https://TWOJ-WORKER.workers.dev/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    provider: "openai",
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Wyjaśnij funkcję kwadratową." }]
  })
})
```

## GitHub Pages

Aplikacja działa jako statyczny frontend. Po zmianach można wgrać pliki bezpośrednio do gałęzi `main` i katalogu głównego.

1. Nie publikuj kluczy API ani plików `.dev.vars`.
2. Włącz GitHub Pages dla gałęzi `main`, folder `/`.
3. Dodaj Worker jako osobny endpoint HTTPS.
4. Wprowadź adres Workera w profilu aplikacji.

## PWA i offline

Manifest i Service Worker są w katalogach głównych. Po pierwszym załadowaniu app-shell i podstawowe zasoby zostają cache’owane. Tryb offline obejmuje zapisaną bazę i moduły aplikacji, ale generowanie AI wymaga połączenia z backendem.

## Matematyczny i naukowy zapis

Zgodne odpowiedzi AI mogą używać:

- `$...$` i `\( ... \)` dla wzorów liniowych,
- `$$...$$` i `\[ ... \]` dla wzorów blokowych,
- środowisk `aligned`, `cases`, `pmatrix`, `matrix`, `bmatrix` i `array`.

KaTeX jest renderowany wspólnym rendererem w [services/notationService.js](services/notationService.js). Integracja obejmuje AI Tutor, historię rozmów, lekcje, egzaminy, generator, skaner i laboratoria.

## Bezpieczna aktualizacja

Przed rozpoczęciem kolejnych zmian korzystaj z kopii lub Git:

```powershell
git status
git add .
git commit -m "Zaktualizuj Matura Master"
```

## Ograniczenia wymagające konfiguracji zewnętrznej

- Klucz OpenAI lub Groq należy skonfigurować jako sekret Cloudflare Worker.
- Synchronizacja między urządzeniami nie jest dostępna bez osobnej bazy i backendowego API uwierzytelniania.
- Tryb AI jest zależny od usługi backendowej.
- PWA wymaga HTTPS na GitHub Pages.
