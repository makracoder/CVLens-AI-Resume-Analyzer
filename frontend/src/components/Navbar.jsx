import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        CV<span style={styles.logoAccent}>Lens</span>
      </Link>

      <div style={styles.right}>
        {/* theme toggle */}
        <button onClick={toggleTheme} style={styles.themeBtn} title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {user ? (
          <>
            <span style={styles.userName}>Hi, {user.name.split(' ')[0]}</span>
            <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.outlineBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/register" style={styles.solidBtn}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: 'var(--shadow)',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
  },
  logoAccent: {
    color: 'var(--accent)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  themeBtn: {
    background: 'var(--bg-input)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '0.4rem 0.6rem',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  userName: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  },
  navLink: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
    transition: 'background 0.15s',
  },
  outlineBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  solidBtn: {
    background: 'var(--accent)',
    color: 'white',
    padding: '0.5rem 1.25rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
};

export default Navbar;