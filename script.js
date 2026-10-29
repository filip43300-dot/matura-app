const subjectData = {
  mathematics: {
    name: 'Matematyka',
    icon: '📐',
    description: 'Algebra, funkcje, geometria, statystyka, rachunek różniczkowy, analiza i prawdopodobieństwo.',
    topics: [
      { title: 'Algebra i wyrażenia algebraiczne', level: 'podstawowy', subtopics: ['Wzory skróconego mnożenia', 'Działania na potęgach i pierwiastkach', 'Równania i nierówności liniowe', 'Układy równań', 'Wartość bezwzględna i moduł'] },
      { title: 'Funkcje i ich własności', level: 'rozszerzony', subtopics: ['Funkcja liniowa i kwadratowa', 'Wykresy i własności', 'Przekształcenia wykresów', 'Funkcje wykładnicze i logarytmiczne', 'Maksimum i minimum'] },
      { title: 'Trygonometria', level: 'rozszerzony', subtopics: ['Sinus, cosinus, tangens', 'Tożsamości trygonometryczne', 'Równania trygonometryczne', 'Twierdzenie sinusów i cosinusów', 'Wartości fungsi w układzie współrzędnych'] },
      { title: 'Geometria analityczna', level: 'studia', subtopics: ['Odcinki, proste i odległości', 'Równanie okręgu', 'Wektory i iloczyn skalarny', 'Przekształcenia geometryczne', 'Punkty i figury w układzie współrzędnych'] },
      { title: 'Planimetria i stereometria', level: 'studia', subtopics: ['Trójkąty i czworokąty', 'Wielokąty foremne', 'Graniastosłupy, ostrosłupy i bryły obrotowe', 'Pola i objętości', 'Kąty i zależności w przestrzeni'] },
      { title: 'Rachunek różniczkowy', level: 'olimpiada', subtopics: ['Granice i ciągłość', 'Pochodne i ich interpretacja', 'Ekstrema funkcji', 'Monotoniczność i styczne', 'Reguła de l’Hospitala'] },
      { title: 'Ciągi i szeregi', level: 'rozszerzony', subtopics: ['Ciągi arytmetyczne i geometryczne', 'Monotoniczność i granice', 'Obliczanie sumy ciągu', 'Zastosowania i modele', 'Prawa rekurencji'] },
      { title: 'Statystyka i prawdopodobieństwo', level: 'studia', subtopics: ['Średnia, mediana i odchylenie', 'Wariancja i dystrybucja', 'Prawdopodobieństwo klasyczne', 'Drzewka i kombinatoryka', 'Rozkłady i estymacja'] },
      { title: 'Analiza matematyczna', level: 'olimpiada', subtopics: ['Całka nieoznaczona i oznaczona', 'Twierdzenie Newtona-Leibniza', 'Metody całkowania', 'Zastosowania w fizyce i ekonomii', 'Przekształcenia całkowe'] }
    ]
  },
  physics: {
    name: 'Fizyka',
    icon: '⚛️',
    description: 'Mechanika, elektryczność, termodynamika, optyka, fale i fizyka nowoczesna.',
    topics: [
      { title: 'Mechanika klasyczna', level: 'podstawowy', subtopics: ['Ruch jednostajny i zmienny', 'Siła, masa i przyspieszenie', 'Prawo Newtona', 'Praca, moc i energia', 'Grawitacja i ciśnienie'] },
      { title: 'Kinematyka i dynamika', level: 'rozszerzony', subtopics: ['Ruch po okręgu', 'Pęd i zasada zachowania pędu', 'Tarcie i siły oporu', 'Ruch harmoniczny', 'Moment siły'] },
      { title: 'Termodynamika', level: 'rozszerzony', subtopics: ['Temperatura i ciepło', 'Przemiany fazowe', 'Gaz doskonały', 'Pierwsza i druga zasada termodynamiki', 'Entropia i efektywność'] },
      { title: 'Elektryczność', level: 'studia', subtopics: ['Ładunek, natężenie i napięcie', 'Prawo Ohma', 'Obwody elektryczne', 'Praca i moc w obwodzie', 'Połączenia szeregowe i równoległe'] },
      { title: 'Magnetyzm i indukcja', level: 'studia', subtopics: ['Pole magnetyczne', 'Siła Lorentza', 'Indukcja elektromagnetyczna', 'Transformator i prądnica', 'Prawo Faradaya'] },
      { title: 'Optyka', level: 'rozszerzony', subtopics: ['Załamanie światła', 'Soczewki i zwierciadła', 'Dyfrakcja i interferencja', 'Widmo światła', 'Optyka falowa'] },
      { title: 'Fale i drgania', level: 'studia', subtopics: ['Dźwięk', 'Fala i jej parametry', 'Promieniowanie elektromagnetyczne', 'Zjawiska falowe', 'Interferencja i rezonans'] },
      { title: 'Fizyka nowoczesna', level: 'olimpiada', subtopics: ['Teoria względności', 'Dualizm korpuskularno-falowy', 'Atom wodoru', 'Jądro atomowe i promieniotwórczość', 'Foton i fotonika'] }
    ]
  },
  chemistry: {
    name: 'Chemia',
    icon: '🧪',
    description: 'Stechiometria, atom, wiązania, równowagi, chemia organiczna i elektrochemia.',
    topics: [
      { title: 'Budowa atomu i układ okresowy', level: 'podstawowy', subtopics: ['Konfiguracja elektronowa', 'Układ okresowy pierwiastków', 'Promieniotwórczość', 'Wartościowość i wiązania', 'Izotopy i masa atomowa'] },
      { title: 'Wiązania chemiczne', level: 'rozszerzony', subtopics: ['Wiązanie jonowe i kowalencyjne', 'Hybrydyzacja', 'Polarność cząsteczek', 'Oddziaływania międzycząsteczkowe', 'Geometria cząsteczki'] },
      { title: 'Stechiometria', level: 'podstawowy', subtopics: ['Masa molowa', 'Stężenia roztworów', 'Reakcje chemiczne i równania', 'Bilans mas', 'Obliczenia procentowe'] },
      { title: 'Chemia nieorganiczna', level: 'rozszerzony', subtopics: ['Kwasowozasadowe właściwości', 'Tlenki, wodorotlenki i sole', 'Metale i niemetale', 'Redoks i utlenianie', 'Związki kompleksowe'] },
      { title: 'Roztwory i dysocjacja', level: 'studia', subtopics: ['Roztwory wodne', 'pH i pOH', 'Hydroliza soli', 'Wydajność reakcji', 'Rozpuszczalność'] },
      { title: 'Równowaga i kinetyka', level: 'studia', subtopics: ['Szybkość reakcji', 'Prawo działania mas', 'Równowaga chemiczna', 'Wpływ temperatury i ciśnienia', 'Katalizatory i inhibicja'] },
      { title: 'Chemia organiczna', level: 'rozszerzony', subtopics: ['Węglowodory', 'Alkohole, fenole i aldehydy', 'Kwasy karboksylowe i estry', 'Aminy i amidy', 'Polimery i izomeria'] },
      { title: 'Elektrochemia', level: 'olimpiada', subtopics: ['Ogniwa galwaniczne', 'Potencjały standardowe', 'Elektroliza', 'Korozja metali', 'Akumulatory i baterie'] }
    ]
  },
  biology: {
    name: 'Biologia',
    icon: '🧬',
    description: 'Komórka, genetyka, człowiek, ewolucja, ekologia i mikrobiologia.',
    topics: [
      { title: 'Budowa komórki', level: 'podstawowy', subtopics: ['Białka, lipidy, cukry i kwasy nukleinowe', 'Organelle komórkowe', 'Błona komórkowa i transport', 'Podziały komórkowe', 'Różnice między komórką roślinną i zwierzęcą'] },
      { title: 'Biochemia i metabolizm', level: 'rozszerzony', subtopics: ['Enzymy i ich aktywność', 'Fotosynteza', 'Oddychanie komórkowe', 'Metabolizm energetyczny', 'Regulacja procesów życiowych'] },
      { title: 'Genetyka', level: 'rozszerzony', subtopics: ['Chromosomy i DNA', 'Podział mejotyczny', 'Dziedziczenie cech', 'Mutacje i choroby genetyczne', 'Technologie genetyczne'] },
      { title: 'Anatomia i fizjologia człowieka', level: 'studia', subtopics: ['Układ pokarmowy', 'Układ oddechowy', 'Układ krwionośny', 'Układ nerwowy i hormonalny', 'Układ wydalniczy'] },
      { title: 'Ewolucja', level: 'studia', subtopics: ['Dobór naturalny', 'Dryf genetyczny', 'Adaptacje', 'Dowody ewolucji', 'Specjacja i różnorodność'] },
      { title: 'Ekologia', level: 'rozszerzony', subtopics: ['Łańcuchy pokarmowe', 'Cykl azotu i węgla', 'Bioróżnorodność', 'Ochrona środowiska', 'Ekosystemy i siedliska'] },
      { title: 'Mikrobiologia i wirusy', level: 'studia', subtopics: ['Bakterie', 'Protisty', 'Wirusy i bakteriofagi', 'Immunologia', 'Antybiotyki i szczepienia'] },
      { title: 'Botanika i zoologia', level: 'olimpiada', subtopics: ['Tkanki roślinne', 'Rozmnażanie roślin', 'Typy zwierząt i ich przystosowania', 'Systematyka', 'Przystosowanie do środowiska'] }
    ]
  },
  polish: {
    name: 'Język polski',
    translation: 'Polish',
    icon: '📚',
    description: 'Literatura, gramatyka, styl, interpretacja tekstu i tworzenie wypowiedzi.',
    topics: [
      { title: 'Literatura i epoki', level: 'podstawowy', subtopics: ['Epoki literackie', 'Poetyka i gatunki', 'Motywy literackie', 'Romantyzm i realizm', 'Nowoczesność i współczesność'] },
      { title: 'Język i gramatyka', level: 'rozszerzony', subtopics: ['Fonetyka i ortografia', 'Morfologia i składnia', 'Wyrazy i frazy', 'Zdanie pojedyncze i złożone', 'Znaczenie i funkcje języka'] },
      { title: 'Styl i środki stylistyczne', level: 'studia', subtopics: ['Porównania i metafory', 'Epitet i personifikacja', 'Środki retoryczne', 'Nastrojowe i obrazowe słownictwo', 'Analiza stylu autorskiego'] },
      { title: 'Tekst argumentacyjny', level: 'rozszerzony', subtopics: ['Teza i argumenty', 'Hipoteza i kontrargumenty', 'Plan wypowiedzi', 'Redagowanie rozprawki', 'Krytyczne myślenie'] },
      { title: 'Kultura i historia literatury', level: 'studia', subtopics: ['Autorzy i ich dzieła', 'Recepcja i interpretacja', 'Kanon lektur', 'Młoda Polska i pozytywizm', 'Kreatywne czytanie tekstu'] },
      { title: 'Wypowiedź ustna i pisemna', level: 'olimpiada', subtopics: ['Mówienie i komunikacja', 'Rozprawka i esej', 'Analiza tekstu', 'Interpretacja utworu', 'Wybór i organizacja argumentów'] }
    ]
  },
  english: {
    name: 'Angielski',
    translation: 'English',
    icon: '🇬🇧',
    description: 'Gramatyka, słownictwo, lektury, mówienie, czytanie i pisanie w języku angielskim.',
    topics: [
      { title: 'Grammar and structures', level: 'podstawowy', subtopics: ['Present simple and continuous', 'Past tenses', 'Conditionals', 'Passive voice', 'Reported speech'] },
      { title: 'Vocabulary and phrases', level: 'rozszerzony', subtopics: ['Travel and daily life', 'Environment and technology', 'Health and lifestyle', 'Social issues', 'Academic vocabulary'] },
      { title: 'Reading comprehension', level: 'rozszerzony', subtopics: ['Identifying main ideas', 'Inference and meaning', 'Text structure', 'Opinion and argumentation', 'Matching tasks'] },
      { title: 'Writing skills', level: 'studia', subtopics: ['Email and formal letter', 'Essay and article', 'For and against', 'Description and opinion', 'Narrative writing'] },
      { title: 'Listening and speaking', level: 'studia', subtopics: ['Short conversations', 'Presentation skills', 'Discussion and debate', 'Listening for detail', 'Pronunciation and fluency'] },
{ title: 'Culture and literature', level: 'olimpiada', subtopics: ['British culture', 'American literature', 'Modern media', 'Social themes', 'Comparative analysis'] }
]
},
french: {
name: 'Francuski',
translation: 'Français',
icon: '🇫🇷',
description: 'Gramatyka, leksyka, komunikacja ustna i pisemna oraz kultura francuskojęzyczna.',
topics: [
{ title: 'Gramatyka i konstrukcje', level: 'podstawowy', subtopics: ['Czas teraźniejszy', 'Czas przeszły', 'Przyimki i rodzajniki', 'Tryb warunkowy', 'Zaimki i struktury'] },
{ title: 'Słownictwo i komunikacja', level: 'rozszerzony', subtopics: ['Życie codzienne', 'Środowisko i szkoła', 'Rodzina i przyjaźń', 'Praca i studia', 'Wypowiedzi i dialogi'] },
{ title: 'Czytanie i rozumienie', level: 'rozszerzony', subtopics: ['Teksty informacyjne', 'Teksty narracyjne', 'Analiza pytań', 'Wnioski i interpretacja', 'Słowa kluczowe'] },
{ title: 'Pisanie i odpowiedzi', level: 'studia', subtopics: ['List prywatny', 'Mail formalny', 'Opis sytuacji', 'Argumentacja', 'Pismo i styl'] },
{ title: 'Mówienie i słuchanie', level: 'studia', subtopics: ['Dialogi', 'Opowiadanie', 'Pytania i odpowiedzi', 'Prononciation', 'Debata i prezentacja'] },
{ title: 'Kultura francuska', level: 'olimpiada', subtopics: ['Francja i Europa', 'Kultura i tradycje', 'Lektury i media', 'Sztuka i literatura', 'Francuskojęzyczny świat'] }
]
},
german: {
name: 'Niemiecki',
translation: 'Deutsch',
icon: '🇩🇪',
description: 'Język niemiecki: gramatyka, słownictwo, komunikacja, lektury i kultura.',
topics: [
{ title: 'Grammatik und Satzbau', level: 'podstawowy', subtopics: ['Präsens und Perfekt', 'Präpositionen', 'Artikel und Fälle', 'Konnektoren', 'Modalverben'] },
{ title: 'Wortschatz und Alltag', level: 'rozszerzony', subtopics: ['Freizeit und Schule', 'Familie und Freunde', 'Reisen und Kultur', 'Arbeit und Ziele', 'Gesundheit und Alltag'] },
{ title: 'Lesen und Verstehen', level: 'rozszerzony', subtopics: ['Hauptidee und Details', 'Texte verstehen', 'Schlussfolgerungen', 'Wortbedeutung', 'Struktur des Textes'] },
{ title: 'Schreiben und Antworten', level: 'studia', subtopics: ['E-Mail und Brief', 'Textarten und Formulierungen', 'Meinung und Argument', 'Beschreibung', 'Aufsatz und Stil'] },
{ title: 'Sprechen und Hören', level: 'studia', subtopics: ['Dialoge', 'Vorträge', 'Gesprächsführung', 'Hörverstehen', 'Aussprache'] },
{ title: 'Kultur und Literatur', level: 'olimpiada', subtopics: ['Deutschland und Österreich', 'Literatur und Medien', 'Gesellschaft und Alltag', 'Tradition und moderne Kultur', 'Vergleichende Analyse'] }
]
},
geography: {
name: 'Geografia',
icon: '🌍',
description: 'Litosfera, klimat, ludność, gospodarka, regiony i zjawiska środowiskowe.',
topics: [
{ title: 'Ziemia i środowisko', level: 'podstawowy', subtopics: ['Budowa Ziemi', 'Mapa i skala', 'Pogoda i klimat', 'Atmosfera i hydrosfera', 'Strefy klimatyczne'] },
{ title: 'Ludność i osadnictwo', level: 'rozszerzony', subtopics: ['Rozmieszczenie ludności', 'Migracje', 'Urbanizacja', 'Miasta i regiony', 'Demografia'] },
{ title: 'Gospodarka i surowce', level: 'rozszerzony', subtopics: ['Rolnictwo i przemysł', 'Energia i surowce', 'Transport i logistyka', 'Turystyka', 'Globalizacja gospodarki'] },
{ title: 'Europa i Polska', level: 'studia', subtopics: ['Ukształtowanie Europy', 'Polska i regiony', 'Rzeki i góry', 'Geografia społeczno-gospodarcza', 'Przemiany przestrzenne'] },
{ title: 'Świat i kontynenty', level: 'studia', subtopics: ['Azja i Afryka', 'Ameryka i Australia', 'Pustynie i lasy', 'Wyspy i oceany', 'Kraje i kultury'] },
{ title: 'Zagrożenia i ochrona środowiska', level: 'olimpiada', subtopics: ['Klimat i zmiany', 'Zanieczyszczenia', 'Ochrona przyrody', 'Różnorodność biologiczna', 'Zrównoważony rozwój'] }
]
},
history: {
name: 'Historia',
icon: '🏛️',
description: 'Antyk, średniowiecze, nowożytność, XIX i XX wiek oraz współczesność.',
topics: [
{ title: 'Średniowiecze i antyk', level: 'podstawowy', subtopics: ['Starożytność', 'Państwo i społeczeństwo', 'Religia i kultura', 'Rzym i Grecja', 'Początki średniowiecza'] },
{ title: 'Nowożytność', level: 'rozszerzony', subtopics: ['Odkrycia geograficzne', 'Reformacja', 'Wielkie odkrycia', 'Wojny i państwo', 'Rewolucje i absolutyzm'] },
{ title: 'XIX wiek', level: 'rozszerzony', subtopics: ['Rewolucje przemysłowe', 'Nacjonalizm i imperializm', 'Wielkie mocarstwa', 'Polska i Europa', 'Prawa i ideologie'] },
{ title: 'XX wiek', level: 'studia', subtopics: ['I wojna światowa', 'Rewolucja i totalitaryzm', 'II wojna światowa', 'Powstania i ruchy oporu', 'Polska w XX wieku'] },
{ title: 'Współczesność', level: 'studia', subtopics: ['Powojenna Europa', 'Zimna wojna', 'Globalizacja', 'Demokracja i prawa człowieka', 'Współczesne konflikty'] },
{ title: 'Kultura i źródła historyczne', level: 'olimpiada', subtopics: ['Źródła i interpretacja', 'Archeologia i materiały', 'Nauka i historia', 'Analiza dokumentu', 'Pamięć i wydarzenia'] }
]
}
};
const subjectKnowledge = {
mathematics: ['algebra', 'arytmetyka', 'geometria', 'funkcja', 'wykres', 'równanie', 'nierówność', 'liczba', 'pierwiastek', 'logarytm', 'potęga', 'ciąg', 'szereg', 'pochodna', 'całka', 'wektor', 'układ równań', 'konstrukcja geometryczna', 'trójkąt', 'prostokąt', 'okrąg', 'kula', 'graniastosłup', 'statystyka', 'średnia', 'mediana', 'wariancja', 'prawdopodobieństwo', 'kombinatoryka', 'maksimum', 'minimum', 'gradient', 'wartość bezwzględna'],
physics: ['siła', 'energia', 'praca', 'moc', 'ruch', 'przyspieszenie', 'pęd', 'moment', 'grawitacja', 'ciśnienie', 'temperatura', 'ciepło', 'gaz', 'fala', 'dźwięk', 'światło', 'soczewka', 'promieniowanie', 'napięcie', 'prąd', 'opór', 'magnetyzm', 'indukcja', 'elektromagnetyzm', 'atom', 'jądro', 'radioaktywność', 'foton', 'teoria względności', 'dualizm korpuskularno-falowy', 'ruch harmoniczny'],
chemistry: ['atom', 'cząsteczka', 'molekuła', 'wiązanie', 'jon', 'kation', 'anion', 'reakcja', 'roztwór', 'stężenie', 'ph', 'kwas', 'zasada', 'tlenek', 'wodorotlenek', 'sol', 'elektroliza', 'utlenianie', 'redukcja', 'równowaga', 'kinetyka', 'katalizator', 'węglowodory', 'alkohol', 'aldehyd', 'ester', 'aminokwasy', 'białko', 'metale', 'niemetale', 'ozon', 'polimery', 'izomeria', 'korozyja'],
biology: ['komórka', 'błona', 'mitochondrium', 'chloroplast', 'gen', 'dna', 'rna', 'chromosom', 'mejoza', 'mitoza', 'ekosystem', 'bioróżnorodność', 'ewolucja', 'dobór naturalny', 'adaptacja', 'mutacja', 'enzym', 'metabolizm', 'fotosynteza', 'oddychanie', 'tkanka', 'narząd', 'układ krwionośny', 'układ nerwowy', 'hormon', 'immunologia', 'bakteria', 'wirus', 'protist', 'roślina', 'zwierzę', 'gatunek', 'populacja', 'łańcuch pokarmowy'],
polish: ['literatura', 'epoka', 'poemat', 'utwór', 'gramatyka', 'ortografia', 'tekst', 'argument', 'teza', 'styl', 'metafora', 'epitet', 'rozprawka', 'wywód', 'interpretacja', 'język polski'],
english: ['grammar', 'vocabulary', 'reading', 'writing', 'speaking', 'listening', 'essay', 'article', 'phrase', 'translation', 'culture', 'literature', 'opinion', 'email', 'conversation'],
french: ['français', 'grammaire', 'vocabulaire', 'lecture', 'écriture', 'expression', 'dialogue', 'culture', 'lettre', 'conversation', 'analyse', 'texte'],
german: ['deutsch', 'grammatik', 'wortschatz', 'lesen', 'schreiben', 'sprechen', 'hören', 'dialog', 'text', 'kultur', 'literatur', 'meinung'],
geography: ['geografia', 'klimat', 'mapa', 'ludność', 'miasto', 'gospodarka', 'region', 'rzeka', 'góra', 'środowisko', 'zanieczyszczenie', 'demografia'],
history: ['historia', 'cywilizacja', 'wojna', 'rewolucja', 'państwo', 'epoka', 'naród', 'źródło', 'średniowiecze', 'nowożytność', 'rewolucja przemysłowa', 'powstanie']
};
const statConfig = [
{ label: 'Przedmioty', value: Object.keys(subjectData).length },
{ label: 'Działy', value: Object.values(subjectData).reduce((sum, subject) => sum + subject.topics.length, 0) },
{ label: 'Podtematy', value: Object.values(subjectData).reduce((sum, subject) => sum + subject.topics.reduce((acc, topic) => acc + topic.subtopics.length, 0), 0) },
{ label: 'Poziomy', value: '4' }
];
const subjectFilter = document.getElementById('subjectFilter');
const levelFilter = document.getElementById('levelFilter');
const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');
const subjectsContainer = document.getElementById('subjectsContainer');
const statsGrid = document.getElementById('statsGrid');
const toggleAllButton = document.getElementById('toggleAll');
const quizCard = document.getElementById('quizCard');
const nextQuestionButton = document.getElementById('nextQuestion');
const detailPanel = document.getElementById('detailPanel');
const cameraButton = document.getElementById('cameraSearchButton');
const cameraInput = document.getElementById('cameraInput');
function normalizeText(value) {
return String(value || '')
.toLowerCase()
.normalize('NFD')
.replace(/[\u0300-\u036f]/g, '')
.replace(/[^a-z0-9\s]/g, ' ')
.replace(/\s+/g, ' ')
.trim();
}
function levenshteinDistance(a, b) {
const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;
for (let i = 1; i <= a.length; i += 1) {
for (let j = 1; j <= b.length; j += 1) {
const cost = a[i - 1] === b[j - 1] ? 0 : 1;
matrix[i][j] = Math.min(
matrix[i - 1][j] + 1,
matrix[i][j - 1] + 1,
matrix[i - 1][j - 1] + cost
);
}
}
return matrix[a.length][b.length];
}
function scoreTextSimilarity(text, query) {
const normalizedText = normalizeText(text);
const normalizedQuery = normalizeText(query);
if (!normalizedQuery) return 0;
if (normalizedText === normalizedQuery) return 0;
if (normalizedText.includes(normalizedQuery)) return 1;
const textWords = normalizedText.split(' ').filter(Boolean);
const queryWords = normalizedQuery.split(' ').filter(Boolean);
if (!textWords.length || !queryWords.length) return Number.POSITIVE_INFINITY;
const matchingWordCount = queryWords.filter((queryWord) =>
textWords.some((textWord) => {
if (textWord.includes(queryWord) || queryWord.includes(textWord)) return true;
const allowedDistance = Math.max(1, Math.ceil(queryWord.length * 0.25));
return levenshteinDistance(textWord, queryWord) <= allowedDistance;
})
).length;
if (matchingWordCount > 0) {
return Math.max(0.5, (queryWords.length - matchingWordCount) * 0.75 + 0.5);
}
const closestWordDistance = Math.min(...textWords.map((word) => levenshteinDistance(word, normalizedQuery)));
const allowedDistance = Math.max(2, Math.ceil(normalizedQuery.length * 0.35));
return closestWordDistance <= allowedDistance ? closestWordDistance + 2 : Number.POSITIVE_INFINITY;
}
function escapeHtml(value) {
return String(value || '')
.replace(/&/g, '&')
.replace(/</g, '<')
.replace(/>/g, '>')
.replace(/"/g, '"')
.replace(/'/g, ''');
}
function showCameraStatus(message, isError = false) {
const existing = document.querySelector('.camera-status');
if (existing) existing.remove();
const status = document.createElement('div');
status.className = 'camera-status';
status.textContent = message;
if (isError) status.style.borderColor = 'rgba(248, 113, 113, 0.4)';
status.style.background = isError ? 'rgba(248, 113, 113, 0.08)' : 'rgba(96, 165, 250, 0.1)';
const searchBox = document.querySelector('.search-box');
if (searchBox) searchBox.appendChild(status);
}
function getBestSearchMatch(rawText) {
const terms = normalizeText(rawText).split(/\s+/).filter(Boolean);
const joined = terms.join(' ');
if (!joined) return null;
const ranked = getAllSearchEntries()
.map((entry) => ({
entry,
score: Math.min(scoreTextSimilarity(entry.text, joined), scoreTextSimilarity(entry.description, joined))
}))
.filter(({ score }) => Number.isFinite(score))
.sort((a, b) => a.score - b.score);
return ranked[0]?.entry?.text || null;
}
function solveLinearEquationFromText(cleanedText) {
const compact = cleanedText
.replace(/×/g, '*')
.replace(/\s+/g, '')
.replace(/,/g, '.')
.toLowerCase();
const equationPattern = /(-?\d*)x([+-]\d+)=(-?\d+)/;
const match = compact.match(equationPattern);
if (!match) return null;
const coeffText = match[1];
const signText = match[2];
const rhsText = match[3];
const coefficient = coeffText === '' || coeffText === '+' ? 1 : coeffText === '-' ? -1 : Number(coeffText);
const constant = Number(signText);
const rhs = Number(rhsText);
if (!Number.isFinite(coefficient) || !Number.isFinite(constant) || !Number.isFinite(rhs) || coefficient === 0) {
return null;
}
const xValue = (rhs - constant) / coefficient;
if (!Number.isFinite(xValue)) return null;
const formattedX = Number.isInteger(xValue) ? String(xValue) : xValue.toFixed(2).replace(/0+$/, '').replace(/.$/, '');
return {
answer: x = ${formattedX},
explanation: Po przeniesieniu ${Math.abs(constant)} na drugą stronę i podzieleniu przez ${Math.abs(coefficient)} otrzymujemy x = ${formattedX}.
};
}
function extractPhotoAnswer(rawText) {
const cleaned = normalizeText(rawText);
const linearSolution = solveLinearEquationFromText(cleaned);
if (linearSolution) return linearSolution;
const checks = [
{ pattern: /2x\s*+\s6\s=\s14|3x\s-\s9\s=\s12|x\s+\s5\s=\s11|4x\s+\s8\s=\s20/, answer: 'x = 4', explanation: 'Po przeniesieniu wyrazu wolnego na drugą stronę i podzieleniu przez współczynnik przy x otrzymujemy poprawny wynik.' },
{ pattern: /f\s=\sm\s*\sa|si?a\s*\sprzyspieszenie/, answer: 'F = m · a', explanation: 'Siła jest równa masie pomnożonej przez przyspieszenie.' },
{ pattern: /ph\s<\s7|kwaśny|pH\sponiżej\s7/, answer: 'pH < 7', explanation: 'Roztwór kwaśny ma pH niższe od 7.' },
{ pattern: /photosynteza|fotosynteza|chloroplast/, answer: 'chloroplasty', explanation: 'Fotosynteza zachodzi w chloroplastach roślin.' },
{ pattern: /v\s=\ss\s/\st|predkosc|prędkość|s\s=\sv\s*\st/, answer: 'v = s / t', explanation: 'Prędkość to droga podzielona przez czas.' },
{ pattern: /n\s=\sm\s/\sm|masa molowa|liczba moli/, answer: 'n = m / M', explanation: 'Liczba moli to masa podzielona przez masę molową.' },
{ pattern: /pole\strójkąta|trójkąta\spole|p\s=\s*\d*/?\d*\sa\s*\sh/, answer: 'P = 1/2 a · h', explanation: 'Pole trójkąta to połowa iloczynu podstawy i wysokości.' },
{ pattern: /praca|w\s=\sf\s*\ss|work\s=\sf/, answer: 'W = F · s', explanation: 'Praca jest iloczynem siły i przebytej drogi w kierunku działania siły.' },
{ pattern: /stężenie|c\s=\sn\s/\s*v/, answer: 'c = n / V', explanation: 'Stężenie molowe to liczba moli substancji podzielona przez objętość roztworu.' }
];
const match = checks.find(({ pattern }) => pattern.test(cleaned));
if (match) return match;
return null;
}
async function handlePhotoRecognition(file) {
if (!file || !window.Tesseract) {
showCameraStatus('OCR nie jest dostępne w tej przeglądarce. Dołącz skrypt Tesseract w index.html.', true);
return;
}
showCameraStatus('Rozpoznaję tekst z zdjęcia…');
try {
const result = await Tesseract.recognize(file, 'pol+eng', { logger: () => {} });
const recognizedText = result?.data?.text?.trim();
if (!recognizedText) {
showCameraStatus('Nie rozpoznałem tekstu na zdjęciu. Spróbuj zrobić ostrzejsze zdjęcie zadania.', true);
return;
}
const directAnswer = extractPhotoAnswer(recognizedText);
const bestMatch = getBestSearchMatch(recognizedText) || recognizedText;
searchInput.value = bestMatch;
renderSuggestions();
renderSubjects();
suggestionsBox.classList.add('hidden');
if (directAnswer) {
detailPanel.innerHTML = <div class="detail-header"> <button class="close-lesson" type="button" data-close-lesson aria-label="Zamknij lekcję">✕</button> <h3>Rozpoznane zadanie ze zdjęcia</h3> <div class="detail-badges"> <span class="detail-badge">OCR</span> <span class="detail-badge">Aparat</span> </div> </div> <div class="detail-body"> <div class="detail-box span-2 definition-hero-box"> <div class="definition-topline">Rozpoznany tekst</div> <div class="definition-hero"> <div class="definition-label">Zdjęcie</div> <p class="definition-main">${escapeHtml(recognizedText)}</p> </div> </div> <div class="detail-box span-2"> <h4>Najkrótsza odpowiedź</h4> <p><strong>${escapeHtml(directAnswer.answer)}</strong></p> <p>${escapeHtml(directAnswer.explanation)}</p> </div> </div>;
detailPanel.classList.remove('hidden');
} else {
showWikipediaFallback(bestMatch);
}
showCameraStatus(Rozpoznano tekst: ${recognizedText.slice(0, 80)}${recognizedText.length > 80 ? '…' : ''});
} catch (error) {
showCameraStatus('Nie udało się odczytać tekstu z obrazu. Spróbuj jeszcze raz.', true);
}
}
const allQuizQuestions = [
{ subject: 'Matematyka', question: 'Jakie jest rozwiązanie równania 2x + 6 = 14?', options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'], answer: 'x = 4', explanation: 'Po odjęciu 6 od obu stron i podzieleniu przez 2 otrzymujemy x = 4.' },
{ subject: 'Fizyka', question: 'Wzór na pracę w fizyce to:', options: ['W = F / s', 'W = F · s', 'W = m · a', 'W = v / t'], answer: 'W = F · s', explanation: 'Praca jest iloczynem siły i przebytej drogi w kierunku działania siły.' },
{ subject: 'Chemia', question: 'PH roztworu kwaśnego jest:', options: ['Większe od 7', 'Równe 7', 'Mniejsze od 7', 'Zawsze 0'], answer: 'Mniejsze od 7', explanation: 'Kwaśne roztwory mają pH poniżej 7, a zasadowe powyżej 7.' },
{ subject: 'Biologia', question: 'Czy fotosynteza zachodzi w mitochondriach?', options: ['Tak, zawsze', 'Nie, zachodzi w chloroplastach', 'To zależy od gatunku', 'Tak, w komórkach zwierzęcych'], answer: 'Nie, zachodzi w chloroplastach', explanation: 'Fotosynteza zachodzi w chloroplastach roślin i protistów fotosyntetyzujących.' },
{ subject: 'Matematyka', question: 'Wzór na pole trójkąta to:', options: ['a · b', 'a²', '½ a · h', 'πr²'], answer: '½ a · h', explanation: 'Pole trójkąta jest równe połowie iloczynu podstawy i wysokości.' }
];
let currentQuestionIndex = 0;
let expandedCards = new Set(Object.keys(subjectData));
let selectedSubtopic = null;
let latestSuggestions = [];
let activeDetailRequestId = 0;
function getSubtopicNames(topic) {
return topic.subtopics.map((subtopic) => typeof subtopic === 'string' ? subtopic : subtopic.name);
}
function buildSearchDescription(subjectName, topicTitle, subtopicName, fallbackText) {
const label = subtopicName || topicTitle || subjectName || fallbackText;
const baseContext = topicTitle ? ${subjectName} • ${topicTitle} : subjectName;
return ${baseContext} • ${label} — definicje, analiza i zadania egzaminacyjne.;
}
function getAllSearchEntries() {
return Object.entries(subjectData).flatMap(([subjectKey, subject]) => [
{ key: subjectKey, text: subject.name, description: ${subject.name} • ${subject.description} },
...subjectKnowledge[subjectKey].map((term) => ({
key: subjectKey,
text: term,
description: ${subject.name} • hasło kluczowe bazy wiedzy maturalnej.
})),
...subject.topics.flatMap((topic) => [{
key: subjectKey,
text: topic.title,
description: buildSearchDescription(subject.name, topic.title, '', topic.title)
}, ...getSubtopicNames(topic).map((subtopic) => ({
key: subjectKey,
text: subtopic,
description: buildSearchDescription(subject.name, topic.title, subtopic, subtopic)
}))])
]);
}
async function fetchWikipediaSuggestions(query) {
const normalized = normalizeText(query).trim();
if (!normalized || normalized.length < 2) return [];
try {
const url = https://wikipedia.org{encodeURIComponent(normalized)}&limit=6&namespace=0&format=json&origin=*;
const response = await fetch(url, { headers: { Accept: 'application/json' } });
if (!response.ok) return [];
const data = await response.json();
return Array.isArray(data[1]) ? data[1].filter(Boolean) : [];
} catch (error) {
return [];
}
}
async function fetchWikipediaArticleSummary(query) {
const normalized = normalizeText(query).trim();
if (!normalized || normalized.length < 2) return null;
try {
const searchUrl = https://wikipedia.org{encodeURIComponent(normalized)}&format=json&origin=*;
const searchResponse = await fetch(searchUrl, { headers: { Accept: 'application/json' } });
if (!searchResponse.ok) return null;
const searchData = await searchResponse.json();
const firstResult = searchData?.query?.search?.[0];
if (!firstResult) return null;
const articleUrl = https://wikipedia.org{firstResult.pageid}&format=json&origin=*;
const articleResponse = await fetch(articleUrl, { headers: { Accept: 'application/json' } });
if (!articleResponse.ok) return null;
const articleData = await articleResponse.json();
const page = Object.values(articleData?.query?.pages || {})[0];
return {
title: firstResult.title,
snippet: page?.extract ? page.extract.slice(0, 260) : firstResult.snippet
};
} catch (error) {
return null;
}
}
async function renderSuggestions() {
const query = normalizeText(searchInput.value);
if (!query) {
suggestionsBox.classList.add('hidden');
suggestionsBox.innerHTML = '';
return;
}
const localSuggestions = [...new Map(getAllSearchEntries().map((entry) => [normalizeText(entry.text), entry])).values()]
.map((entry) => ({
text: entry.text,
description: entry.description,
score: Math.min(scoreTextSimilarity(entry.text, query), scoreTextSimilarity(entry.description, query))
}))
.filter(({ score }) => Number.isFinite(score))
.sort((a, b) => a.score - b.score || normalizeText(a.text).length - normalizeText(b.text).length)
.slice(0, 5);
const wikipediaSuggestions = await fetchWikipediaSuggestions(query);
const mergedSuggestions = [...new Map([
...localSuggestions.map((entry) => [entry.text, entry]),
...wikipediaSuggestions.map((text) => [text, { text, description: Encyklopedia • Definicja zewnętrzna tematu: ${text}., score: scoreTextSimilarity(text, query) }])
].filter(([text]) => text && text.trim())).values()]
.filter(({ score }) => Number.isFinite(score))
.sort((a, b) => a.score - b.score)
.slice(0, 8);
latestSuggestions = mergedSuggestions;
if (!mergedSuggestions.length) {
suggestionsBox.classList.add('hidden');
suggestionsBox.innerHTML = '';
return;
}
suggestionsBox.innerHTML = mergedSuggestions
.map((entry) => <button type="button" class="search-suggestion-item" data-search-value="${escapeHtml(entry.text)}"> <span class="search-suggestion-title">${escapeHtml(entry.text)}</span> <span class="search-suggestion-meta">${escapeHtml(entry.description)}</span> </button>)
.join('');
suggestionsBox.classList.remove('hidden');
}
function renderStats() {
statsGrid.innerHTML = statConfig.map((item) => <div class="stat-card"> <span class="label">${item.label}</span> <span class="value">${item.value}</span> </div>).join('');
}
function getVisibleTopics(subject, selectedLevel) {
return subject.topics.filter((topic) => selectedLevel === 'all' || topic.level === selectedLevel);
}
function getSubjectDisplayName(subject) {
return subject.translation ? ${subject.translation} / ${subject.name} : subject.name;
}
function buildTopicCard(subjectKey, subject, selectedLevel) {
const visibleTopics = getVisibleTopics(subject, selectedLevel);
const topicMarkup = visibleTopics.length
? visibleTopics.map((topic) => {
const subtopicButtons = getSubtopicNames(topic).map((subtopicName) => {
const isActive = selectedSubtopic && selectedSubtopic.subjectKey === subjectKey && selectedSubtopic.topicTitle === topic.title && selectedSubtopic.subtopicName === subtopicName;
return <button type="button" class="subtopic-button ${isActive ? 'active' : ''}" data-subject-key="${subjectKey}" data-topic-title="${topic.title}" data-subtopic-name="${subtopicName}"> ${subtopicName} </button>;
}).join('');
return <article class="subject-topic"> <div class="topic-row"> <h3>${topic.title}</h3> <span class="topic-badge ${topic.level}">${topic.level}</span> </div> <ul> ${getSubtopicNames(topic).slice(0, 2).map((subtopic) =>${subtopic}).join('')} </ul> <div class="subtopic-list">${subtopicButtons}</div> </article> ;
}).join('')
: 'Brak tematów dla wybranego poziomu.';
return <article class="subject-card" data-subject="${subjectKey}"> <button class="subject-header" data-subject-toggle="${subjectKey}"> <div class="subject-name"> <span class="subject-icon">${subject.icon}</span> <span>${getSubjectDisplayName(subject)}</span> </div> <div class="subject-meta"> <span>${visibleTopics.length} działy</span> <span>${visibleTopics.reduce((sum, topic) => sum + getSubtopicNames(topic).length, 0)} podtematy</span> </div> </button> <div class="subject-body ${expandedCards.has(subjectKey) ? '' : 'hidden'}"> ${topicMarkup} </div> </article>;
}
function buildLessonContent(subjectName, topicTitle, subtopicName) {
const title = subtopicName;
const subjectKey = Object.keys(subjectData).find((key) => subjectData[key].name === subjectName) || 'mathematics';
const defaultFormulaLibrary = {
mathematics: [{ formula: 'Δ = b² - 4ac', variables: 'Miejsca zerowe funkcji kwadratowej.' }],
physics: [{ formula: 'F = m · a', variables: 'II zasada dynamiki Newtona.' }],
chemistry: [{ formula: 'pH = -log[H+]', variables: 'Obliczanie kwasowości roztworu.' }]
};
const formulaLibrary = defaultFormulaLibrary[subjectKey] || [{ formula: 'Analiza teoretyczna i opisowa', variables: 'Brak strukturalnego wzoru matematycznego.' }];
const definitionsGrid = [
{ title: 'Definicja Rdzeniowa (Wymagania CKE)', text: Zagadnienie "${title}" w kontekście działu "${topicTitle}" to absolutna podstawa na egzaminie maturalnym. Definiuje ono nadrzędne reguły logiczne i pojęcia bazowe, bez których poprawne rozwiązanie arkusza jest niemożliwe. },
{ title: 'Kontekst Operacyjny (Jak to rozumieć)', text: W praktycznym ujęciu, ${title.toLowerCase()} określa schemat postępowania z zadaniami otwartymi i zamkniętymi. Przekłada teorię podręcznikową na realny algorytm działania krok po kroku. },
{ title: 'Reguła Praktyczna (Pułapki i błędy)', text: 'Najczęstszym błędem maturzystów w tym temacie jest pomijanie warunków brzegowych i założeń wstępnych. Pamiętaj o dokładnym sprawdzeniu spójności jednostek oraz poprawności logicznej zapisu wniosków.' }
];
return {
name: title,
title,
summary: ${title} to fundamentalny element bloku edukacyjnego dla działu ${topicTitle}.,
detailedLesson: ${definitionsGrid[0].text} ${definitionsGrid[1].text},
keyIdeas: [Definicja podstawowa ${title}, 'Zastosowanie praktyczne w arkuszach'],
formulas: formulaLibrary,
studySteps: ['Przeanalizuj trzy główne definicje', 'Zapamiętaj dopasowane wzory', 'Rozwiąż zadanie próbne'],
example: { statement: Przykładowe zadanie CKE z działu ${topicTitle} odnoszące się do ${title.toLowerCase()}., solution: 'Zastosowanie reguły podstawowej oraz redukcja wyrazów podobnych.', answer: 'Wynik optymalny', explanation: 'Rozwiązanie krok po kroku z zachowaniem kryteriów oceniania CKE.' },
selfTask: { question: 'Zadanie testowe: Sformułuj wniosek lub wykonaj obliczenie dla warunków standardowych.', answer: 'Odpowiedź poprawna', justification: 'Uzasadnienie logiczne oparte o powyższe trzy definicje.' },
definitionBlocks: definitionsGrid
};
}
function buildDiagramSvg(subjectKey, caption) {
return `




${caption || 'Wizualizacja zależności strukturalnych zagadnienia.'}

`;
}
function buildDetailPanelMarkup({ subject, subjectKey, topicTitle, topicLevel, subtopicName, info, wikipediaSummary }) {
const example = info.example;
const selfTask = info.selfTask;
const labelValue = info.name || subtopicName;
const definitionBlocksMarkup = info.definitionBlocks.map((block) => <div class="detail-box"> <div class="definition-topline">${escapeHtml(block.title)}</div> <p style="margin-top: 10px; line-height: 1.6; color: var(--muted);">${escapeHtml(block.text)}</p> </div>).join('');
return `

✕
${escapeHtml(labelValue)}

${escapeHtml(getSubjectDisplayName(subject))}
${escapeHtml(topicTitle)}
${escapeHtml(topicLevel)}


Kompleksowe kompendium wiedzy
Analizujesz podtemat ${escapeHtml(labelValue)} w ramach przedmiotu ${escapeHtml(subject.name)}.
${definitionBlocksMarkup}
Wzory i struktury powiązane

${info.formulas.map((f) => <div class="formula-item"> <div class="formula-line">${escapeHtml(f.formula)}</div> <div class="formula-variables">${escapeHtml(f.variables)}</div> </div>).join('')}

Graficzne przedstawienie tematu

${buildDiagramSvg(subjectKey, subtopicName)}

Modelowe zadanie egzaminacyjne
Zadanie: ${escapeHtml(example.statement)}
Rozwiązanie: ${escapeHtml(example.solution)}
Odpowiedź: ${escapeHtml(example.answer)}
Wyjaśnienie: ${escapeHtml(example.explanation)}
Sprawdź swoją wiedzę (Trening)
${escapeHtml(selfTask.question)}


Sprawdź


${wikipediaSummary ? <div class="detail-box span-2" style="background: rgba(15, 23, 42, 0.6); border-color: var(--line);"> <h4>Poszerzenie wiedzy — Wikipedia</h4> <p><strong>${escapeHtml(wikipediaSummary.title)}</strong>: ${escapeHtml(wikipediaSummary.snippet)}</p> </div> : ''}

`;
}
async function renderDetailPanel() {
if (!selectedSubtopic) {
detailPanel.classList.add('hidden');
detailPanel.innerHTML = '';
return;
}
const currentSelection = JSON.stringify(selectedSubtopic);
const requestId = ++activeDetailRequestId;
const { subjectKey, topicTitle, subtopicName } = selectedSubtopic;
const subject = subjectData[subjectKey];
const topic = subject.topics.find((item) => item.title === topicTitle);
const info = buildLessonContent(subject.name, topicTitle, subtopicName);
detailPanel.innerHTML = buildDetailPanelMarkup({
subject, subjectKey, topicTitle, topicLevel: topic.level, subtopicName, info, wikipediaSummary: null
});
detailPanel.classList.remove('hidden');
const wikipediaSummary = await fetchWikipediaArticleSummary(subtopicName || topicTitle);
if (requestId !== activeDetailRequestId || JSON.stringify(selectedSubtopic) !== currentSelection) return;
detailPanel.innerHTML = buildDetailPanelMarkup({
subject, subjectKey, topicTitle, topicLevel: topic.level, subtopicName, info, wikipediaSummary
});
}
async function showWikipediaFallback(query) {
const normalized = normalizeText(query);
if (!normalized) return;
const summary = await fetchWikipediaArticleSummary(normalized);
if (!summary) return;
detailPanel.innerHTML = <div class="detail-header"> <button class="close-lesson" type="button" data-close-lesson>✕</button> <h3>${escapeHtml(summary.title)}</h3> <div class="detail-badges"><span class="detail-badge">Wikipedia</span></div> </div> <div class="detail-body"> <div class="detail-box span-2"> <p>${escapeHtml(summary.snippet)}</p> </div> </div>;
detailPanel.classList.remove('hidden');
}
function renderSubjects() {
const rawQuery = searchInput.value.trim();
const searchTerm = normalizeText(rawQuery);
const selectedSubject = subjectFilter.value;
const selectedLevel = levelFilter.value;
const filteredSubjects = Object.entries(subjectData).filter(([subjectKey, subject]) => {
const matchesSubject = selectedSubject === 'all' || subjectKey === selectedSubject;
const matchesLevel = selectedLevel === 'all' || subject.topics.some((topic) => topic.level === selectedLevel);
const searchableEntries = [
subject.name, subject.description,
...subject.topics.flatMap((topic) => [topic.title, topic.level, ...getSubtopicNames(topic)])
];
const queryMatches = !searchTerm || searchableEntries.some((entry) => scoreTextSimilarity(entry, searchTerm) <= 3);
return matchesSubject && matchesLevel && queryMatches;
});
if (filteredSubjects.length === 0) {
if (selectedSubtopic) {
renderDetailPanel();
return;
}
subjectsContainer.innerHTML = 'Brak wyników spełniających kryteria wyszukiwania.';
return;
}
subjectsContainer.innerHTML = filteredSubjects.map(([subjectKey, subject]) => buildTopicCard(subjectKey, subject, selectedLevel)).join('');
}
function selectSubtopic(subjectKey, topicTitle, subtopicName) {
selectedSubtopic = { subjectKey, topicTitle, subtopicName };
suggestionsBox.classList.add('hidden');
renderSubjects();
renderDetailPanel();
}
function toggleSubject(subjectKey) {
if (expandedCards.has(subjectKey)) expandedCards.delete(subjectKey);
else expandedCards.add(subjectKey);
renderSubjects();
}
function renderQuestion() {
const question = allQuizQuestions[currentQuestionIndex];
quizCard.innerHTML = <span class="quiz-tag">${escapeHtml(question.subject)}</span> <h3>${escapeHtml(question.question)}</h3> <ul class="answer-list"> ${question.options.map((option) =>${escapeHtml(option)}).join('')} </ul> ;
document.querySelectorAll('.answer-list button').forEach((button) => {
button.addEventListener('click', () => {
const selectedAnswer = button.dataset.answer;
const isCorrect = selectedAnswer === question.answer;
document.querySelectorAll('.answer-list button').forEach((btn) => {
btn.disabled = true;
if (btn.dataset.answer === question.answer) btn.classList.add('correct');
if (btn.dataset.answer === selectedAnswer && !isCorrect) btn.classList.add('incorrect');
});
const explanation = document.createElement('div');
explanation.className = 'quiz-explanation';
explanation.textContent = ${isCorrect ? 'Poprawna odpowiedź! ' : 'Błąd. '}${question.explanation};
quizCard.appendChild(explanation);
});
});
}
function nextQuestion() {
currentQuestionIndex = (currentQuestionIndex + 1) % allQuizQuestions.length;
renderQuestion();
}
subjectFilter.addEventListener('change', renderSubjects);
levelFilter.addEventListener('change', renderSubjects);
searchInput.addEventListener('input', () => { renderSuggestions(); renderSubjects(); });
searchInput.addEventListener('focus', renderSuggestions);
cameraButton.addEventListener('click', () => cameraInput.click());
cameraInput.addEventListener('change', async (event) => {
const file = event.target.files?.[0];
if (!file) return;
await handlePhotoRecognition(file);
event.target.value = '';
});
searchInput.addEventListener('keydown', async (event) => {
if (event.key === 'Enter') {
event.preventDefault();
await renderSuggestions();
const firstSuggestion = suggestionsBox.querySelector('.search-suggestion-item')?.dataset.searchValue || latestSuggestions[0]?.text;
const suggestionValue = firstSuggestion || searchInput.value.trim();
if (suggestionValue) {
searchInput.value = suggestionValue;
showWikipediaFallback(suggestionValue);
}
suggestionsBox.classList.add('hidden');
searchInput.blur();
}
});
nextQuestionButton.addEventListener('click', nextQuestion);
toggleAllButton.addEventListener('click', () => {
const isAllExpanded = expandedCards.size === Object.keys(subjectData).length;
if (isAllExpanded) expandedCards.clear();
else Object.keys(subjectData).forEach((key) => expandedCards.add(key));
renderSubjects();
});
document.addEventListener('click', (event) => {
if (event.target.closest('[data-close-lesson]')) {
selectedSubtopic = null;
detailPanel.classList.add('hidden');
detailPanel.innerHTML = '';
return;
}
const suggestionButton = event.target.closest('.search-suggestion-item');
if (suggestionButton) {
const value = suggestionButton.dataset.searchValue;
searchInput.value = value;
renderSuggestions();
renderSubjects();
showWikipediaFallback(value);
suggestionsBox.classList.add('hidden');
return;
}
const toggleButton = event.target.closest('[data-subject-toggle]');
if (toggleButton) {
toggleSubject(toggleButton.dataset.subjectToggle);
return;
}
const subtopicButton = event.target.closest('.subtopic-button');
if (subtopicButton) {
selectSubtopic(subtopicButton.dataset.subjectKey, subtopicButton.dataset.topicTitle, subtopicButton.dataset.subtopicName);
return;
}
if (!event.target.closest('.search-box')) suggestionsBox.classList.add('hidden');
});
document.addEventListener('submit', (event) => {
const form = event.target.closest('.lesson-answer-form');
if (!form) return;
event.preventDefault();
const answerInput = form.querySelector('[data-lesson-answer-input]');
const resultBox = detailPanel.querySelector('[data-lesson-answer-result]');
if (!answerInput || !resultBox) return;
const guess = normalizeText(answerInput.value);
const answer = normalizeText(form.dataset.correctAnswer || '');
const isCorrect = guess && (guess === answer || guess.includes(answer));
resultBox.classList.remove('hidden', 'success', 'error');
resultBox.classList.add(isCorrect ? 'success' : 'error');
resultBox.innerHTML = isCorrect
? <strong>Poprawnie!</strong><br>${form.dataset.correctExplanation}
: Błąd. Właściwy wynik to: <strong>${form.dataset.correctAnswer}</strong>.;
});
renderStats();
renderSubjects();
renderQuestion();
