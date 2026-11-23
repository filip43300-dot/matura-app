# Jasny motyw — raport kontrastu

## Zakres poprawki

Naprawiono kolory tekstu i powierzchni dla jasnego motyw w aplikacji Matura Master.

## Główne zasady

- jasne motyw używa ciemnego tekstu głównego `#172033`,
- opisowy tekst używa `#526179`,
- kontrolki formularzy używają białego tła i ciemnego tekstu,
- przyciski utrzymują widoczny tekst i wyraźną granicę,
- komunikaty błędu używają ciemnej czerwieni na jasnym tle,
- komunikaty sukcesu używają ciemnej zieleni,
- KaTeX używa ciemnego tekstu na jasnym tle,
- panele laboratoriów i ich katalog zachowują jasne powierzchnie,
- reguły są ograniczone do `:root[data-theme="light"]` i nie zmieniają trybu ciemnego.

## Objęte obszary

- nagłówki i tekst nagłówków,
- tło i tekst dashboardu,
- formularze, pola tekstowe i pola wyszukiwania,
- listy rozwijane i opcje,
- przedmioty i tematy,
- przyciski trybów i poziomów,
- listy odpowiedzi quizowych,
- AI Tutor i historia rozmów,
- Generator materiałów,
- Egzaminy i wyniki,
- Biblioteka i fiszki,
- Profil i konfiguracja AI,
- Laboratoria i panel 3D,
- katalog laboratoriów,
- wizualizacje i układ okresowy,
- odpowiedzi skanera,
- KaTeX i fallbacki formuł,
- komunikaty błędu i sukcesu.

## Testy

Przetestowano w przeglądarce:

- jasny motyw Dashboard,
- jasny motyw AI Tutor,
- jasny motyw Egzaminy,
- jasny motyw Generator,
- jasny motyw Biblioteka,
- jasny motyw Laboratoria,
- jasny motyw Profil,
- pola formularzy i listy rozwijane,
- panel laboratoriów,
- katalog laboratoriów,
- renderowanie KaTeX,
- szerokość 390 px,
- powrót do trybu ciemnego.

Potwierdzono:

- tekst główny: `rgb(23,32,51)`,
- pola formularzy: białe tło i ciemny tekst,
- panel laboratoriów w jasnym motywie: białe tło i ciemny tekst,
- KaTeX: ciemny tekst,
- brak poziomego przepełnienia strony przy 390 px,
- tryb ciemny zachowuje ciemne powierzchnie i jasny tekst.
