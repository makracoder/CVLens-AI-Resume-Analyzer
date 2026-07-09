import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UploadSection from '../components/UploadSection';
import AnalysisResult from '../components/AnalysisResult';
import InterviewSection from '../components/InterviewSection';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [analysis, setAnalysis] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleAnalysisComplete = (analysisData, id, jd) => {
    setAnalysis(analysisData);
    setResumeId(id);
    setJobDescription(jd || '');
  };

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.logo}>CVLens</span>
        <div style={styles.navRight}>
          <span style={styles.userName}>{user?.name}</span>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <main style={styles.main}>
        <UploadSection onAnalysisComplete={handleAnalysisComplete} />
        {analysis && <AnalysisResult analysis={analysis} />}
        {resumeId && <InterviewSection resumeId={resumeId} jobDescription={jobDescription} />}
      </main>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#0f172a', color: '#f1f5f9' },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#1e293b',
    borderBottom: '1px solid #334155',
  },
  logo: { fontSize: '1.4rem', fontWeight: '700', color: '#6366f1' },
  navRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  userName: { color: '#94a3b8', fontSize: '0.9rem' },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #4b5563',
    color: '#94a3b8',
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  main: { maxWidth: '800px', margin: '0 auto', padding: '2rem' },
};

export default Dashboard;