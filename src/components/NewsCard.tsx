import { useNavigate } from 'react-router-dom';
import type { NewsItem } from '../types/news';
import { newsCategoryLabels } from '../types/news';

interface Props {
  news: NewsItem;
}

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const NewsCard = ({ news }: Props) => {
  const navigate = useNavigate();
  const category = newsCategoryLabels[news.category];

  return (
    <button
      onClick={() => navigate(`/news/${news.id}`)}
      style={{
        display: 'block',
        width: '100%',
        padding: 20,
        background: 'var(--card-bg)',
        border: `1px solid ${
          news.important ? category.color : 'var(--border-color)'
        }`,
        borderRadius: 16,
        color: 'var(--text-primary)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s',
        position: 'relative',
      }}
    >
      {news.important && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            padding: '2px 8px',
            background: category.color,
            color: 'white',
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 8,
          }}
        >
          ВАЖНО
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
          fontSize: 12,
          color: category.color,
          fontWeight: 600,
        }}
      >
        <span>{category.icon}</span>
        <span>{category.label}</span>
      </div>

      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 8,
          lineHeight: 1.3,
          color: 'var(--text-primary)',
          paddingRight: news.important ? 60 : 0,
        }}
      >
        {news.title}
      </div>

      <div
        style={{
          fontSize: 13,
          color: 'var(--text-secondary)',
          marginBottom: 14,
          lineHeight: 1.5,
        }}
      >
        {news.excerpt}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 12,
          borderTop: '1px solid var(--border-color)',
          fontSize: 12,
          color: 'var(--text-muted)',
        }}
      >
        <span>{formatDate(news.publishedAt)}</span>
        <span style={{ color: 'var(--accent)' }}>Читать ›</span>
      </div>
    </button>
  );
};