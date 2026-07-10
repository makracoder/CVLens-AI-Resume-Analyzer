import { useState } from 'react';
import { uploadResume } from '../api/resume';
import { runAnalysis } from '../api/analysis';

const UploadSection = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      setError('');
    }
  };

  const handleAnalyze = async () => {
  if (!file) {
    setError('Please select a resume file first');
    return;
  }

  setLoading(true);
  setError('');

  try {
    // step 1 - upload + parse combined
    setStatus('Uploading resume...');
    const uploadData = await uploadResume(file);
    const resumeId = uploadData.resume.id;

    // step 2 - analyse
    setStatus('Analyzing with AI...');
    const analysisData = await runAnalysis(resumeId, jobDescription || null);

    setStatus('Done!');
    onAnalysisComplete(analysisData.analysis, resumeId, jobDescription);
  } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong');
    setStatus('');
  } finally {
    setLoading(false);
  }
};
  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Upload Your Resume</h3>

      {/* drag and drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('fileInput').click()}
        style={styles.dropzone}
      >
        {file ? (
          <p style={{ color: '#4ade80' }}>✓ {file.name}</p>
        ) : (
          <p>Drag & drop your resume here or click to browse<br />
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>PDF or DOCX, max 5MB</span>
          </p>
        )}
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* optional job description */}
      <textarea
        placeholder="Paste job description here (optional — enables JD matching and match %)"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        style={styles.textarea}
        rows={4}
      />

      {error && <p style={styles.error}>{error}</p>}
      {status && <p style={styles.status}>{status}</p>}

      <button
        onClick={handleAnalyze}
        disabled={loading || !file}
        style={styles.button}
      >
        {loading ? status : 'Analyze Resume'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
  },
  heading: {
    color: '#f1f5f9',
    marginBottom: '1rem',
  },
  dropzone: {
    border: '2px dashed #4b5563',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#9ca3af',
    marginBottom: '1rem',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%',
    background: '#0f172a',
    color: '#f1f5f9',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    padding: '0.75rem',
    marginBottom: '1rem',
    resize: 'vertical',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.875rem',
    background: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '600',
  },
  error: { color: '#f87171', marginBottom: '0.5rem' },
  status: { color: '#a5b4fc', marginBottom: '0.5rem' },
};

export default UploadSection;