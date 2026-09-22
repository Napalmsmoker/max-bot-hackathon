import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-primary)',
        fontSize: 20,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        transition: 'all 0.2s',
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};