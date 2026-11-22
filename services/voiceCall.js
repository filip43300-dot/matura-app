window.VoiceCall = (() => {
  let recognition = null;
  let history = [];
  let config = null;

  function getVoice(lang) {
    const voices = window.speechSynthesis?.getVoices() || [];
    return voices.find((voice) => voice.lang.toLowerCase().startsWith(lang.toLowerCase())) || voices.find((voice)=>voice.lang.startsWith(lang.slice(0,2))) || null;
  }

  function speak(text, lang, onEnd) {
    if (!window.speechSynthesis) { onEnd?.(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.92;
    utterance.pitch = 1;
    const voice = getVoice(lang);
    if (voice) utterance.voice = voice;
    utterance.onend = () => onEnd?.();
    window.speechSynthesis.speak(utterance);
  }

  function startListening(lang, onResult, onError) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { onError('Chrome wymaga obsługi Web Speech. Użyj języka polskiego/systemowego lub aktualnej wersji Chrome.'); return null; }
    if (recognition) recognition.stop();
    recognition = new Recognition();
    recognition.lang = lang;
    recognition.intermediateResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => onResult(event.results[0][0].transcript);
    recognition.onerror = (event) => onError(`Rozpoznawanie głosu: ${event.error}`);
    recognition.start();
    return recognition;
  }

  function stopListening() { recognition?.stop(); }

  function setConfig(next) { config = next; }
  function getHistory() { return [...history]; }
  function reset(language, scenario) { history = [{role:'system',text:`Language: ${language}; Scenario: ${scenario}`}]; }
  function addTurn(role, text) { history.push({role,text}); }

  return { speak, startListening, stopListening, setConfig, getHistory, reset, addTurn };
})();
