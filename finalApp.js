const state={mode:'liceum',subject:null,topic:null,subtopic:null,level:'Podstawowy',subjectsExpanded:new Set(),topicsExpanded:new Set(),searchTimer:null,voiceConfig:null,subtitles:true};
const $=(id)=>document.getElementById(id);
const escapeHtml=(v)=>String(v??'').replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const formatLessonText=(v)=>escapeHtml(v).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
const normalize=(v)=>String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

function getMode(){return window.CURRICULUM[state.mode];}
function levelMap(){return {'Podstawowy':'podstawowy','Rozszerzony':'rozszerzony','Studia / Medycyna':'medycyna','Olimpiada':'olimpiada'};}

function renderSubjects(){
  hydrateExpandedCurriculum();
  const container=$('subjectsContainer'); const mode=getMode();
  const priority=state.mode==='medical'?['anatomy','physiology','biochemistry','histology','pathology','pharmacology','microbiology','internal']:['mathematics','chemistry','english','german','french','polish','biology','physics','geography','history'];
  const subjectFilter=$('subjectFilter')?.value||'all';
  const levelFilter=$('levelFilter')?.value||'all';
  const entries=state.mode==='medical'
    ?Object.entries(mode.subjects).sort(([,a],[,b])=>{
      const order={'Lata przedkliniczne (Rok 1–2)':0,'Lata kliniczne (Rok 3–5)':1};
      return (order[a.yearGroup]??0)-(order[b.yearGroup]??0);
    })
    :priority.map(k=>[k,mode.subjects[k]]).filter(([,v])=>v);
  const filteredEntries=entries.filter(([key,subject])=>{
    if(subjectFilter!== 'all' && key!==subjectFilter)return false;
    if(levelFilter==='all')return true;
    if(levelFilter==='specjalizacja')return state.mode==='medical';
    return subject.topics.some(topic=>{
      if(levelFilter==='studia')return topic.level==='studia'||topic.level==='medycyna';
      return topic.level===levelFilter;
    });
  });
  const renderCard=([key,subject])=>{
    const filteredTopics=subject.topics.filter(topic=>{
      if(levelFilter==='all')return true;
      if(levelFilter==='specjalizacja')return state.mode==='medical';
      if(levelFilter==='studia')return topic.level==='studia'||topic.level==='medycyna';
      return topic.level===levelFilter;
    });
    return `<article class="subject-card">
    <button class="subject-header" type="button" data-action="subject" data-key="${key}"><span class="subject-name"><span class="subject-icon">${subject.icon}</span>${escapeHtml(subject.name)}</span><span class="subject-meta"><span>${filteredTopics.length} tematy</span></span></button>
    <div class="subject-body ${state.subjectsExpanded.has(key)?'':'hidden'}">${filteredTopics.map(topic=>{const tk=`${key}|${topic.title}`;return `<article class="subject-topic">
      <button class="topic-header" type="button" data-action="topic" data-key="${tk}"><span><strong>${escapeHtml(topic.title)}</strong></span><span class="topic-badge ${topic.level}">${topic.level}</span></button>
      <div class="subtopic-list ${state.topicsExpanded.has(tk)?'':'hidden'}">${topic.subtopics.map(s=>`<button type="button" class="subtopic-button" data-action="subtopic" data-subject="${key}" data-topic="${escapeHtml(topic.title)}" data-subtopic="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join('')}</div>
      <button type="button" class="expand-ai-button" data-action="expand-topic-ai" data-subject="${key}" data-subject-name="${escapeHtml(subject.name)}" data-topic="${escapeHtml(topic.title)}">➕ Rozwiń pełną listę zagadnień (AI)</button>
    </article>`}).join('')}</div></article>`;
  };
  if(state.mode==='medical'){
    const groups=new Map();
    filteredEntries.forEach(entry=>{
      const group=entry[1].yearGroup||'Lata przedkliniczne (Rok 1–2)';
      if(!groups.has(group))groups.set(group,[]);
      groups.get(group).push(entry);
    });
    container.innerHTML=[...groups].map(([group,subjects])=>`<section class="curriculum-stage"><h3>${escapeHtml(group)}</h3><div class="curriculum-stage-subjects">${subjects.map(renderCard).join('')}</div></section>`).join('');
  }else{
    container.innerHTML=filteredEntries.map(renderCard).join('');
  }
}

function renderStats(){
  const mode=getMode(); const subjects=Object.keys(mode.subjects).length;
  const topics=Object.values(mode.subjects).reduce((n,s)=>n+s.topics.length,0);
  const subtopics=Object.values(mode.subjects).reduce((n,s)=>n+s.topics.reduce((q,t)=>q+t.subtopics.length,0),0);
  $('statsGrid').innerHTML=`<div class="stat-card"><span class="label">Tryb</span><span class="value">${escapeHtml(mode.label)}</span></div><div class="stat-card"><span class="label">Przedmioty</span><span class="value">${subjects}</span></div><div class="stat-card"><span class="label">Tematy</span><span class="value">${topics}</span></div><div class="stat-card"><span class="label">Podtematy</span><span class="value">${subtopics}</span></div>`;
}

function flatten(){const mode=getMode();const out=[];Object.entries(mode.subjects).forEach(([sk,s])=>s.topics.forEach(t=>t.subtopics.forEach(st=>out.push({subjectKey:sk,subject:s,topic:t,subtopic:typeof st==='string'?st:st.name}))));return out;}

function renderSearch(query){
  const box=$('suggestions'); const term=normalize(query);
  if(!term){box.classList.add('hidden');box.innerHTML='';return;}
  const matches=flatten().map(e=>{const hay=normalize([e.subject.name,e.topic.title,e.subtopic].join(' '));const words=term.split(/\s+/);const coverage=words.filter(w=>hay.includes(w)).length/words.length;return{...e,coverage}}).filter(e=>e.coverage>0).sort((a,b)=>b.coverage-a.coverage).slice(0,8);
  box.innerHTML=matches.map(e=>`<button type="button" class="search-suggestion-item" data-action="search-result" data-subject="${e.subjectKey}" data-topic="${escapeHtml(e.topic.title)}" data-subtopic="${escapeHtml(e.subtopic)}"><span class="search-suggestion-title">${escapeHtml(e.subtopic)}</span><span class="search-suggestion-meta">${escapeHtml(e.subject.name)} • ${escapeHtml(e.topic.title)}</span></button>`).join('')+`<button type="button" class="search-suggestion-item ai-search" data-action="ai-search" data-query="${escapeHtml(query)}"><span class="search-suggestion-title">Szukaj głęboko z AI</span><span class="search-suggestion-meta">Encyklopedia Groq AI: „${escapeHtml(query)}”</span></button>`;
  box.classList.remove('hidden');
}

function findSubjectTopic(subjectKey,topicTitle,subtopic){const subject=getMode().subjects[subjectKey];const topic=subject?.topics.find(t=>t.title===topicTitle);return subject&&topic?{subjectKey,subject,topic,subtopic}:null;}

function renderMath(root=document.body){if(window.renderMathInElement)renderMathInElement(root,{delimiters:[{left:'$$',right:'$$',display:true},{left:'\\(',right:'\\)',display:false},{left:'$',right:'$',display:false}],throwOnError:false});}

function renderNotationContent(root,lesson){
  if(!window.NotationService)return;
  const mapping={
    'definition':lesson.definition,
    'explanation':lesson.explanation,
    'clinical-tip':lesson.clinicalTip,
    'warning':lesson.warning,
    'example':lesson.example,
    'answer':lesson.answer,
    'answer-explanation':lesson.explanationOfAnswer,
    'summary':lesson.summary
  };
  Object.entries(mapping).forEach(([key,value])=>{
    root.querySelectorAll(`[data-notation="${key}"]`).forEach(host=>window.NotationService.renderInto(host,value||''));
  });
  root.querySelectorAll('[data-notation-formula]').forEach((host,index)=>{
    window.NotationService.renderFormula(host,(lesson.formulas||[])[index]||host.textContent,true);
  });
}

function configureLessonReader(){
  if(!window.LessonReader)return;
  window.LessonReader.configure({
    getNeighbors(context){
      const subject=getMode().subjects[context.subjectKey];
      const topic=subject?.topics.find(item=>item.title===context.topic.title);
      const subtopics=(topic?.subtopics||[]).map(item=>typeof item==='string'?item:item.name);
      const index=subtopics.indexOf(context.subtopic);
      const previous=index>0?subtopics[index-1]:null;
      const next=index>=0&&index<subtopics.length-1?subtopics[index+1]:null;
      return {
        previous:previous?{subtopic:previous.subtopic,subjectKey:previous.subjectKey,topicTitle:previous.topic.title}:null,
        next:next?{subtopic:next.subtopic,subjectKey:next.subjectKey,topicTitle:next.topic.title}:null
      };
    },
    open(neighbor){
      if(!neighbor)return;
      const context=findSubjectTopic(neighbor.subjectKey,neighbor.topicTitle,neighbor.subtopic);
      if(context)openLesson(context);
    }
  });
}

async function renderReaderVisuals(root,lesson){
  const visual=root.querySelector('[data-lesson-visual]');
  if(!visual||lesson?.__noVisual)return;
  const mermaidSource=lesson.mermaid||'';
  const chartSource=typeof lesson.chartjs==='string'?lesson.chartjs:lesson.chartjs?JSON.stringify(lesson.chartjs):'';
  const svgSource=lesson.svg||'';
  const description=lesson.visualDescription||'';
  let rendered=false;
  const cleanMermaid=String(mermaidSource).replace(/^```(?:mermaid)?\s*/i,'').replace(/\s*```$/,'').trim();
  const cleanSvg=String(svgSource).replace(/^```(?:svg|xml)?\s*/i,'').replace(/\s*```$/,'').trim();
  if(cleanMermaid&&window.mermaid){
    const diagram=document.createElement('div');
    diagram.className='mermaid lesson-mermaid';
    diagram.textContent=cleanMermaid;
    visual.appendChild(diagram);
    try{window.mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:document.documentElement.dataset.theme==='light'?'default':'dark'});await window.mermaid.run({nodes:[diagram]});rendered=true;}catch(error){diagram.textContent='Schemat nie został poprawnie wygenerowany.';diagram.classList.add('visual-error');}
  }
  if(chartSource&&window.Chart){
    try{
      let source=JSON.parse(String(chartSource).replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'').trim());
      if(source?.type&&Array.isArray(source?.data?.labels)&&Array.isArray(source?.data?.datasets)){
        const canvas=document.createElement('canvas');
        canvas.setAttribute('aria-label','Wykres do lekcji');
        visual.appendChild(canvas);
        new window.Chart(canvas,{type:['line','bar','scatter','radar'].includes(source.type)?source.type:'line',data:{labels:source.data.labels.map(String),datasets:source.data.datasets.map((dataset,index)=>({label:String(dataset.label||`Seria ${index+1}`),data:Array.isArray(dataset.data)?dataset.data.map(value=>Number.isFinite(Number(value))?Number(value):null):[],borderColor:dataset.borderColor||'#2563eb',backgroundColor:dataset.backgroundColor||'rgba(37,99,235,.18)',tension:.25}))},options:{responsive:true,maintainAspectRatio:true}});
        rendered=true;
      }
    }catch{const message=document.createElement('p');message.className='visual-error';message.textContent='Wykres nie został poprawnie wygenerowany.';visual.appendChild(message);}
  }
  if(cleanSvg){
    const svg=safeSvgElement(cleanSvg);
    if(svg){visual.appendChild(svg);rendered=true;}
  }
  if(description){
    const descriptionElement=document.createElement('p');
    descriptionElement.className='lesson-visual-description';
    descriptionElement.textContent=LessonReader.sanitizeEducationalText(description);
    visual.appendChild(descriptionElement);
  }
  if(!rendered&&!description){
    const fallback=document.createElement('p');
    fallback.className='lesson-visual-description';
    fallback.textContent='Ilustracja nie jest dostępna dla tego tematu.';
    visual.appendChild(fallback);
  }
}

function safeSvgElement(svgText){
  if(!svgText)return null;
  const parsed=new DOMParser().parseFromString(svgText,'image/svg+xml');
  const root=parsed.documentElement;
  if(root.localName!=='svg'||parsed.querySelector('parsererror'))return null;
  const allowedTags=new Set(['svg','g','path','rect','circle','ellipse','line','polyline','polygon','text','tspan','defs','marker','linearGradient','stop','title','desc']);
  const allowedAttributes=new Set(['xmlns','viewBox','width','height','x','y','x1','x2','y1','y2','cx','cy','r','rx','ry','d','points','fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','fill-rule','opacity','transform','offset','stop-color','stop-opacity','font-size','font-weight','text-anchor','marker-end']);
  const copyNode=node=>{
    if(node.nodeType===Node.TEXT_NODE)return document.createTextNode(node.textContent);
    if(node.nodeType!==Node.ELEMENT_NODE||!allowedTags.has(node.localName))return null;
    const copy=document.createElementNS('http://www.w3.org/2000/svg',node.localName);
    [...node.attributes].forEach(attribute=>{
      if(allowedAttributes.has(attribute.name)&&!/(url\s*\(|javascript:|https?:)/i.test(attribute.value))copy.setAttribute(attribute.name,attribute.value);
    });
    [...node.childNodes].forEach(child=>{const safe=copyNode(child);if(safe)copy.appendChild(safe);});
    return copy;
  };
  return copyNode(root);
}

async function renderLessonVisuals(root){
  const visual=root.querySelector('[data-lesson-visual]');
  if(!visual)return;
  const mermaidSource=visual.dataset.mermaid||'';
  const chartSource=visual.dataset.chart||'';
  const svgSource=visual.dataset.svg||'';
  const description=visual.dataset.description||'';
  let hasRenderedVisual=false;
  const cleanMermaid=mermaidSource.replace(/^```(?:mermaid)?\s*/i,'').replace(/\s*```$/,'').trim();
  const cleanSvg=svgSource.replace(/^```(?:svg|xml)?\s*/i,'').replace(/\s*```$/,'').trim();
  if(cleanMermaid&&window.mermaid){
    const diagram=document.createElement('div');
    diagram.className='mermaid lesson-mermaid';
    diagram.textContent=cleanMermaid;
    visual.appendChild(diagram);
    try{
      window.mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:'dark'});
      await window.mermaid.run({nodes:[diagram]});
      hasRenderedVisual=true;
    }catch(error){
      diagram.textContent=`Nie udało się wyrenderować schematu: ${error.message}`;
      diagram.classList.add('visual-error');
    }
  }
  if(chartSource&&window.Chart){
    try{
      let source=JSON.parse(chartSource.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'').trim());
      if(typeof source==='string')source=JSON.parse(source.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'').trim());
      const type=['line','bar','scatter','radar'].includes(source.type)?source.type:null;
      if(type&&Array.isArray(source.data?.labels)&&Array.isArray(source.data?.datasets)){
        const canvas=document.createElement('canvas');
        canvas.setAttribute('aria-label','Wykres do lekcji');
        visual.appendChild(canvas);
        const datasets=source.data.datasets.map((dataset,index)=>({
          label:String(dataset.label||`Seria ${index+1}`),
          data:Array.isArray(dataset.data)?dataset.data.map(value=>Number.isFinite(Number(value))?Number(value):null):[],
          borderColor:typeof dataset.borderColor==='string'?dataset.borderColor:'#60a5fa',
          backgroundColor:typeof dataset.backgroundColor==='string'?dataset.backgroundColor:'rgba(96,165,250,.25)',
          tension:type==='line'?0.25:0
        }));
        new window.Chart(canvas,{type,data:{labels:source.data.labels.map(String),datasets},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:datasets.length>1},title:{display:typeof source.options?.plugins?.title?.text==='string',text:String(source.options?.plugins?.title?.text||'')}},scales:{x:{title:{display:!!source.options?.scales?.x?.title?.text,text:String(source.options?.scales?.x?.title?.text||'')}},y:{beginAtZero:!!source.options?.scales?.y?.beginAtZero,title:{display:!!source.options?.scales?.y?.title?.text,text:String(source.options?.scales?.y?.title?.text||'')}}}}});
        hasRenderedVisual=true;
      }
    }catch(error){
      const message=document.createElement('p');
      message.className='visual-error';
      message.textContent=`Nie udało się wyrenderować wykresu: ${error.message}`;
      visual.appendChild(message);
    }
  }
  const svg=safeSvgElement(cleanSvg);
  if(svg){visual.appendChild(svg);hasRenderedVisual=true;}
  else if(cleanSvg){
    const message=document.createElement('p');
    message.className='visual-error';
    message.textContent='Nie udało się bezpiecznie odczytać schematu SVG.';
    visual.appendChild(message);
  }
  if(description||!hasRenderedVisual){
    const fallback=document.createElement('p');
    fallback.className='lesson-visual-description';
    fallback.textContent=description||'Schemat wizualny nie jest dostępny dla tego tematu.';
    visual.appendChild(fallback);
  }
}

async function openLesson(context){
  state.subject=context.subjectKey;state.topic=context.topic.title;state.subtopic=context.subtopic;
  window.lessonReaderLevel=state.level;
  const contextToAI={subject:context.subject.name,topic:context.topic.title,subtopic:context.subtopic,level:state.level};
  const panel=$('detailPanel');
  panel.classList.remove('hidden');
  panel.className='detail-panel lesson-reader-open';
  if(window.LessonReader)LessonReader.renderLoading(context);
  try{
    const lesson=await window.AIService.generateLesson(contextToAI);
    configureLessonReader();
    if(window.LessonReader)LessonReader.render(context,lesson);
    await renderReaderVisuals(panel,lesson);
  }catch(error){
    configureLessonReader();
    if(window.LessonReader)LessonReader.render(context,{title:context.subtopic,definition:'Lekcja nie została wygenerowana.',explanation:error.message,summary:'Skonfiguruj klucz Groq lub backend AI, aby wygenerować pełną treść lekcji.',coreConcepts:[context.subtopic],warning:'Komunikat techniczny nie został wyświetlony uczniowi jako surowy kod.'});
  }
  renderMath(panel);
  await generateAndRenderQuiz();
}

function lessonShell(context,lesson){
  const formulas=(lesson.formulas||[]).map(f=>`<div class="formula-item"><div class="formula-line notation-host" data-notation-formula>${escapeHtml(f)}</div></div>`).join('')||'<div class="formula-item"><div class="formula-line">Brak wzoru — wymagane analityczne wyjaśnienie.</div></div>';
  const chart=typeof lesson.chartjs==='string'?lesson.chartjs:lesson.chartjs?JSON.stringify(lesson.chartjs):'';
  return `<div class="detail-header"><button type="button" class="close-lesson" data-action="close">←</button><div><p class="detail-kicker">${escapeHtml(context.subject.name)} · ${escapeHtml(context.topic.title)}</p><h3>${escapeHtml(lesson.title||context.subtopic)}</h3></div></div>
  <div class="difficulty-switcher">${[['Podstawowy','Podstawowy'],['Rozszerzony','Rozszerzony'],['Studia / Medycyna','Studia / Medycyna'],['Olimpiada','Olimpiada']].map(([key,label])=>`<button type="button" class="difficulty-button ${state.level===key?'active':''}" data-action="difficulty" data-level="${key}">${label}</button>`).join('')}</div>
  <div class="detail-body lesson-layout"><section class="detail-box span-2 definition-callout"><div class="definition-topline">Definicja</div><div class="definition-main notation-host" data-notation="definition">${escapeHtml(lesson.definition||'')}</div></section>
  <section class="detail-box span-2"><h4>Rozwinięte wyjaśnienie</h4><div class="notation-host" data-notation="explanation">${escapeHtml(lesson.explanation||'')}</div></section>
  <section class="detail-box span-2 formula-callout"><h4>Wzór / Reakcja</h4><div class="formula-list">${formulas}</div></section>
  ${lesson.clinicalTip?`<section class="detail-box span-2 tip-callout"><h4>Korelacja kliniczna / Tip maturalny</h4><div class="notation-host" data-notation="clinical-tip">${escapeHtml(lesson.clinicalTip)}</div></section>`:''}
  ${lesson.warning?`<section class="detail-box span-2 warning-callout"><h4>Uwaga / Częsty błąd</h4><div class="notation-host" data-notation="warning">${escapeHtml(lesson.warning)}</div></section>`:''}
  <section class="detail-box span-2"><h4>Rysunek / schemat / wykres</h4><div class="lesson-visual" data-lesson-visual data-mermaid="${escapeHtml(lesson.mermaid||'')}" data-chart="${escapeHtml(chart)}" data-svg="${escapeHtml(lesson.svg||'')}" data-description="${escapeHtml(lesson.visualDescription||'')}"></div></section>
  ${lesson.example||lesson.answer?`<section class="detail-box span-2"><h4>Przykładowe zadanie</h4><p><strong>Zadanie:</strong> <span class="notation-host" data-notation="example">${escapeHtml(lesson.example||'')}</span></p><p><strong>Odpowiedź:</strong> <span class="notation-host" data-notation="answer">${escapeHtml(lesson.answer||'')}</span></p><p><strong>Uzasadnienie:</strong> <span class="notation-host" data-notation="answer-explanation">${escapeHtml(lesson.explanationOfAnswer||'')}</span></p></section>`:''}
  ${lesson.summary||lesson.coreConcepts?.length?`<section class="detail-box span-2"><h4>Podsumowanie</h4><div class="notation-host" data-notation="summary">${escapeHtml(lesson.summary||'')}</div><ul>${(lesson.coreConcepts||[]).map(c=>`<li>${escapeHtml(c)}</li>`).join('')}</ul></section>`:''}</div>`;
}

async function generateAndRenderQuiz(){
  const subject=getMode().subjects[state.subject];const topic=subject?.topics.find(t=>t.title===state.topic);if(!subject||!topic||!state.subtopic)return;
  const quiz=$('quizCard');quiz.innerHTML='<div class="quiz-loading">Generowanie 5 nowych pytań…</div>'; 
  try{const questions=await window.QuizEngine.generate({subject:subject.name,topic:topic.title,subtopic:state.subtopic,level:state.level});renderQuizQuestion(questions);}
  catch(error){quiz.innerHTML=`<span class="quiz-tag">Mini test</span><p>${escapeHtml(error.message)}</p><button type="button" id="generateQuizInline" class="soft-button">Wygeneruj nowy test</button>`;}
}

function renderQuizQuestion(){const question=window.QuizEngine.getCurrent();if(!question){$('quizCard').innerHTML='<p>Wybierz podtemat.</p>';return;}
 $('quizCard').innerHTML=`<span class="quiz-tag">${escapeHtml(state.subtopic||'Mini test')}</span><h3>${escapeHtml(question.question)}</h3><ul class="answer-list">${question.options.map(o=>`<li><button type="button" data-action="answer" data-answer="${escapeHtml(o)}">${escapeHtml(o)}</button></li>`).join('')}</ul><button type="button" id="generateQuizInline" class="soft-button quiz-refresh">Wygeneruj nowy test</button>`;
}

async function openAI(query){const panel=$('detailPanel');panel.classList.remove('hidden');panel.innerHTML=`<div class="detail-header"><button type="button" class="close-lesson" data-action="close">←</button><h3>${escapeHtml(query)} — Encyklopedia AI</h3></div><div class="detail-body"><div class="detail-box span-2">Ładowanie encyklopedycznej odpowiedzi…</div></div>`;try{const r=await window.AIService.explainConcept(query,state.level);panel.innerHTML=`<div class="detail-header"><button type="button" class="close-lesson" data-action="close">←</button><h3>${escapeHtml(r.title||query)}</h3></div><div class="detail-body"><section class="detail-box span-2"><div class="definition-topline">Definicja</div><div class="definition-main notation-host" id="aiDefinition"></div></section><section class="detail-box span-2"><h4>Wyjaśnienie</h4><div class="notation-host" id="aiExplanation"></div></section><section class="detail-box span-2"><h4>Schemat</h4><div class="lesson-visual"><div class="lesson-visual-glyph">${escapeHtml(r.visualDescription)}</div></div></section><section class="detail-box span-2"><h4>Podsumowanie</h4><div class="notation-host" id="aiSummary"></div></section></div>`;if(window.NotationService){NotationService.renderInto($('aiDefinition'),r.definition||'');NotationService.renderInto($('aiExplanation'),r.explanation||'');NotationService.renderInto($('aiSummary'),r.summary||'');}renderMath();}catch(e){panel.innerHTML=`<div class="detail-header"><button type="button" class="close-lesson" data-action="close">←</button><h3>Encyklopedia AI</h3></div><div class="detail-body"><div class="detail-box span-2"><strong>Nie udało się pobrać odpowiedzi.</strong><p>${escapeHtml(e.message)}</p></div></div>`;}}

function openVoiceLab(subjectName){
  const languages={Angielski:{code:'en-US',lang:'English'},Niemiecki:{code:'de-DE',lang:'German'},Francuski:{code:'fr-FR',lang:'French'}};
  const language=languages[subjectName];if(!language)return;
  const panel=$('detailPanel');panel.classList.remove('hidden');
  panel.innerHTML=`<div class="detail-header"><button type="button" class="close-lesson" data-action="close">←</button><div><p class="detail-kicker">Language Lab</p><h3>📞 Rozmowa telefoniczna z AI</h3></div></div><div class="detail-body"><section class="detail-box span-2"><label><strong>Scenariusz</strong></label><select id="voiceScenario"><option>Wizyta u lekarza / wywiad medyczny</option><option>Rozmowa maturalna ustna</option><option>Lotnisko i podróż</option><option>Restauracja</option><option>Swobodna rozmowa</option></select></section><section class="detail-box span-2 voice-call"><div class="call-status">Gotowy do rozmowy</div><div id="voiceTranscript" class="voice-transcript">${language.lang}: AI roleplay ready.</div><button type="button" id="startTalk" class="microphone-button">🎙️ Hold / Start talking</button><button type="button" id="replayCall" class="soft-button">🔁 Powtórz</button><button type="button" id="toggleSubtitles" class="soft-button">CC napisy: WŁ.</button></section><section id="voiceFeedback" class="detail-box span-2"><h4>Polska informacja zwrotna</h4><p>Po odpowiedzi pojawią się korekta gramatyki, leksyki i naturalnej frazy.</p></section></div>`;
  state.voiceConfig={...language,scenario:$('voiceScenario').value};window.VoiceCall.reset(language.code,$('voiceScenario').value);
  $('voiceScenario').addEventListener('change',(e)=>{state.voiceConfig.scenario=e.target.value;window.VoiceCall.reset(language.code,e.target.value);});
  $('startTalk').addEventListener('click',()=>window.VoiceCall.startListening(language.code,(text)=>handleVoiceAnswer(text),()=>{}));
  $('replayCall').addEventListener('click',()=>{const transcript=$('voiceTranscript')?.dataset.targetText; if(transcript)window.VoiceCall.speak(transcript,language.code,()=>{});});
  $('toggleSubtitles').addEventListener('click',(e)=>{state.subtitles=!state.subtitles;e.target.textContent=`CC napisy: ${state.subtitles?'WŁ.':'WYŁ.'}`;$('voiceTranscript').classList.toggle('hidden',!state.subtitles);});
}

async function handleVoiceAnswer(text){const cfg=state.voiceConfig;if(!cfg)return;window.VoiceCall.addTurn('user',text);$('voiceTranscript').textContent=`Ty: ${text}`;try{const r=await window.AIService.continueRoleplay({language:cfg.lang,scenario:cfg.scenario,userText:text,history:window.VoiceCall.getHistory().map(h=>h.text).join('\n')});window.VoiceCall.addTurn('assistant',r.reply);$('voiceTranscript').textContent=r.reply;$('voiceTranscript').dataset.targetText=r.reply;if(r.subtitlePolish)$('voiceTranscript').insertAdjacentHTML('beforeend',`<div class="voice-translation">${escapeHtml(r.subtitlePolish)}</div>`);window.VoiceCall.speak(r.reply,cfg.code,()=>{});$('voiceFeedback').innerHTML=`<h4>Polska informacja zwrotna</h4><p><strong>Gramatyka:</strong> ${escapeHtml(r.feedback?.grammar||'Dobrze.')}</p><p><strong>Słownictwo:</strong> ${escapeHtml(r.feedback?.vocabulary||'Naturalnie.')}</p><p><strong>Wymowa i fraza:</strong> ${escapeHtml(r.feedback?.pronunciation||'Kontynuuj.')}</p>${r.feedback?.betterPhrase?`<p><strong>Naturalniejsza forma:</strong> ${escapeHtml(r.feedback.betterPhrase)}</p>`:''}`;}catch(error){$('voiceFeedback').innerHTML=`<h4>Informacja</h4><p>${escapeHtml(error.message)}</p>`;}}

function hydrateExpandedCurriculum(){
  Object.entries(getMode().subjects).forEach(([subjectKey,subject])=>{
    subject.topics.forEach((topic)=>{
      const cacheKey=`matura:curriculum:${subjectKey}:${topic.title}`.toLowerCase();
      try{
        const raw=localStorage.getItem(cacheKey);
        if(!raw)return;
        const persisted=JSON.parse(raw);
        if(Array.isArray(persisted)){
          const safeSubtopics=persisted.filter(item=>typeof item==='string'&&item.trim()).map(item=>item.trim());
          topic.subtopics=[...new Set([...topic.subtopics,...safeSubtopics])];
        }
      }catch{
        localStorage.removeItem(cacheKey);
      }
    });
  });
}

$('searchInput').addEventListener('input',(e)=>renderSearch(e.target.value));
$('searchInput').addEventListener('keydown',(e)=>{if(e.key==='Enter'){e.preventDefault();const ai=e.target.value.trim();if(ai){$('suggestions').classList.add('hidden');openAI(ai);}else{renderSearch(e.target.value);}}});
$('subjectFilter').addEventListener('change',()=>renderSubjects());
$('levelFilter').addEventListener('change',()=>renderSubjects());
$('apiSettingsButton').addEventListener('click',()=>openApiModal());
$('cameraSearchButton').addEventListener('click',()=>window.VisionSolver.open());
$('toggleAll').addEventListener('click',()=>{const all=getMode().subjects;const keys=Object.keys(all);const expanded=keys.every(k=>state.subjectsExpanded.has(k));keys.forEach(k=>expanded?state.subjectsExpanded.delete(k):state.subjectsExpanded.add(k));renderSubjects();});
$('nextQuestion').addEventListener('click',()=>{
  if(!window.QuizEngine.getCurrent()){$('quizCard').innerHTML='<p>Wybierz podtemat i wygeneruj test.</p>';return;}
  window.QuizEngine.next();
  renderQuizQuestion();
});

document.addEventListener('click',(e)=>{
  const action=e.target.closest('[data-action]');
  if(action){const t=action.dataset.action;
    if(t==='expand-topic-ai'){
      const subjectKey=action.dataset.subject;
      const topicTitle=action.dataset.topic;
      const subjectName=action.dataset.subjectName;
      const modeKey=state.mode;
      action.disabled=true;
      action.textContent='⏳ Generowanie pełnej listy...';
      void (async()=>{
        try {
          const items=await window.GroqService.expandTopic({subject:subjectName,topic:topicTitle});
          if(!Array.isArray(items)||!items.length)throw new Error('AI nie zwróciło żadnych nowych zagadnień.');
          const subject=window.CURRICULUM[modeKey].subjects[subjectKey];
          const topic=subject?.topics.find((item)=>item.title===topicTitle);
          if(!topic)throw new Error(`Nie znaleziono tematu „${topicTitle}”.`);
          topic.subtopics=[...new Set([...topic.subtopics,...items])];
          const cacheKey=`matura:curriculum:${subjectKey}:${topicTitle}`.toLowerCase();
          localStorage.setItem(cacheKey,JSON.stringify(topic.subtopics));
          if(state.mode===modeKey){
            const topicKey=`${subjectKey}|${topicTitle}`;
            state.subjectsExpanded.add(subjectKey);
            state.topicsExpanded.add(topicKey);
            renderSubjects();
            renderStats();
            const updatedButton=[...document.querySelectorAll('[data-action="expand-topic-ai"]')].find(button=>button.dataset.subject===subjectKey&&button.dataset.topic===topicTitle);
            if(updatedButton)updatedButton.textContent='✅ Pełna lista została dodana';
          }
        } catch(error) {
          action.disabled=false;
          action.textContent='➕ Rozwiń pełną listę zagadnień (AI)';
          alert(error instanceof Error?error.message:String(error));
        }
      })();
      return;
    }
    if(t==='subject'){const k=action.dataset.key;state.subjectsExpanded.has(k)?state.subjectsExpanded.delete(k):state.subjectsExpanded.add(k);renderSubjects();}else if(t==='topic'){const k=action.dataset.key;state.topicsExpanded.has(k)?state.topicsExpanded.delete(k):state.topicsExpanded.add(k);renderSubjects();}else if(t==='subtopic'){const subjectName=getMode().subjects[action.dataset.subject]?.name;if(['Angielski','Niemiecki','Francuski'].includes(subjectName))window.LanguageLab.open(subjectName,action.dataset.subtopic);else{const context=findSubjectTopic(action.dataset.subject,action.dataset.topic,action.dataset.subtopic);if(context)openLesson(context);}}else if(t==='search-result'){const subjectName=getMode().subjects[action.dataset.subject]?.name;if(['Angielski','Niemiecki','Francuski'].includes(subjectName))window.LanguageLab.open(subjectName,action.dataset.subtopic);else{const context=findSubjectTopic(action.dataset.subject,action.dataset.topic,action.dataset.subtopic);if(context)openLesson(context);}$('suggestions').classList.add('hidden');}else if(t==='ai-search'){openAI(action.dataset.query);$('suggestions').classList.add('hidden');}else if(t==='difficulty'){state.level=action.dataset.level;const context=findSubjectTopic(state.subject,state.topic,state.subtopic);if(context)openLesson(context);}else if(t==='close')$('detailPanel').classList.add('hidden');else if(t==='answer'){const selected=action.dataset.answer;const quiz=window.QuizEngine.getCurrent();const correct=selected===quiz.answer;document.querySelectorAll('[data-action="answer"]').forEach(b=>{b.disabled=true;if(b.dataset.answer===quiz.answer)b.classList.add('correct');});if(!correct)action.classList.add('incorrect');$('quizCard').insertAdjacentHTML('beforeend',`<div class="quiz-explanation notation-host" data-quiz-explanation><strong>${correct?'Poprawna odpowiedź!':'Niepoprawna odpowiedź.'}</strong> ${escapeHtml(quiz.explanation)}</div>`);const host=$('quizCard').querySelector('[data-quiz-explanation]:last-child');if(host&&window.NotationService)window.NotationService.renderInto(host,`${correct?'Poprawna odpowiedź!':'Niepoprawna odpowiedź.'} ${quiz.explanation}`);}return;}
  if(e.target.closest('#generateQuizInline'))generateAndRenderQuiz();
  const mode=e.target.closest('[data-mode]');if(mode){state.mode=mode.dataset.mode;state.subjectsExpanded.clear();state.topicsExpanded.clear();state.subject=null;state.topic=null;state.subtopic=null;$('subjectFilter').value='all';$('levelFilter').value='all';document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b===mode));renderSubjects();renderStats();}
  if(!e.target.closest('.search-box'))$('suggestions').classList.add('hidden');
});

function openApiModal(){let modal=$('apiModal');if(!modal){modal=document.createElement('div');modal.id='apiModal';modal.className='api-modal';document.body.appendChild(modal);}modal.innerHTML=`<div class="api-dialog"><button type="button" class="close-lesson" data-action="close-api">×</button><h3>⚙️ Ustawienia klucza Groq AI</h3><p>Klucz uzyskasz w <strong>console.groq.com</strong>. Klucz zaczyna się od <code>gsk_</code> i zostaje zapisany wyłącznie w <code>localStorage</code>.</p><input id="apiKeyInput" type="password" autocomplete="off" placeholder="Wklej klucz Groq (gsk_...)" value="${escapeHtml(localStorage.getItem('groq_api_key')||'')}"/><div class="api-actions"><button type="button" id="saveApiKey" class="soft-button">Zapisz klucz Groq</button><button type="button" id="clearApiKey" class="soft-button">Usuń klucz</button></div><div id="apiBanner" class="api-banner"></div></div>`;modal.classList.add('open');$('saveApiKey').onclick=()=>{const key=$('apiKeyInput').value.trim();if(!key.startsWith('gsk_')){$('apiBanner').textContent='To nie wygląda na klucz Groq (oczekiwany prefix gsk_).';$('apiBanner').style.color='#fca5a5';return;}localStorage.setItem('groq_api_key',key);$('apiBanner').textContent='Klucz Groq został zapisany i jest aktywny.';$('apiBanner').style.color='#86efac';updateApiBanner();};$('clearApiKey').onclick=()=>{localStorage.removeItem('groq_api_key');$('apiKeyInput').value='';$('apiBanner').textContent='Klucz został usunięty.';$('apiBanner').style.color='#fca5a5';updateApiBanner();};modal.querySelector('[data-action="close-api"]').onclick=()=>modal.classList.remove('open');}

function updateApiBanner(){const key=localStorage.getItem('groq_api_key')||'';let b=$('apiKeyBanner');if(key){if(b)b.remove();return;}if(!b){b=document.createElement('div');b.id='apiKeyBanner';b.className='api-key-banner';b.innerHTML='Klucz Groq AI nie jest ustawiony. <button type="button" id="bannerApiButton">⚙️ Dodaj klucz API</button>';document.querySelector('.app-shell').prepend(b);$('bannerApiButton').addEventListener('click',openApiModal);} }

async function initializeApp(){
  if(!window.CURRICULUM){
    await new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='data/curriculum.js?v='+Date.now();
      script.onload=resolve;
      script.onerror=()=>reject(new Error('Nie udało się załadować curriculum.js'));
      document.head.appendChild(script);
    }).catch(()=>{});
  }
  if(!window.CURRICULUM){
    $('subjectsContainer').innerHTML='<div class="subject-card"><div class="subject-body" style="display:block;padding:20px">Nie udało się załadować programu nauczania. Odśwież stronę i sprawdź data/curriculum.js.</div></div>';
    return;
  }
  renderSubjects();renderStats();updateApiBanner();
}

window.AppShell?.init();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

initializeApp();
