import { useState } from 'react';
import { generateQuestions } from '../api/interview';

const difficultyColors = {
  easy: { bg: '#14532d', text: '#4ade80' },
  medium: { bg: '#713f12', text: '#fbbf24' },
  hard: { bg: '#7f1d1d', text: '#f87171' },
};

const QuestionCard = ({ question, index }) => {
  const [open, setOpen] = useState(false);
  const colors = difficultyColors[question.difficulty];

  return (
    <div style={styles.card}>
      {/* header row */}
      <div
        style={styles.cardHeader}
        onClick={() => setOpen(!open)}
      >
        <div style={styles.cardHeaderLeft}>
          <span style={styles.questionNumber}>Q{index + 1}</span>
          <span style={styles.questionText}>{question.question}</span>
        </div>
        <div style={styles.cardHeaderRight}>
          <span style={{
            ...styles.badge,
            background: colors.bg,
            color: colors.text,
          }}>
            {question.difficulty}
          </span>
          <span style={{
            ...styles.badge,
            background: '#1e3a5f',
            color: '#93c5fd',
          }}>
            {question.category}
          </span>
          <span style={styles.chevron}>{open ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* model answer — revealed on click */}
      {open && (
        <div style={styles.answerBox}>
          <p style={styles.answerLabel}>Model Answer</p>
          <p style={styles.answerText}>{question.modelAnswer}</p>
        </div>
      )}
    </div>
  );
};

const InterviewSection = ({ resumeId, jobDescription = '' }) => {
  const [difficulty, setDifficulty] = useState('mixed');
  const [jd, setJd] = useState(jobDescription);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!resumeId) {
      setError('Please upload and analyze a resume first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await generateQuestions(resumeId, jd || null, difficulty);
      setQuestions(data.interview.questions);
      setGenerated(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  // group questions by difficulty for display
  const grouped = {
    hard: questions.filter(q => q.difficulty === 'hard'),
    medium: questions.filter(q => q.difficulty === 'medium'),
    easy: questions.filter(q => q.difficulty === 'easy'),
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Interview Prep</h3>
      <p style={styles.subheading}>
        Generate personalized interview questions based on your resume
      </p>

      {/* controls */}
      <div style={styles.controls}>
        {/* difficulty selector */}
        <div style={styles.controlGroup}>
          <label style={styles.label}>Difficulty</label>
          <div style={styles.difficultyRow}>
            {['mixed', 'easy', 'medium', 'hard'].map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                style={{
                  ...styles.diffBtn,
                  ...(difficulty === d ? styles.diffBtnActive : {}),
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* optional JD */}
        <div style={styles.controlGroup}>
          <label style={styles.label}>
            Job Description / Role <span style={styles.optional}>(optional)</span>
          </label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste job description or just type the role e.g. 'Full Stack Developer at a fintech startup'"
            rows={3}
            style={styles.textarea}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={styles.generateBtn}
        >
          {loading ? 'Generating questions...' : generated ? 'Regenerate Questions' : 'Generate Questions'}
        </button>
      </div>

      {/* results */}
      {questions.length > 0 && (
        <div style={styles.results}>
          <p style={styles.resultsMeta}>
            {questions.length} questions generated — click any question to reveal the model answer
          </p>

          {/* render hard → medium → easy */}
          {['hard', 'medium', 'easy'].map(level => (
            grouped[level].length > 0 && (
              <div key={level} style={styles.group}>
                <h4 style={{
                  ...styles.groupHeading,
                  color: difficultyColors[level].text,
                }}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </h4>
                {grouped[level].map((q, i) => (
                  <QuestionCard
                    key={q._id}
                    question={q}
                    index={questions.indexOf(q)}
                  />
                ))}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '2rem',
    marginTop: '2rem',
    marginBottom: '4rem',
  },
  heading: {
    color: '#f1f5f9',
    fontSize: '1.4rem',
    marginBottom: '0.25rem',
  },
  subheading: {
    color: '#64748b',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
  },
  controls: {
    background: '#0f172a',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  controlGroup: {
    marginBottom: '1.25rem',
  },
  label: {
    display: 'block',
    color: '#94a3b8',
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  optional: {
    color: '#475569',
    fontWeight: '400',
  },
  difficultyRow: {
    display: 'flex',
    gap: '0.5rem',
  },
  diffBtn: {
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    border: '1px solid #334155',
    background: 'transparent',
    color: '#94a3b8',
    cursor: 'pointer',
    textTransform: 'capitalize',
    fontSize: '0.85rem',
  },
  diffBtnActive: {
    background: '#6366f1',
    border: '1px solid #6366f1',
    color: 'white',
  },
  textarea: {
    width: '100%',
    background: '#1e293b',
    color: '#f1f5f9',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '0.75rem',
    resize: 'vertical',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
  },
  generateBtn: {
    width: '100%',
    padding: '0.875rem',
    background: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    color: '#f87171',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
  },
  results: {
    marginTop: '1rem',
  },
  resultsMeta: {
    color: '#64748b',
    fontSize: '0.85rem',
    marginBottom: '1.5rem',
  },
  group: {
    marginBottom: '1.5rem',
  },
  groupHeading: {
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem',
  },
  card: {
    background: '#0f172a',
    borderRadius: '8px',
    marginBottom: '0.75rem',
    overflow: 'hidden',
    border: '1px solid #334155',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1rem 1.25rem',
    cursor: 'pointer',
    gap: '1rem',
  },
  cardHeaderLeft: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
    flex: 1,
  },
  cardHeaderRight: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    flexShrink: 0,
  },
  questionNumber: {
    color: '#6366f1',
    fontWeight: '700',
    fontSize: '0.85rem',
    flexShrink: 0,
    paddingTop: '2px',
  },
  questionText: {
    color: '#e2e8f0',
    fontSize: '0.95rem',
    lineHeight: '1.5',
  },
  badge: {
    padding: '0.2rem 0.6rem',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    flexShrink: 0,
  },
  chevron: {
    color: '#475569',
    fontSize: '0.7rem',
  },
  answerBox: {
    borderTop: '1px solid #1e293b',
    padding: '1rem 1.25rem',
    background: '#0c1524',
  },
  answerLabel: {
    color: '#6366f1',
    fontSize: '0.8rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  answerText: {
    color: '#94a3b8',
    fontSize: '0.9rem',
    lineHeight: '1.6',
  },
};

export default InterviewSection;