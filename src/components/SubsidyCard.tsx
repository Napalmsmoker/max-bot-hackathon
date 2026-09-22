import { useNavigate } from 'react-router-dom';
import type { Subsidy } from '../types/subsidy';
import { statusLabels } from '../types/subsidy';

interface Props {
  subsidy: Subsidy;
}

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const SubsidyCard = ({ subsidy }: Props) => {
  const navigate = useNavigate();
  const status = statusLabels[subsidy.status];

  return (
    <button
      onClick={() => navigate(`/subsidies/${subsidy.id}`)}
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
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: 12,
            backgroundColor: `${status.color}20`,
            color: status.color,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {status.label}
        </span>
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>
          {subsidy.amountLabel}
        </span>
      </div>

      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 6,
          lineHeight: 1.3,
          color: 'var(--text-primary)',
        }}
      >
        {subsidy.title}
      </div>

      <div
        style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          marginBottom: 12,
        }}
      >
        {subsidy.organizer}
      </div>

      <div
        style={{
          fontSize: 13,
          color: 'var(--text-secondary)',
          marginBottom: 14,
          lineHeight: 1.5,
        }}
      >
        {subsidy.description}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 12,
          borderTop: '1px solid var(--border-color)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        <span>Дедлайн: {formatDate(subsidy.deadline)}</span>
        <span style={{ color: 'var(--accent)' }}>Подробнее ›</span>
      </div>
    </button>
  );
};