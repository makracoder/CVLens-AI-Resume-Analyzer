import { useState } from 'react';
import Navbar from '../components/Navbar';
import UploadSection from '../components/UploadSection';
import AnalysisResult from '../components/AnalysisResult';
import InterviewSection from '../components/InterviewSection';

const Dashboard = () => {
  const [analysis, setAnalysis] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleAnalysisComplete = (analysisData, id, jd) => {
    setAnalysis(analysisData);
    setResumeId(id);
    setJobDescription(jd || '');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <UploadSection onAnalysisComplete={handleAnalysisComplete} />
        {analysis && <AnalysisResult analysis={analysis} />}
        {resumeId && (
          <InterviewSection resumeId={resumeId} jobDescription={jobDescription} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;