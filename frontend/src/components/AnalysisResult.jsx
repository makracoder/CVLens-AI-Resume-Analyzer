import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const ScoreGauge = ({ score, label, color }) => {
  const data = [{ value: score }];
  return (
    <div style={styles.gaugeContainer}>
      <ResponsiveContainer width="100%" height={160}>
        <RadialBarChart
          cx="50%" cy="50%"
          innerRadius="60%" outerRadius="100%"
          barSize={12}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: '#1e293b' }}
            dataKey="value"
            angleAxisId={0}
            fill={color}
            cornerRadius={6}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={styles.gaugeLabel}>
        <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color }}>{score}</span>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{label}</span>
      </div>
    </div>
  );
};

const AnalysisResult = ({ analysis }) => {
  if (!analysis) return null;

  const {
    atsScore, matchPercentage, overallFeedback,
    strengths, weaknesses, missingKeywords, suggestions, experienceLevel
  } = analysis;

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Analysis Results</h3>

      {/* scores row */}
      <div style={styles.scoresRow}>
        <ScoreGauge score={atsScore} label="ATS Score" color="#6366f1" />
        {matchPercentage !== null && (
          <ScoreGauge score={matchPercentage} label="JD Match %" color="#4ade80" />
        )}
      </div>

      {/* overall feedback */}
      <div style={styles.card}>
        <h4 style={styles.cardTitle}>Overall Feedback</h4>
        <p style={styles.cardText}>{overallFeedback}</p>
        <span style={styles.badge}>
          Level: {experienceLevel}
        </span>
      </div>

      {/* strengths */}
      <div style={styles.card}>
        <h4 style={{ ...styles.cardTitle, color: '#4ade80' }}>✓ Strengths</h4>
        <ul style={styles.list}>
          {strengths.map((s, i) => (
            <li key={i} style={styles.listItem}>{s}</li>
          ))}
        </ul>
      </div>

      {/* weaknesses */}
      <div style={styles.card}>
        <h4 style={{ ...styles.cardTitle, color: '#f87171' }}>✗ Weaknesses</h4>
        <ul style={styles.list}>
          {weaknesses.map((w, i) => (
            <li key={i} style={styles.listItem}>{w}</li>
          ))}
        </ul>
      </div>

      {/* missing keywords */}
      {missingKeywords?.length > 0 && (
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Missing Keywords</h4>
          <div style={styles.tagsContainer}>
            {missingKeywords.map((kw, i) => (
              <span key={i} style={styles.tag}>{kw}</span>
            ))}
          </div>
        </div>
      )}

      {/* suggestions */}
      <div style={styles.card}>
        <h4 style={{ ...styles.cardTitle, color: '#fbbf24' }}>💡 Suggestions</h4>
        <ul style={styles.list}>
          {suggestions.map((s, i) => (
            <li key={i} style={styles.listItem}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: { marginTop: '2rem' },
  heading: { color: '#f1f5f9', marginBottom: '1.5rem', fontSize: '1.4rem' },
  scoresRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  gaugeContainer: {
    flex: 1,
    minWidth: '160px',
    background: '#1e293b',
    borderRadius: '12px',
    padding: '1rem',
    position: 'relative',
    textAlign: 'center',
  },
  gaugeLabel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    color: '#f1f5f9',
    marginBottom: '0.75rem',
    fontSize: '1rem',
  },
  cardText: { color: '#cbd5e1', lineHeight: '1.6' },
  badge: {
    display: 'inline-block',
    marginTop: '0.75rem',
    background: '#6366f1',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
    textTransform: 'capitalize',
  },
  list: { paddingLeft: '1.25rem', margin: 0 },
  listItem: { color: '#cbd5e1', marginBottom: '0.5rem', lineHeight: '1.5' },
  tagsContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
  tag: {
    background: '#7f1d1d',
    color: '#fca5a5',
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.85rem',
  },
};

export default AnalysisResult;