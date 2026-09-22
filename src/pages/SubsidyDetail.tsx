import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubsidyById } from '../data/mockSubsidies';
import {
  businessTypeLabels,
  industryLabels,
  statusLabels,
} from '../types/subsidy';

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const SubsidyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const subsidy = id ? getSubsidyById(id) : undefined;
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  if (!subsidy) {
    return (
      <div style={{ padding: 20, maxWidth: 640, margin: '0 auto' }}>
        <button onClick={() => navigate('/subsidies')} style={backStyle}>
          ← Назад
        </button>
        <div
          style={{
            color: 'var(--text-secondary)',
            textAlign: 'center',
            padding: 40,
          }}
        >
          Субсидия не найдена
        </div>
      </div>
    );
  }

  const status = statusLabels[subsidy.status];
  const completed = Object.values(checkedDocs).filter(Boolean).length;
  const total = subsidy.documents.length;

  const toggleDoc = (docId: string) => {
    setCheckedDocs((prev) => ({ ...prev, [docId]: !prev[docId] }));
  };

  return (
    <div style={{ padding: 20, maxWidth: 640, margin: '0 auto' }}>
      <button onClick={() => navigate('/subsidies')} style={backStyle}>
        ← К каталогу
      </button>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: 12,
            backgroundColor: `${status.color}20`,
            color: status.color,
            fontSize: 11,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          {status.label}
        </div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            margin: '0 0 8px',
            lineHeight: 1.3,
            color: 'var(--text-primary)',
          }}
        >
          {subsidy.title}
        </h1>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          {subsidy.organizer}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 20,
          padding: 16,
          background: 'var(--card-bg)',
          borderRadius: 12,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginBottom: 2,
            }}
          >
            Сумма
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--accent)',
            }}
          >
            {subsidy.amountLabel}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginBottom: 2,
            }}
          >
            Дедлайн
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            {formatDate(subsidy.deadline)}
          </div>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginBottom: 2,
            }}
          >
            Регион
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text-primary)',
            }}
          >
            {subsidy.region}
          </div>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginBottom: 4,
            }}
          >
            Отрасли
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {subsidy.industries.map((ind) => (
              <span
                key={ind}
                style={{
                  padding: '3px 10px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 10,
                  fontSize: 12,
                  color: 'var(--text-primary)',
                }}
              >
                {industryLabels[ind]}
              </span>
            ))}
          </div>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginBottom: 4,
            }}
          >
            Кому подходит
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {subsidy.businessTypes.map((bt) => (
              <span
                key={bt}
                style={{
                  padding: '3px 10px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 10,
                  fontSize: 12,
                  color: 'var(--text-primary)',
                }}
              >
                {businessTypeLabels[bt]}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Section title="Описание">
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            margin: 0,
          }}
        >
          {subsidy.fullDescription}
        </p>
      </Section>

      <Section title="Условия получения">
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
          }}
        >
          {subsidy.conditions.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </Section>

      <Section title={`Документы (${completed} из ${total})`}>
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              height: 6,
              background: 'var(--border-color)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${total > 0 ? (completed / total) * 100 : 0}%`,
                background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
                transition: 'width 0.3s',
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {subsidy.documents.map((doc) => (
            <label
              key={doc.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                background: 'var(--bg-tertiary)',
                borderRadius: 10,
                cursor: 'pointer',
                fontSize: 14,
                color: 'var(--text-primary)',
              }}
            >
              <input
                type="checkbox"
                checked={!!checkedDocs[doc.id]}
                onChange={() => toggleDoc(doc.id)}
                style={{
                  width: 18,
                  height: 18,
                  accentColor: '#6366F1',
                  cursor: 'pointer',
                }}
              />
              <span
                style={{
                  textDecoration: checkedDocs[doc.id] ? 'line-through' : 'none',
                  color: checkedDocs[doc.id]
                    ? 'var(--text-muted)'
                    : 'var(--text-primary)',
                }}
              >
                {doc.title}
              </span>
            </label>
          ))}
        </div>
      </Section>

      <a
        href={subsidy.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          width: '100%',
          padding: 16,
          marginTop: 20,
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
        Открыть на МСП.РФ →
      </a>

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
        ⚠️ Демо-режим. Данные тестовые. Реальная интеграция — после MVP.
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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 20 }}>
    <h2
      style={{
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 12,
        color: 'var(--text-primary)',
      }}
    >
      {title}
    </h2>
    {children}
  </div>
);