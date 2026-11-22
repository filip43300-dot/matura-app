window.KNOWLEDGE_BASE = {
  liceum: {
    label: 'Liceum / Matura',
    subjects: {
      biology: {
        name: 'Biologia', icon: '🧬',
        topics: [{
          title: 'Budowa i funkcje komórki', level: 'podstawowy',
          subtopics: [{
            name: 'Organella komórkowe', keywords: ['jądro', 'mitochondrium', 'chloroplast', 'błona', 'komórka'],
            lessons: {
              podstawowy: { definition: 'Organella komórkowe to wyspecjalizowane struktury wykonywane funkcje niezbędne do życia komórki.', content: 'Jądro przechowuje DNA, mitochondrium produkuje ATP, a chloroplasty przeprowadzają fotosyntezę w komórkach roślin.', formulas: ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP'], example: 'Wymień trzy organella i ich funkcje.', answer: 'Jądro — DNA; mitochondrium — oddychanie komórkowe; chloroplast — fotosynteza.', explanation: 'Każda organella ma strukturę dostosowaną do swojej funkcji.', visual: 'Jądro → informacje genetyczne | Mitochondrium → ATP | Chloroplast → energia świetlna' },
              rozszerzony: { definition: 'Organella tworzą funkcjonalnie powiązane systemy membran i kompartmentów komórkowych.', content: 'Translacja białek obejmuje rybosomy ER i aparat Golgiego; mitochondria mają własny DNA i dwie błony.', formulas: ['ADP + Pi + energia → ATP', 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energia'], example: 'Wyjaśnij przewidywany skutek uszkodzenia błony wewnętrznej mitochondrium.', answer: 'Spadek produkcji ATP i zaburzenie łącznego przenoszenia elektronów.', explanation: 'Łańcuch oddechowy znajduje się na wewnętrznej błonie mitochondrialnej i wykorzystuje gradient protonowy.', visual: 'Błona zewnętrzna → przestrzeń międzybłonowa → macierz | Gradient H⁺ → ATP-syntaza' },
              medycyna: { definition: 'Organelle są układami dynamicznymi, których dysfunkcja przekłada się na stan komórki i tkanki.', content: 'Patologiczna fragmentacja mitochondriów, ER stress i lizosomalna niesprawność występują m.in. w chorobach neurodegeneracyjnych i metabolicznych.', formulas: ['ΔΨm = potencjał błonowy mitochondrium', 'ROS = reaktywne formy tlenu'], example: 'Jak mitochondrialna dysfunkcja wpływa na komórkę?', answer: 'Zmniejsza ATP, zwiększa stres oksydacyjny i może uruchamiać apoptozę.', explanation: 'Nieodwracalne uszkodzenie energetyki sprzyja degeneracji i śmierci komórki.', visual: 'Dysfunkcja mitochondriów → ROS/ATP → stres komórkowy → choroba' },
              olimpiada: { definition: 'Komórka jest przestrzenią termodynamiczną i informacyjną z wyspecjalizowanymi kompartmentami oraz kontrolowanym ruchem materiałów.', content: 'Rozdział komórkowy pozwala utrzymać gradienty, pH i mikrośrodowiska enzymatyczne; transport białek wykorzystuje sygnały adresujące i SPP.', formulas: ['ΔG = ΔG°′ + RT ln Q', 'pH = -log₁₀[H⁺]'], example: 'Wyjaśnij znaczenie kompartmentacji dla kontroli metabolizmu.', answer: 'Oddziela reakcje konkurencyjne i umożliwia tworzenie precyzyjnych gradientów stężeń i energii.', explanation: 'Niezależna regulacja kompartmentów zwiększa efektywność i chroni przed aktywacją szlaków w niewłaściwym czasie.', visual: 'Cytozol ⇄ organella: transport | Gradienty + sygnały → regulacja' }
            },
            questions: [
              { question: 'Która organella produkuje większość ATP w komórce zwierzęcej?', options: ['Rybosom', 'Mitochondrium', 'Lizosom', 'Centrosom'], answer: 'Mitochondrium', explanation: 'Główny mechanizm to fosforylacja oksydacyjna na błonie wewnętrznej mitochondrium.' },
              { question: 'Co zawiera jądro komórkowe?', options: ['DNA', 'Celulozę', 'Chlorofil', 'Hemoglobinę'], answer: 'DNA', explanation: 'DNA przechowuje informację genetyczną organizmu.' }
            ]
          }]
        }]
      },
      mathematics: {
        name: 'Matematyka', icon: '📐',
        topics: [{ title: 'Algebra', level: 'podstawowy', subtopics: [{ name: 'Równania liniowe', keywords: ['równanie', 'linia', 'x', 'nierówność'], lessons: {
          podstawowy: { definition: 'Równanie liniowe z jedną niewiadomą ma postać ax + b = 0, gdzie a ≠ 0.', content: 'Rozwiązanie otrzymujemy przez odwrotne działania po obu stronach równania.', formulas: ['ax + b = 0', 'x = -b/a'], example: 'Rozwiąż 2x + 6 = 14.', answer: 'x = 4', explanation: '2x = 8, następnie dzielimy przez 2.', visual: '2x + 6 = 14 → 2x = 8 → x = 4' },
          rozszerzony: { definition: 'Równanie liniowe opisuje zależność o stałym przyroście; może być częścią układu równań.', content: 'Sprawdź warunki zgodności układu i interpretację geometryczną prostych.', formulas: ['ax + by = c', 'y = mx + b'], example: 'Rozwiąż układ x + y = 5 i x - y = 1.', answer: 'x = 3, y = 2', explanation: 'Dodanie równań daje 2x = 6, a potem y = 2.', visual: 'Przecinające się proste: punkt (3, 2)' },
          medycyna: { definition: 'W medycynie równania liniowe używa się do prostych proporcji dawkowania i zależności objętościowych.', content: 'Muszą być zachowane jednostki i zależność liniowa, np. dawka w zależności od masy.', formulas: ['dawka = masa ciała × dawka/kg'], example: 'Lek 5 mg/kg dla pacjenta 60 kg: dawka?', answer: '300 mg', explanation: '60 × 5 mg/kg = 300 mg.', visual: 'masa 60 kg × 5 mg/kg → 300 mg' },
          olimpiada: { definition: 'Rodzinę równań liniowych można analizować macierzowo i algebraicznie przez rząd, wyznacznik i rozwiązania parametryczne.', content: 'Układ może mieć jedno rozwiązanie, nieskończenie wiele albo być sprzeczny.', formulas: ['Ax = b', 'det(A) ≠ 0 ⇒ jedno rozwiązanie'], example: 'Gdy wyznacznik wynosi 0, ile może być rozwiązań?', answer: 'Zero albo nieskończenie wiele.', explanation: 'Macierz zerowego rzędu nie wyznacza jednoznacznie rozwiązania.', visual: 'det(A) ≠ 0: jedno | det(A) = 0: 0 lub ∞' }
        }, questions: [{ question: 'Rozwiązanie 3x - 9 = 12 wynosi:', options: ['x = 5', 'x = 7', 'x = 21', 'x = 3'], answer: 'x = 7', explanation: '3x = 21, więc x = 7.' }] }] }]
      }
    }
  },
  medical: {
    label: 'Studia Medyczne',
    subjects: {
      anatomy: {
        name: 'Anatomia', icon: '🫀',
        topics: [{ title: 'Układ krążenia', level: 'studia', subtopics: [{ name: 'Serce i krążenie wieńcowe', keywords: ['serce', 'krążenie', 'wieńcowe', 'aorta', 'żylna'], lessons: {
          podstawowy: { definition: 'Serce jest mięśniową pompą, która napędza krew do płuc i do całego organizmu.', content: 'Przedsionki przyjmują krew, a komory wytwarzają ciśnienie przepływu.', formulas: ['CO = SV × HR'], example: 'Co oznacza CO w układzie krążenia?', answer: 'Rzut serca.', explanation: 'Rzut serca to objętość krwi wyrzucana na minutę.', visual: 'Prawa połowa serca → płuca → lewa połowa serca → ciało' },
          rozszerzony: { definition: 'Krążenie wieńcowe dostarcza tlen i substraty metabolizmu mięśniowi sercowemu.', content: 'Tętnice wieńcowe odchodzą od aorty i większe przepływy występują głównie podczas rozkurczu.', formulas: ['CO = SV × HR', 'MAP ≈ 1/3 SBP + 2/3 DBP'], example: 'Dlaczego przepływ wieńcowy jest preferowany podczas rozkurczu?', answer: 'Kompresja naczyń mięśniem sercowym maleje po skurczu.', explanation: 'W skurczu wewnątrzścienne ciśnienie ogranicza przepływ, szczególnie w warstwach mięśnia.', visual: 'Aorta → tętnice wieńcowe → mięsień sercowy → zatoki wieńcowe' },
          medycyna: { definition: 'Patologia naczyń wieńcowych prowadzi do niedokrwienia miokardium i zawału.', content: 'Rozpoznanie ocenia objawy, EKG, biomarkery i obrazowanie; leczenie reperfuzja zależnie od pilności.', formulas: ['NSTEMI/STEMI — ocena uniesienia ST i troponiny'], example: 'Najważniejszy mechanizm działania leczenia reperfuzyjnego?', answer: 'Przywrócenie przepływu do niedokrwionego mięśnia sercowego.', explanation: 'Czasowe otwarcie naczynia ogranicza martwicę i poprawia wynik kliniczny.', visual: 'Blokada tętnicy → niedokrwienie → cięższa martwica; reperfuzja → odzyskanie perfuzji' },
          olimpiada: { definition: 'Krążenie wieńcowe jest dynamicznym układem przepływu regulowanym metabolizmem, śródbłonkiem i autonomicznym układem nerwowym.', content: 'Rezerwa koronarowa i przekrój mikrokrążenia determinują zdolność serca do zwiększenia przepływu przy obciążeniu.', formulas: ['F = ΔP/R', 'CVR = (Paryt. - CP) / przepływ'], example: 'Jak adenozyna oddziałuje na naczynia wieńcowe?', answer: 'Powoduje wazodylatację i zwiększenie przepływu wieńcowego.', explanation: 'Wzrost metabolizmu zwiększa adenozynę i sygnały lokalnej regulacji przepływu.', visual: 'Hipoksja/metabolizm → adenozyna/NO → rozszerzenie → przepływ↑' }
        }, questions: [{ question: 'Rzut serca oblicza się jako:', options: ['Ciśnienie × opór', 'SV × HR', 'TV × RR', 'V × C'], answer: 'SV × HR', explanation: 'Rzut serca to objętość wyrzutowa pomnożona przez częstość rytmu.' }] }] }]
      },
      physiology: {
        name: 'Fizjologia', icon: '🫁',
        topics: [{ title: 'Układ oddechowy', level: 'studia', subtopics: [{ name: 'Oddychanie i wentylacja', keywords: ['oddychanie', 'płuca', 'wentylacja', 'tlen', 'dwutlenek'], lessons: {
          podstawowy: { definition: 'Wentylacja to ruch powietrza pomiędzy atmosferą a pęcherzykami płucnymi.', content: 'Wdech aktywnie rozwija klatkę piersiową, a spokojny wydech jest zwykle bierny.', formulas: ['Minute ventilation = TV × RR'], example: 'Co oznacza objętość oddechowa?', answer: 'Objętość wdychanego i wydychanego powietrza przy jednym oddechu.', explanation: 'Miarę tę pomnaża się przez częstotliwość oddechów, aby uzyskać wentylację minutową.', visual: 'Wdech: klatka ↑, płuca ↑ | Wydech: klatka ↓, płuca ↓' },
          rozszerzony: { definition: 'Wentylacja doprowadza gaz do stref wymiany, a perfuzja dostarcza krew do naczyń włośniczkowych.', content: 'Sprawność wymiany zależy od stosunku wentylacji do perfuzji i gradientu ciśnień cząstkowych.', formulas: ['V/Q', 'PaO₂ / PaCO₂'], example: 'Co dzieje się przy lokalnym niedotlenieniu płuca?', answer: 'Wazokonstrykcja kompensacyjna ogranicza przepływ do słabo wentylowanych obszarów.', explanation: 'Mechanizm hipoksja płucna wspiera dopasowanie V/Q.', visual: 'Wentylacja ⇄ perfuzja; V/Q = optymalne w zdrowych płucach' },
          medycyna: { definition: 'Niewydolność oddechowa oznacza niedostateczną wymianę gazową: hipoksemiczną, hiperkapniczną lub mieszaną.', content: 'Ocena obejmuje gazometrię, saturację i pracę oddechową; leczenie zależy od mechanizmu.', formulas: ['PaO₂ < 60 mmHg: hipoksemia'], example: 'Co może świadczyć o zwiększonej wentylacji?', answer: 'Spadek PaCO₂ i ewentualna zasadowica oddechowa.', explanation: 'Dwutlenek jest markerem wentylacji, ale interpretacja zależy od płynu mózgowo-rdzeniowego i nerki.', visual: 'Wentylacja ↑ → PaCO₂ ↓ → pH ↑' },
          olimpiada: { definition: 'Mechanika oddechowa jest opisem zależności ciśnienia, oporu dróg oddechowych i podatności płuca.', content: 'Model płuca wykorzystuje krzywą ciśnienie—objętość i napięcie powierzchniowe surfaktantu.', formulas: ['Compliance = ΔV / ΔP', 'P = 2T/r'], example: 'Jak surfaktant wpływa na pęcherzyki?', answer: 'Zmniejsza napięcie powierzchniowe i zapobiega zapadaniu się małych pęcherzyków.', explanation: 'Wzór Laplace’a pokazuje, że mniej napięcia pozwala utrzymać małą średnicę bez wyższego ciśnienia.', visual: 'Surfaktant ↓ napięcie → stabilność pęcherzyków' }
        }, questions: [{ question: 'Wentylacja minutowa to iloczyn:', options: ['TV × RR', 'CO × SV', 'V/Q', 'pH × PaCO₂'], answer: 'TV × RR', explanation: 'Wentylacja minutowa = objętość oddechowa × częstotliwość oddechów.' }] }] }]
      }
    }
  }
};
