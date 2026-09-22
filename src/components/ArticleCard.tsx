import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/article';
import { categoryLabels } from '../types/article';

interface Props {
  article: Article;
}

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};

export const ArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();
  const category = categoryLabels[article.category];

  return (
    <button
      onClick={() => navigate(`/knowledge/${article.id}`)}
      style={{
        display: 'block',
        width: '100%',
        padding: 20,
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 16,
        color: 'var(--text-primary)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
          fontSize: 12,
          color: 'var(--text-secondary)',
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
        }}
      >
        {article.title}
      </div>

      <div
        style={{
          fontSize: 13,
          color: 'var(--text-secondary)',
          marginBottom: 14,
          lineHeight: 1.5,
        }}
      >
        {article.excerpt}
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
        <span>
          {article.readingTime} мин · {formatDate(article.updatedAt)}
        </span>
        <span style={{ color: 'var(--accent)' }}>Читать ›</span>
      </div>
    </button>
  );
};