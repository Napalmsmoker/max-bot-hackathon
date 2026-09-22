import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';
import { mockArticles } from '../data/mockArticles';
import type { ArticleCategory } from '../types/article';
import { categoryLabels } from '../types/article';

type FilterKey = 'all' | ArticleCategory;

export const KnowledgeBase = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return mockArticles;
    return mockArticles.filter((a) => a.category === filter);
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
          База знаний
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
          Гайды, статьи и инструкции для предпринимателей
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
        {(Object.keys(categoryLabels) as ArticleCategory[]).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={chipStyle(filter === key)}
          >
            {categoryLabels[key].icon} {categoryLabels[key].label}
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
            В этой категории пока нет статей
          </div>
        )}
        {filtered.map((a) => (
          <ArticleCard key={a.id} article={a} />
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
        ⚠️ Демо-режим. Статьи тестовые. Реальный источник — МСП.РФ.
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