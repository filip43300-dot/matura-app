const state={mode:'liceum',subject:null,topic:null,subtopic:null,level:'Podstawowy',subjectsExpanded:new Set(),topicsExpanded:new Set(),searchTimer:null,voiceConfig:null,subtitles:true};
const $=(id)=>document.getElementById(id);
const escapeHtml=(v)=>String(v??'').replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const normalize=(v)=>String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

function getMode(){return window.CURRICULUM[state.mode];}
function levelMap(){return {'Podstawowy':'podstawowy','Rozszerzony':'rozszerzony','Studia / Medycyna':'medycyna','Olimpiada':'olimpiada'};}

function renderSubjects(){
  hydrateExpandedCurriculum();
  const container=$('subjectsContainer'); const mode=getMode();
  const priority=state.mode==='medical'?['anatomy','physiology','biochemistry','histology','pathology','pharmacology','microbiology','internal']:['mathematics','chemistry','english','german','french','polish','biology','physics','geography','history'];
  const entries=priority.map(k=>[k,mode.subjects[k]]).filter(([,v])=>v);
  container.innerHTML=entries.map(([key,subject])=>`<article class="subject-card">
    <button class="subject-header" type="button" data-action="subject" data-key="${key}"><span class="subject-name"><span class="subject-icon">${subject.icon}</span>${escapeHtml(subject.name)}</span><span class="subject-meta"><span>${subject.topics.length} tematy</span></span></button>
    <div class="subject-body ${state.subjectsExpanded.has(key)?'':'hidden'}">${subject.topics.map(topic=>{const tk=`${key}|${topic.title}`;return `<article class="subject-topic">
      <button class="topic-header" type="button" data-action="topic" data-key="${tk}"><span><strong>${escapeHtml(topic.title)}</strong></span><span class="topic-badge ${topic.level}">${topic.level}</span></button>
      <div class="subtopic-list ${state.topicsExpanded.has(tk)?'':'hidden'}">${topic.subtopics.map(s=>`<button type="button" class="subtopic-button" data-action="subtopic" data-subject="${key}" data-topic="${escapeHtml(topic.title)}" data-subtopic="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join('')}</div>
      <button type="button" class="expand-ai-button" data-action="expand-topic-ai" data-subject="${key}" data-subject-name="${escapeHtml(subject.name)}" data-topic="${escapeHtml(topic.title)}">➕ Rozwiń pełną listę zagadnień (AI)</button>
    </article>`}).join('')}</div></article>`).join('');
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

function renderMath(){if(window.renderMathInElement)renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'\\(',right:'\\)',display:false},{left:'$',right:'$',display:false}],throwOnError:false});}

async function openLesson(context){
  state.subject=context.subjectKey;state.topic=context.topic.title;state.subtopic=context.subtopic;
  const contextToAI={subject:context.subject.name,topic:context.topic.title,subtopic:context.subtopic,level:state.level};
  const panel=$('detailPanel');
  panel.classList.remove('hidden');
  panel.innerHTML=lessonShell(context,{title:'Generowanie lekcji…',definition:'Groq AI przygotowuje treść dopasowaną do poziomu i przedmiotu.',explanation:'',formulas:[],visualDescription:'Schemat zostanie wygenerowany.',example:'',answer:'',explanationOfAnswer:'',summary:'',coreConcepts:[]});
  try{const lesson=await window.AIService.generateLesson(contextToAI);panel.innerHTML=lessonShell(context,lesson);}catch(error){panel.innerHTML=lessonShell(context,{title:context.subtopic,definition:'Lekcja nie została wygenerowana.',explanation:error.message,formulas:[],visualDescription:'Dodaj klucz API, aby wygenerować szczegółową treść.',example:'',answer:'',explanationOfAnswer:'',summary:'',coreConcepts:[context.subtopic]});}
  renderMath();
  await generateAndRenderQuiz();
}

function lessonShell(context,lesson){
  const formulas=(lesson.formulas||[]).map(f=>`<div class="formula-item"><div class="formula-line">${escapeHtml(f)}</div></div>`).join('')||'<div class="formula-item"><div class="formula-line">Brak wzoru — wymagane analityczne wyjaśnienie.</div></div>';
  return `<div class="detail-header"><button type="button" class="close-lesson" data-action="close">←</button><div><p class="detail-kicker">${escapeHtml(context.subject.name)} · ${escapeHtml(context.topic.title)}</p><h3>${escapeHtml(lesson.title||context.subtopic)}</h3></div></div>
  <div class="difficulty-switcher">${[['Podstawowy','Podstawowy'],['Rozszerzony','Rozszerzony'],['Studia / Medycyna','Studia / Medycyna'],['Olimpiada','Olimpiada']].map(([key,label])=>`<button type="button" class="difficulty-button ${state.level===key?'active':''}" data-action="difficulty" data-level="${key}">${label}</button>`).join('')}</div>
  <div class="detail-body lesson-layout"><section class="detail-box span-2"><div class="definition-topline">Definicja</div><p class="definition-main">${escapeHtml(lesson.definition)}</p></section>
  <section class="detail-box span-2"><h4>Rozwinięte wyjaśnienie</h4><p>${escapeHtml(lesson.explanation)}</p></section>
  <section class="detail-box span-2"><h4>Wzory i zapis KaTeX</h4><div class="formula-list">${formulas}</div></section>
  <section class="detail-box span-2"><h4>Rysunek / schemat</h4><div class="lesson-visual"><div class="lesson-visual-glyph">${escapeHtml(lesson.visualDescription)}</div></div></section>
  ${lesson.example||lesson.answer?`<section class="detail-box span-2"><h4>Przykładowe zadanie</h4><p><strong>Zadanie:</strong> ${escapeHtml(lesson.example)}</p><p><strong>Odpowiedź:</strong> ${escapeHtml(lesson.answer)}</p><p><strong>Uzasadnienie:</strong> ${escapeHtml(lesson.explanationOfAnswer)}</p></section>`:''}
  ${lesson.summary||lesson.coreConcepts?.length?`<section class="detail-box span-2"><h4>Podsumowanie</h4><p>${escapeHtml(lesson.summary)}</p><ul>${(lesson.coreConcepts||[]).map(c=>`<li>${escapeHtml(c)}</li>`).join('')}</ul></section>`:''}</div>`;
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

async function openAI(query){const panel=$('detailPanel');panel.classList.remove('hidden');panel.innerHTML=`<div class="detail-header"><button type="button" class="close-lesson" data-action="close">←</button><h3>${escapeHtml(query)} — Encyklopedia AI</h3></div><div class="detail-body"><div class="detail-box span-2">Ładowanie encyklopedycznej odpowiedzi…</div></div>`;try{const r=await window.AIService.explainConcept(query,state.level);panel.innerHTML=`<div class="detail-header"><button type="button" class="close-lesson" data-action="close">←</button><h3>${escapeHtml(r.title||query)}</h3></div><div class="detail-body"><section class="detail-box span-2"><div class="definition-topline">Definicja</div><p class="definition-main">${escapeHtml(r.definition)}</p></section><section class="detail-box span-2"><h4>Wyjaśnienie</h4><p>${escapeHtml(r.explanation)}</p></section><section class="detail-box span-2"><h4>Schemat</h4><div class="lesson-visual"><div class="lesson-visual-glyph">${escapeHtml(r.visualDescription)}</div></div></section><section class="detail-box span-2"><h4>Podsumowanie</h4><p>${escapeHtml(r.summary)}</p></section></div>`;renderMath();}catch(e){panel.innerHTML=`<div class="detail-header"><button type="button" class="close-lesson" data-action="close">←</button><h3>Encyklopedia AI</h3></div><div class="detail-body"><div class="detail-box span-2"><strong>Nie udało się pobrać odpowiedzi.</strong><p>${escapeHtml(e.message)}</p></div></div>`;}}

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
      try{const persisted=JSON.parse(localStorage.getItem(cacheKey)||'[]');if(Array.isArray(persisted))topic.subtopics=[...new Set([...topic.subtopics,...persisted])];}catch{}
    });
  });
}

$('searchInput').addEventListener('input',(e)=>renderSearch(e.target.value));
$('searchInput').addEventListener('keydown',(e)=>{if(e.key==='Enter'){e.preventDefault();const ai=e.target.value.trim();if(ai){$('suggestions').classList.add('hidden');openAI(ai);}else{renderSearch(e.target.value);}}});
$('apiSettingsButton').addEventListener('click',()=>openApiModal());
$('toggleAll').addEventListener('click',()=>{const all=getMode().subjects;const keys=Object.keys(all);const expanded=keys.every(k=>state.subjectsExpanded.has(k));keys.forEach(k=>expanded?state.subjectsExpanded.delete(k):state.subjectsExpanded.add(k));renderSubjects();});
$('nextQuestion').addEventListener('click',()=>{$('quizCard').innerHTML='<p>Wybierz podtemat i wygeneruj test.</p>';});

document.addEventListener('click',(e)=>{
  const action=e.target.closest('[data-action]');
  if(action){const t=action.dataset.action;
    if(t==='expand-topic-ai'){
      const subjectKey=action.dataset.subject;
      const topicTitle=action.dataset.topic;
      const subjectName=action.dataset.subjectName;
      action.disabled=true;
      action.textContent='⌛ Rozszerzam pełną listę…';
      window.GroqService.expandTopic({subject:subjectName,topic:topicTitle}).then((items)=>{
        const subject=getMode().subjects[subjectKey];
        const topic=subject?.topics.find((item)=>item.title===topicTitle);
        if(topic){
          topic.subtopics=[...new Set([...topic.subtopics,...items])];
          const cacheKey=`matura:curriculum:${subjectKey}:${topicTitle}`.toLowerCase();
          localStorage.setItem(cacheKey,JSON.stringify(topic.subtopics));
        }
        action.disabled=false;
        action.textContent='✅ Pełna lista została dodana';
        renderSubjects();
        renderStats();
      }).catch((error)=>{
        action.disabled=false;
        action.textContent='➕ Rozwiń pełną listę zagadnień (AI)';
        alert(error.message);
      });
      return;
    }
    if(t==='subject'){const k=action.dataset.key;state.subjectsExpanded.has(k)?state.subjectsExpanded.delete(k):state.subjectsExpanded.add(k);renderSubjects();}else if(t==='topic'){const k=action.dataset.key;state.topicsExpanded.has(k)?state.topicsExpanded.delete(k):state.topicsExpanded.add(k);renderSubjects();}else if(t==='subtopic'){const subjectName=getMode().subjects[action.dataset.subject]?.name; if(['Angielski','Niemiecki','Francuski'].includes(subjectName)&&action.dataset.subtopic.includes('Rozmowa telefoniczna'))openVoiceLab(subjectName);else{const context=findSubjectTopic(action.dataset.subject,action.dataset.topic,action.dataset.subtopic);if(context)openLesson(context);}}else if(t==='search-result'){const context=findSubjectTopic(action.dataset.subject,action.dataset.topic,action.dataset.subtopic);if(context)openLesson(context);$('suggestions').classList.add('hidden');}else if(t==='ai-search'){openAI(action.dataset.query);$('suggestions').classList.add('hidden');}else if(t==='difficulty'){state.level=action.dataset.level;const context=findSubjectTopic(state.subject,state.topic,state.subtopic);if(context)openLesson(context);}else if(t==='close')$('detailPanel').classList.add('hidden');else if(t==='answer'){const selected=action.dataset.answer;const quiz=window.QuizEngine.getCurrent();const correct=selected===quiz.answer;document.querySelectorAll('[data-action="answer"]').forEach(b=>{b.disabled=true;if(b.dataset.answer===quiz.answer)b.classList.add('correct');});if(!correct)action.classList.add('incorrect');$('quizCard').insertAdjacentHTML('beforeend',`<div class="quiz-explanation"><strong>${correct?'Poprawna odpowiedź!':'Niepoprawna odpowiedź.'}</strong> ${escapeHtml(quiz.explanation)}</div>`);}return;}
  if(e.target.closest('#generateQuizInline'))generateAndRenderQuiz();
  const mode=e.target.closest('[data-mode]');if(mode){state.mode=mode.dataset.mode;state.subjectsExpanded.clear();state.topicsExpanded.clear();state.subject=null;state.topic=null;state.subtopic=null;document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b===mode));renderSubjects();renderStats();}
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

initializeApp();
