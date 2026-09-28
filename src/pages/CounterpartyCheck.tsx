import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import { CompanyCard } from '../components/CompanyCard';
import { checkCounterparty } from '../api/counterparty';
import type { Company } from '../types/company';

export const CounterpartyCheck = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<Company | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setNotFound(false);
    setResult(null);
    setError(null);

    const company = await checkCounterparty(query);

    if (company) {
      setResult(company);
    } else {
      setNotFound(true);
    }

    setLoading(false);
  };

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
          Проверка контрагента
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
          Данные из ЕГРЮЛ, ФНС и арбитражных судов
        </p>
      </div>

      <SearchInput onSearch={handleSearch} loading={loading} />

      <div style={{ marginTop: 20 }}>
        {loading && (
          <div
            style={{
              textAlign: 'center',
              padding: 40,
              color: 'var(--text-secondary)',
            }}
          >
            Загружаем данные из официальных источников...
          </div>
        )}

        {notFound && !loading && (
          <div
            style={{
              padding: 20,
              background: 'var(--card-bg)',
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <div style={{ marginBottom: 4 }}>Компания не найдена</div>
            <div style={{ fontSize: 12 }}>
              Попробуйте ИНН: <code>7707083893</code> или{' '}
              <code>7701999999</code>
            </div>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: 16,
              background: '#FEE2E2',
              color: '#991B1B',
              borderRadius: 12,
              fontSize: 13,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {result && !loading && <CompanyCard company={result} />}
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
        ⚠️ Демо-режим. Данные тестовые. Реальный источник — ЕГРЮЛ/ФНС (планируется).
      </div>
    </div>
  );
};