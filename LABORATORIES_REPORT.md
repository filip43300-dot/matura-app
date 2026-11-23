# Raport laboratoriów Matura Master

## Stan implementacji

Laboratorium zostało rozbudowane o katalog, wyszukiwarkę, filtry poziomu i dziedziny, interfejs modelu 3D, kontrolki widoku, zakładki opis/test/AI oraz zapis postępów.

## Obecnie pokryte działanie

### Testowane interakcyjnie

- Wyszukiwanie i filtrowanie katalogu.
- Otwarcie modelu Three.js.
- Obracanie i przybliżanie sceny.
- Odtwarzanie, pauza i stop animacji.
- Zakładka opisu.
- Zakładka testu i zapis wyniku.
- Zakładka AI z poprawnym komunikatem braku konfiguracji.
- Zapisywanie wizyt i opanowania w `localStorage`.
- Responsywność widoku przy szerokości 390 px.
- Kontynuowanie ostatnio otwartego laboratorium.
- Integracja postępów laboratoriów z Dashboardem.

### Implementowane modelowo

- Komórka zwierzęca i organella.
- Komórka prokariotyczna i roślinna.
- DNA i podwójna helisa.
- Atom z jądrami i powłokami elektronowymi.
- Ogólne modele 3D struktur i procesów.
- Układ okresowy i przegląd pierwiastków.
- Fizyka ruchu, wahadła i fal.
- Funkcje matematyczne i bryły jako symulacje.
- Edukacyjne modele sieci troficznych i ewolucji.

## Raport pokrycia katalogu

Katalog obejmuje dziedziny:

- Biologia.
- Chemia.
- Fizyka.
- Matematyka.
- Nauki medyczne.
- Nauki przyrodnicze.

Poziomy filtrów:

- Szkoła podstawowa.
- Liceum — podstawowy.
- Liceum — rozszerzony.
- Matura.
- Studia licencjackie.
- Studia magisterskie.
- Poziom zaawansowany.

Katalog nie został oznaczony jako kompletny leksykograficzny dla pełnej medycyny klinicznej, anatomii mikroskopowej i wszystkich działów chemii organicznych.

## Elementy wymagające dalszej pracy

1. Pełny atlas 3D człowieka z wszystkimi układami narządów.
2. Rozszerzone modele cytologiczne wszystkich organelli.
3. Pełne animacje replikacji, transkrypcji i translacji.
4. Pełne modele mitozy i mejozy z przełączaniem faz.
5. Większa liczba bezpiecznych doświadczeń chemicznych.
6. Parametryczne modele reakcji, kinetyki i elektrochemii.
7. Fizyczne modele grawitacji, obwodów AC i światła.
8. Pełne wizualizacje całek i równań różniczkowych.
9. Rzeczywiste dane źródłowe i bibliografia naukowa.
10. Rzeczywiste multimodalne połączenie modelu 3D z AI.

## Wymagania zewnętrzne

AI laboratoryjne działa dopiero po skonfigurowaniu backendu Cloudflare Worker i klucza OpenAI albo Groq.

Do pełnego rozpoznawania obrazu w laboratorium potrzebne jest backendowe multimodalne API obsługujące obrazy.

Zaawansowana anatomia i modele medyczne mogą wymagać licencjonowanych danych 3D; obecny model nie korzysta z fikcyjnych ani niezweryfikowanych źródeł.
