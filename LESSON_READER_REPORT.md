# Report systemu lekcji

## Wprowadzone zmiany

- Dodano moduł `modules/lessonReader.js`.
- Zastąpiono modal lekcji prostym czytnikiem układem podręcznikowym.
- Dodano panel nagłówka, breadcrumb i poziom trudności.
- Dodano spis treści po lewej stronie na komputerze.
- Dodano automatyczne przewijanie do sekcji.
- Dodano wskaźnik postępu czytania.
- Dodano przyciski zapisania i ukończenia lekcji.
- Dodano zapis miejsca przewinięcia lekcji.
- Dodano poprzednią i następną lekcję tylko w obrębie bieżącego działu.
- Dodano bloki definicji, celów, omówienia, wzorów, tabel, zastosowań i błędów.
- Dodano profesjonalny blok rozwiązania zadania.
- Dodano podsumowanie i najważniejsze informacje.
- Dodano wersję jednokolumnową na telefonie.
- Dodano ochronę przed surowym HTML, JSON i znacznikami Markdown w lekcji.
- Dodano integrację wzorów KaTeX.
- Dodano integrację istniejących wizualizacji Mermaid, Chart.js i SVG.

## Zachowane funkcje

Nie usunięto:

- baz przedmiotów i tematów,
- wyszukiwarki,
- filtrów,
- trybu liceum i medycznego,
- generowania lekcji przez AI,
- mini-testów,
- skanera,
- strefy językowej,
- laboratoriów,
- generatora,
- egzaminów,
- profilu i historii.

Po otwarciu podtematu aktywowany jest nowy czytnik, ale mini-test i pozostałe akcje pozostają dostępne.

## Testy wykonane

Przetestowano:

- przykładową lekcję matematyczną,
- cele nauczania,
- spis treści,
- wzory KaTeX,
- tabelę,
- rozwiązane zadanie,
- zapis lekcji,
- oznaczenie lekcji jako ukończonej,
- wskaźnik przewijania,
- poprzednią i następną lekcję,
- lekcję rzeczywiście otwartą z puli podtematów,
- mobilną szerokość 390 px,
- jasny motyw,
- ciemny motyw,
- brak surowych wzorów w kartach.

## Ograniczenia

- Zewnętrzne generowanie AI nie było testowane z rzeczywistym kluczem.
- Rzeczywista jakościowa treść zależy od odpowiedzi modelu i backendu.
- Wykresy i schematy zależą od istniejących CDN i poprawnego JSON/Mermaid/SVG.
- PDF jest nadal obsługiwane przez przeglądarkę drukowania.
