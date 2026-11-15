if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// База игровых ачивок (500 тем: 100 Русский, 100 Профиль, 100 База, 200 Физика)
const ACHIEVEMENTS_DB = [
  {
    id: 'first-blood',
    icon: '🎯',
    name: 'Первая кровь',
    desc: 'Освой свою самую первую тему из кодификатора ЕГЭ',
    rarity: 'common',
    rarityLabel: 'Обычная',
    xp: 100,
    target: 1,
    getVal: (m) => m.doneTopics
  },
  {
    id: 'quiz-starter',
    icon: '⚡',
    name: 'Разминка ума',
    desc: 'Реши 5 задач ЕГЭ в карточках или в тренажёре',
    rarity: 'common',
    rarityLabel: 'Обычная',
    xp: 120,
    target: 5,
    getVal: (m) => m.totalPracticeSolved
  },
  {
    id: 'focus-hour',
    icon: '⏱',
    name: 'Час погружения',
    desc: 'Накопи 60 минут продуктивных занятий (таймером или вручную)',
    rarity: 'common',
    rarityLabel: 'Обычная',
    xp: 120,
    target: 60,
    getVal: (m) => m.totalMinutes
  },
  {
    id: 'streak-3',
    icon: '🔥',
    name: 'Искра дисциплины',
    desc: 'Удерживай ударный режим 3 дня подряд без пропусков',
    rarity: 'rare',
    rarityLabel: 'Редкая',
    xp: 200,
    target: 3,
    getVal: (m) => m.streak
  },
  {
    id: 'topics-25',
    icon: '📚',
    name: 'Знаток кодификатора',
    desc: 'Закрой 25 тем по любым предметам ЕГЭ',
    rarity: 'rare',
    rarityLabel: 'Редкая',
    xp: 250,
    target: 25,
    getVal: (m) => m.doneTopics
  },
  {
    id: 'quiz-master-30',
    icon: '🧠',
    name: 'Машина практики',
    desc: 'Безошибочно реши 30 задач ЕГЭ в тренажёре и карточках',
    rarity: 'rare',
    rarityLabel: 'Редкая',
    xp: 350,
    target: 30,
    getVal: (m) => m.totalPracticeSolved
  },
  {
    id: 'rus-master',
    icon: '✍️',
    name: 'Повелитель слова',
    desc: 'Освой все 100 тем по Русскому языку',
    rarity: 'epic',
    rarityLabel: 'Эпическая',
    xp: 500,
    target: 100,
    getVal: (m) => m.subDone['rus'] || 0
  },
  {
    id: 'math-prof-master',
    icon: '📐',
    name: 'Гроза параметров',
    desc: 'Освой все 100 тем по Профильной математике',
    rarity: 'epic',
    rarityLabel: 'Эпическая',
    xp: 550,
    target: 100,
    getVal: (m) => m.subDone['math-prof'] || 0
  },
  {
    id: 'phys-master',
    icon: '⚡',
    name: 'Повелитель квантов (200)',
    desc: 'Освой все 200 тем расширенного курса по Физике',
    rarity: 'epic',
    rarityLabel: 'Эпическая',
    xp: 700,
    target: 200,
    getVal: (m) => m.subDone['phys'] || 0
  },
  {
    id: 'math-base-master',
    icon: '🧮',
    name: 'Железная логика',
    desc: 'Освой все 100 тем по Базовой математике',
    rarity: 'rare',
    rarityLabel: 'Редкая',
    xp: 400,
    target: 100,
    getVal: (m) => m.subDone['math-base'] || 0
  },
  {
    id: 'streak-7',
    icon: '🌋',
    name: 'Неделя огня',
    desc: 'Держи ударный режим 7 дней подряд',
    rarity: 'epic',
    rarityLabel: 'Эпическая',
    xp: 400,
    target: 7,
    getVal: (m) => m.streak
  },
  {
    id: 'marathon-10h',
    icon: '🚀',
    name: 'Марафонец (10 часов)',
    desc: 'Набери 600 минут чистого времени подготовки',
    rarity: 'epic',
    rarityLabel: 'Эпическая',
    xp: 500,
    target: 600,
    getVal: (m) => m.totalMinutes
  },
  {
    id: 'night-owl',
    icon: '🦉',
    name: 'Ночной дозор',
    desc: 'Секретная ачивка: позанимайся или реши задачу после 22:00',
    rarity: 'rare',
    rarityLabel: 'Секретная',
    xp: 250,
    target: 1,
    getVal: (m) => m.nightOwl ? 1 : 0
  },
  {
    id: 'ege-legend',
    icon: '👑',
    name: 'Легенда 100 баллов',
    desc: 'Закрой 100% всех 500 тем по всем предметам ЕГЭ',
    rarity: 'legendary',
    rarityLabel: 'Легендарная',
    xp: 1500,
    target: 500,
    getVal: (m) => m.doneTopics
  }
];

