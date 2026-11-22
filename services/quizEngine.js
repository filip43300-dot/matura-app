window.QuizEngine = (() => {
  let current = [];
  let index = 0;

  async function generate(context) {
    current = await window.AIService.generateQuiz(context);
    index = 0;
    return current;
  }

  function getCurrent() { return current[index] || null; }
  function next() { index = (index + 1) % Math.max(current.length, 1); return getCurrent(); }
  function reset() { current = []; index = 0; }
  return { generate, getCurrent, next, reset };
})();
