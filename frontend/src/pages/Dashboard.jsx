import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to CVLens, {user?.name} 👋</h2>
      <p>Your AI Resume Analyzer dashboard</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;