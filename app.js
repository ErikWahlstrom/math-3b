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

  // Restore tab or use hash
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

// === Quiz Logic ===
function initQuiz() {
  document.addEventListener('click', (e) => {
    const option = e.target.closest('.quiz-option');
    if (!option || option.classList.contains('answered')) return;

    const question = option.closest('.quiz-question');
    const options = question.querySelectorAll('.quiz-option');
    const feedback = question.querySelector('.quiz-feedback');
    const isCorrect = option.dataset.correct === 'true';

    // Mark all as answered
    options.forEach(o => o.classList.add('answered'));

    // Highlight selected
    if (isCorrect) {
      option.classList.add('correct');
    } else {
      option.classList.add('wrong');
      // Show correct answer
      options.forEach(o => {
        if (o.dataset.correct === 'true') o.classList.add('show-correct');
      });
    }

    // Show feedback
    if (feedback) {
      feedback.classList.remove('hidden');
      feedback.classList.add(isCorrect ? 'correct' : 'wrong');
    }

    // Update quiz score
    updateQuizScore(question.closest('.quiz'));

    // Save quiz state
    saveQuizState(question.closest('.quiz'));
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

function saveQuizState(quiz) {
  if (!quiz) return;
  const topicId = quiz.dataset.topicId;
  if (!topicId) return;

  const questions = quiz.querySelectorAll('.quiz-question');
  const state = [];
  questions.forEach((q, i) => {
    const options = q.querySelectorAll('.quiz-option');
    let selectedIdx = -1;
    options.forEach((o, j) => {
      if (o.classList.contains('correct') || o.classList.contains('wrong')) {
        selectedIdx = j;
      }
    });
    state.push(selectedIdx);
  });
  store.set(PREFIX + 'quiz_' + topicId, JSON.stringify(state));
}

function restoreQuizState(quiz) {
  if (!quiz) return;
  const topicId = quiz.dataset.topicId;
  if (!topicId) return;

  const saved = store.get(PREFIX + 'quiz_' + topicId);
  if (!saved) return;

  try {
    const state = JSON.parse(saved);
    const questions = quiz.querySelectorAll('.quiz-question');
    questions.forEach((q, i) => {
      if (state[i] >= 0) {
        const options = q.querySelectorAll('.quiz-option');
        const selected = options[state[i]];
        if (selected) {
          // Simulate click effects
          const isCorrect = selected.dataset.correct === 'true';
          options.forEach(o => o.classList.add('answered'));
          if (isCorrect) {
            selected.classList.add('correct');
          } else {
            selected.classList.add('wrong');
            options.forEach(o => {
              if (o.dataset.correct === 'true') o.classList.add('show-correct');
            });
          }
          const feedback = q.querySelector('.quiz-feedback');
          if (feedback) {
            feedback.classList.remove('hidden');
            feedback.classList.add(isCorrect ? 'correct' : 'wrong');
          }
        }
      }
    });
    updateQuizScore(quiz);
  } catch { /* ignore corrupt data */ }
}

// === Quiz Reset ===
document.addEventListener('click', (e) => {
  if (!e.target.closest('.quiz-reset')) return;
  const quiz = e.target.closest('.quiz');
  if (!quiz) return;
  const topicId = quiz.dataset.topicId;

  // Reset UI
  quiz.querySelectorAll('.quiz-option').forEach(o => {
    o.classList.remove('answered', 'correct', 'wrong', 'show-correct');
  });
  quiz.querySelectorAll('.quiz-feedback').forEach(f => {
    f.classList.add('hidden');
    f.classList.remove('correct', 'wrong');
  });
  const scoreEl = quiz.querySelector('.quiz-score');
  if (scoreEl) scoreEl.classList.add('hidden');
  const resetBtn = quiz.querySelector('.quiz-reset');
  if (resetBtn) resetBtn.classList.add('hidden');

  // Clear saved state
  if (topicId) store.remove(PREFIX + 'quiz_' + topicId);
});

// === Self Assessment ===
function initSelfAssess() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.self-assess button');
    if (!btn) return;

    const assess = btn.closest('.self-assess');
    const topicId = assess.dataset.topicId;
    const status = btn.dataset.status;

    // Toggle: if already active, remove
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

  // Show summary when all assessed
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
  if (!e.target.closest('.reset-btn')) return;
  if (!confirm('Nollställa all progress?')) return;

  TOPIC_IDS.forEach(id => {
    store.remove(PREFIX + id);
    store.remove(PREFIX + 'quiz_' + id);
  });

  // Reset UI
  document.querySelectorAll('.self-assess button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.topic-status').forEach(s => s.textContent = '');
  document.querySelectorAll('.quiz').forEach(quiz => {
    quiz.querySelectorAll('.quiz-option').forEach(o => {
      o.classList.remove('answered', 'correct', 'wrong', 'show-correct');
    });
    quiz.querySelectorAll('.quiz-feedback').forEach(f => {
      f.classList.add('hidden');
      f.classList.remove('correct', 'wrong');
    });
    const scoreEl = quiz.querySelector('.quiz-score');
    if (scoreEl) scoreEl.classList.add('hidden');
    const resetBtn = quiz.querySelector('.quiz-reset');
    if (resetBtn) resetBtn.classList.add('hidden');
  });

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

  // Restore quizzes
  document.querySelectorAll('.quiz[data-topic-id]').forEach(quiz => {
    restoreQuizState(quiz);
  });
}
