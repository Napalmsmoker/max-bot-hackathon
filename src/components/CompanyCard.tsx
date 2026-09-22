import type { Company } from '../types/company';
import { RiskBadge } from './RiskBadge';

const statusLabels: Record<Company['status'], { label: string; color: string }> = {
  active: { label: 'Действующее', color: '#22C55E' },
  liquidating: { label: 'В процессе ликвидации', color: '#F59E0B' },
  liquidated: { label: 'Ликвидировано', color: '#EF4444' },
};

const formatMoney = (n: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(n);
};

export const CompanyCard = ({ company }: { company: Company }) => {
  const status = statusLabels[company.status];

  return (
    <div
      style={{
        background: 'var(--card-bg)',
        borderRadius: 16,
        padding: 20,
        border: '1px solid var(--border-color)',
        color: 'var(--text-primary)',
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <h2
          style={{
            margin: '0 0 8px',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}
        >
          {company.shortName}
        </h2>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          {company.name}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginRight: 8 }}>
          Статус:
        </span>
        <span style={{ color: status.color, fontWeight: 600, fontSize: 14 }}>
          {status.label}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 16,
          padding: 16,
          background: 'var(--bg-tertiary)',
          borderRadius: 12,
        }}
      >
        <Field label="ИНН" value={company.inn} />
        <Field label="ОГРН" value={company.ogrn} />
        <Field label="Дата регистрации" value={company.registrationDate} />
        <Field label="Сотрудников" value={String(company.employeesCount)} />
        <Field
          label="ОКВЭД"
          value={`${company.okved} — ${company.okvedDescription}`}
          span={2}
        />
        <Field label="Адрес" value={company.address} span={2} />
        <Field label="Руководитель" value={company.director} span={2} />
        <Field label="Выручка (2025)" value={formatMoney(company.revenue)} span={2} />
      </div>

      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 12,
            color: 'var(--text-primary)',
          }}
        >
          Проверка рисков
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {company.risks.map((risk) => (
            <div
              key={risk.id}
              style={{
                padding: 12,
                background: 'var(--bg-tertiary)',
                borderRadius: 10,
                borderLeft: `3px solid ${
                  risk.level === 'high'
                    ? '#EF4444'
                    : risk.level === 'medium'
                    ? '#F59E0B'
                    : '#22C55E'
                }`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: 'var(--text-primary)',
                  }}
                >
                  {risk.title}
                </span>
                <RiskBadge level={risk.level} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {risk.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  span = 1,
}: {
  label: string;
  value: string;
  span?: number;
}) => (
  <div style={{ gridColumn: `span ${span}` }}>
    <div
      style={{
        fontSize: 11,
        color: 'var(--text-muted)',
        marginBottom: 2,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
      {value}
    </div>
  </div>
);