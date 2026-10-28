const subjectData = {
  mathematics: {
    name: 'Matematyka',
    icon: '📐',
    description: 'Algebra, funkcje, geometria, statystyka, rachunek różniczkowy, analiza i prawdopodobieństwo.',
    topics: [
      { title: 'Algebra i wyrażenia algebraiczne', level: 'podstawowy', subtopics: ['Wzory skróconego mnożenia', 'Działania na potęgach i pierwiastkach', 'Równania i nierówności liniowe', 'Układy równań', 'Wartość bezwzględna i moduł'] },
      { title: 'Funkcje i ich własności', level: 'rozszerzony', subtopics: ['Funkcja liniowa i kwadratowa', 'Wykresy i własności', 'Przekształcenia wykresów', 'Funkcje wykładnicze i logarytmiczne', 'Maksimum i minimum'] },
      { title: 'Trygonometria', level: 'rozszerzony', subtopics: ['Sinus, cosinus, tangens', 'Tożsamości trygonometryczne', 'Równania trygonometryczne', 'Twierdzenie sinusów i cosinusów', 'Wartości funkcji w układzie współrzędnych'] },
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
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);

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

  const formattedX = Number.isInteger(xValue) ? String(xValue) : xValue.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');

  return {
    answer: `x = ${formattedX}`,
    explanation: `Po przeniesieniu ${Math.abs(constant)} na drugą stronę i podzieleniu przez ${Math.abs(coefficient)} otrzymujemy x = ${formattedX}.` 
  };
}

function extractPhotoAnswer(rawText) {
  const cleaned = normalizeText(rawText);
  const linearSolution = solveLinearEquationFromText(cleaned);
  if (linearSolution) return linearSolution;

  const checks = [
    { pattern: /2x\s*\+\s*6\s*=\s*14|3x\s*-\s*9\s*=\s*12|x\s*\+\s*5\s*=\s*11|4x\s*\+\s*8\s*=\s*20/, answer: 'x = 4', explanation: 'Po przeniesieniu wyrazu wolnego na drugą stronę i podzieleniu przez współczynnik przy x otrzymujemy poprawny wynik.' },
    { pattern: /f\s*=\s*m\s*\*\s*a|si?a\s*\*\s*przyspieszenie/, answer: 'F = m · a', explanation: 'Siła jest równa masie pomnożonej przez przyspieszenie.' },
    { pattern: /ph\s*<\s*7|kwaśny|pH\s*poniżej\s*7/, answer: 'pH < 7', explanation: 'Roztwór kwaśny ma pH niższe od 7.' },
    { pattern: /photosynteza|fotosynteza|chloroplast/, answer: 'chloroplasty', explanation: 'Fotosynteza zachodzi w chloroplastach roślin.' },
    { pattern: /v\s*=\s*s\s*\/\s*t|predkosc|prędkość|s\s*\=\s*v\s*\*\s*t/, answer: 'v = s / t', explanation: 'Prędkość to droga podzielona przez czas.' },
    { pattern: /n\s*=\s*m\s*\/\s*m|masa molowa|liczba moli/, answer: 'n = m / M', explanation: 'Liczba moli to masa podzielona przez masę molową.' },
    { pattern: /pole\s*trójkąta|trójkąta\s*pole|p\s*=\s*\d*\/?\d*\s*a\s*\*\s*h/, answer: 'P = 1/2 a · h', explanation: 'Pole trójkąta to połowa iloczynu podstawy i wysokości.' },
    { pattern: /praca|w\s*=\s*f\s*\*\s*s|work\s*=\s*f/, answer: 'W = F · s', explanation: 'Praca jest iloczynem siły i przebytej drogi w kierunku działania siły.' },
    { pattern: /stężenie|c\s*=\s*n\s*\/\s*v/, answer: 'c = n / V', explanation: 'Stężenie molowe to liczba moli substancji podzielona przez objętość roztworu.' }
  ];

  const match = checks.find(({ pattern }) => pattern.test(cleaned));
  if (match) return match;

  return null;
}

async function handlePhotoRecognition(file) {
  if (!file || !window.Tesseract) {
    showCameraStatus('OCR nie jest dostępne w tej przeglądarce. Wpisz problem ręcznie lub użyj pytania z bazy.', true);
    return;
  }

  showCameraStatus('Rozpoznaję tekst z zdjęcia…');

  try {
    const result = await Tesseract.recognize(file, 'pol+eng', {
      logger: () => {}
    });

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
    showWikipediaFallback(bestMatch);
    suggestionsBox.classList.add('hidden');

    if (directAnswer) {
      detailPanel.innerHTML = `
        <div class="detail-header">
          <button class="close-lesson" type="button" data-close-lesson aria-label="Zamknij lekcję">✕</button>
          <h3>Rozpoznane zadanie z zdjęcia</h3>
          <div class="detail-badges">
            <span class="detail-badge">OCR</span>
            <span class="detail-badge">Aparat</span>
          </div>
        </div>
        <div class="detail-body">
          <div class="detail-box span-2 definition-hero-box">
            <div class="definition-topline">Rozpoznany tekst</div>
            <div class="definition-hero">
              <div class="definition-label">Zdjęcie</div>
              <p class="definition-main">${escapeHtml(recognizedText)}</p>
            </div>
          </div>
          <div class="detail-box span-2">
            <h4>Najkrótsza odpowiedź</h4>
            <p><strong>${escapeHtml(directAnswer.answer)}</strong></p>
            <p>${escapeHtml(directAnswer.explanation)}</p>
          </div>
        </div>
      `;
      detailPanel.classList.remove('hidden');
      detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    showCameraStatus(`Rozpoznano tekst: ${recognizedText.slice(0, 80)}${recognizedText.length > 80 ? '…' : ''}`);
  } catch (error) {
    showCameraStatus('Nie udało się odczytać tekstu z obrazu. Spróbuj jeszcze raz lub wpisz treść ręcznie.', true);
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
  const baseContext = topicTitle ? `${subjectName} • ${topicTitle}` : subjectName;
  return `${baseContext} • ${label} — definicje, wzory, przykłady i typowe zadania maturalne z tego obszaru.`;
}

function getAllSearchEntries() {
  return Object.entries(subjectData).flatMap(([subjectKey, subject]) => [
    { key: subjectKey, text: subject.name, description: `${subject.name} • ${subject.description}` },
    ...subjectKnowledge[subjectKey].map((term) => ({
      key: subjectKey,
      text: term,
      description: `${subject.name} • hasło kluczowe • definicja, wzory i zastosowanie w zadaniach.`
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
    const url = `https://pl.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(normalized)}&limit=6&namespace=0&format=json&origin=*`;
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data?.[1]) ? data[1].filter(Boolean) : [];
  } catch (error) {
    return [];
  }
}

async function fetchWikipediaArticleSummary(query) {
  const normalized = normalizeText(query).trim();
  if (!normalized || normalized.length < 2) return null;

  try {
    const searchUrl = `https://pl.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(normalized)}&format=json&origin=*`;
    const searchResponse = await fetch(searchUrl, { headers: { Accept: 'application/json' } });
    if (!searchResponse.ok) return null;
    const searchData = await searchResponse.json();
    const firstResult = searchData?.query?.search?.[0];
    if (!firstResult) return null;

    const articleUrl = `https://pl.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&redirects=1&pageids=${firstResult.pageid}&format=json&origin=*`;
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

  const localSuggestions = [...new Set(getAllSearchEntries().map((entry) => JSON.stringify({ text: entry.text, description: entry.description })))].map((entry) => JSON.parse(entry))
    .map((entry) => ({
      text: entry.text,
      description: entry.description,
      score: Math.min(scoreTextSimilarity(entry.text, query), scoreTextSimilarity(entry.description, query))
    }))
    .filter(({ score }) => Number.isFinite(score))
    .sort((a, b) => a.score - b.score || normalizeText(a.text).length - normalizeText(b.text).length)
    .slice(0, 8);

  const wikipediaSuggestions = await fetchWikipediaSuggestions(query);
  const mergedSuggestions = [...new Map([
    ...localSuggestions.map((entry) => [entry.text, entry]),
    ...wikipediaSuggestions.map((text) => [text, { text, description: `Wikipedia • ${text} — krótkie wyjaśnienie i definicja z źródła internetowego.`, score: scoreTextSimilarity(text, query) }])
  ].filter(([text]) => text && text.trim())).values()]
    .filter(({ score }) => Number.isFinite(score))
    .sort((a, b) => a.score - b.score || normalizeText(a.text).length - normalizeText(b.text).length)
    .slice(0, 10);

  latestSuggestions = mergedSuggestions;

  if (!mergedSuggestions.length) {
    suggestionsBox.classList.add('hidden');
    suggestionsBox.innerHTML = '';
    return;
  }

  suggestionsBox.innerHTML = mergedSuggestions
    .map((entry) => `
      <button type="button" class="search-suggestion-item" data-search-value="${escapeHtml(entry.text)}">
        <span class="search-suggestion-title">${escapeHtml(entry.text)}</span>
        <span class="search-suggestion-meta">${escapeHtml(entry.description)}</span>
      </button>
    `)
    .join('');

  suggestionsBox.classList.remove('hidden');
}

function renderStats() {
  statsGrid.innerHTML = statConfig.map((item) => `
    <div class="stat-card">
      <span class="label">${item.label}</span>
      <span class="value">${item.value}</span>
    </div>
  `).join('');
}

function getVisibleTopics(subject, selectedLevel) {
  return subject.topics.filter((topic) => selectedLevel === 'all' || topic.level === selectedLevel);
}

function getSubjectDisplayName(subject) {
  return subject.translation ? `${subject.translation} / ${subject.name}` : subject.name;
}

function buildTopicCard(subjectKey, subject, selectedLevel) {
  const visibleTopics = getVisibleTopics(subject, selectedLevel);

  const topicMarkup = visibleTopics.length
    ? visibleTopics.map((topic) => {
        const subtopicButtons = getSubtopicNames(topic).map((subtopicName) => {
          const isActive = selectedSubtopic && selectedSubtopic.subjectKey === subjectKey && selectedSubtopic.topicTitle === topic.title && selectedSubtopic.subtopicName === subtopicName;
          return `
            <button type="button" class="subtopic-button ${isActive ? 'active' : ''}" data-subject-key="${subjectKey}" data-topic-title="${topic.title}" data-subtopic-name="${subtopicName}">
              ${subtopicName}
            </button>
          `;
        }).join('');

        return `
          <article class="subject-topic">
            <div class="topic-row">
              <h3>${topic.title}</h3>
              <span class="topic-badge ${topic.level}">${topic.level}</span>
            </div>
            <ul>
              ${getSubtopicNames(topic).slice(0, 2).map((subtopic) => `<li>${subtopic}</li>`).join('')}
            </ul>
            <div class="subtopic-list">${subtopicButtons}</div>
          </article>
        `;
      }).join('')
    : '<div class="subject-topic"><p>Brak tematów dla wybranego poziomu.</p></div>';

  return `
    <article class="subject-card" data-subject="${subjectKey}">
      <button class="subject-header" data-subject-toggle="${subjectKey}">
        <div class="subject-name">
          <span class="subject-icon">${subject.icon}</span>
          <span>${getSubjectDisplayName(subject)}</span>
        </div>
        <div class="subject-meta">
          <span>${visibleTopics.length} działy</span>
          <span>${visibleTopics.reduce((sum, topic) => sum + getSubtopicNames(topic).length, 0)} podtematy</span>
        </div>
      </button>
      <div class="subject-body ${expandedCards.has(subjectKey) ? '' : 'hidden'}">
        ${topicMarkup}
      </div>
    </article>
  `;
}

function getBilingualLanguageLabel(subjectKey, value) {
  const gloss = {
    english: {
      'Present simple and continuous': 'Present simple and continuous / Czas present simple i present continuous',
      'Past tenses': 'Past tenses / Czasy przeszłe',
      'Travel and daily life': 'Travel and daily life / Podróże i codzienne życie',
      'Environment and technology': 'Environment and technology / Środowisko i technologia',
      'Reading comprehension': 'Reading comprehension / Rozumienie tekstu czytanego',
      'Writing skills': 'Writing skills / Umiejętności pisania',
      'Listening and speaking': 'Listening and speaking / Słuchanie i mówienie',
      'Culture and literature': 'Culture and literature / Kultura i literatura',
      'Grammar and structures': 'Grammar and structures / Gramatyka i struktury',
      'Vocabulary and phrases': 'Vocabulary and phrases / Słownictwo i zwroty'
    },
    french: {
      'Życie codzienne': 'Vie quotidienne / Życie codzienne',
      'Czas teraźniejszy': 'Le présent / Czas teraźniejszy',
      'Czytanie i rozumienie': 'Lecture et compréhension / Czytanie i rozumienie',
      'Pisanie i odpowiedzi': 'Écriture et réponses / Pisanie i odpowiedzi',
      'Mówienie i słuchanie': 'Expression orale et écoute / Mówienie i słuchanie',
      'Kultura francuska': 'Culture française / Kultura francuska',
      'Gramatyka i konstrukcje': 'Grammaire et constructions / Gramatyka i konstrukcje',
      'Słownictwo i komunikacja': 'Vocabulaire et communication / Słownictwo i komunikacja',
      'Środowisko i szkoła': 'Environnement et école / Środowisko i szkoła',
      'Rodzina i przyjaźń': 'Famille et amitié / Rodzina i przyjaźń',
      'Praca i studia': 'Travail et études / Praca i studia',
      'Wypowiedzi i dialogi': 'Expressions et dialogues / Wypowiedzi i dialogi'
    },
    german: {
      'Präsens und Perfekt': 'Präsens und Perfekt / Czas teraźniejszy i czas przeszły',
      'Lesen und Verstehen': 'Lesen und Verstehen / Czytanie i rozumienie',
      'Schreiben und Antworten': 'Schreiben und Antworten / Pisanie i odpowiadanie',
      'Sprechen und Hören': 'Sprechen und Hören / Mówienie i słuchanie',
      'Wortschatz und Alltag': 'Wortschatz und Alltag / Słownictwo i codzienne życie',
      'Kultur und Literatur': 'Kultur und Literatur / Kultura i literatura',
      'Grammatik und Satzbau': 'Grammatik und Satzbau / Gramatyka i budowa zdań',
      'Freizeit und Schule': 'Freizeit und Schule / Wolny czas i szkoła',
      'Familie und Freunde': 'Familie und Freunde / Rodzina i przyjaciele',
      'Reisen und Kultur': 'Reisen und Kultur / Podróże i kultura',
      'Arbeit und Ziele': 'Arbeit und Ziele / Praca i cele',
      'Gesundheit und Alltag': 'Gesundheit und Alltag / Zdrowie i codzienność'
    },
    polish: {
      'Język i gramatyka': 'Language and grammar / Język i gramatyka',
      'Tekst argumentacyjny': 'Argumentative text / Tekst argumentacyjny',
      'Wypowiedź ustna i pisemna': 'Spoken and written expression / Wypowiedź ustna i pisemna'
    }
  };

  if (!gloss[subjectKey]) {
    return value;
  }

  return gloss[subjectKey][value] || value;
}

function getKeyConceptDisplay(subjectKey, value) {
  const translatedValue = getBilingualLanguageLabel(subjectKey, value);
  return translatedValue !== value ? translatedValue : value;
}

function buildLessonContent(subjectName, topicTitle, subtopicName) {
  const title = subtopicName;
  const subjectKey = Object.keys(subjectData).find((key) => subjectData[key].name === subjectName) || 'mathematics';

  const formulaLibrary = {
    mathematics: [
      { formula: 'v = s / t', variables: 'v — prędkość [m/s], s — droga [m], t — czas [s]' },
      { formula: 'a = (v - v₀) / t', variables: 'a — przyspieszenie [m/s²], v — prędkość końcowa, v₀ — prędkość początkowa, t — czas [s]' },
      { formula: 'Δ = b² - 4ac', variables: 'Δ — wyróżnik trójmianu, a, b, c — współczynniki równania ax² + bx + c = 0' },
      { formula: 'sin²α + cos²α = 1', variables: 'α — kąt; sin α i cos α — wartości funkcji trygonometrycznych w tym kącie' },
      { formula: 'W = F · s · cosα', variables: 'W — praca [J], F — siła [N], s — droga [m], α — kąt między siłą a kierunkiem ruchu' }
    ],
    physics: [
      { formula: 's = v · t', variables: 's — droga [m], v — prędkość [m/s], t — czas [s]' },
      { formula: 'F = m · a', variables: 'F — siła [N], m — masa [kg], a — przyspieszenie [m/s²]' },
      { formula: 'W = F · s · cosα', variables: 'W — praca [J], F — siła [N], s — droga [m], α — kąt między siłą i przesunięciem' },
      { formula: 'I = U / R', variables: 'I — natężenie prądu [A], U — napięcie [V], R — opór [Ω]' },
      { formula: 'p = F / S', variables: 'p — ciśnienie [Pa], F — siła [N], S — pole powierzchni [m²]' }
    ],
    chemistry: [
      { formula: 'n = m / M', variables: 'n — liczba moli [mol], m — masa [g], M — masa molowa [g/mol]' },
      { formula: 'c = n / V', variables: 'c — stężenie molowe [mol/dm³], n — liczba moli [mol], V — objętość [dm³]' },
      { formula: 'pH = -log[H+]', variables: 'pH — odczyn roztworu, [H+] — stężenie jonów wodorowych [mol/dm³]' },
      { formula: 'm = n · M', variables: 'm — masa [g], n — liczba moli [mol], M — masa molowa [g/mol]' },
      { formula: 'C% = (m_subst / m_roztworu) · 100%', variables: 'C% — stężenie procentowe, m_subst — masa substancji, m_roztworu — masa całego roztworu' }
    ],
    biology: [
      { formula: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', variables: 'CO₂ — dwutlenek węgla, H₂O — woda, C₆H₁₂O₆ — glukoza, O₂ — tlen' },
      { formula: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP', variables: 'glukoza i tlen to substraty, CO₂, H₂O i ATP — produkty oddychania komórkowego' },
      { formula: 'ATP → ADP + Pi + energia', variables: 'ATP — wysokoenergetyczny związek, ADP — adenozynodifosforan, Pi — reszta fosforanowa' },
      { formula: 'Enzmy obniżają energię aktywacji', variables: 'energia aktywacji — minimalna energia potrzebna do rozpoczęcia reakcji; enzym przyspiesza przebieg bez zużycia' }
    ],
    polish: [
      { formula: 'TEZA → ARGUMENTY → WNIOSEK', variables: 'teza — główna myśl, argumenty — dowody, wniosek — podsumowanie stanowiska' },
      { formula: 'CZYTANIE → ANALIZA → INTERPRETACJA', variables: 'czytanie — rozpoznanie treści, analiza — śledzenie środków artystycznych, interpretacja — sens utworu' },
      { formula: 'STYL → ŚRODKI → CEL', variables: 'styl — sposób wypowiedzi, środki — figury retoryczne i słownictwo, cel — efekt artystyczny' }
    ],
    english: [
      { formula: 'TOPIC + MAIN IDEA + SUPPORT', variables: 'topic — temat, main idea — główna myśl, support — przykłady i argumenty' },
      { formula: 'GRAMMAR + VOCABULARY + CONTEXT', variables: 'grammar — struktury językowe, vocabulary — słownictwo, context — sytuacja komunikacyjna' },
      { formula: 'READING → UNDERSTANDING → RESPONSE', variables: 'reading — analizowanie tekstu, understanding — rozpoznanie sensu, response — odpowiedź w języku' }
    ],
    french: [
      { formula: 'TEXTE → IDÉE → ARGUMENT', variables: 'texte — treść, idée — główna myśl, argument — uzasadnienie' },
      { formula: 'GRAMMAIRE + VOCABULAIRE + CONTEXTE', variables: 'grammaire — struktury, vocabulaire — słownictwo, contexte — sytuacja' },
      { formula: 'RÉPONSE → EXPLICATION → EXEMPLE', variables: 'réponse — odpowiedź, explication — wyjaśnienie, exemple — przykład' }
    ],
    german: [
      { formula: 'THEMA + HAUPTIDEE + BEISPIEL', variables: 'thema — temat, hauptidee — główna myśl, beispiel — przykład' },
      { formula: 'GRAMMATIK + WORTSCHATZ + KONTEXT', variables: 'grammatik — gramatyka, wortschatz — słownictwo, kontext — kontekst użycia' },
      { formula: 'LESEN → VERSTEHEN → ANTWORT', variables: 'lesen — czytanie, verstehen — rozumienie, antwort — odpowiedź' }
    ],
    geography: [
      { formula: 'MAPA + SKALA + OŚRODEK', variables: 'mapa — obraz powierzchni, skala — proporcja, ośrodek — miejsce i powiązania przestrzenne' },
      { formula: 'KLIMAT = WYSOKOŚĆ + SZEROKOŚĆ + MORZE', variables: 'klimat zależy od wysokości, szerokości geograficznej i oddziaływania morza' },
      { formula: 'POPULACJA = ROZWÓJ + MIGRACJE + PRACA', variables: 'ludność zależy od rozwoju, migracji i rynku pracy' }
    ],
    history: [
      { formula: 'ZAJŚCIE → PRZYCZYNA → SKUTEK', variables: 'zdarzenie — konkretne wydarzenie, przyczyna — powód, skutek — następstwo' },
      { formula: 'ŹRÓDŁO + INTERPRETACJA + KONTEXT', variables: 'źródło — materiał historyczny, interpretacja — analiza, kontekst — czas i okolica' },
      { formula: 'PAŃSTWO = WŁADZA + SPOŁECZEŃSTWO + TERRITORIUM', variables: 'władza, społeczeństwo i terytorium tworzą strukturę państwa' }
    ]
  };

  const definitionTemplates = {
    mathematics: [
      `${title} to fundamentalne pojęcie w ${topicTitle.toLowerCase()}, które opisuje zależność między danymi, niewiadomymi i właściwym modelem rozwiązania.`,
      `W praktyce ${title.toLowerCase()} pozwala rozpoznać, który wzór należy zastosować, jakie są założenia zadania i jak należy sprawdzić poprawność wyniku.`,
      `W rozwiązaniu matematycznym nie wystarczy sam zapis liczb: ważne jest uzasadnienie, kontrola sensu wyniku i poprawność interpretacji odpowiedzi.`
    ],
    physics: [
      `${title} jest wielkością fizyczną opisującą zależność między obserwowanym zjawiskiem a warunkami zadania oraz właściwym modelem opisu ruchu lub pola.`,
      `W fizyce istotne jest rozróżnienie między danymi, niewiadomymi, wzorem a interpretacją wyniku w świetle prawa fizycznego i jednostek.`,
      `Dobrze rozwiązane zadanie wymaga nie tylko poprawnego podstawienia, ale też świadomego wyboru zależności i weryfikacji sensu fizycznego odpowiedzi.`
    ],
    chemistry: [
      `${title} to kluczowy element ${topicTitle.toLowerCase()}, który łączy budowę substancji, właściwości reagentów i przebieg reakcji chemicznej w spójny model obliczeniowy.`,
      `W chemii trzeba rozpoznać typ reakcji, zależności między ilościami reagentów i produktami oraz poprawnie zastosować wzór do konkretnych warunków zadania.`,
      `Prawidłowe obliczenia obejmują nie tylko masę lub stężenie, ale także jednostki, zgodność równania oraz interpretację wyniku w kontekście procesu chemicznego.`
    ],
    biology: [
      `${title} jest istotnym pojęciem biologicznym, które pomaga wyjaśnić budowę, funkcję i regulację procesów życiowych w organizmie oraz w ekosystemie.`,
      `W biologii ważne jest łączenie obserwacji z mechanizmem molekularnym, funkcją komórki oraz zależnością między strukturą a pełnioną rolą w organizmie.`,
      `Prawidłowa odpowiedź powinna odwoływać się do relacji między organizmem, środowiskiem i procesem biologicznym, a nie tylko do samego hasła.`
    ],
    polish: [
      `${title} jest kluczowym pojęciem w ${topicTitle.toLowerCase()}, bo pozwala uchwycić sens tekstu, sposób jego budowy i funkcję języka w wypowiedzi.`,
      `W języku polskim ważne są nie tylko słowa, ale też ich układ, znaczenie kontekstowe, styl i intencja autora.`,
      `Dobrze opracowane zadanie powinno odwoływać się do treści tekstu, argumentacji i właściwej interpretacji znaczeń.`
    ],
    english: [
      `${title} is a key idea in ${topicTitle.toLowerCase()}, helping you connect grammar, vocabulary and meaning in a real context.`,
      `In English, it is important to recognise the purpose of the text, the target structure and the way words create meaning.`,
      `A good answer should explain the idea, use appropriate language and clearly support it with examples or reasoning.`
    ],
    french: [
      `${title} est un élément central de ${topicTitle.toLowerCase()}, car il permet de relier la grammaire, le vocabulaire et le sens du message.`,
      `En français, il faut comprendre le contexte, le registre de langue et la logique de la réponse.`,
      `Une bonne solution doit présenter une idée claire, des exemples pertinents et une explication cohérente.`
    ],
    german: [
      `${title} ist ein zentrales Thema in ${topicTitle.toLowerCase()}, weil es Grammatik, Wortschatz und Bedeutung in einem Zusammenhang zeigt.`,
      `Im Deutschen ist die sprachliche Genauigkeit wichtig: Stil, Satzbau und Kontext bestimmen die richtige Antwort.`,
      `Eine gute Lösung erklärt die Idee sauber, nutzt passende Wörter und belegt sie mit einem klaren Beispiel.`
    ],
    geography: [
      `${title} jest ważnym pojęciem w ${topicTitle.toLowerCase()}, ponieważ pozwala połączyć przestrzeń, środowisko i procesy gospodarcze w całość.`,
      `W geografii kluczowe są zależności między środowiskiem, ludnością i działalnością człowieka.`,
      `Prawidłowa odpowiedź powinna odwoływać się do przyczyn, skutków i zależności przestrzennych.`
    ],
    history: [
      `${title} jest kluczowym pojęciem w ${topicTitle.toLowerCase()}, ponieważ pomaga zrozumieć przyczyny, przebieg oraz skutki wydarzeń historycznych.`,
      `W historii należy analizować źródła, kontekst oraz zależności między wydarzeniami i ludźmi.`,
      `Dobra odpowiedź powinna opierać się na faktach, logice wyjaśnienia i właściwej interpretacji źródła.`
    ]
  };

  const exampleBySubject = {
    mathematics: {
      statement: 'CKE: Zapisz rozwiązanie równania 2x + 6 = 14 i sprawdź poprawność wyniku.',
      steps: [
        'Odejmujemy 6 od obu stron: 2x = 8.',
        'Dzielimy obie strony przez 2: x = 4.',
        'Sprawdzamy: 2 · 4 + 6 = 14, więc wynik jest poprawny.'
      ],
      solution: '2x + 6 = 14; 2x = 8; x = 4. Odpowiedź: x = 4.',
      answer: '4',
      explanation: 'Po odjęciu 6 i podzieleniu przez 2 otrzymujemy x = 4, a to spełnia równanie, więc rozwiązanie jest poprawne.',
      diagram: 'Liniowy wykres: y = 2x + 6, przecinający oś y w punkcie 6, rozwiązanie x = 4.'
    },
    physics: {
      statement: 'CKE: Oblicz pracę wykonaną przez siłę 10 N przy przesunięciu 3 m, gdy kierunek działania siły jest zgodny z kierunkiem ruchu.',
      steps: [
        'Zapisujemy wzór: W = F · s · cosα.',
        'Ponieważ kierunki są zgodne, α = 0°, więc cos 0° = 1.',
        'W = 10 · 3 · 1 = 30 J.'
      ],
      solution: 'W = F · s · cosα = 10 · 3 · 1 = 30 J. Odpowiedź: W = 30 J.',
      answer: '30 J',
      explanation: 'Praca jest iloczynem siły, przesunięcia i cosinusa kąta między nimi. Gdy kierunki są zgodne, kąt jest równy 0°, dlatego cos α = 1.',
      diagram: 'Siła i droga w tym samym kierunku, kąt α = 0°.'
    },
    chemistry: {
      statement: 'CKE: Oblicz masę substancji, gdy liczba moli wynosi 2 mol, a masa molowa wynosi 18 g/mol.',
      steps: [
        'Korzystamy ze wzoru m = n · M.',
        'Podstawiamy dane: m = 2 · 18.',
        'Obliczamy: m = 36 g.'
      ],
      solution: 'm = n · M = 2 · 18 = 36 g. Odpowiedź: 36 g.',
      answer: '36 g',
      explanation: 'Masa jest iloczynem liczby moli i masy molowej. Jednostki są zgodne, więc wynik 36 g jest poprawny.',
      diagram: 'Schemat: mol → masa molowa → masa w gramach.'
    },
    biology: {
      statement: 'CKE: Wyjaśnij, dlaczego enzymy przyspieszają przebieg reakcji metabolicznych w komórce.',
      steps: [
        'Enzymy obniżają energię aktywacji reakcji.',
        'Dzięki temu dostępna jest mniejsza ilość energii potrzebnej do rozpoczęcia reakcji.',
        'Reakcje zachodzą szybciej, a komórka może wykonywać procesy życiowe.'
      ],
      solution: 'Enzymy obniżają energię aktywacji reakcji, dzięki czemu szybciej powstają produkty metaboliczne. Odpowiedź: obniżają energię aktywacji.',
      answer: 'obniżają energię aktywacji',
      explanation: 'Enzymy nie zmieniają końcowego wyniku reakcji, ale pozwalają jej przebiegać szybciej, bo znacznie obniżają barierę aktywacji.',
      diagram: 'Substrat → kompleks enzym-substrat → produkt w krótszym czasie.'
    },
    polish: {
      statement: 'CKE: Napisz krótką rozprawkę, w której rozważysz, czy kultura jest ważniejsza od technologii w życiu człowieka.',
      steps: [
        'Wybierasz tezę i określasz stanowisko.',
        'Podajesz argumenty: wartość tradycji, języka, historii i człowieczeństwa.',
        'Kończysz wnioskiem i odwołujesz się do przykładu z dzieła lub codzienności.'
      ],
      solution: 'Teza: kultura jest ważniejsza, bo kształtuje tożsamość, sens, wartości i sposób myślenia. Rozwinięcie: technologia ułatwia życie, ale kultura buduje człowieka. Wniosek: warto rozwijać obie sfery, lecz najpierw kształtować postawy i świadomość.',
      answer: 'kultura jest ważniejsza',
      explanation: 'W rozprawce trzeba zaprezentować argumentację i wniosek, a nie tylko wyrazić opinię. Kultura wpływa na wartości, tożsamość i sposób interpretacji świata.',
      diagram: 'Teza → argumenty → przykład → wniosek.'
    },
    english: {
      statement: 'CKE: Read the text and decide whether the writer is optimistic or pessimistic about the future of public transport. Write 80–120 words and give two reasons for your opinion.',
      steps: [
        'Identify the writer’s attitude in the passage.',
        'Use expressions such as “In my opinion”, “Firstly”, “Secondly”.',
        'Finish with a conclusion that clearly states your view.'
      ],
      solution: 'In my opinion, the writer is optimistic about the future of public transport because it is becoming more sustainable and more convenient for city residents. Firstly, electric buses and better railway systems reduce pollution and traffic congestion. Secondly, public transport can save time, money and energy for many people. Although there are still problems, such as delays and costs, the long-term benefits are clear. Overall, public transport has a strong future if cities invest in modern infrastructure.',
      answer: 'optimistic',
      translation: 'Moim zdaniem pisarz jest optymistycznie nastawiony do przyszłości transportu publicznego, bo staje się bardziej ekologiczny i wygodny dla mieszkańców miast. Po pierwsze, elektryczne autobusy i lepsze systemy kolejowe zmniejszają zanieczyszczenie i korki. Po drugie, transport publiczny oszczędza czas, pieniądze i energię. Chociaż nadal są problemy, takie jak opóźnienia i koszty, długoterminowe korzyści są oczywiste. Ogólnie rzecz biorąc, transport publiczny ma dobrą przyszłość, jeśli miasta zainwestują w nowoczesną infrastrukturę.',
      explanation: 'Dobre zadanie z angielskiego musi zawierać jasne stanowisko, argumenty i zakończenie. Warto odwołać się do tekstu i użyć spójnych łączy logicznych.',
      diagram: 'Opinion → reasons → example → conclusion.',
      listeningTask: 'Słuchanka: wysłuchaj krótkiego nagrania i zaznacz, czy narrator jest optymistą czy pesymistą. Następnie wyjaśnij swoją odpowiedź jednym zdaniem.',
      speakingTask: 'Mówienie: opowiedz 30–40 sekund o tym, jak zmieniłby się transport publiczny w Twoim mieście w przyszłości.'
    },
    french: {
      statement: 'CKE: Rédigez un court texte argumenté sur l’importance de l’éducation numérique pour les jeunes. Donnez deux arguments et une conclusion.',
      steps: [
        'Présentez la thèse dans la première phrase.',
        'Développez deux arguments concrets en lien avec l’école et la vie quotidienne.',
        'Terminez par une conclusion claire et équilibrée.'
      ],
      solution: 'L’éducation numérique est très importante pour les jeunes, car elle développe des compétences utiles dans la vie quotidienne et dans le monde professionnel. D’abord, elle permet d’apprendre de nouvelles méthodes de recherche et de communication. Ensuite, elle aide les élèves à devenir plus autonomes et à mieux organiser leur travail. Bien que l’écran puisse être une distraction, un usage réfléchi reste très bénéfique. En conclusion, l’éducation numérique est essentielle si elle est accompagnée d’une bonne pédagogie.',
      answer: 'très importante',
      translation: 'Edukacja cyfrowa jest bardzo ważna dla młodych, ponieważ rozwija umiejętności przydatne w życiu codziennym i w świecie zawodowym. Po pierwsze, pozwala uczyć się nowych metod poszukiwania informacji i komunikacji. Po drugie, pomaga uczniom stać się bardziej samodzielnymi i lepiej organizować pracę. Chociaż ekran może być rozpraszający, rozważne korzystanie z niego jest bardzo korzystne. Podsumowując, edukacja cyfrowa jest kluczowa, jeśli towarzyszy jej dobra pedagogika.',
      explanation: 'W zadaniach z francuskiego kluczowe są jasna teza, spójna argumentacja i poprawny styl. Warto używać wyrazów łączących zdania oraz odwołać się do konkretnego kontekstu.',
      diagram: 'Thèse → arguments → conclusion.',
      listeningTask: 'Słuchanka: odsłuchaj krótką wypowiedź i zidentyfikuj temat oraz główną opinię mówiącego. Następnie zapisz 2 argumenty.',
      speakingTask: 'Mówienie: opisz w 2–3 zdaniach, jak wygląda Twój typowy dzień i co lubisz robić w czasie wolnym.'
    },
    german: {
      statement: 'CKE: Schreibe einen kurzen Aufsatz über die Vorteile und Nachteile des Internets für Jugendliche. Nenne zwei Vorteile und einen Nachteil.',
      steps: [
        'Stelle die Hauptidee am Anfang klar dar.',
        'Schreibe zwei Vorteile mit Beispielen.',
        'Ergänze einen Nachteil und fasse die Meinung am Ende zusammen.'
      ],
      solution: 'Das Internet bietet Jugendlichen viele Vorteile, weil es schnelle Informationen und vielfältige Lernmöglichkeiten bietet. Ein großer Vorteil ist der einfache Zugang zu Wissen für Schule und Freizeit. Ein zweiter Vorteil ist die Möglichkeit, mit anderen Menschen zu kommunizieren und neue Perspektiven zu lernen. Ein Nachteil ist jedoch, dass viele Menschen zu viel Zeit vor dem Bildschirm verbringen und dadurch weniger aktiv werden. Insgesamt kann das Internet nützlich sein, wenn man es bewusst und verantwortungsvoll nutzt.',
      answer: 'viele Vorteile',
      translation: 'Internet daje młodym ludziom wiele korzyści, ponieważ zapewnia szybki dostęp do informacji i różnorodne możliwości nauki. Jedną z głównych zalet jest łatwy dostęp do wiedzy w szkole i w czasie wolnym. Drugą zaletą jest możliwość komunikowania się z innymi ludźmi i zdobywania nowych perspektyw. Wadą jest jednak to, że wiele osób spędza za dużo czasu przed ekranem i przez to staje się mniej aktywne. Ogólnie rzecz biorąc, internet może być bardzo korzystny, jeśli korzysta się z niego świadomie i odpowiedzialnie.',
      explanation: 'Dobrze skonstruowana odpowiedź po niemiecku ma jasną tezę, argumenty oraz logiczne zakończenie. Ważna jest poprawna struktura i dobór słownictwa.',
      diagram: 'Hauptidee → Vorteile → Nachteil → Schluss.',
      listeningTask: 'Słuchanka: posłuchaj wypowiedzi i ustal, o jakim problemie mówi osoba oraz jakie rozwiązanie proponuje.',
      speakingTask: 'Mówienie: opowiedz, jak wygląda Twój idealny dzień w szkole lub w domu, używając co najmniej 4 czasowników.'
    },
    geography: {
      statement: 'CKE: Wyjaśnij, dlaczego klimat wpływa na rozwój rolnictwa w danym regionie.',
      steps: [
        'Wskazujesz główne czynniki klimatyczne: temperaturę, opady i sezonowość.',
        'Łączysz je z możliwościami upraw i plonowania.',
        'Zakończysz rozważaniem o znaczeniu dla gospodarki i życia ludzi.'
      ],
      solution: 'Klimat wpływa na rolnictwo, ponieważ określa temperaturę, ilość opadów i długość sezonu wegetacyjnego. W regionach wilgotnych rośnie mniej ryzyka suszy, a w cieplejszych obszarach łatwiej uprawiać wiele zbóż i owoców.',
      answer: 'klimat',
      explanation: 'Geografia wymaga powiązania zjawisk przyrodniczych z konsekwencjami dla człowieka. Poprawna odpowiedź pokazuje zależności przestrzenne i przyczynowo-skutkowe.',
      diagram: 'Klimat → opady i temperatura → uprawy → gospodarka.'
    },
    history: {
      statement: 'CKE: Wyjaśnij, jakie czynniki doprowadziły do wielkich zmian politycznych w XIX wieku.',
      steps: [
        'Wskazujesz przyczyny: rewolucja przemysłowa, idee reform, nacjonalizm.',
        'Opisujesz, jak wpływały na państwa i społeczeństwa.',
        'Podsumowujesz skutki dla Europy i Polski.'
      ],
      solution: 'W XIX wieku kluczowymi czynnikami były rewolucja przemysłowa, rozwój idei narodowych oraz rosnące niezadowolenie społeczne. Zmiany te prowadziły do przemian politycznych, walk o prawa i nowe porządki w Europie.',
      answer: 'rewolucja przemysłowa',
      explanation: 'W historii ważne jest rozpoznanie przyczyn i skutków, nie tylko nazw wydarzeń. Dobry opis pokazuje zależność między zmianami społecznymi a przemianami politycznymi.',
      diagram: 'Przyczyny → reformy i napięcia → zmiany polityczne → skutki.'
    }
  };

  const selfTaskBySubject = {
    mathematics: {
      question: 'Rozwiąż równanie 3x - 9 = 12.',
      answer: '7',
      justification: 'Dodajemy 9 do obu stron: 3x = 21. Dzielimy przez 3: x = 7. To spełnia równanie, bo 3·7 - 9 = 12.'
    },
    physics: {
      question: 'Oblicz siłę, jeśli masa ciała wynosi 4 kg, a przyspieszenie 2 m/s².',
      answer: '8 N',
      justification: 'Z prawa Newtona F = m · a = 4 · 2 = 8 N. Jednostka N odpowiada kg·m/s².'
    },
    chemistry: {
      question: 'Oblicz stężenie roztworu, jeśli w 0,5 dm³ znajduje się 0,25 mola substancji.',
      answer: '0,5 mol/dm³',
      justification: 'Stężenie c = n / V = 0,25 / 0,5 = 0,5 mol/dm³. Wartość jest poprawna, bo objętość jest wyrażona w dm³.'
    },
    biology: {
      question: 'Jaką rolę pełnią chloroplasty w komórce roślinnej?',
      answer: 'fotosynteza',
      justification: 'Chloroplasty przeprowadzają fotosyntezę, czyli zamieniają energię światła w energię chemiczną związaną w związkach organicznych.'
    },
    polish: {
      question: 'Napisz krótką tezę do rozprawki: Czy warto czytać lektury obowiązkowe?',
      answer: 'warto',
      justification: 'Warto czytać lektury obowiązkowe, bo rozwijają myślenie, język i kulturę. Dobry argument to nie tylko znajomość treści, lecz także rozumienie wartości i kontekstu.'
    },
    english: {
      question: 'Write one sentence: Why is reading important for learning English?',
      answer: 'important',
      translation: 'Dlaczego czytanie jest ważne w nauce języka angielskiego?',
      justification: 'Reading is important because it improves vocabulary, grammar and understanding of real sentence patterns, which helps students communicate more naturally in English.'
    },
    french: {
      question: 'Écris une phrase qui montre pourquoi la lecture est utile en français.',
      answer: 'utile',
      translation: 'Napisz zdanie pokazujące, dlaczego czytanie jest przydatne w języku francuskim.',
      justification: 'La lecture est utile, car elle enrichit le vocabulaire, la grammaire et la compréhension du sens des textes, ce qui aide à mieux parler et écrire.'
    },
    german: {
      question: 'Schreibe einen Satz: Warum ist Lesen im Deutschen wichtig?',
      answer: 'wichtig',
      translation: 'Napisz zdanie: Dlaczego czytanie jest ważne w języku niemieckim?',
      justification: 'Lesen ist wichtig, weil es den Wortschatz, die Grammatik und das Verständnis von Texten verbessert und die Sprachkompetenz stärkt.'
    },
    geography: {
      question: 'Dlaczego mapy są ważne w geografii?',
      answer: 'przestrzeń',
      justification: 'Mapy pokazują przestrzeń, rozmieszczenie zjawisk i zależności między miejscami, więc pomagają zrozumieć środowisko i gospodarkę.'
    },
    history: {
      question: 'Jakie znaczenie ma źródło historyczne?',
      answer: 'dowód',
      justification: 'Źródło historyczne jest dowodem, który pozwala ustalić fakty, przebieg wydarzeń i interpretację dziejów.'
    }
  };

  const detailedLesson = `${definitionTemplates[subjectKey].join(' ')} W pracy z tematem warto najpierw rozpoznać definicję, potem zastosować odpowiednie wzory i dopiero na końcu sprawdzić poprawność wyniku. To dobry schemat zarówno do zadań prostych, jak i do zadań wymagających uzasadnienia.`;

  const definitionBlocks = [
    { title: 'Definicja kluczowa', level: 'ważne', text: definitionTemplates[subjectKey][0] },
    { title: 'Definicja dodatkowa', level: 'ważne', text: definitionTemplates[subjectKey][1] },
    { title: 'Mniej ważna, ale przydatna', level: 'dodatkowe', text: definitionTemplates[subjectKey][2] }
  ];

  const steps = [
    'Najpierw zidentyfikuj definicję i główną zależność.',
    'Zaznacz dane, niewiadome i potrzebne wzory lub reguły.',
    'Ustal, który model lub schemat rozwiązywania pasuje do zadania.',
    'Rozwiąż krok po kroku i sprawdź zgodność z warunkami oraz jednostkami.',
    'Na końcu oceń wynik pod kątem sensu logicznego i możliwych błędów.'
  ];

  const keyIdeas = [
    `Definicja ${title.toLowerCase()}`,
    `Najważniejsze zależności i własności ${title.toLowerCase()}`,
    `Typowe zastosowanie w ${topicTitle.toLowerCase()}`,
    `Sposób sprawdzania poprawności wyniku i interpretacji odpowiedzi`
  ];

  const formulas = (formulaLibrary[subjectKey] || []).slice(0, 5);
  const example = exampleBySubject[subjectKey] || { statement: 'Przykładowe zadanie z danego tematu.', steps: ['Zidentyfikuj dane.', 'Dobierz wzór.', 'Sprawdź wynik.'], solution: 'Najpierw zidentyfikuj dane, potem zastosuj odpowiedni wzór i sprawdź wynik.', diagram: 'Schemat rozwiązania', answer: 'wynik', explanation: 'To jest poprawne rozwiązanie, ponieważ...' };
  const selfTask = selfTaskBySubject[subjectKey] || { question: 'Rozwiąż zadanie samodzielnie, a potem sprawdź odpowiedź.', answer: 'wynik', justification: 'Odpowiedź: sprawdź rozwiązanie po kliknięciu przycisku.' };

  return {
    name: getKeyConceptDisplay(subjectKey, subtopicName),
    title,
    summary: `${title} jest kluczowym elementem ${topicTitle.toLowerCase()} z przedmiotu ${subjectName}. W praktyce obejmuje definicję, najważniejsze zależności, wzory, metodę rozwiązywania oraz sprawdzanie poprawności wyniku.`,
    detailedLesson,
    keyIdeas,
    formulas,
    studySteps: steps,
    example,
    selfTask,
    definition: definitionTemplates[subjectKey].join(' '),
    definitionBlocks,
    diagram: example.diagram,
    source: subjectName
  };
}

function buildDiagramSvg(subjectKey, caption) {
  const code = subjectKey || 'mathematics';
  const palette = {
    mathematics: { primary: '#7dd3fc', secondary: '#c4b5fd', accent: '#fbbf24', bg: '#0f172a' },
    physics: { primary: '#67e8f9', secondary: '#a78bfa', accent: '#fca5a5', bg: '#111827' },
    chemistry: { primary: '#86efac', secondary: '#7dd3fc', accent: '#f9a8d4', bg: '#0f172a' },
    biology: { primary: '#a7f3d0', secondary: '#c4b5fd', accent: '#fbbf24', bg: '#0f172a' }
  };
  const colors = palette[code] || palette.mathematics;

  const graphics = {
    mathematics: `
      <rect x="0" y="0" width="620" height="220" fill="rgba(15,23,42,0.2)" rx="18"/>
      <g stroke="rgba(148,163,184,0.28)" stroke-width="1">
        <line x1="70" y1="170" x2="560" y2="170"/>
        <line x1="70" y1="30" x2="70" y2="170"/>
        <line x1="70" y1="170" x2="560" y2="40"/>
      </g>
      <path d="M90 150 C170 125, 220 95, 260 100 S350 60, 400 80 S500 40, 535 62" fill="none" stroke="${colors.primary}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="260" cy="100" r="6" fill="${colors.accent}"/>
      <circle cx="400" cy="80" r="6" fill="${colors.accent}"/>
      <text x="180" y="60" fill="${colors.secondary}" font-size="18" font-weight="700">y</text>
      <text x="520" y="170" fill="${colors.secondary}" font-size="18" font-weight="700">x</text>
      <text x="270" y="86" fill="${colors.accent}" font-size="14" font-weight="700">punkt kluczowy</text>
    `,
    physics: `
      <rect x="0" y="0" width="620" height="220" fill="rgba(15,23,42,0.2)" rx="18"/>
      <line x1="80" y1="150" x2="480" y2="150" stroke="rgba(148,163,184,0.25)" stroke-width="3"/>
      <line x1="240" y1="150" x2="260" y2="60" stroke="${colors.primary}" stroke-width="5" stroke-linecap="round"/>
      <line x1="260" y1="60" x2="340" y2="115" stroke="${colors.primary}" stroke-width="5" stroke-linecap="round"/>
      <line x1="200" y1="150" x2="200" y2="110" stroke="${colors.secondary}" stroke-width="2" stroke-dasharray="8 8"/>
      <path d="M200 110 L260 60" stroke="${colors.accent}" stroke-width="3" fill="none" marker-end="url(#arrowHead)"/>
      <path d="M80 150 L480 150" stroke="${colors.secondary}" stroke-width="4" fill="none" marker-end="url(#arrowHead)"/>
      <circle cx="260" cy="60" r="16" fill="${colors.primary}" fill-opacity="0.18" stroke="${colors.primary}"/>
      <text x="160" y="110" fill="${colors.accent}" font-size="18" font-weight="700">F</text>
      <text x="350" y="108" fill="${colors.secondary}" font-size="18" font-weight="700">s</text>
      <text x="240" y="182" fill="${colors.primary}" font-size="18" font-weight="700">kierunek ruchu</text>
    `,
    chemistry: `
      <rect x="0" y="0" width="620" height="220" fill="rgba(15,23,42,0.2)" rx="18"/>
      <circle cx="220" cy="100" r="38" fill="${colors.primary}" fill-opacity="0.18" stroke="${colors.primary}" stroke-width="3"/>
      <circle cx="320" cy="100" r="38" fill="${colors.secondary}" fill-opacity="0.18" stroke="${colors.secondary}" stroke-width="3"/>
      <circle cx="420" cy="100" r="38" fill="${colors.accent}" fill-opacity="0.18" stroke="${colors.accent}" stroke-width="3"/>
      <path d="M258 100 L282 100" stroke="${colors.primary}" stroke-width="4"/>
      <path d="M358 100 L382 100" stroke="${colors.secondary}" stroke-width="4"/>
      <text x="200" y="106" fill="${colors.primary}" font-size="18" font-weight="700">A</text>
      <text x="300" y="106" fill="${colors.secondary}" font-size="18" font-weight="700">B</text>
      <text x="400" y="106" fill="${colors.accent}" font-size="18" font-weight="700">C</text>
      <text x="160" y="180" fill="${colors.primary}" font-size="18" font-weight="700">substraty</text>
      <text x="360" y="180" fill="${colors.secondary}" font-size="18" font-weight="700">produkty</text>
    `,
    biology: `
      <rect x="0" y="0" width="620" height="220" fill="rgba(15,23,42,0.2)" rx="18"/>
      <ellipse cx="310" cy="120" rx="150" ry="84" fill="${colors.primary}" fill-opacity="0.16" stroke="${colors.primary}" stroke-width="3"/>
      <circle cx="210" cy="120" r="32" fill="${colors.secondary}" fill-opacity="0.16" stroke="${colors.secondary}" stroke-width="3"/>
      <circle cx="410" cy="120" r="32" fill="${colors.accent}" fill-opacity="0.16" stroke="${colors.accent}" stroke-width="3"/>
      <path d="M248 120 L378 120" stroke="${colors.primary}" stroke-width="4" stroke-linecap="round"/>
      <path d="M266 82 L240 58 M354 82 L380 58" stroke="${colors.secondary}" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M260 155 L232 182 M360 155 L390 182" stroke="${colors.accent}" stroke-width="3" stroke-linecap="round" fill="none"/>
      <text x="196" y="126" fill="${colors.secondary}" font-size="16" font-weight="700">A</text>
      <text x="396" y="126" fill="${colors.accent}" font-size="16" font-weight="700">B</text>
      <text x="266" y="78" fill="${colors.primary}" font-size="16" font-weight="700">proces</text>
    `
  };

  return `
    <div class="diagram-wrap">
      <svg class="lesson-svg" viewBox="0 0 620 220" role="img" aria-label="Schemat ilustracyjny do tematu">
        <defs>
          <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="${colors.primary}"/>
          </marker>
        </defs>
        ${graphics[code] || graphics.mathematics}
      </svg>
      <div class="diagram-caption">${caption || 'Schemat pokazuje najważniejszy związek między danymi, wzorem i wynikiem.'}</div>
    </div>
  `;
}

function buildDetailPanelMarkup({ subject, subjectKey, topicTitle, topicLevel, subtopicName, info, finalSummary, wikipediaSummary }) {
  const quickTakeaway = [
    `Zrozum definicję ${subtopicName.toLowerCase()}.`,
    `Naucz się najważniejszej zależności, wzoru i schematu rozwiązania.`,
    `Rozwiąż 2–3 zadania z rosnącym poziomem trudności, aby utrwalić temat.`
  ];

  const lessonText = finalSummary || info.detailedLesson || info.summary || 'To zagadnienie obejmuje najważniejsze pojęcia, zależności i schemat rozwiązywania zadań.';
  const example = info.example || { statement: 'Przykładowe zadanie z tego tematu.', solution: 'Rozwiązanie: najpierw zidentyfikuj dane, potem zastosuj wzór i sprawdź wynik.', diagram: 'Schemat', answer: 'wynik', explanation: '...' };
  const selfTask = info.selfTask || { question: 'Zadanie do samodzielnej pracy.', answer: 'wynik', justification: '...' };
  const definitionText = info.definition || lessonText;
  const labelValue = getKeyConceptDisplay(subjectKey, subtopicName) || info.name || subtopicName;
  const focusPoints = [
    `Najważniejsze: <strong>${escapeHtml(labelValue)}</strong> pomaga rozpoznać właściwą zależność w zadaniu.`,
    'Warto pamiętać: poprawny wynik musi być uzasadniony i zgodny z jednostkami.',
    'Przydatność: to pojęcie pojawia się zarówno w zadaniach prostych, jak i w zadaniach wymagających uzasadnienia.'
  ];
  const definitionBlocks = (info.definitionBlocks || [
    { title: 'Definicja główna', text: definitionText },
    { title: 'Dodatkowe znaczenie', text: lessonText },
    { title: 'Mniej ważne, ale przydatne', text: 'To pojęcie pojawia się w praktyce jako punkt odniesienia do dalszych pytań, zależności i schematów rozwiązywania.' }
  ]).map((block, index) => `
    <div class="detail-box">
      <div class="definition-topline">${index + 1}. ${escapeHtml(block.title || 'Definicja')}</div>
      <p>${escapeHtml(block.text || 'Brak definicji')}</p>
      <div class="definition-meta">
        <span class="meta-chip">${block.level === 'dodatkowe' ? 'Dodatkowe' : 'Ważne'}</span>
      </div>
    </div>
  `).join('');

  return `
    <div class="detail-header">
      <button class="close-lesson" type="button" data-close-lesson aria-label="Zamknij lekcję">✕</button>
      <h3>${escapeHtml(info.name || subtopicName)}</h3>
      <div class="detail-badges">
        <span class="detail-badge">${escapeHtml(getSubjectDisplayName(subject))}</span>
        <span class="detail-badge">${escapeHtml(topicTitle)}</span>
        <span class="detail-badge">${escapeHtml(topicLevel)}</span>
      </div>
    </div>
    <div class="detail-body">
      <div class="detail-box span-2 definition-hero-box">
        <div class="definition-topline">1. Definicja</div>
        <div class="definition-hero">
          <div class="definition-label">Kluczowe pojęcie</div>
          <p class="definition-main"><strong>${escapeHtml(labelValue)}</strong> — ${escapeHtml(definitionText)}</p>
        </div>
        <div class="definition-meta">
          <span class="meta-chip">Ważne</span>
          <span class="meta-chip">Zastosowanie</span>
          <span class="meta-chip">Weryfikacja</span>
        </div>
        <div class="focus-grid">
          ${focusPoints.map((point) => `<div class="focus-card">${point}</div>`).join('')}
        </div>
      </div>

      ${definitionBlocks}

      <div class="detail-box span-2">
        <h4>2. Wzory i kluczowe zależności</h4>
        <div class="formula-list">
          ${(info.formulas || [{ formula: 'Dobierz odpowiedni wzór', variables: 'zależność zależy od warunków zadania' }]).map((formulaEntry) => {
            const formula = typeof formulaEntry === 'string' ? formulaEntry : formulaEntry.formula;
            const variables = typeof formulaEntry === 'string' ? '' : formulaEntry.variables;
            return `
              <div class="formula-item">
                <div class="formula-line">${formula}</div>
                ${variables ? `<div class="formula-variables"><strong>Oznaczenia:</strong> ${variables}</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="detail-box span-2">
        <h4>3. Rysunek / schemat</h4>
        <div class="lesson-visual">
          ${buildDiagramSvg(subject.key || Object.keys(subjectData).find((key) => subjectData[key].name === subject.name) || 'mathematics', example.diagram || 'Schemat zależności')}
        </div>
      </div>

      <div class="detail-box span-2">
        <h4>4. Przykładowe zadanie maturalne</h4>
        <p><strong>Zadanie:</strong> ${example.statement}</p>
        ${example.translation ? `<p><strong>Tłumaczenie:</strong> ${example.translation}</p>` : ''}
        ${example.steps ? `<ol class="example-steps">${example.steps.map((step) => `<li>${step}</li>`).join('')}</ol>` : ''}
        <p><strong>Rozwiązanie:</strong> ${example.solution}</p>
        <p><strong>Odpowiedź:</strong> <strong>${example.answer}</strong></p>
        <p><strong>Uzasadnienie:</strong> ${example.explanation}</p>
        ${example.listeningTask ? `
          <div class="language-practice-box">
            <h5>🎧 Słuchanka / Listening task</h5>
            <p>${example.listeningTask}</p>
          </div>
        ` : ''}
        ${example.speakingTask ? `
          <div class="language-practice-box">
            <h5>🗣️ Mówienie / Speaking task</h5>
            <p>${example.speakingTask}</p>
          </div>
        ` : ''}
      </div>

      <div class="detail-box span-2">
        <h4>5. Zadanie do samodzielnej pracy</h4>
        <p>${selfTask.question}</p>
        ${selfTask.translation ? `<p><strong>Tłumaczenie:</strong> ${selfTask.translation}</p>` : ''}
        ${selfTask.listeningTask ? `
          <div class="language-practice-box">
            <h5>🎧 Słuchanka / Listening task</h5>
            <p>${selfTask.listeningTask}</p>
          </div>
        ` : ''}
        ${selfTask.speakingTask ? `
          <div class="language-practice-box">
            <h5>🗣️ Mówienie / Speaking task</h5>
            <p>${selfTask.speakingTask}</p>
          </div>
        ` : ''}
        <form class="lesson-answer-form" data-correct-answer="${String(selfTask.answer || example.answer || '').replace(/"/g, '&quot;')}" data-correct-explanation="${String(selfTask.justification || example.explanation || '').replace(/"/g, '&quot;')}">
          <input class="lesson-answer-input" type="text" data-lesson-answer-input placeholder="Wpisz odpowiedź i naciśnij Enter" autocomplete="off" />
          <button type="submit">Sprawdź</button>
        </form>
        <div class="lesson-answer-result hidden" data-lesson-answer-result></div>
      </div>

      <div class="detail-box">
        <h4>Szybko: co z tym zrobić?</h4>
        <p>${quickTakeaway[0]} ${quickTakeaway[1]} ${quickTakeaway[2]}</p>
      </div>
      <div class="detail-box">
        <h4>Najważniejsze pojęcia</h4>
        <ul>${(info.keyIdeas || ['Definicja', 'Zastosowanie', 'Praktyka']).map((idea) => `<li>${idea}</li>`).join('')}</ul>
      </div>
      <div class="detail-box">
        <h4>Kroki nauki / rozwiązania</h4>
        <ul>${(info.studySteps || ['Zidentyfikuj definicję', 'Dobierz wzór', 'Rozwiąż krok po kroku', 'Sprawdź wynik']).map((step) => `<li>${step}</li>`).join('')}</ul>
      </div>
      <div class="detail-box summary-strip span-2">
        <h4>Dokładniejsze podsumowanie</h4>
        <div class="summary-grid">
          <div><strong>1.</strong> Definicja: <span>${info.name || subtopicName}</span> wyjaśnia znaczenie pojęcia w danym kontekście zadania.</div>
          <div><strong>2.</strong> Wzór: wybierasz go według danych, niewiadomych i modelu opisu, a nie „na pamięć” bez analizy.</div>
          <div><strong>3.</strong> Weryfikacja: sprawdzasz sens fizyczny, matematyczny i jednostki, żeby uniknąć błędu logicznego.</div>
        </div>
      </div>
      ${wikipediaSummary ? `
        <div class="detail-box span-2">
          <h4>Źródło: Wikipedia</h4>
          <p>${wikipediaSummary.title}: ${wikipediaSummary.snippet}</p>
        </div>
      ` : ''}
    </div>
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
  const subtopic = topic.subtopics.find((item) => (typeof item === 'string' ? item : item.name) === subtopicName);
  const info = typeof subtopic === 'string' ? buildLessonContent(subject.name, topicTitle, subtopic) : { ...subtopic, ...buildLessonContent(subject.name, topicTitle, subtopic.name || subtopicName) };

  const fallbackSummary = info.detailedLesson || info.summary;
  detailPanel.innerHTML = buildDetailPanelMarkup({
    subject,
    subjectKey,
    topicTitle,
    topicLevel: topic.level,
    subtopicName,
    info,
    finalSummary: fallbackSummary,
    wikipediaSummary: null
  });
  detailPanel.classList.remove('hidden');
  detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const wikipediaSummary = await fetchWikipediaArticleSummary(subtopicName || info.name || topicTitle);

  if (requestId !== activeDetailRequestId || JSON.stringify(selectedSubtopic) !== currentSelection) {
    return;
  }

  const finalSummary = wikipediaSummary?.snippet ? `${wikipediaSummary.title}: ${wikipediaSummary.snippet.trim()}. ${fallbackSummary}` : fallbackSummary;
  detailPanel.innerHTML = buildDetailPanelMarkup({
    subject,
    subjectKey,
    topicTitle,
    topicLevel: topic.level,
    subtopicName,
    info,
    finalSummary,
    wikipediaSummary
  });
}

async function showWikipediaFallback(query) {
  const normalized = normalizeText(query);
  if (!normalized) return;

  const summary = await fetchWikipediaArticleSummary(normalized);
  if (!summary) return;

  detailPanel.innerHTML = `
    <div class="detail-header">
      <h3>${summary.title}</h3>
      <div class="detail-badges">
        <span class="detail-badge">Wikipedia</span>
        <span class="detail-badge">Internet</span>
      </div>
    </div>
    <div class="detail-body">
      <div class="detail-box" style="grid-column: 1 / -1;">
        <h4>Krótka definicja</h4>
        <p>${summary.snippet || 'To hasło pojawia się w źródłach internetowych i może zostać rozwinięte w dalszej nauce.'}</p>
      </div>
    </div>
  `;
  detailPanel.classList.remove('hidden');
  detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      subject.name,
      subject.description,
      ...subject.topics.flatMap((topic) => [topic.title, topic.level, ...getSubtopicNames(topic)])
    ];

    const queryMatches = !searchTerm || searchableEntries.some((entry) => Number.isFinite(scoreTextSimilarity(entry, searchTerm)));
    return matchesSubject && matchesLevel && queryMatches;
  });

  if (filteredSubjects.length === 0) {
    if (selectedSubtopic) {
      subjectsContainer.innerHTML = '<div class="subject-card"><div class="subject-body" style="display:block; padding:20px; color: var(--muted);">Wybrany temat jest nadal dostępny w bazie, więc pokazuję jego lekcję.</div></div>';
      renderDetailPanel();
      return;
    }

    subjectsContainer.innerHTML = `
      <div class="subject-card">
        <div class="subject-body" style="display:block; padding:20px; color: var(--muted);">
          Brak wyników w lokalnej bazie. Pokażę też krótką informację z Wikipedii.
        </div>
      </div>
    `;
    showWikipediaFallback(rawQuery);
    return;
  }

  subjectsContainer.innerHTML = filteredSubjects.map(([subjectKey, subject]) => buildTopicCard(subjectKey, subject, selectedLevel)).join('');

  if (!selectedSubtopic) {
    detailPanel.classList.add('hidden');
    detailPanel.innerHTML = '';
  } else {
    renderDetailPanel();
  }
}

function selectSubtopic(subjectKey, topicTitle, subtopicName) {
  selectedSubtopic = {
    subjectKey,
    topicTitle,
    subtopicName
  };
  suggestionsBox.classList.add('hidden');
  renderSubjects();
  renderDetailPanel();
}

function toggleSubject(subjectKey) {
  if (expandedCards.has(subjectKey)) {
    expandedCards.delete(subjectKey);
  } else {
    expandedCards.add(subjectKey);
  }
  renderSubjects();
}

function renderQuestion() {
  const question = allQuizQuestions[currentQuestionIndex];

  quizCard.innerHTML = `
    <span class="quiz-tag">${question.subject}</span>
    <h3>${question.question}</h3>
    <ul class="answer-list">
      ${question.options.map((option) => `<li><button type="button" data-answer="${option}">${option}</button></li>`).join('')}
    </ul>
  `;

  document.querySelectorAll('.answer-list button').forEach((button) => {
    button.addEventListener('click', () => {
      const selectedAnswer = button.dataset.answer;
      const isCorrect = selectedAnswer === question.answer;
      const buttons = document.querySelectorAll('.answer-list button');

      buttons.forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.answer === question.answer) btn.classList.add('correct');
        if (btn.dataset.answer === selectedAnswer && !isCorrect) btn.classList.add('incorrect');
      });

      const explanation = document.createElement('div');
      explanation.className = 'quiz-explanation';
      explanation.textContent = `${isCorrect ? 'Poprawna odpowiedź! ' : 'Niepoprawna odpowiedź. '}${question.explanation}`;
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

cameraButton.addEventListener('click', () => {
  cameraInput.click();
});

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

    const firstSuggestion = suggestionsBox.querySelector('.search-suggestion-item')?.dataset.searchValue || latestSuggestions[0];
    const suggestionValue = firstSuggestion || searchInput.value.trim();

    if (suggestionValue) {
      searchInput.value = suggestionValue;
      showWikipediaFallback(suggestionValue);
    }

    subjectFilter.value = 'all';
    levelFilter.value = 'all';
    renderSuggestions();
    renderSubjects();
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
    detailPanel.classList.add('hidden');
    detailPanel.innerHTML = '';
    return;
  }

  const answerButton = event.target.closest('.answer-toggle');
  if (answerButton) {
    const answerTarget = answerButton.dataset.answerTarget;
    const answerBox = document.querySelector(`[data-answer-box="${answerTarget}"]`);
    if (answerBox) {
      answerBox.classList.toggle('hidden');
      answerButton.textContent = answerBox.classList.contains('hidden') ? 'Pokaż odpowiedź' : 'Ukryj odpowiedź';
    }
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
    selectSubtopic(
      subtopicButton.dataset.subjectKey,
      subtopicButton.dataset.topicTitle,
      subtopicButton.dataset.subtopicName
    );
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
  const explanation = form.dataset.correctExplanation || 'Sprawdź rozwiązanie krok po kroku.';
  const isCorrect = guess && (guess === answer || guess.includes(answer) || answer.includes(guess));

  resultBox.classList.remove('hidden', 'success', 'error');
  resultBox.classList.add(isCorrect ? 'success' : 'error');

  if (isCorrect) {
    resultBox.innerHTML = `<strong>Poprawne rozwiązanie!</strong><br>${explanation}`;
  } else {
    resultBox.innerHTML = `<strong>Nieco inaczej.</strong> Poprawna odpowiedź: <strong>${form.dataset.correctAnswer || 'brak odpowiedzi'}</strong>.<br>Uzasadnienie: ${explanation}`;
  }
});

renderStats();
renderSubjects();
renderQuestion();
