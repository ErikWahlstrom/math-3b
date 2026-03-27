// === localStorage wrapper (handles private browsing) ===
const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, val) {
    try { localStorage.setItem(key, val); } catch { /* noop */ }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* noop */ }
  }
};

// === Topic IDs ===
const TOPIC_IDS = [
  'deriv-def', 'deriv-power', 'deriv-exp', 'deriv-extreme',
  'int-concept', 'int-notation', 'int-estimate', 'int-antideriv',
  'int-definite', 'int-area'
];

const PREFIX = 'math3b_';

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initTopicToggles();
  renderAllQuizzes();
  initQuiz();
  initSelfAssess();
  restoreState();
  updateProgress();
});

// === Tabs ===
function initTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
      store.set(PREFIX + 'tab', target);
    });
  });

  const hash = window.location.hash.slice(1);
  const saved = store.get(PREFIX + 'tab');
  const target = hash || saved || 'del1';
  const activeBtn = document.querySelector(`[data-tab="${target}"]`);
  if (activeBtn) activeBtn.click();
}

// === Topic Accordion ===
function initTopicToggles() {
  document.querySelectorAll('.topic-header').forEach(header => {
    header.addEventListener('click', () => {
      const topic = header.closest('.topic');
      topic.classList.toggle('open');
    });
  });
}

// === Dynamic Quiz Rendering ===
function renderAllQuizzes() {
  document.querySelectorAll('.quiz[data-topic-id]').forEach(quiz => {
    renderQuiz(quiz);
  });
}

function renderQuiz(quizEl) {
  const topicId = quizEl.dataset.topicId;
  if (!topicId || !QUESTIONS[topicId]) return;

  const questions = pickQuestions(topicId, QUIZ_SIZE);

  // Save which question indices were picked (for restore)
  const pool = QUESTIONS[topicId];
  const pickedIndices = questions.map(q => pool.indexOf(q));
  store.set(PREFIX + 'quiz_pick_' + topicId, JSON.stringify(pickedIndices));

  renderQuizHTML(quizEl, questions, topicId);
}

function renderQuizHTML(quizEl, questions, topicId) {
  let html = '<h4>Testa dig själv</h4>';

  questions.forEach((q, qi) => {
    // Shuffle options (keeping track of correct)
    const optionIndices = q.options.map((_, i) => i);
    shuffleArray(optionIndices);

    html += `<div class="quiz-question" data-q="${qi}">`;
    html += `<p>${q.q}</p>`;
    optionIndices.forEach(oi => {
      const isCorrect = oi === q.correct;
      html += `<button class="quiz-option" data-correct="${isCorrect}">${q.options[oi]}</button>`;
    });
    html += `<div class="quiz-feedback hidden">${q.feedback}</div>`;
    html += '</div>';
  });

  html += `<div class="quiz-score hidden">Resultat: <span class="score">0</span>/<span class="total">${questions.length}</span></div>`;
  html += '<button class="quiz-reset hidden">Nya frågor</button>';

  quizEl.innerHTML = html;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// === Quiz Logic ===
function initQuiz() {
  document.addEventListener('click', (e) => {
    const option = e.target.closest('.quiz-option');
    if (!option || option.classList.contains('answered')) return;

    const question = option.closest('.quiz-question');
    const options = question.querySelectorAll('.quiz-option');
    const feedback = question.querySelector('.quiz-feedback');
    const isCorrect = option.dataset.correct === 'true';

    options.forEach(o => o.classList.add('answered'));

    if (isCorrect) {
      option.classList.add('correct');
    } else {
      option.classList.add('wrong');
      options.forEach(o => {
        if (o.dataset.correct === 'true') o.classList.add('show-correct');
      });
    }

    if (feedback) {
      feedback.classList.remove('hidden');
      feedback.classList.add(isCorrect ? 'correct' : 'wrong');
    }

    updateQuizScore(question.closest('.quiz'));
  });
}

function updateQuizScore(quiz) {
  if (!quiz) return;
  const questions = quiz.querySelectorAll('.quiz-question');
  const total = questions.length;
  let answered = 0;
  let correct = 0;

  questions.forEach(q => {
    const selected = q.querySelector('.quiz-option.correct, .quiz-option.wrong');
    if (selected) {
      answered++;
      if (selected.classList.contains('correct')) correct++;
    }
  });

  if (answered === total) {
    const scoreEl = quiz.querySelector('.quiz-score');
    if (scoreEl) {
      scoreEl.classList.remove('hidden');
      const span = scoreEl.querySelector('.score');
      if (span) span.textContent = correct;
      const totalSpan = scoreEl.querySelector('.total');
      if (totalSpan) totalSpan.textContent = total;
    }
    const resetBtn = quiz.querySelector('.quiz-reset');
    if (resetBtn) resetBtn.classList.remove('hidden');
  }
}

// === Quiz Reset (new questions) ===
document.addEventListener('click', (e) => {
  if (!e.target.closest('.quiz-reset')) return;
  const quiz = e.target.closest('.quiz');
  if (!quiz) return;
  const topicId = quiz.dataset.topicId;

  // Clear saved state
  if (topicId) {
    store.remove(PREFIX + 'quiz_pick_' + topicId);
  }

  // Render fresh questions from the pool
  renderQuiz(quiz);
});

// === Self Assessment ===
function initSelfAssess() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.self-assess button');
    if (!btn) return;

    const assess = btn.closest('.self-assess');
    const topicId = assess.dataset.topicId;
    const status = btn.dataset.status;

    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      store.remove(PREFIX + topicId);
    } else {
      assess.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      store.set(PREFIX + topicId, status);
    }

    updateTopicStatus(topicId);
    updateProgress();
  });
}

