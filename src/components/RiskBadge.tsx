import type { RiskLevel } from '../types/company';

const colors: Record<RiskLevel, { bg: string; text: string; label: string }> = {
  low: { bg: '#DCFCE7', text: '#166534', label: 'Низкий' },
  medium: { bg: '#FEF3C7', text: '#92400E', label: 'Средний' },
  high: { bg: '#FEE2E2', text: '#991B1B', label: 'Высокий' },
};

export const RiskBadge = ({ level }: { level: RiskLevel }) => {
  const c = colors[level];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 12,
        backgroundColor: c.bg,
        color: c.text,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {c.label}
    </span>
  );
};