let state = JSON.parse(localStorage.getItem('focusprep_ege_v8')) || {
  subjects: EGE_CURRICULUM,
  currentSubjectId: 'rus',
  dailyActivity: {},
  sessions: [],
  unlockedAchievements: [],
  practiceSolvedTotal: 0,
  nightOwl: false
};

if (!state.unlockedAchievements) state.unlockedAchievements = [];
if (typeof state.practiceSolvedTotal !== 'number') state.practiceSolvedTotal = 0;

function saveState() {
  localStorage.setItem('focusprep_ege_v8', JSON.stringify(state));
}

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

function logActivity(points = 10) {
  const today = getTodayKey();
  state.dailyActivity[today] = (state.dailyActivity[today] || 0) + points;
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 5) state.nightOwl = true;
  saveState();
  checkAchievements();
}

// Звук разблокировки ачивки
function playAchievementSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
    });
    if (navigator.vibrate) navigator.vibrate([100, 60, 150]);
  } catch (e) {}
}

let toastTimeout = null;
function showAchievementToast(ach) {
  const toast = document.getElementById('achievementToast');
  document.getElementById('toastIcon').textContent = ach.icon;
  document.getElementById('toastRarity').textContent = `АЧИВКА ОТКРЫТА · ${ach.rarityLabel.toUpperCase()}`;
  document.getElementById('toastTitle').textContent = ach.name;
  document.getElementById('toastXp').textContent = `+${ach.xp} XP к уровню`;

  toast.classList.remove('hidden');
  playAchievementSound();
  document.getElementById('achNavDot').classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add('hidden'), 4200);
}

// Сбор метрик игрока
function getPlayerMetrics() {
  let doneTopics = 0;
  let totalTopics = 0;
  let cardSolvedQuizzes = 0;
  let totalMinutes = 0;
  const subDone = {};

  state.subjects.forEach(s => {
    totalMinutes += s.minutes || 0;
    let sDone = 0;
    s.topics.forEach(t => {
      totalTopics++;
      if (t.doneAt) {
        doneTopics++;
        sDone++;
      }
      if (t.solved) cardSolvedQuizzes++;
    });
    subDone[s.id] = sDone;
  });

  const totalPracticeSolved = cardSolvedQuizzes + (state.practiceSolvedTotal || 0);
  const streak = calculateStreak();
  return {
    doneTopics,
    totalTopics,
    totalPracticeSolved,
    totalMinutes,
    subDone,
    streak,
    nightOwl: Boolean(state.nightOwl)
  };
}

// Проверка новых ачивок
function checkAchievements() {
  const metrics = getPlayerMetrics();
  let newlyUnlocked = null;

  ACHIEVEMENTS_DB.forEach(ach => {
    if (!state.unlockedAchievements.includes(ach.id)) {
      if (ach.getVal(metrics) >= ach.target) {
        state.unlockedAchievements.push(ach.id);
        newlyUnlocked = ach;
      }
    }
  });

  if (newlyUnlocked) {
    saveState();
    showAchievementToast(newlyUnlocked);
  }
  updateRankHeader();
}

function getRankInfo() {
  const m = getPlayerMetrics();
  const achXp = ACHIEVEMENTS_DB
    .filter(a => state.unlockedAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.xp, 0);

  const totalXp = m.doneTopics * 50 + m.totalPracticeSolved * 30 + m.totalMinutes * 2 + achXp;
  const xpPerLevel = 300;
  const level = Math.floor(totalXp / xpPerLevel) + 1;
  const currentLvlXp = totalXp % xpPerLevel;

  const titles = [
    { min: 1, title: 'Новичок ЕГЭ', icon: '🎒' },
    { min: 3, title: 'Абитуриент', icon: '📘' },
    { min: 6, title: 'Знаток кодификатора', icon: '⚡' },
    { min: 10, title: 'Покоритель 80+', icon: '🔥' },
    { min: 18, title: 'Легенда 100 баллов', icon: '👑' }
  ];
  const rank = [...titles].reverse().find(r => level >= r.min) || titles[0];
  return { totalXp, level, currentLvlXp, xpPerLevel, title: rank.title, icon: rank.icon };
}

