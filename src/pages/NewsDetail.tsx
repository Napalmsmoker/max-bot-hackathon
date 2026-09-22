import { useNavigate, useParams } from 'react-router-dom';
import { getNewsById } from '../data/mockNews';
import { newsCategoryLabels } from '../types/news';

export const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const news = id ? getNewsById(id) : undefined;

  if (!news) {
    return (
      <div style={{ padding: 20, maxWidth: 640, margin: '0 auto' }}>
        <button onClick={() => navigate('/news')} style={backStyle}>
          ← К новостям
        </button>
        <div
          style={{
            color: 'var(--text-secondary)',
            textAlign: 'center',
            padding: 40,
          }}
        >
          Новость не найдена
        </div>
      </div>
    );
  }

  const category = newsCategoryLabels[news.category];
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <div style={{ padding: 20, maxWidth: 640, margin: '0 auto' }}>
      <button onClick={() => navigate('/news')} style={backStyle}>
        ← К новостям
      </button>

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
            fontSize: 13,
            color: category.color,
            fontWeight: 600,
          }}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </div>

        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            margin: '0 0 12px',
            lineHeight: 1.3,
            color: 'var(--text-primary)',
          }}
        >
          {news.title}
        </h1>

        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          <span>{formatDate(news.publishedAt)}</span>
          <span>Источник: {news.source}</span>
        </div>
      </div>

      <div
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          whiteSpace: 'pre-wrap',
        }}
      >
        {renderMarkdown(news.content)}
      </div>

      {news.sourceUrl && (
        <a
          href={news.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: '100%',
            padding: 16,
            marginTop: 24,
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            textAlign: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          Открыть источник →
        </a>
      )}

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

const backStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--text-secondary)',
  fontSize: 14,
  cursor: 'pointer',
  padding: 0,
  marginBottom: 12,
};

const renderMarkdown = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h2
          key={i}
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginTop: 20,
            marginBottom: 10,
            color: 'var(--text-primary)',
          }}
        >
          {line.replace('## ', '')}
        </h2>
      );
    }
    if (line.startsWith('- ')) {
      return (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 4,
            fontSize: 14,
          }}
        >
          <span style={{ color: 'var(--accent)' }}>•</span>
          <span>{line.replace('- ', '')}</span>
        </div>
      );
    }
    if (/^\d+\.\s/.test(line)) {
      return (
        <div key={i} style={{ marginBottom: 4, fontSize: 14 }}>
          {line}
        </div>
      );
    }
    if (line.trim() === '') {
      return <div key={i} style={{ height: 8 }} />;
    }
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} style={{ marginBottom: 8, fontSize: 14 }}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={j} style={{ color: 'var(--text-primary)' }}>
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </p>
    );
  });
};