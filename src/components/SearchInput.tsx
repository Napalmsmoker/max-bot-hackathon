import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export const SearchInput = ({ onSearch, loading }: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите ИНН или название компании"
        style={{
          flex: 1,
          padding: '14px 16px',
          fontSize: 15,
          background: 'var(--input-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          color: 'var(--text-primary)',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '14px 24px',
          fontSize: 15,
          fontWeight: 600,
          background: loading ? 'var(--text-muted)' : 'var(--accent)',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          cursor: loading ? 'wait' : 'pointer',
        }}
      >
        {loading ? '...' : 'Проверить'}
      </button>
    </form>
  );
};