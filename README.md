# Matura Master

Aplikacja webowa do nauki do matury z przedmiotów takich jak matematyka, fizyka, chemia, biologia, języki, geografia i historia.

## Struktura projektu

- `index.html` — główny szkielet aplikacji
- `style.css` — stylizacja interfejsu
- `script.js` — logika, dane, lekcje i wyszukiwanie

## Jak uruchomić lokalnie

1. Otwórz terminal w katalogu projektu.
2. Uruchom:

```bash
python -m http.server 8000
```

3. Otwórz w przeglądarce:

```text
http://localhost:8000
```

## Jak wgrać na GitHub i udostępnić w przeglądarce

1. Zainicjalizuj repozytorium:

```bash
git init
git add .
git commit -m "Initial commit"
```

2. Utwórz nowe repozytorium na GitHub.
3. Podłącz repozytorium:

```bash
git branch -M main
git remote add origin https://github.com/TWOJE_UZYTKOWNIK/TWOJE_REPO.git
git push -u origin main
```

4. W GitHub otwórz: Settings → Pages.
5. W sekcji Source wybierz:
   - Deploy from a branch
   - Branch: `main`
   - Folder: `/root`
6. Zapisz ustawienia.
7. Po chwili GitHub wygeneruje publiczny link, np.:

```text
https://TWOJE_UZYTKOWNIK.github.io/TWOJE_REPO/
```

## Dla telefonu

Po wdrożeniu na GitHub Pages aplikacja jest dostępna w przeglądarce telefonu pod podanym linkiem bez potrzeby uruchamiania serwera lokalnego.

## Ważne

To jest aplikacja typu static web app, więc nie wymaga builda ani instalacji zależności.