function updateTopicStatus(topicId) {
  const topic = document.querySelector(`.topic[data-topic-id="${topicId}"]`);
  if (!topic) return;
  const statusEl = topic.querySelector('.topic-status');
  if (!statusEl) return;

  const status = store.get(PREFIX + topicId);
  const icons = { ok: '✅', unsure: '🤔', no: '❌' };
  statusEl.textContent = icons[status] || '';
}

// === Progress Bar ===
function updateProgress() {
  let ok = 0, unsure = 0, no = 0, total = TOPIC_IDS.length;

  TOPIC_IDS.forEach(id => {
    const s = store.get(PREFIX + id);
    if (s === 'ok') ok++;
    else if (s === 'unsure') unsure++;
    else if (s === 'no') no++;
  });

  const assessed = ok + unsure + no;
  const pct = total > 0 ? Math.round((ok / total) * 100) : 0;

  const fill = document.querySelector('.progress-fill');
  if (fill) fill.style.width = pct + '%';

  const text = document.querySelector('.progress-text');
  if (text) {
    text.textContent = `${ok}/${total} klara`;
    if (unsure > 0) text.textContent += ` · ${unsure} osäkra`;
  }

  if (assessed === total && total > 0) {
    showSummary(ok, unsure, no, total);
  }
}

// === Summary ===
function showSummary(ok, unsure, no, total) {
  const overlay = document.getElementById('summary-overlay');
  if (!overlay || overlay.dataset.dismissed === 'true') return;

  const pre = overlay.querySelector('.summary-text');
  if (pre) {
    let text = 'Matte 3b — Självskattning\n';
    text += '═'.repeat(30) + '\n\n';

    text += 'DERIVATA\n';
    ['deriv-def', 'deriv-power', 'deriv-exp', 'deriv-extreme'].forEach(id => {
      const label = document.querySelector(`.topic[data-topic-id="${id}"] h3`);
      const s = store.get(PREFIX + id);
      const icon = { ok: '✅', unsure: '🤔', no: '❌' }[s] || '—';
      text += `  ${icon} ${label ? label.textContent : id}\n`;
    });

    text += '\nINTEGRALER\n';
    ['int-concept', 'int-notation', 'int-estimate', 'int-antideriv', 'int-definite', 'int-area'].forEach(id => {
      const label = document.querySelector(`.topic[data-topic-id="${id}"] h3`);
      const s = store.get(PREFIX + id);
      const icon = { ok: '✅', unsure: '🤔', no: '❌' }[s] || '—';
      text += `  ${icon} ${label ? label.textContent : id}\n`;
    });

    text += `\nResultat: ${ok} klara, ${unsure} osäkra, ${no} att öva på`;
    pre.textContent = text;
  }

  overlay.classList.add('visible');
}

document.addEventListener('click', (e) => {
  if (e.target.closest('.btn-copy')) {
    const pre = document.querySelector('.summary-text');
    if (pre) {
      navigator.clipboard.writeText(pre.textContent).then(() => {
        e.target.closest('.btn-copy').textContent = 'Kopierat!';
        setTimeout(() => {
          e.target.closest('.btn-copy').textContent = 'Kopiera';
        }, 2000);
      });
    }
  }
  if (e.target.closest('.btn-close')) {
    const overlay = document.getElementById('summary-overlay');
    if (overlay) {
      overlay.classList.remove('visible');
      overlay.dataset.dismissed = 'true';
    }
  }
});

// === Show Summary Button ===
document.addEventListener('click', (e) => {
  if (e.target.closest('.show-summary-btn')) {
    const overlay = document.getElementById('summary-overlay');
    if (overlay) {
      overlay.dataset.dismissed = 'false';
      let ok = 0, unsure = 0, no = 0;
      TOPIC_IDS.forEach(id => {
        const s = store.get(PREFIX + id);
        if (s === 'ok') ok++;
        else if (s === 'unsure') unsure++;
        else if (s === 'no') no++;
      });
      showSummary(ok, unsure, no, TOPIC_IDS.length);
    }
  }
});

// === Reset All ===
document.addEventListener('click', (e) => {
  if (!e.target.closest('.reset-btn') || e.target.closest('.show-summary-btn')) return;
  if (!confirm('Nollställa all progress?')) return;

  TOPIC_IDS.forEach(id => {
    store.remove(PREFIX + id);
    store.remove(PREFIX + 'quiz_pick_' + id);
  });

  // Reset UI
  document.querySelectorAll('.self-assess button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.topic-status').forEach(s => s.textContent = '');

  // Re-render all quizzes with fresh questions
  renderAllQuizzes();

  updateProgress();
});

// === Restore State ===
function restoreState() {
  // Restore self-assessments
  TOPIC_IDS.forEach(id => {
    const status = store.get(PREFIX + id);
    if (status) {
      const assess = document.querySelector(`.self-assess[data-topic-id="${id}"]`);
      if (assess) {
        const btn = assess.querySelector(`button[data-status="${status}"]`);
        if (btn) btn.classList.add('active');
      }
      updateTopicStatus(id);
    }
  });

  // Note: quizzes are already rendered fresh on each page load
  // This is intentional — no need to restore exact quiz state
  // The user gets a mix of familiar and new questions each visit
}
