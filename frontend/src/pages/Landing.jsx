import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const features = [
  {
    icon: '📊',
    title: 'ATS Score Analysis',
    desc: 'Get an instant ATS compatibility score with detailed feedback on what recruiters\' systems look for.',
  },
  {
    icon: '🎯',
    title: 'Job Description Matching',
    desc: 'Paste any job description and see exactly how well your resume matches — with missing keywords highlighted.',
  },
  {
    icon: '🤖',
    title: 'AI Interview Questions',
    desc: 'Get personalized interview questions based on your resume and role, with model answers for each.',
  },
];

const steps = [
  { step: '01', title: 'Upload Resume', desc: 'Drop your PDF or DOCX file' },
  { step: '02', title: 'AI Analysis', desc: 'Gemini analyzes your resume in seconds' },
  { step: '03', title: 'Get Results', desc: 'ATS score, gaps, and suggestions' },
  { step: '04', title: 'Prep Interview', desc: 'Personalized questions with model answers' },
];

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      {/* hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroBadge}>✨ Powered by Gemini AI</div>
          <h1 style={styles.heroTitle}>
            Get Your Resume <br />
            <span style={styles.heroAccent}>AI-Ready in Seconds</span>
          </h1>
          <p style={styles.heroDesc}>
            Upload your resume and get an instant ATS score, skill gap analysis,
            job description matching, and personalized interview questions —
            all in one place.
          </p>
          <div style={styles.heroCta}>
            <button onClick={handleUploadClick} style={styles.primaryBtn}>
              Analyze My Resume →
            </button>
            <span style={styles.heroNote}>Free · No credit card required</span>
          </div>
        </div>

        {/* hero visual */}
        <div style={styles.heroCard}>
          <div style={styles.heroCardHeader}>
            <span style={styles.heroCardTitle}>Resume Analysis</span>
            <span style={{ color: 'var(--success)', fontSize: '0.85rem' }}>● Live</span>
          </div>
          <div style={styles.scoreRow}>
            <div style={styles.scoreItem}>
              <span style={styles.scoreValue}>87</span>
              <span style={styles.scoreLabel}>ATS Score</span>
            </div>
            <div style={styles.scoreDivider} />
            <div style={styles.scoreItem}>
              <span style={{ ...styles.scoreValue, color: 'var(--success)' }}>74%</span>
              <span style={styles.scoreLabel}>JD Match</span>
            </div>
          </div>
          <div style={styles.keywordRow}>
            {['React', 'Node.js', 'MongoDB'].map(k => (
              <span key={k} style={styles.keywordGreen}>{k}</span>
            ))}
            {['TypeScript', 'AWS'].map(k => (
              <span key={k} style={styles.keywordRed}>{k}</span>
            ))}
          </div>
          <div style={styles.questionPreview}>
            <span style={styles.qLabel}>Interview Q</span>
            <p style={styles.qText}>Explain how JWT authentication works in your Eventora project...</p>
          </div>
        </div>
      </section>

      {/* features */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Everything you need to land the job</h2>
        <p style={styles.sectionDesc}>
          Stop guessing why you're not getting callbacks. CVLens tells you exactly what to fix.
        </p>
        <div style={styles.featuresGrid}>
          {features.map((f) => (
            <div key={f.title} style={styles.featureCard} className="hover-card">
              <span style={styles.featureIcon}>{f.icon}</span>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section style={{ ...styles.section, background: 'var(--bg-secondary)' }}>
        <h2 style={styles.sectionTitle}>How it works</h2>
        <p style={styles.sectionDesc}>From upload to interview-ready in under 60 seconds</p>
        <div style={styles.stepsRow}>
          {steps.map((s, i) => (
            <div key={s.step} style={styles.stepItem}>
              <div style={styles.stepNumber}>{s.step}</div>
              {i < steps.length - 1 && <div style={styles.stepLine} />}
              <h4 style={styles.stepTitle}>{s.title}</h4>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* bottom CTA */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to optimize your resume?</h2>
        <p style={styles.ctaDesc}>Join thousands of candidates getting more interviews</p>
        <button onClick={handleUploadClick} style={styles.primaryBtn}>
          Get Started Free →
        </button>
      </section>

      {/* footer */}
      <footer style={styles.footer}>
        <span style={styles.footerLogo}>CV<span style={{ color: 'var(--accent)' }}>Lens</span></span>
        <span style={styles.footerText}>Built with MERN + Gemini AI</span>
      </footer>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: 'var(--bg-primary)' },

  // hero
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4rem',
    padding: '5rem 2rem',
    maxWidth: '1100px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  heroInner: { flex: 1, minWidth: '280px', maxWidth: '520px' },
  heroBadge: {
    display: 'inline-block',
    background: 'var(--accent-light)',
    color: 'var(--accent)',
    padding: '0.35rem 1rem',
    borderRadius: '999px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '800',
    lineHeight: '1.15',
    marginBottom: '1.25rem',
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
  },
  heroAccent: { color: 'var(--accent)' },
  heroDesc: {
    color: 'var(--text-secondary)',
    lineHeight: '1.7',
    fontSize: '1.05rem',
    marginBottom: '2rem',
  },
  heroCta: { display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' },
  primaryBtn: {
    background: 'var(--accent)',
    color: 'white',
    border: 'none',
    padding: '0.875rem 2rem',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
  },
  heroNote: { color: 'var(--text-muted)', fontSize: '0.85rem' },

  // hero card
  heroCard: {
    flex: 1,
    minWidth: '280px',
    maxWidth: '380px',
    background: 'var(--bg-card)',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)',
  },
  heroCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.25rem',
  },
  heroCardTitle: { color: 'var(--text-primary)', fontWeight: '600' },
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '1.25rem',
    padding: '1rem',
    background: 'var(--bg-input)',
    borderRadius: '10px',
  },
  scoreItem: { textAlign: 'center' },
  scoreValue: {
    display: 'block',
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--accent)',
  },
  scoreLabel: { fontSize: '0.75rem', color: 'var(--text-muted)' },
  scoreDivider: { width: '1px', height: '40px', background: 'var(--border)' },
  keywordRow: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' },
  keywordGreen: {
    background: 'var(--success-bg)',
    color: 'var(--success)',
    padding: '0.25rem 0.6rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
  },
  keywordRed: {
    background: 'var(--danger-bg)',
    color: 'var(--danger)',
    padding: '0.25rem 0.6rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
  },
  questionPreview: {
    background: 'var(--bg-input)',
    borderRadius: '8px',
    padding: '0.75rem',
    borderLeft: '3px solid var(--accent)',
  },
  qLabel: { fontSize: '0.7rem', color: 'var(--accent)', fontWeight: '600', textTransform: 'uppercase' },
  qText: { color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem', lineHeight: '1.4' },

  // sections
  section: {
    padding: '5rem 2rem',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '0.75rem',
  },
  sectionDesc: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    marginBottom: '3rem',
    maxWidth: '500px',
    margin: '0 auto 3rem',
  },

  // features
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  featureCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '2rem',
    textAlign: 'left',
    cursor: 'default',
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
  },
  featureIcon: { fontSize: '2rem', marginBottom: '1rem', display: 'block' },
  featureTitle: { color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.05rem' },
  featureDesc: { color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.9rem' },

  // steps
  stepsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0',
    maxWidth: '900px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  stepItem: {
    flex: 1,
    minWidth: '180px',
    padding: '1.5rem 1rem',
    position: 'relative',
    textAlign: 'center',
  },
  stepNumber: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--accent)',
    opacity: 0.3,
    marginBottom: '0.5rem',
  },
  stepLine: {
    position: 'absolute',
    top: '2.5rem',
    right: '-10%',
    width: '20%',
    height: '2px',
    background: 'var(--border)',
  },
  stepTitle: { color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '0.95rem' },
  stepDesc: { color: 'var(--text-muted)', fontSize: '0.85rem' },

  // bottom cta
  ctaSection: {
    textAlign: 'center',
    padding: '5rem 2rem',
    background: 'linear-gradient(135deg, var(--accent) 0%, #8b5cf6 100%)',
  },
  ctaTitle: { fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '0.75rem' },
  ctaDesc: { color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1rem' },

  // footer
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    background: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border)',
  },
  footerLogo: { fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-primary)' },
  footerText: { color: 'var(--text-muted)', fontSize: '0.85rem' },
};

export default Landing;