function updateRankHeader() {
  const info = getRankInfo();
  document.getElementById('topLvlBadge').textContent = `LVL ${info.level}`;
}

// Сброс и обновление базы
document.getElementById('resetDataBtn').addEventListener('click', () => {
  if (confirm('Обновить базу тем ЕГЭ (Русский 100, Профиль 100, База 100, Физика 200)?')) {
    localStorage.removeItem('focusprep_ege_v8');
    location.reload();
  }
});

// --- Переключение экранов ---
function switchView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');

  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const navBtn = document.querySelector(`.nav-item[data-target="${viewId === 'view-subject-detail' ? 'view-home' : viewId}"]`);
  if (navBtn) navBtn.classList.add('active');

  if (viewId === 'view-home') renderHomeView();
  if (viewId === 'view-practice') initPracticeSelectors();
  if (viewId === 'view-timer') renderTodaySessions();
  if (viewId === 'view-stats') {
    document.getElementById('achNavDot').classList.add('hidden');
    renderAchievementsView();
  }
}

window.goHome = function() {
  switchView('view-home');
};

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.target));
});

document.getElementById('backToHomeBtn').addEventListener('click', () => switchView('view-home'));

// --- Кривая забывания Эббингауза ---
const INTERVALS = [1, 3, 7, 14];
function isTopicDue(topic) {
  if (!topic.doneAt || topic.stage >= INTERVALS.length) return false;
  const daysPassed = (Date.now() - topic.doneAt) / (1000 * 60 * 60 * 24);
  return daysPassed >= INTERVALS[topic.stage];
}

// --- Расчёт Стрика ---
function calculateStreak() {
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = d.toISOString().split('T')[0];
    if ((state.dailyActivity[key] || 0) > 0) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      if (streak === 0 && key === getTodayKey()) {
        d.setDate(d.getDate() - 1);
        continue;
      }
      break;
    }
  }
  return streak;
}

// --- ГЛАВНЫЙ ЭКРАН ---
function renderHomeView() {
  updateRankHeader();
  const streak = calculateStreak();
  document.getElementById('topStreakBadge').textContent = `🔥 ${streak} дн.`;
  document.getElementById('heroStreakCount').textContent = streak;

  const weekStrip = document.getElementById('weekStrip');
  const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  weekStrip.innerHTML = '';
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const active = (state.dailyActivity[key] || 0) > 0;
    const chip = document.createElement('div');
    chip.className = `day-chip ${active ? 'active' : ''}`;
    chip.innerHTML = `${dayNames[d.getDay()]}<span>${active ? '🔥' : '·'}</span>`;
    weekStrip.appendChild(chip);
  }

  let totalTopics = 0;
  let completedTopics = 0;
  let totalDue = 0;

  const grid = document.getElementById('subjectsGrid');
  grid.innerHTML = '';

  state.subjects.forEach(sub => {
    const subTotal = sub.topics.length;
    const subDone = sub.topics.filter(t => t.doneAt).length;
    const subDue = sub.topics.filter(t => isTopicDue(t)).length;
    const subPercent = subTotal ? Math.round((subDone / subTotal) * 100) : 0;

    totalTopics += subTotal;
    completedTopics += subDone;
    totalDue += subDue;

    const card = document.createElement('button');
    card.className = 'subject-card-btn';
    card.onclick = () => openSubjectPage(sub.id);
    card.innerHTML = `
      <div class="sub-card-top">
        <div class="sub-card-left">
          <div class="sub-icon-box">${sub.icon || '📘'}</div>
          <div>
            <div class="sub-card-name">
              ${sub.name}
              ${subDue > 0 ? `<span class="sub-due-pill">Повторить: ${subDue}</span>` : ''}
            </div>
            <div class="sub-card-sub">Освоено ${subDone} из ${subTotal} тем (${subPercent}%)</div>
          </div>
        </div>
        <div class="sub-card-arrow">→</div>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${subPercent}%"></div>
      </div>
    `;
    grid.appendChild(card);
  });

  const overallPercent = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;
  document.getElementById('overallPercent').textContent = `${overallPercent}%`;
  document.getElementById('overallProgressBar').style.width = `${overallPercent}%`;

  const banner = document.getElementById('dueReviewsBanner');
  const navBadge = document.getElementById('navBadge');
  if (totalDue > 0) {
    banner.textContent = `⚡ Пора повторить по Эббингаузу: ${totalDue} тем(ы)`;
    banner.classList.remove('hidden');
    navBadge.textContent = totalDue;
    navBadge.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
    navBadge.classList.add('hidden');
  }

  const timerSelect = document.getElementById('activeSubject');
  const prevSelectVal = timerSelect.value;
  timerSelect.innerHTML = state.subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  if (prevSelectVal) timerSelect.value = prevSelectVal;
}

