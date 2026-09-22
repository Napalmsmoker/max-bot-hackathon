import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsCard } from '../components/NewsCard';
import { mockNews } from '../data/mockNews';
import type { NewsCategory } from '../types/news';
import { newsCategoryLabels } from '../types/news';

type FilterKey = 'all' | NewsCategory;

export const News = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = useMemo(() => {
    const sorted = [...mockNews].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    if (filter === 'all') return sorted;
    return sorted.filter((n) => n.category === filter);
  }, [filter]);

  return (
    <div style={{ padding: 20, maxWidth: 640, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: 14,
            cursor: 'pointer',
            padding: 0,
            marginBottom: 12,
          }}
        >
          ← Назад
        </button>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            margin: '0 0 8px',
            color: 'var(--text-primary)',
          }}
        >
          Новости и анонсы
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
          Мероприятия, изменения в законах, новые меры поддержки
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20,
          overflowX: 'auto',
          paddingBottom: 4,
        }}
      >
        <button
          onClick={() => setFilter('all')}
          style={chipStyle(filter === 'all')}
        >
          Все
        </button>
        {(Object.keys(newsCategoryLabels) as NewsCategory[]).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={chipStyle(filter === key)}
          >
            {newsCategoryLabels[key].icon} {newsCategoryLabels[key].label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 && (
          <div
            style={{
              padding: 32,
              background: 'var(--card-bg)',
              borderRadius: 12,
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontSize: 14,
            }}
          >
            В этой категории пока нет новостей
          </div>
        )}
        {filtered.map((n) => (
          <NewsCard key={n.id} news={n} />
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          padding: 12,
          background: 'var(--bg-secondary)',
          borderRadius: 10,
          fontSize: 11,
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}
      >
        ⚠️ Демо-режим. Новости тестовые. Реальные источники — ФНС, МСП.РФ, ЦБ.
      </div>
    </div>
  );
};

const chipStyle = (active: boolean): React.CSSProperties => ({
  padding: '6px 14px',
  fontSize: 12,
  fontWeight: 500,
  background: active ? 'var(--accent)' : 'var(--card-bg)',
  border: '1px solid var(--border-color)',
  borderRadius: 16,
  color: active ? 'white' : 'var(--text-secondary)',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
});