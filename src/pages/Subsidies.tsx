import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubsidyCard } from '../components/SubsidyCard';
import { mockSubsidies } from '../data/mockSubsidies';
import type { BusinessType, IndustryType } from '../types/subsidy';
import { businessTypeLabels, industryLabels } from '../types/subsidy';

type FilterKey = 'all' | 'open' | 'closing_soon';

export const Subsidies = () => {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState<IndustryType | 'all'>('all');
  const [businessType, setBusinessType] = useState<BusinessType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<FilterKey>('all');

  const filtered = useMemo(() => {
    return mockSubsidies.filter((s) => {
      if (industry !== 'all' && !s.industries.includes(industry)) return false;
      if (businessType !== 'all' && !s.businessTypes.includes(businessType))
        return false;
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      return true;
    });
  }, [industry, businessType, statusFilter]);

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
          Каталог субсидий
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
          Меры поддержки для бизнеса в Курганской области
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
        {(
          [
            { key: 'all', label: 'Все' },
            { key: 'open', label: 'Приём открыт' },
            { key: 'closing_soon', label: 'Скоро дедлайн' },
          ] as { key: FilterKey; label: string }[]
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            style={{
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 500,
              background:
                statusFilter === tab.key ? 'var(--accent)' : 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 20,
              color:
                statusFilter === tab.key ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            marginBottom: 6,
          }}
        >
          Отрасль
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          <button
            onClick={() => setIndustry('all')}
            style={chipStyle(industry === 'all')}
          >
            Все
          </button>
          {(Object.keys(industryLabels) as IndustryType[]).map((key) => (
            <button
              key={key}
              onClick={() => setIndustry(key)}
              style={chipStyle(industry === key)}
            >
              {industryLabels[key]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            marginBottom: 6,
          }}
        >
          Тип бизнеса
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          <button
            onClick={() => setBusinessType('all')}
            style={chipStyle(businessType === 'all')}
          >
            Все
          </button>
          {(Object.keys(businessTypeLabels) as BusinessType[]).map((key) => (
            <button
              key={key}
              onClick={() => setBusinessType(key)}
              style={chipStyle(businessType === key)}
            >
              {businessTypeLabels[key]}
            </button>
          ))}
        </div>
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
            По выбранным фильтрам ничего не найдено
          </div>
        )}
        {filtered.map((s) => (
          <SubsidyCard key={s.id} subsidy={s} />
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
        ⚠️ Демо-режим. Данные тестовые. Реальный источник — МСП.РФ.
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