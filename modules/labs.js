window.LabModule = (() => {
  const LEVELS = ['Szkoła podstawowa','Liceum — podstawowy','Liceum — rozszerzony','Matura','Studia licencjackie','Studia magisterskie','Poziom zaawansowany'];
  const catalog = [
    {id:'cell',group:'Biologia',icon:'🧬',title:'Komórka zwierzęca i organella',levels:[LEVELS[0],LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Cytologia',description:'Interaktywny model 3D komórki z organellami i ich funkcjami.',model:'3d'},
    {id:'dna',group:'Biologia',icon:'🧬',title:'DNA, replikacja i mutacje',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Biologia molekularna',description:'Replikacja DNA i synteza RNA w animowanym modelu edukacyjnym.',model:'3d'},
    {id:'mitosis',group:'Biologia',icon:'🔬',title:'Cykl komórkowy i mitoza',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Podziały komórkowe',description:'Etapy podziału i chromosomy z kontrolką animacji.',model:'animation'},
    {id:'heart',group:'Nauki medyczne',icon:'🫀',title:'Praca serca i krążenie',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5],LEVELS[6]],stage:'Fizjologia',description:'Cykl sercowy, przepływ krwi i regulacja parametrami.',model:'animation'},
    {id:'anatomy',group:'Nauki medyczne',icon:'🦴',title:'Atlas układów człowieka',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Anatomia',description:'Szkieletowy model i wybór układów, struktur i powiązań.',model:'3d'},
    {id:'plant',group:'Biologia',icon:'🌿',title:'Budowa rośliny i fotosynteza',levels:[LEVELS[0],LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Botanika',description:'Korzeń, łodyga, liść i przepływ światła oraz asymilatów.',model:'3d'},
    {id:'ecology',group:'Nauki przyrodnicze',icon:'🌍',title:'Sieć troficzna i przepływ energii',levels:[LEVELS[0],LEVELS[1],LEVELS[2],LEVELS[3]],stage:'Ekologia',description:'Zmiana populacji i przepływu energii w ekosystemie.',model:'simulation'},
    {id:'microbiology',group:'Biologia',icon:'🦠',title:'Bakterie, wirusy i mikrobiom',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Mikrobiologia',description:'Modele drobnoustrojów i odporności na antybiotyki.',model:'3d'},
    {id:'atom',group:'Chemia',icon:'⚛️',title:'Budowa atomu i konfiguracja elektronów',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Budowa materii',description:'Protony, neutrony i elektrony z kontrolowanym modelem orbitalnym.',model:'3d'},
    {id:'molecule',group:'Chemia',icon:'🧪',title:'Modele cząsteczek i wiązania',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Wiązania chemiczne',description:'Geometria cząsteczek i konfiguracja wiązań.',model:'3d'},
    {id:'kinetics',group:'Chemia',icon:'⚗️',title:'Kinetyka i kataliza',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Reakcje chemiczne',description:'Bilans atomów, energia aktywacji i wpływ stężenia.',model:'simulation'},
    {id:'chemphysical',group:'Chemia',icon:'📈',title:'Równowaga, pH i elektrochemia',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Chemia fizyczna',description:'Wykresy reagujące na temperaturę, stężenie i pH.',model:'simulation'},
    {id:'organic',group:'Chemia',icon:'🔗',title:'Budowa związków organicznych',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Chemia organiczna',description:'Węglowodory, alkohole, grupy funkcyjne i izomeria.',model:'3d'},
    {id:'safechem',group:'Chemia',icon:'🧫',title:'Wirtualne doświadczenie chemiczne',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Laboratorium chemiczne',description:'Bezpieczna symulacja pomiarów, mieszania i interpretacji.',model:'simulation'},
    {id:'mechanics',group:'Fizyka',icon:'⚙️',title:'Kinematyka i dynamika',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Mechanika',description:'Ruch, siły, prędkość i wykresy zależności.',model:'3d'},
    {id:'pendulum',group:'Fizyka',icon:'⏱️',title:'Wahadło i ruch harmoniczny',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Drgania',description:'Okres, amplituda i energia wahadła.',model:'animation'},
    {id:'waves',group:'Fizyka',icon:'〰️',title:'Fale i interferencja',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Optyka i fale',description:'Amplituda, częstotliwość i nakładanie fal.',model:'simulation'},
    {id:'circuit',group:'Fizyka',icon:'🔌',title:'Obwody i prawo Ohma',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Elektryczność',description:'Napięcie, prąd, opór i kondensatory.',model:'simulation'},
    {id:'optics',group:'Fizyka',icon:'🔭',title:'Załamanie i soczewki',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Optyka',description:'Promienie, ogniskowa i obraz w soczewce.',model:'animation'},
    {id:'modern',group:'Fizyka',icon:'🌌',title:'Współczesne modele fizyki',levels:[LEVELS[4],LEVELS[5],LEVELS[6]],stage:'Fizyka współczesna',description:'Względność, atom i podstawowe modele jądrowe.',model:'3d'},
    {id:'function',group:'Matematyka',icon:'📈',title:'Funkcja i jej przekształcenia',levels:[LEVELS[0],LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Funkcje',description:'Współczynniki, wykres i przekształcenia geometryczne.',model:'3d'},
    {id:'geometry',group:'Matematyka',icon:'📐',title:'Geometria i bryły 3D',levels:[LEVELS[0],LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Geometria',description:'Bryły, przekroje i wizualizacja przestrzenna.',model:'3d'},
    {id:'derivative',group:'Matematyka',icon:'∫',title:'Pochodne i całki',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Analiza matematyczna',description:'Styczna, przyrost i pola pod wykresem.',model:'simulation'},
    {id:'vectors',group:'Matematyka',icon:'↗',title:'Wektory i macierze',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5],LEVELS[6]],stage:'Algebra liniowa',description:'Operacje na wektorach i transformacje macierzowe.',model:'3d'},
    {id:'probability',group:'Matematyka',icon:'🎲',title:'Prawdopodobieństwo i statystyka',levels:[LEVELS[0],LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Rachunek prawdopodobieństwa',description:'Rozkłady, częstości i proste doświadczenia losowe.',model:'simulation'}
    ,{id:'prokaryote',group:'Biologia',icon:'🦠',title:'Komórka prokariotyczna',levels:[LEVELS[0],LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Cytologia',description:'Ściana, błona, nukleoid, rybosomy i plazmidy.',model:'3d'}
    ,{id:'plant-cell',group:'Biologia',icon:'🌱',title:'Komórka roślinna',levels:[LEVELS[0],LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Cytologia',description:'Ściana komórkowa, wakuola i chloroplasty.',model:'3d'}
    ,{id:'rna',group:'Biologia',icon:'🧬',title:'RNA i transkrypcja',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Biologia molekularna',description:'Powstawanie RNA, dojrzałe RNA i podstawy ekspresji genów.',model:'animation'}
    ,{id:'protein',group:'Biologia',icon:'🧩',title:'Synteza białka i kod genetyczny',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Biologia molekularna',description:'Translacja, rybosom i kolejność kodonów.',model:'animation'}
    ,{id:'meiosis',group:'Biologia',icon:'➗',title:'Mejoza i crossing-over',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Podziały komórkowe',description:'Etapy mejozy, crossing-over i różnice między produktami podziału.',model:'animation'}
    ,{id:'genetics',group:'Biologia',icon:'🧬',title:'Dziedziczenie i krzyżówki genetyczne',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Genetyka',description:'Allele, genotypy, fenotypy i prostsze krzyżówki.',model:'simulation'}
    ,{id:'epigenetics',group:'Biologia',icon:'🧬',title:'Epigenetyka i regulacja ekspresji',levels:[LEVELS[4],LEVELS[5],LEVELS[6]],stage:'Genetyka molekularna',description:'Metylacja, organizacja chromatyny i regulacja genów.',model:'3d'}
    ,{id:'immune',group:'Nauki medyczne',icon:'🛡️',title:'Odporność i reakcje immunologiczne',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Fizjologia',description:'Limfocyty, przeciwciała i mechanizmy odporności.',model:'animation'}
    ,{id:'gasexchange',group:'Nauki medyczne',icon:'🫁',title:'Wymiana gazowa i wentylacja',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Fizjologia',description:'Wentylacja płuc, dyfuzja tlenu i dwutlenku węgla.',model:'simulation'}
    ,{id:'kidney',group:'Nauki medyczne',icon:'🫘',title:'Filtracja nerkowa i homeostaza',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Fizjologia',description:'Kłębuszek, kanaliki i regulacja środowiska wewnętrznego.',model:'simulation'}
    ,{id:'nerves',group:'Nauki medyczne',icon:'⚡',title:'Impuls nerwowy i synapsa',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Fizjologia',description:'Depolaryzacja, potencjał czynnościowy i przekaz synaptyczny.',model:'animation'}
    ,{id:'photosynthesis',group:'Biologia',icon:'☀️',title:'Fotosynteza i transport asymilatów',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Botanika',description:'Reakcje zależne i niezależne od światła oraz transport materiału organicznego.',model:'animation'}
    ,{id:'tissue',group:'Biologia',icon:'🌿',title:'Tkanki roślinne i przekroje',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Botanika',description:'Tkanki twórcze, okrywające, miękiszowe i przewodzące.',model:'3d'}
    ,{id:'succession',group:'Nauki przyrodnicze',icon:'🌱',title:'Sukcesja ekologiczna i populacje',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Ekologia i ewolucja',description:'Zmiany ekosystemu, dynamika populacji i zależności gatunków.',model:'simulation'}
    ,{id:'evolution',group:'Nauki przyrodnicze',icon:'🦕',title:'Dobór naturalny i filogeneza',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Ewolucja',description:'Zmienność, dobór, specjacja i drzewa filogenetyczne.',model:'simulation'}
    ,{id:'periodic',group:'Chemia',icon:'⚛️',title:'Układ okresowy i własności pierwiastków',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Budowa materii',description:'Promień, elektroujemność i energia jonizacji.',model:'simulation'}
    ,{id:'bonds',group:'Chemia',icon:'🔗',title:'Wiązania i geometria cząsteczek',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Wiązania chemiczne',description:'Wiązania jonowe, kowalencyjne i oddziaływania międzycząsteczkowe.',model:'3d'}
    ,{id:'galvanic',group:'Chemia',icon:'🔋',title:'Ogniwa i elektroliza',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Chemia fizyczna',description:'Potencjały elektrod, półreakcje i kierunek przepływu elektronów.',model:'simulation'}
    ,{id:'buffer',group:'Chemia',icon:'🧪',title:'Roztwory, pH i bufory',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Chemia fizyczna',description:'Stężenie, pH i zdolność buforowania.',model:'simulation'}
    ,{id:'newton',group:'Fizyka',icon:'🍎',title:'Zasady dynamiki Newtona',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Mechanika',description:'Siły, równowaga i przyspieszenie układu.',model:'3d'}
    ,{id:'collisions',group:'Fizyka',icon:'🎱',title:'Zderzenia i pęd',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Mechanika',description:'Zachowanie pędu i całkowitej energii mechanicznej.',model:'simulation'}
    ,{id:'thermodynamics',group:'Fizyka',icon:'🌡️',title:'Prawa termodynamiki i przemiany gazowe',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Termodynamika',description:'Ciśnienie, temperatura, objętość i energia wewnętrzna.',model:'simulation'}
    ,{id:'magnetism',group:'Fizyka',icon:'🧲',title:'Pole magnetyczne i indukcja',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Elektryczność i magnetyzm',description:'Linie pola, siła Lorentza i indukcja elektromagnetyczna.',model:'3d'}
    ,{id:'refraction',group:'Fizyka',icon:'💧',title:'Odbicie i załamanie światła',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Optyka',description:'Prawo Snella, promienie i kąt krytyczny.',model:'animation'}
    ,{id:'quantum',group:'Fizyka',icon:'⚛️',title:'Mechanika kwantowa i atom',levels:[LEVELS[4],LEVELS[5],LEVELS[6]],stage:'Fizyka współczesna',description:'Poziomy energetyczne, fotony i uproszczony model atomu.',model:'3d'}
    ,{id:'planes',group:'Matematyka',icon:'📐',title:'Geometria płaska i konstrukcje',levels:[LEVELS[0],LEVELS[1],LEVELS[2],LEVELS[3]],stage:'Geometria',description:'Wielokąty, okręgi, twierdzenia i konstrukcje.',model:'simulation'}
    ,{id:'trigonometry',group:'Matematyka',icon:'◿',title:'Trygonometria i koło jednostkowe',levels:[LEVELS[1],LEVELS[2],LEVELS[3],LEVELS[4]],stage:'Trygonometria',description:'Sinus, cosinus, tangens i zależności geometryczne.',model:'simulation'}
    ,{id:'sequences',group:'Matematyka',icon:'🔢',title:'Ciągi i granice',levels:[LEVELS[2],LEVELS[3],LEVELS[4],LEVELS[5]],stage:'Analiza matematyczna',description:'Wyrazy ciągu, monotoniczność i granica.',model:'simulation'}
    ,{id:'ode',group:'Matematyka',icon:'∂',title:'Równania różniczkowe',levels:[LEVELS[4],LEVELS[5],LEVELS[6]],stage:'Analiza matematyczna',description:'Pole kierunków i rozwiązania przykładowych równań pierwszego rzędu.',model:'simulation'}
  ];

  let activeLab=null, sceneState=null, animationFrame=null, activeSelection=null;
  function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}

  function render(container){
    const progress=window.EducationStore?.read('labProgress')||{};
    const history=window.EducationStore?.read('labHistory')||[];
    container.innerHTML=`<section class="workspace-header lab-header"><div><p class="workspace-kicker">Interaktywne centrum naukowe</p><h2>Laboratoria</h2></div><button type="button" id="resumeLab" class="soft-button">Kontynuuj ostatnie</button></section>
      <div class="lab-toolbar"><input id="labSearch" type="search" placeholder="Szukaj zagadnienia, np. DNA, atom, wahadło"/><select id="labGroup"><option value="all">Wszystkie dziedziny</option><option>Biologia</option><option>Chemia</option><option>Fizyka</option><option>Matematyka</option><option>Nauki medyczne</option><option>Nauki przyrodnicze</option></select><select id="labLevel"><option value="all">Wszystkie poziomy</option>${LEVELS.map(level=>`<option>${escapeHtml(level)}</option>`).join('')}</select></div>
      <div id="labCatalog" class="lab-catalog"></div><section id="labCanvas" class="lab-canvas"><p class="workspace-muted">Wybierz zagadnienie z katalogu, aby rozpocząć laboratorium.</p></section>`;
    renderCatalog();
    container.querySelector('#labSearch').addEventListener('input',renderCatalog);
    container.querySelector('#labGroup').addEventListener('change',renderCatalog);
    container.querySelector('#labLevel').addEventListener('change',renderCatalog);
    container.querySelector('#resumeLab').addEventListener('click',()=>{
      const last=history[0]?.id;const lab=catalog.find(item=>item.id===last);
      if(lab)openLab(lab);
      else document.querySelector('#labSearch').focus();
    });
  }

  function renderCatalog(){
    const search=document.querySelector('#labSearch')?.value.toLowerCase()||'';
    const group=document.querySelector('#labGroup')?.value||'all';
    const level=document.querySelector('#labLevel')?.value||'all';
    const progress=window.EducationStore?.read('labProgress')||{};
    const filtered=catalog.filter(lab=>(group==='all'||lab.group===group)&&(level==='all'||lab.levels.includes(level))&&(lab.title+' '+lab.stage+' '+lab.description+' '+lab.group).toLowerCase().includes(search));
    const element=document.querySelector('#labCatalog');
    if(!element)return;
    element.innerHTML=filtered.length?filtered.map(lab=>{
      const value=progress[lab.id]?.mastery||0;
      return `<button type="button" class="lab-catalog-card ${activeLab?.id===lab.id?'active':''}" data-open-lab="${lab.id}"><span class="lab-card-icon">${lab.icon}</span><span class="lab-card-copy"><small>${escapeHtml(lab.group)} · ${escapeHtml(lab.stage)}</small><strong>${escapeHtml(lab.title)}</strong><span>${escapeHtml(lab.description)}</span></span><span class="lab-progress"><i style="width:${value}%"></i><small>${value}%</small></span></button>`;
    }).join(''):`<p class="workspace-muted">Brak zagadnień dla wybranych filtrów.</p>`;
    element.querySelectorAll('[data-open-lab]').forEach(button=>button.addEventListener('click',()=>openLab(catalog.find(lab=>lab.id===button.dataset.openLab))));
  }

  function openLab(lab){
    if(!lab)return;
    activeLab=lab;activeSelection=null;
    stopThree();
    document.querySelectorAll('[data-open-lab]').forEach(button=>button.classList.toggle('active',button.dataset.openLab===lab.id));
    recordLabVisit(lab);
    const canvas=document.querySelector('#labCanvas');
    canvas.innerHTML=`<div class="lab-workspace"><header class="lab-workspace-header"><div><p class="workspace-kicker">${escapeHtml(lab.group)} · ${escapeHtml(lab.stage)}</p><h3>${escapeHtml(lab.title)}</h3></div><span class="lab-model-type">${lab.model==='3d'?'Model 3D':lab.model==='animation'?'Animacja':lab.model==='simulation'?'Symulacja':'Eksperyment'}</span></header>
      <div class="lab-main-grid"><div class="lab-model-column"><div id="threeHost" class="three-host" aria-label="Interaktywny model edukacyjny"></div><div class="model-controls"><button type="button" data-model-action="reset">Reset widoku</button><button type="button" data-model-action="zoom">Powiększ</button><button type="button" data-model-action="layers">Ukryj/pokaż warstwy</button><button type="button" data-model-action="play">Odtwórz</button><button type="button" data-model-action="pause">Pauza</button><button type="button" data-model-action="stop">Stop</button><label>Prędkość <input id="animSpeed" type="range" min="0.25" max="2" step="0.25" value="1"></label></div></div>
      <aside class="lab-side-panel"><div class="lab-tabs"><button type="button" class="active" data-lab-tab="about">Opis</button><button type="button" data-lab-tab="quiz">Test</button><button type="button" data-lab-tab="ai">AI</button></div><div id="labTabContent"></div></aside></div></div>`;
    initThree(lab);
    renderLabTab('about');
    canvas.querySelectorAll('[data-lab-tab]').forEach(button=>button.addEventListener('click',()=>renderLabTab(button.dataset.labTab)));
    canvas.querySelectorAll('[data-model-action]').forEach(button=>button.addEventListener('click',()=>modelAction(button.dataset.modelAction)));
  }

  function recordLabVisit(lab){
    if(!window.EducationStore)return;
    window.EducationStore.update('labHistory',history=>[{id:lab.id,title:lab.title,group:lab.group,visitedAt:new Date().toISOString()},...(history||[])].slice(0,100));
    window.EducationStore.update('labProgress',progress=>{
      const current=progress[lab.id]||{visits:0,mastery:0,simulations:0};
      return {...progress,[lab.id]:{...current,visits:current.visits+1,lastVisited:new Date().toISOString()}};
    });
  }

  function setProgress(id,mastery,simulation=false){
    if(!window.EducationStore)return;
    window.EducationStore.update('labProgress',progress=>{
      const current=progress[id]||{visits:0,mastery:0,simulations:0};
      return {...progress,[id]:{...current,mastery:Math.max(current.mastery,Math.round(mastery)),simulations:current.simulations+(simulation?1:0)}};
    });
  }

  function stopThree(){
    if(animationFrame)cancelAnimationFrame(animationFrame);
    animationFrame=null;
    if(sceneState?.renderer){sceneState.renderer.dispose();sceneState=null;}
  }

  function initThree(lab){
    const host=document.querySelector('#threeHost');
    if(!host||!window.THREE){host.innerHTML='<p class="workspace-error">Biblioteka Three.js nie została załadowana. Sprawdź połączenie z CDN.</p>';return;}
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));renderer.setSize(host.clientWidth||700,host.clientHeight||420);renderer.outputColorSpace=THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    const scene=new THREE.Scene();scene.background=new THREE.Color(document.documentElement.dataset.theme==='light'?0xf8fafc:0x17142c);
    const camera=new THREE.PerspectiveCamera(42,renderer.domElement.width/renderer.domElement.height,0.1,100);camera.position.set(0,2,9);
    const hemi=new THREE.HemisphereLight(0xdbeafe,0x18122d,2);scene.add(hemi);
    const light=new THREE.DirectionalLight(0xffffff,2.5);light.position.set(5,8,6);scene.add(light);
    const root=new THREE.Group();scene.add(root);
    sceneState={renderer,scene,camera,root,playing:false,speed:1,layersVisible:true,zoomed:false,time:0};
    buildModel(lab.id,root);
    sceneState.raycaster=new THREE.Raycaster();sceneState.pointer=new THREE.Vector2();
    renderer.domElement.addEventListener('pointerdown',onPointerDown);
    renderer.domElement.addEventListener('wheel',onWheel,{passive:true});
    addDragControls(renderer.domElement,camera,root);
    function animate(){
      animationFrame=requestAnimationFrame(animate);
      const state=sceneState;if(!state)return;
      state.time+=0.016*state.speed;
      animateModel(lab.id,state.root,state.time,state.playing);
      renderer.render(scene,camera);
    }
    animate();
  }

  function buildModel(id,root){
    if(id==='cell'||id==='anatomy'||id==='plant'||id==='microbiology')buildCell(root,id);
    else if(id==='dna'||id==='mitosis')buildDNA(root,id);
    else if(id==='atom'||id==='organic'||id==='molecule'||id==='modern')buildAtom(root,id);
    else if(id==='mechanics'||id==='pendulum'||id==='waves'||id==='circuit'||id==='optics'||id==='heart'||id==='ecology'||id==='kinetics'||id==='chemphysical'||id==='safechem'||id==='function'||id==='geometry'||id==='derivative'||id==='vectors'||id==='probability')buildGeneric(root,id);
  }

  function mesh(sphere,color,x,y,z,size=1,opacity=1){
    const geometry=sphere?new THREE.SphereGeometry(size,24,18):new THREE.BoxGeometry(size*1.5,size,size*.45);
    const material=new THREE.MeshStandardMaterial({color,roughness:.38,metalness:.1,transparent:opacity<1,opacity});
    const result=new THREE.Mesh(geometry,material);result.position.set(x,y,z);return result;
  }

  function buildCell(root,id){
    const membrane=mesh(true,0x64c7f4,0,0,0,3.1,.28);membrane.userData.label='Błona komórkowa';membrane.userData.description='Oddziela wnętrze komórki od środowiska i kontroluje transport.';membrane.name='membrane';root.add(membrane);
    const nucleus=mesh(true,0x8b5cf6,0,.15,.2,.95);nucleus.userData.label='Jądro';nucleus.userData.description='Przechowuje DNA i reguluje ekspresję genów.';nucleus.name='nucleus';root.add(nucleus);
    const positions=[[2,1,.2],[1.5,-1.2,-.1],[-1.8,1,-.2],[-1.4,-1.1,.1],[.5,1.8,-.4]];
    const labels=['Mitochondrium','Aparat Golgiego','Siateczka śródplazmatyczna','Lizozom','Peroksysom'];
    positions.forEach((pos,i)=>{const organelle=mesh(true,i===0?0xf97316:i===1?0xfacc15:i===2?0x22c55e:i===3?0xec4899:0x38bdf8,pos[0],pos[1],pos[2],i===0?.52:.38);organelle.userData.label=labels[i];organelle.userData.description=id==='plant'? 'Struktura wspomaga metabolizm i organizację wnętrza komórki.':'Organella pełni wyspecjalizowaną funkcję komórkową.';organelle.name='organelle';root.add(organelle);});
  }

  function buildDNA(root,id){
    for(let i=-7;i<=7;i++){
      const y=i*.28,t=i*.42;
      const a=mesh(true,i%2?0x60a5fa:0xf472b6,-Math.cos(t)*1.1,y,Math.sin(t)*1.1,.18);a.userData.label=i%2?'Tymina / adenina':'Cytozyną / guanina';
      const b=mesh(true,i%2?0xf472b6:0x60a5fa,Math.cos(t)*1.1,y,-Math.sin(t)*1.1,.18);
      root.add(a,b);
      if(i<7){const rung=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,2.2,8),new THREE.MeshStandardMaterial({color:0x94a3b8}));rung.position.set(0,y+.14,0);rung.rotation.z=Math.PI/2;rung.rotation.x=t;rung.userData.label='Para zasad';root.add(rung);}
    }
  }

  function buildAtom(root,id){
    const nucleusPositions=[[0,0,0],[.18,.12,.05],[-.16,-.1,.08],[.06,-.18,-.08]];
    nucleusPositions.forEach((p,i)=>{const particle=mesh(true,i%2?0xf97316:0xef4444,p[0],p[1],p[2],.25);particle.userData.label=i%2?'Neutron':'Proton';root.add(particle);});
    [1.4,2.15,2.8].forEach((radius,index)=>{
      const curve=new THREE.EllipseCurve(0,0,radius,radius*.68,0,Math.PI*2,false,0);
      const points=curve.getPoints(64).map(point=>new THREE.Vector3(point.x,0,point.y));
      const line=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0x67e8f9,transparent:true,opacity:.55}));
      line.rotation.x=index*.35;line.userData.label=`Powłoka elektronowa ${index+1}`;root.add(line);
      const electron=mesh(true,0x38bdf8,radius,0,0,.12);electron.userData.label='Elektron';electron.userData.description='Elektron na uprawnionym energetycznie poziomie.';electron.name='electron';electron.userData.radius=radius;electron.userData.index=index;root.add(electron);
    });
  }

  function buildGeneric(root,id){
    const colors=[0x60a5fa,0xa78bfa,0x34d399,0xfbbf24];
    for(let i=0;i<5;i++){const item=mesh(true,colors[i%colors.length],(i-2)*1.15,Math.sin(i)*.5,0,.38);item.userData.label=['Element','Siła','Wielkość','Stan','Zależność'][i];item.name='generic';root.add(item);}
  }

  function animateModel(id,root,time,playing){
    root.children.forEach((item,index)=>{
      if(item.name==='electron'){
        const radius=item.userData.radius||1,index=item.userData.index||0;
        item.position.x=Math.cos(time*(1.2-index*.12)+index)*radius;
        item.position.z=Math.sin(time*(1.2-index*.12)+index)*radius*.68;
      }
      if(playing&&(item.name==='organelle'||item.name==='generic'))item.position.y+=Math.sin(time*2+index)*.001;
      if(id==='dna'&&playing)item.rotation.y+=.002;
    });
  }

  function addDragControls(dom,camera,root){
    let dragging=false,lastX=0,lastY=0;
    dom.addEventListener('pointerdown',event=>{dragging=true;lastX=event.clientX;lastY=event.clientY;dom.setPointerCapture?.(event.pointerId);});
    dom.addEventListener('pointermove',event=>{if(!dragging)return;const dx=event.clientX-lastX,dy=event.clientY-lastY;root.rotation.y+=dx*.008;root.rotation.x+=dy*.008;lastX=event.clientX;lastY=event.clientY;});
    dom.addEventListener('pointerup',()=>{dragging=false;});
  }

  function onWheel(event){if(!sceneState)return;sceneState.camera.position.z=Math.max(4,Math.min(16,sceneState.camera.position.z+(event.deltaY>0?0.5:-0.5))); }

  function onPointerDown(event){
    if(!sceneState)return;
    const rect=event.currentTarget.getBoundingRect?.()||event.currentTarget.getBoundingClientRect();
    sceneState.pointer.x=((event.clientX-rect.left)/rect.width)*2-1;sceneState.pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
    sceneState.raycaster.setFromCamera(sceneState.pointer,sceneState.camera);
    const hits=sceneState.raycaster.intersectObjects(sceneState.root.children,true);
    if(!hits.length)return;
    activeSelection=hits[0].object;
    sceneState.root.children.forEach(object=>{if(object.material)object.material.emissive?.setHex(object===activeSelection?0x334155:0x000000);});
    renderLabTab('about');
  }

  function modelAction(action){
    if(!sceneState)return;
    if(action==='reset'){sceneState.camera.position.set(0,2,9);sceneState.root.rotation.set(0,0,0);}
    if(action==='zoom'){sceneState.zoomed=!sceneState.zoomed;sceneState.camera.position.z=sceneState.zoomed?5.5:9;}
    if(action==='layers'){sceneState.layersVisible=!sceneState.layersVisible;sceneState.root.children.forEach((object,index)=>{if(object.name==='organelle'||object.name==='nucleus'||object.name==='membrane')object.visible=sceneState.layersVisible||index===0;});}
    if(action==='play'){sceneState.playing=true;}
    if(action==='pause'){sceneState.playing=false;}
    if(action==='stop'){sceneState.playing=false;sceneState.time=0;sceneState.root.rotation.set(0,0,0);}
  }

  function renderLabTab(tab){
    const content=document.querySelector('#labTabContent');if(!content)return;
    document.querySelectorAll('[data-lab-tab]').forEach(button=>button.classList.toggle('active',button.dataset.labTab===tab));
    if(tab==='about')renderAbout(content);
    if(tab==='quiz')renderQuiz(content);
    if(tab==='ai')renderLabAI(content);
  }

  function renderAbout(content){
    const lab=activeLab;
    const selected=activeSelection?.userData;
    content.innerHTML=`<section class="lab-info-card"><h4>${selected?.label?escapeHtml(selected.label):escapeHtml(lab.title)}</h4><p>${escapeHtml(selected?.description||lab.description)}</p><h5>Elementy naukowe</h5><p>${escapeHtml(labKnowledge(lab.id))}</p><h5>Powiązania</h5><p>${escapeHtml(relatedKnowledge(lab.id))}</p></section><div class="lab-sources"><strong>Źródła do weryfikacji</strong><p>Podręczniki i oficjalne materiały CKE oraz odpowiednie literatura przedmiotu. Moduł nie tworzy fikcyjnych referencji.</p></div>`;
  }

  function labKnowledge(id){
    const knowledge={
      cell:'Błona kontroluje transport, jądro przechowuje DNA, mitochondrium wytwarza ATP, a lizosomy rozkładają niepotrzebne składniki.',
      dna:'DNA jest dwuniciowym materiałem genetycznym; replikacja jest półkonserwatywna, a RNA powstaje w transkrypcji.',
      mitosis:'Cykl komórkowy obejmuje interfazę i fazy podziału. Mitoza zachowuje liczbę chromosomów diploidalnych.',
      atom:'W próbnym modelu liczba powłok i elektronów nie zastępuje pełnego modelu mechaniki kwantowej.',
      molecule:'Geometria cząsteczki zależy od liczby wiązań i elektronów wolnych; przestrzeń wiązań ma znaczenie dla własności.',
      function:'Współczynniki funkcji określają kierunek ramion, położenie wierzchołka i miejsca przecięcia.',
      heart:'Cykl sercowy obejmuje skurcz i rozkurcz przedsionków oraz komór; krążenie małe i duże mają przeciwne kierunki przepływu.',
      mechanics:'Ruch opisują położenie, prędkość i przyspieszenie; siła jest związana z przyspieszeniem przez II zasadę dynamiki.',
      waves:'Fala opisuje rozchodzenie się zaburzenia; amplituda, częstotliwość i długość fali mają odrębne znaczenia.'
    };
    return knowledge[id]||'Wybierz strukturę lub element modelu, aby zobaczyć opis i jego powiązania. Wyniki symulacji należy interpretować z zastosowaniem przyjętych założeń.';
  }

  function relatedKnowledge(id){
    const related={
      cell:'Jądro ↔ DNA ↔ białka; mitochondrium ↔ metabolizm; błona ↔ transport.',
      dna:'Replikacja → komórka; transkrypcja → RNA; translacja → białko.',
      atom:'Konfiguracja elektronowa ↔ okresowość ↔ wiązania.',
      heart:'Serce ↔ naczynia ↔ płuca ↔ tkanki.',
      function:'Wzór ↔ wykres ↔ pochodna ↔ zastosowanie.'
    };
    return related[id]||'Zobacz powiązane dział, temat i podtemat w bazie Matura Master.';
  }

  function renderQuiz(content){
    const lab=activeLab;
    content.innerHTML=`<section class="lab-info-card"><h4>Test: ${escapeHtml(lab.title)}</h4><fieldset class="lab-question"><legend>Wskaż kluczową zależność lub wynik opisanego zagadnienia.</legend><label><input type="radio" name="labQuiz" value="0"> Model pokazuje strukturę i powiązania</label><label><input type="radio" name="labQuiz" value="1"> Model jest zawsze równoważny eksperymentowi rzeczywistemu</label><label><input type="radio" name="labQuiz" value="2"> Wynik nie zależy od parametrów</label></fieldset><button type="button" id="labCheckQuiz" class="primary-button">Sprawdź</button><div id="labQuizResult" aria-live="polite"></div></section>`;
    content.querySelector('#labCheckQuiz').addEventListener('click',()=>{
      const answer=content.querySelector('input[name="labQuiz"]:checked');
      const result=content.querySelector('#labQuizResult');
      if(!answer){result.textContent='Wybierz odpowiedź.';return;}
      const correct=answer.value==='0';
      result.textContent=correct?'Poprawna odpowiedź. Model upraszcza rzeczywistość i zachowuje kluczowe zależności.':'Niepoprawna odpowiedź. Model edukacyjny przedstawia wybrane struktury i zależności, nie zastępuje pomiaru rzeczywistego.';
      setProgress(lab.id,correct?100:35,correct);
      window.EducationStore?.recordActivity({type:'lab',topic:lab.title,subject:lab.group,score:correct?100:0});
    });
  }

  function renderLabAI(content){
    const lab=activeLab;
    content.innerHTML=`<section class="lab-info-card"><h4>Zapytaj o ten model</h4><p>${activeSelection?.userData.label?`Wybrano: ${escapeHtml(activeSelection.userData.label)}`:'Brak wybranej struktury.'}</p><textarea id="labAiInput" rows="4" placeholder="Np. Wyjaśnij funkcję i znaczenie tej struktury"></textarea><button type="button" id="labAiSend" class="primary-button">Wyślij do AI</button><div id="labAiResult" class="lab-ai-result"></div></section>`;
    content.querySelector('#labAiSend').addEventListener('click',async()=>{
      const input=content.querySelector('#labAiInput'),result=content.querySelector('#labAiResult'),question=input.value.trim();
      if(!question)return result.textContent='Wpisz pytanie.';
      result.textContent='AI analizuje model…';
      const selected=activeSelection?.userData.label||'brak wybranej struktury';
      const prompt=`Jesteś korepetytorem w laboratorium edukacyjnym. Temat: ${lab.title}. Dziedzina: ${lab.group}. Wybrano strukturę: ${selected}. Wiedza modelu: ${labKnowledge(lab.id)}. Odpowiadaj po polsku, oznaczaj ograniczenia modelu i nie wymyślaj parametrów. ${window.NotationService?.promptInstructions('Objaśnij symbole i jednostki.') || ''} Pytanie: ${question}`;
      try{
        const answer=await window.AIGateway.chat([{role:'user',content:prompt}],{temperature:.4,max_tokens:1800});
        result.innerHTML=`<strong>Odpowiedź:</strong><div class="notation-host" id="labAiAnswer"></div>`;
        window.NotationService?.renderInto(result.querySelector('#labAiAnswer'),answer);
        window.EducationStore?.recordActivity({type:'lab-ai',topic:lab.title,subject:lab.group});
      }catch(error){result.textContent=error instanceof Error?error.message:String(error);}
    });
  }

  return {render,openLab};
})();