// --- ЭКРАН ПРЕДМЕТА ---
window.openSubjectPage = function(subId) {
  state.currentSubjectId = subId;
  const searchInput = document.getElementById('topicSearchInput');
  if (searchInput) searchInput.value = '';
  saveState();
  renderSubjectDetail();
  switchView('view-subject-detail');
};

function renderSubjectDetail() {
  const sub = state.subjects.find(s => s.id === state.currentSubjectId) || state.subjects[0];
  const doneCount = sub.topics.filter(t => t.doneAt).length;
  const totalCount = sub.topics.length;
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  document.getElementById('subDetailTitle').textContent = sub.name;
  document.getElementById('subDetailBadge').textContent = sub.subtitle || 'Кодификатор ЕГЭ';
  document.getElementById('subDetailStat').textContent = `${doneCount} / ${totalCount}`;
  document.getElementById('subDetailBar').style.width = `${pct}%`;

  const query = (document.getElementById('topicSearchInput')?.value || '').trim().toLowerCase();
  const visibleTopics = query
    ? sub.topics.filter(t => t.title.toLowerCase().includes(query) || (t.block && t.block.toLowerCase().includes(query)))
    : sub.topics;

  const container = document.getElementById('topicsContainer');
  container.innerHTML = visibleTopics.map(t => {
    const isDone = Boolean(t.doneAt);
    const due = isTopicDue(t);
    return `
      <div class="topic-card ${due ? 'due-border' : ''} ${isDone ? 'done-card' : ''}">
        <div class="check-circle ${isDone ? 'done' : ''}" onclick="quickToggleTopic('${sub.id}', '${t.id}')">
          ${isDone ? '✓' : ''}
        </div>
        <div class="topic-body" onclick="openTopicDetail('${sub.id}', '${t.id}')">
          <div class="topic-block">${t.block || 'Раздел ЕГЭ'}</div>
          <div class="topic-title ${isDone ? 'done' : ''}">${t.title}</div>
          <div class="topic-badges">
            ${t.note ? '<span class="mini-pill">💡 Памятка</span>' : ''}
            ${t.question ? `<span class="mini-pill">${t.solved ? '✅ Решено' : '⚡ Задача'}</span>` : ''}
            ${due ? '<span class="mini-pill due">Повторить!</span>' : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

document.getElementById('topicSearchInput')?.addEventListener('input', renderSubjectDetail);

window.quickToggleTopic = function(subId, topicId) {
  const sub = state.subjects.find(s => s.id === subId);
  const topic = sub.topics.find(t => t.id === topicId);
  if (!topic.doneAt) {
    topic.doneAt = Date.now();
    topic.stage = 0;
    logActivity(15);
  } else if (isTopicDue(topic)) {
    topic.doneAt = Date.now();
    topic.stage += 1;
    logActivity(10);
  } else {
    topic.doneAt = null;
    topic.stage = 0;
    saveState();
  }
  renderSubjectDetail();
  renderHomeView();
};

// --- Карточка темы (Памятка + Мини-задача) ---
let activeModalSubId = null;
let activeModalTopicId = null;
const topicModal = document.getElementById('topicModal');

window.openTopicDetail = function(subId, topicId) {
  activeModalSubId = subId;
  activeModalTopicId = topicId;
  const sub = state.subjects.find(s => s.id === subId);
  const topic = sub.topics.find(t => t.id === topicId);

  document.getElementById('detailBlockTag').textContent = topic.block || sub.name;
  document.getElementById('detailTitle').textContent = topic.title;
  document.getElementById('detailNote').textContent = topic.note || 'Памятка для этой темы пока не добавлена.';

  const quizBox = document.getElementById('detailQuizBox');
  const feedback = document.getElementById('quizFeedback');
  const input = document.getElementById('quizAnswerInput');
  feedback.classList.add('hidden');
  input.value = '';

  if (topic.question) {
    quizBox.classList.remove('hidden');
    document.getElementById('detailQuestion').textContent = topic.question;
  } else {
    quizBox.classList.add('hidden');
  }

  const toggleBtn = document.getElementById('modalToggleDoneBtn');
  if (!topic.doneAt) {
    toggleBtn.textContent = 'Отметить тему изученной (+50 XP)';
  } else if (isTopicDue(topic)) {
    toggleBtn.textContent = 'Подтвердить повторение темы';
  } else {
    toggleBtn.textContent = 'Снять отметку об изучении';
  }

  topicModal.classList.remove('hidden');
};

document.getElementById('closeTopicModal').addEventListener('click', () => topicModal.classList.add('hidden'));

document.getElementById('checkQuizBtn').addEventListener('click', () => {
  const sub = state.subjects.find(s => s.id === activeModalSubId);
  const topic = sub.topics.find(t => t.id === activeModalTopicId);
  const userAns = document.getElementById('quizAnswerInput').value.trim().toLowerCase().replace(',', '.');
  const rightAns = topic.answer.trim().toLowerCase().replace(',', '.');
  const feedback = document.getElementById('quizFeedback');

  feedback.classList.remove('hidden', 'ok', 'err');
  if (userAns === rightAns) {
    topic.solved = true;
    feedback.textContent = '✓ Верно! +30 XP начислено, стрик продлён.';
    feedback.classList.add('ok');
    logActivity(15);
    renderSubjectDetail();
    renderHomeView();
  } else {
    feedback.textContent = `✕ Неверно. Правильный ответ: ${topic.answer}`;
    feedback.classList.add('err');
  }
});

document.getElementById('modalToggleDoneBtn').addEventListener('click', () => {
  quickToggleTopic(activeModalSubId, activeModalTopicId);
  topicModal.classList.add('hidden');
});

// --- Добавление своей темы ---
const addModal = document.getElementById('addModal');
document.getElementById('addTopicBtn').addEventListener('click', () => {
  document.getElementById('newTopicTitle').value = '';
  document.getElementById('newTopicNote').value = '';
  addModal.classList.remove('hidden');
});
document.getElementById('cancelAddModal').addEventListener('click', () => addModal.classList.add('hidden'));
document.getElementById('confirmAddModal').addEventListener('click', () => {
  const title = document.getElementById('newTopicTitle').value.trim();
  const note = document.getElementById('newTopicNote').value.trim();
  if (!title) return;
  const sub = state.subjects.find(s => s.id === state.currentSubjectId);
  sub.topics.push({
    id: 'custom-' + Date.now(),
    block: 'Дополнительная тема',
    title,
    note,
    question: null,
    answer: null,
    doneAt: null,
    stage: 0,
    solved: false
  });
  saveState();
  renderSubjectDetail();
  renderHomeView();
  addModal.classList.add('hidden');
});

// --- ЭКРАН ТРЕНАЖЁРА СЛУЧАЙНЫХ ЗАДАНИЙ ---
let currentPracticeTask = null;
let practiceCombo = 0;
let practiceBestCombo = 0;
let practiceSessionSolved = 0;
let practiceAnsweredCurrent = false;

const pracSubSelect = document.getElementById('practiceSubjectSelect');
const pracTopicSelect = document.getElementById('practiceTopicSelect');

function initPracticeSelectors() {
  const prevSub = pracSubSelect.value || 'all';
  pracSubSelect.innerHTML = `<option value="all">🎲 Все предметы (Микс 500 задач)</option>` +
    state.subjects.map(s => `<option value="${s.id}">${s.icon} ${s.name} (${s.topics.length})</option>`).join('');
  pracSubSelect.value = prevSub;
  updatePracticeTopicOptions();
  if (!currentPracticeTask) loadNextPracticeTask();
}

function updatePracticeTopicOptions() {
  const selectedSub = pracSubSelect.value;
  if (selectedSub === 'all') {
    pracTopicSelect.innerHTML = `<option value="all">Все темы</option>`;
    return;
  }
  const sub = state.subjects.find(s => s.id === selectedSub);
  pracTopicSelect.innerHTML = `<option value="all">Все темы предмета (${sub ? sub.topics.length : 0})</option>` +
    (sub ? sub.topics.map(t => `<option value="${t.id}">${t.title}</option>`).join('') : '');
}

function getPracticePool() {
  const subFilter = pracSubSelect.value;
  const topicFilter = pracTopicSelect.value;
  const pool = [];

  state.subjects.forEach(sub => {
    if (subFilter !== 'all' && sub.id !== subFilter) return;
    sub.topics.forEach(t => {
      if (topicFilter !== 'all' && t.id !== topicFilter) return;
      if (t.question && t.answer) {
        pool.push({
          subName: sub.name,
          block: t.block,
          topicTitle: t.title,
          note: t.note,
          q: t.question,
          a: t.answer
        });
      }
      if (Array.isArray(t.extraTasks)) {
        t.extraTasks.forEach(ex => {
          pool.push({
            subName: sub.name,
            block: t.block,
            topicTitle: t.title,
            note: t.note,
            q: ex.q,
            a: ex.a
          });
        });
      }
    });
  });

  return pool;
}

function loadNextPracticeTask() {
  const pool = getPracticePool();
  document.getElementById('pracPoolSize').textContent = pool.length;

  const feedback = document.getElementById('pracFeedback');
  const hintBox = document.getElementById('pracHintBox');
  const input = document.getElementById('pracAnswerInput');

  feedback.classList.add('hidden');
  hintBox.classList.add('hidden');
  input.value = '';
  practiceAnsweredCurrent = false;

  if (pool.length === 0) {
    document.getElementById('pracSubBadge').textContent = 'Нет задач';
    document.getElementById('pracBlockBadge').textContent = '';
    document.getElementById('pracTopicTitle').textContent = 'Для этой темы пока нет готовых задач';
    document.getElementById('pracQuestionText').textContent = 'Выберите другую тему или «Все темы».';
    currentPracticeTask = null;
    return;
  }

  let candidate = pool[Math.floor(Math.random() * pool.length)];
  if (pool.length > 1 && currentPracticeTask && candidate.q === currentPracticeTask.q) {
    candidate = pool[(pool.indexOf(candidate) + 1) % pool.length];
  }
  currentPracticeTask = candidate;

  document.getElementById('pracSubBadge').textContent = candidate.subName;
  document.getElementById('pracBlockBadge').textContent = candidate.block || 'ЕГЭ';
  document.getElementById('pracTopicTitle').textContent = candidate.topicTitle;
  document.getElementById('pracQuestionText').textContent = candidate.q;
  document.getElementById('pracHintText').textContent = candidate.note || 'Вспомните базовое правило или формулу из этого раздела.';
}

pracSubSelect.addEventListener('change', () => {
  updatePracticeTopicOptions();
  loadNextPracticeTask();
});
pracTopicSelect.addEventListener('change', () => loadNextPracticeTask());

document.getElementById('pracToggleHintBtn').addEventListener('click', () => {
  document.getElementById('pracHintBox').classList.toggle('hidden');
});

document.getElementById('pracNextBtn').addEventListener('click', () => {
  loadNextPracticeTask();
});

document.getElementById('pracCheckBtn').addEventListener('click', () => {
  if (!currentPracticeTask) return;
  const userAns = document.getElementById('pracAnswerInput').value.trim().toLowerCase().replace(',', '.');
  const rightAns = currentPracticeTask.a.trim().toLowerCase().replace(',', '.');
  const feedback = document.getElementById('pracFeedback');

  if (!userAns) return;
  feedback.classList.remove('hidden', 'ok', 'err');

  if (userAns === rightAns) {
    if (!practiceAnsweredCurrent) {
      practiceAnsweredCurrent = true;
      practiceCombo++;
      practiceSessionSolved++;
      if (practiceCombo > practiceBestCombo) practiceBestCombo = practiceCombo;
      state.practiceSolvedTotal = (state.practiceSolvedTotal || 0) + 1;
      logActivity(15);
      renderHomeView();
    }
    document.getElementById('practiceComboBadge').textContent = `⚡ Комбо: ${practiceCombo}`;
    document.getElementById('pracSessionSolved').textContent = practiceSessionSolved;
    document.getElementById('pracBestCombo').textContent = practiceBestCombo;

    feedback.textContent = `✓ Верно! +30 XP (серия комбо: ${practiceCombo})`;
    feedback.classList.add('ok');
  } else {
    practiceCombo = 0;
    document.getElementById('practiceComboBadge').textContent = `⚡ Комбо: 0`;
    feedback.textContent = `✕ Неверно. Правильный ответ: ${currentPracticeTask.a}`;
    feedback.classList.add('err');
  }
});

// --- Таймер и учёт времени ---
let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let timerType = 'work';
let timerInterval = null;
let endTime = null;

if (!state.sessions) state.sessions = [];

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;

function setTimerMinutes(mins, type = 'work') {
  if (timerInterval) return;
  const clamped = Math.max(1, Math.min(300, mins));
  totalSeconds = clamped * 60;
  remainingSeconds = totalSeconds;
  timerType = type;
  document.getElementById('timerStatus').textContent = type === 'work' ? 'Готов к старту' : 'Время отдыха';
  updateTimerUI();
}

function updateTimerUI() {
  const mins = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const secs = (remainingSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timeText').textContent = `${mins}:${secs}`;
  circle.style.strokeDashoffset = circumference - (remainingSeconds / totalSeconds) * circumference;
}

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    if (timerInterval) return;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    setTimerMinutes(parseInt(pill.dataset.minutes, 10), pill.dataset.type);
  });
});

document.getElementById('minus5Btn').addEventListener('click', () => {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  setTimerMinutes(Math.round(totalSeconds / 60) - 5, 'work');
});

document.getElementById('plus5Btn').addEventListener('click', () => {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  setTimerMinutes(Math.round(totalSeconds / 60) + 5, 'work');
});

document.getElementById('customTimeBtn').addEventListener('click', () => {
  if (timerInterval) return;
  const val = prompt('Введите длительность таймера в минутах (от 1 до 240):', Math.round(totalSeconds / 60));
  const parsed = parseInt(val, 10);
  if (!isNaN(parsed) && parsed > 0) {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    setTimerMinutes(parsed, 'work');
  }
});

function commitStudyMinutes(mins, sourceLabel) {
  if (mins <= 0) return;
  const subId = document.getElementById('activeSubject').value;
  const sub = state.subjects.find(s => s.id === subId) || state.subjects[0];
  if (sub) sub.minutes += mins;

  state.sessions.unshift({
    date: getTodayKey(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    subjectName: sub ? sub.name : 'Предмет',
    minutes: mins,
    source: sourceLabel
  });

  logActivity(mins);
  renderHomeView();
  renderTodaySessions();
}

const startPauseBtn = document.getElementById('startPauseBtn');
const finishEarlyBtn = document.getElementById('finishEarlyBtn');
const timeAdjustRow = document.getElementById('timeAdjustRow');

startPauseBtn.addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startPauseBtn.textContent = 'Продолжить';
    document.getElementById('timerStatus').textContent = 'Пауза';
  } else {
    endTime = Date.now() + remainingSeconds * 1000;
    startPauseBtn.textContent = 'Пауза';
    timeAdjustRow.classList.add('hidden');
    if (timerType === 'work') finishEarlyBtn.classList.remove('hidden');
    document.getElementById('timerStatus').textContent = timerType === 'work' ? 'Идёт фокус...' : 'Отдых...';

    timerInterval = setInterval(() => {
      remainingSeconds = Math.max(0, Math.round((endTime - Date.now()) / 1000));
      updateTimerUI();
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        startPauseBtn.textContent = 'Запустить';
        finishEarlyBtn.classList.add('hidden');
        timeAdjustRow.classList.remove('hidden');
        if (timerType === 'work') {
          commitStudyMinutes(Math.round(totalSeconds / 60), 'Таймер');
        }
        remainingSeconds = totalSeconds;
        document.getElementById('timerStatus').textContent = 'Сессия завершена!';
        updateTimerUI();
      }
    }, 500);
  }
});

finishEarlyBtn.addEventListener('click', () => {
  const elapsedMins = Math.max(1, Math.round((totalSeconds - remainingSeconds) / 60));
  clearInterval(timerInterval);
  timerInterval = null;
  commitStudyMinutes(elapsedMins, 'Таймер (досрочно)');
  remainingSeconds = totalSeconds;
  startPauseBtn.textContent = 'Запустить';
  finishEarlyBtn.classList.add('hidden');
  timeAdjustRow.classList.remove('hidden');
  document.getElementById('timerStatus').textContent = `Засчитано ${elapsedMins} мин!`;
  updateTimerUI();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingSeconds = totalSeconds;
  startPauseBtn.textContent = 'Запустить';
  finishEarlyBtn.classList.add('hidden');
  timeAdjustRow.classList.remove('hidden');
  document.getElementById('timerStatus').textContent = 'Готов к старту';
  updateTimerUI();
});

document.querySelectorAll('.chip-min').forEach(chip => {
  chip.addEventListener('click', () => {
    const input = document.getElementById('manualMinutesInput');
    const current = parseInt(input.value, 10) || 0;
    input.value = current + parseInt(chip.dataset.add, 10);
  });
});

document.getElementById('addManualTimeBtn').addEventListener('click', () => {
  const input = document.getElementById('manualMinutesInput');
  const mins = parseInt(input.value, 10);
  if (isNaN(mins) || mins <= 0) return;
  commitStudyMinutes(mins, 'Вручную');
  input.value = '';
});

function renderTodaySessions() {
  const today = getTodayKey();
  const todayList = (state.sessions || []).filter(s => s.date === today);
  const totalTodayMins = todayList.reduce((acc, s) => acc + s.minutes, 0);

  document.getElementById('todayTotalBadge').textContent = `${totalTodayMins} мин`;
  const container = document.getElementById('todaySessionsList');

  if (todayList.length === 0) {
    container.innerHTML = '<div class="session-meta">Сегодня пока нет записанных занятий</div>';
    return;
  }

  container.innerHTML = todayList.slice(0, 5).map(s => `
    <div class="session-row">
      <div>
        <strong>${s.subjectName}</strong>
        <div class="session-meta">${s.source} · в ${s.time}</div>
      </div>
      <strong style="color:#22d3ee;">+${s.minutes} мин</strong>
    </div>
  `).join('');
}

// --- ЭКРАН АЧИВОК ---
let currentAchFilter = 'all';

document.querySelectorAll('.ach-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ach-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentAchFilter = btn.dataset.filter;
    renderAchievementsView();
  });
});

function renderAchievementsView() {
  const metrics = getPlayerMetrics();
  const rank = getRankInfo();

  document.getElementById('playerRankIcon').textContent = rank.icon;
  document.getElementById('playerLevel').textContent = rank.level;
  document.getElementById('playerTitle').textContent = rank.title;
  document.getElementById('playerXp').textContent = rank.currentLvlXp;
  document.getElementById('playerNextXp').textContent = rank.xpPerLevel;
  document.getElementById('playerXpBar').style.width = `${Math.round((rank.currentLvlXp / rank.xpPerLevel) * 100)}%`;

  const unlockedCount = state.unlockedAchievements.length;
  document.getElementById('achUnlockedCount').textContent = `${unlockedCount}/${ACHIEVEMENTS_DB.length}`;

  const list = document.getElementById('achievementsList');
  const filtered = ACHIEVEMENTS_DB.filter(ach => {
    const isUnlocked = state.unlockedAchievements.includes(ach.id);
    if (currentAchFilter === 'unlocked') return isUnlocked;
    if (currentAchFilter === 'locked') return !isUnlocked;
    return true;
  });

  list.innerHTML = filtered.map(ach => {
    const isUnlocked = state.unlockedAchievements.includes(ach.id);
    const currentVal = Math.min(ach.target, ach.getVal(metrics));
    const pct = Math.round((currentVal / ach.target) * 100);
    const isSecretLocked = ach.id === 'night-owl' && !isUnlocked;

    return `
      <div class="ach-card ${isUnlocked ? 'unlocked ' + ach.rarity : 'locked'}">
        <div class="ach-icon">${isSecretLocked ? '❓' : ach.icon}</div>
        <div class="ach-content">
          <div class="ach-header-row">
            <span class="ach-name">${isSecretLocked ? 'Секретное достижение' : ach.name}</span>
            <span class="rarity-badge ${ach.rarity}">${ach.rarityLabel} · +${ach.xp} XP</span>
          </div>
          <div class="ach-desc">${isSecretLocked ? 'Выполни особое скрытое условие во время подготовки...' : ach.desc}</div>
          <div class="ach-progress-row">
            <div class="ach-bar-bg">
              <div class="ach-bar-fill" style="width: ${isUnlocked ? 100 : pct}%"></div>
            </div>
            <span class="ach-prog-num">${isUnlocked ? 'Получено ✓' : `${currentVal} / ${ach.target}`}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('statTopicsDone').textContent = `${metrics.doneTopics} / ${metrics.totalTopics}`;
  document.getElementById('statQuizzesSolved').textContent = metrics.totalPracticeSolved;
  document.getElementById('statTotalHours').textContent = (metrics.totalMinutes / 60).toFixed(1) + ' ч';

  document.getElementById('subjectBreakdown').innerHTML = state.subjects.map(s => {
    const done = s.topics.filter(t => t.doneAt).length;
    return `
      <div class="breakdown-item">
        <span>${s.name}</span>
        <strong>${done}/${s.topics.length} тем · ${s.minutes} мин</strong>
      </div>
    `;
  }).join('');
}

// Инициализация
updateTimerUI();
checkAchievements();
renderHomeView();
initPracticeSelectors();
renderTodaySessions();
renderAchievementsView();