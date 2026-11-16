import { AMINO_ACIDS, CATEGORIES, SPECIAL_FACTS } from './data.js?v=20261116b';
import { structureSvg } from './structures.js?v=20261116b';

const byId = new Map(AMINO_ACIDS.map(a => [a.id, a]));
const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function shuffle(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}
function showView() {
  const section = ['home','practice','review'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home';
  document.querySelectorAll('.view').forEach(view => view.hidden = view.id !== section);
  document.querySelectorAll('[data-nav]').forEach(link => {
    const active = link.dataset.nav === section;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  });
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange', showView);
showView();

document.querySelectorAll('[data-start-mode]').forEach(button => button.addEventListener('click', () => {
  $('#quiz-mode').value = button.dataset.startMode;
  location.hash = 'practice';
}));

let reviewFilter = 'all';
const filters = [['all','全部'],...Object.entries(CATEGORIES).map(([key,value]) => [key,value.label])];
function renderFilters() {
  $('#filter-buttons').innerHTML = filters.map(([key,label]) => `<button type="button" class="filter-button ${reviewFilter===key?'active':''}" data-filter="${key}" aria-pressed="${reviewFilter===key}">${label}</button>`).join('');
}
function renderCards() {
  const search = $('#review-search').value.trim().toLocaleLowerCase();
  const cards = AMINO_ACIDS.filter(a => (reviewFilter === 'all' || a.category === reviewFilter) && [a.name,a.zh,a.three,a.one].some(v => v.toLocaleLowerCase().includes(search)));
  $('#review-count').textContent = `找到 ${cards.length} / 20 張卡片 · 點卡片翻面`;
  $('#card-grid').innerHTML = cards.length ? cards.map(a => `<button type="button" class="flashcard" data-id="${a.id}" data-category="${a.category}" aria-label="${a.name}，${a.three}，${a.one}；點擊翻面看性質" aria-pressed="false"><span class="flashcard-front"><span class="flashcard-top"><span class="flashcard-code">${a.three}</span><span class="flashcard-one">${a.one}</span></span><span class="card-name">${a.name}</span><span class="zh">${a.zh}</span>${structureSvg(a,false)}<span class="card-tag">${CATEGORIES[a.category].label}</span><span class="flip-hint">點一下，翻到背面 ↗</span></span><span class="flashcard-back" hidden><span class="flashcard-top"><span class="flashcard-code">${a.three} / ${a.one}</span><span class="flashcard-one">✦</span></span><span class="card-name">${a.name}</span><span class="zh">${a.zh} · ${CATEGORIES[a.category].label}</span><span class="traits-list">${a.traits.map(t=>`<span class="trait-row">• ${t}</span>`).join('')}</span><span class="tip">記憶點：${a.memoryTip}</span><span class="flip-hint">再點一下，翻回結構 ↶</span></span></button>`).join('') : '<div class="empty-state">找不到符合條件的卡片，換個關鍵字試試看。</div>';
}
$('#filter-buttons').addEventListener('click', event => {
  const target = event.target.closest('[data-filter]');
  if (!target) return;
  reviewFilter = target.dataset.filter;
  renderFilters(); renderCards();
});
$('#review-search').addEventListener('input', renderCards);
$('#card-grid').addEventListener('click', event => {
  const card = event.target.closest('.flashcard');
  if (!card) return;
  const flipped = card.classList.toggle('flipped');
  card.querySelector('.flashcard-front').hidden = flipped;
  card.querySelector('.flashcard-back').hidden = !flipped;
  card.setAttribute('aria-pressed',String(flipped));
  const a = byId.get(card.dataset.id);
  card.setAttribute('aria-label',flipped ? `${a.name} 的性質；點擊翻回結構` : `${a.name}，${a.three}，${a.one}；點擊翻面看性質`);
});
renderFilters(); renderCards();

const confusion = {
  valine:['leucine','isoleucine','alanine'], leucine:['isoleucine','valine','methionine'], isoleucine:['leucine','valine','threonine'],
  aspartic_acid:['asparagine','glutamic-acid','glutamine'], asparagine:['aspartic-acid','glutamine','glutamic-acid'],
  glutamic_acid:['glutamine','aspartic-acid','asparagine'], glutamine:['glutamic-acid','asparagine','aspartic-acid'],
  phenylalanine:['tyrosine','tryptophan','histidine'], tyrosine:['phenylalanine','tryptophan','serine'],
  serine:['threonine','cysteine','tyrosine'], threonine:['serine','isoleucine','valine'],
  cysteine:['methionine','serine','threonine'], methionine:['cysteine','leucine','isoleucine'],
  lysine:['arginine','histidine','glutamine'], arginine:['lysine','histidine','glutamine'], histidine:['arginine','lysine','tryptophan']
};
// Hyphenated IDs need their exact map keys.
confusion['aspartic-acid'] = confusion.aspartic_acid;
confusion['glutamic-acid'] = confusion.glutamic_acid;

function distractors(correct, count = 3) {
  const preferred = (confusion[correct.id] || []).map(id => byId.get(id)).filter(Boolean);
  const same = shuffle(AMINO_ACIDS.filter(a => a.category === correct.category && a.id !== correct.id));
  const rest = shuffle(AMINO_ACIDS.filter(a => a.id !== correct.id));
  return [...new Map([...preferred,...same,...rest].map(a=>[a.id,a])).values()].slice(0,count);
}
function nameStyle() {
  const selected = $('#name-style').value;
  return selected === 'random' ? shuffle(['full','three','one'])[0] : selected;
}
function displayName(a, style) { return style === 'one' ? a.one : style === 'three' ? a.three : a.name; }

function makeQuestion(type, amino, fact) {
  if (type === 'properties') {
    if (fact) {
      const answer = byId.get(fact.answer);
      const options = shuffle([answer,...distractors(answer)]);
      return {type:'special',title:fact.question,answer:answer.id,options,explanation:fact.explanation};
    }
    return {type:'category',title:`${amino.name}（${amino.three}）的側鏈屬於哪一類？`,answer:amino.category,options:shuffle(Object.keys(CATEGORIES)),explanation:`${amino.name}：${amino.memoryTip} ${CATEGORIES[amino.category].description}`};
  }
  const style = nameStyle();
  return {type,title:type==='nameToStructure'?'選出正確的簡式結構':'這個簡式結構屬於哪種胺基酸？',amino,style,answer:amino.id,options:shuffle([amino,...distractors(amino)]),explanation:`${amino.name}（${amino.three} / ${amino.one}）：${amino.memoryTip}`};
}

let quiz = null;
function beginQuiz() {
  const mode = $('#quiz-mode').value;
  const length = Number($('#quiz-length').value);
  const acids = shuffle(AMINO_ACIDS).slice(0,length);
  const facts = shuffle(SPECIAL_FACTS);
  const types = mode === 'mixed' ? ['nameToStructure','structureToName','properties'] : [mode];
  let factIndex = 0;
  quiz = {questions:acids.map((a,index) => {
    const type = types[index % types.length];
    const propertyIndex = mode === 'mixed' ? Math.floor(index / types.length) : index;
    const fact = type === 'properties' && propertyIndex % 3 !== 0 ? facts[factIndex++ % facts.length] : null;
    return makeQuestion(type,a,fact);
  }),index:0,score:0,answered:false};
  $('#quiz-setup').hidden = true; $('#quiz-result').hidden = true; $('#quiz-panel').hidden = false;
  renderQuestion();
}
function renderQuestion() {
  const q = quiz.questions[quiz.index];
  quiz.answered = false;
  $('#quiz-counter').textContent = `第 ${quiz.index+1} / ${quiz.questions.length} 題`;
  $('#quiz-score').textContent = `目前答對 ${quiz.score} 題`;
  $('#progress-fill').style.width = `${quiz.index/quiz.questions.length*100}%`;
  $('#quiz-feedback').hidden = true;
  $('#next-question').hidden = true;
  let html = `<p class="q-kicker">${q.type==='category'||q.type==='special'?'PROPERTY CHECK':'STRUCTURE CHECK'}</p><h2>${q.title}</h2>`;
  if (q.type === 'nameToStructure') html += `<div class="q-name">${displayName(q.amino,q.style)}</div>`;
  if (q.type === 'structureToName') html += `<div class="question-structure">${structureSvg(q.amino)}</div>`;
  $('#quiz-question').innerHTML = html;
  $('#quiz-options').innerHTML = q.options.map((value,index) => {
    const key = typeof value === 'string' ? value : value.id;
    const content = q.type === 'nameToStructure' ? structureSvg(value,false) : q.type === 'category' ? CATEGORIES[value].label : displayName(value,q.style || 'full');
    const label = q.type === 'nameToStructure' ? `選項 ${index+1}，側鏈 ${value.sideChain}` : `選項 ${index+1}，${typeof value==='string' ? CATEGORIES[value].label : displayName(value,q.style || 'full')}`;
    return `<button class="option ${q.type==='nameToStructure'?'structure-option':''}" type="button" data-answer="${key}" aria-label="${escapeHtml(label)}">${content}</button>`;
  }).join('');
}
$('#quiz-options').addEventListener('click', event => {
  const option = event.target.closest('[data-answer]');
  if (!option || !quiz || quiz.answered) return;
  quiz.answered = true;
  const q = quiz.questions[quiz.index];
  const correct = option.dataset.answer === q.answer;
  if (correct) quiz.score++;
  document.querySelectorAll('#quiz-options .option').forEach(button => {
    button.disabled = true;
    if (button.dataset.answer === q.answer) button.classList.add('correct');
    else if (button === option) button.classList.add('incorrect');
  });
  const answerText = q.type === 'category' ? CATEGORIES[q.answer].label : `${byId.get(q.answer).name}（${byId.get(q.answer).three} / ${byId.get(q.answer).one}）`;
  const feedback = $('#quiz-feedback');
  feedback.className = `quiz-feedback ${correct?'good':'bad'}`;
  feedback.innerHTML = `<strong>${correct?'答對了！✦':'再記一下這題 ↗'}</strong>正解：${answerText}<br>${q.explanation}`;
  feedback.hidden = false;
  $('#quiz-score').textContent = `目前答對 ${quiz.score} 題`;
  $('#progress-fill').style.width = `${(quiz.index+1)/quiz.questions.length*100}%`;
  const next = $('#next-question');
  next.textContent = quiz.index === quiz.questions.length-1 ? '看結果 →' : '下一題 →';
  next.hidden = false;
  next.focus();
});
$('#next-question').addEventListener('click', () => {
  if (!quiz || !quiz.answered) return;
  quiz.index++;
  if (quiz.index < quiz.questions.length) { renderQuestion(); $('#quiz-question').scrollIntoView({block:'start',behavior:'smooth'}); }
  else finishQuiz();
});
function finishQuiz() {
  const total = quiz.questions.length;
  const percent = Math.round(quiz.score/total*100);
  const message = percent === 100 ? '全部答對！20 種胺基酸越來越熟了。' : percent >= 70 ? '做得不錯，回頭看看還不熟的側鏈。' : '每次記住一點點就好，再翻翻單字卡吧。';
  $('#quiz-panel').hidden = true;
  $('#quiz-result').hidden = false;
  $('#quiz-result').innerHTML = `<div class="result-doodle" aria-hidden="true">${percent===100?'✷':'✳'}</div><h2>這輪完成！</h2><div class="result-score">${quiz.score} / ${total}</div><p>${message}</p><div class="result-actions"><button type="button" id="retry-quiz" class="button button-primary">再玩一輪 ↗</button><a href="#review" class="button button-outline">翻單字卡 →</a></div>`;
  $('#retry-quiz').addEventListener('click', beginQuiz);
}
$('#start-quiz').addEventListener('click', beginQuiz);
$('#quit-quiz').addEventListener('click', () => { quiz = null; $('#quiz-panel').hidden = true; $('#quiz-setup').hidden = false; });
