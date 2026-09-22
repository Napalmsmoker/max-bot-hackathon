import { useNavigate, useParams } from 'react-router-dom';
import { getArticleById } from '../data/mockArticles';
import { categoryLabels } from '../types/article';

export const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = id ? getArticleById(id) : undefined;

  if (!article) {
    return (
      <div style={{ padding: 20, maxWidth: 640, margin: '0 auto' }}>
        <button onClick={() => navigate('/knowledge')} style={backStyle}>
          ← К базе знаний
        </button>
        <div
          style={{
            color: 'var(--text-secondary)',
            textAlign: 'center',
            padding: 40,
          }}
        >
          Статья не найдена
        </div>
      </div>
    );
  }

  const category = categoryLabels[article.category];
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <div style={{ padding: 20, maxWidth: 640, margin: '0 auto' }}>
      <button onClick={() => navigate('/knowledge')} style={backStyle}>
        ← К базе знаний
      </button>

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
            fontSize: 13,
            color: 'var(--text-secondary)',
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
          {article.title}
        </h1>

        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          <span>{article.readingTime} мин чтения</span>
          <span>Обновлено: {formatDate(article.updatedAt)}</span>
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
        {renderMarkdown(article.content)}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginTop: 24,
          paddingTop: 20,
          borderTop: '1px solid var(--border-color)',
        }}
      >
        {article.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '4px 10px',
              background: 'var(--bg-tertiary)',
              borderRadius: 10,
              fontSize: 12,
              color: 'var(--text-secondary)',
            }}
          >
            #{tag}
          </span>
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

const backStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--text-secondary)',
  fontSize: 14,
  cursor: 'pointer',
  padding: 0,
  marginBottom: 12,
};

// Простой рендер markdown-подобного текста
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
    if (line.startsWith('### ')) {
      return (
        <h3
          key={i}
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginTop: 16,
            marginBottom: 8,
            color: 'var(--text-primary)',
          }}
        >
          {line.replace('### ', '')}
        </h3>
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
    // Жирный текст **...**
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