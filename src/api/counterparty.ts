import { apiPost } from './client';
import type { Company, RiskLevel } from '../types/company';

// Что возвращает бэкенд
interface BackendRiskFactor {
  level: 'success' | 'warning' | 'danger';
  title: string;
  description: string;
}

interface BackendCounterpartyResponse {
  company: {
    inn: string;
    ogrn: string;
    name: string;
    full_name: string;
    status: string;
    registration_date: string;
    ceo_name: string | null;
    legal_address: string;
    authorized_capital: number | null;
    is_msp: boolean;
    tax_system: string | null;
  };
  risk_score: number;
  risk_status: 'GREEN' | 'YELLOW' | 'RED';
  summary_verdict: string;
  risk_factors: BackendRiskFactor[];
  recommendations: string[];
}

// Маппинг уровня риска
const mapRiskLevel = (level: BackendRiskFactor['level']): RiskLevel => {
  if (level === 'danger') return 'high';
  if (level === 'warning') return 'medium';
  return 'low';
};

// Маппинг статуса компании
const mapStatus = (
  status: string
): Company['status'] => {
  const s = status.toLowerCase();
  if (s.includes('ликвидац')) return 'liquidating';
  if (s.includes('ликвидиров')) return 'liquidated';
  return 'active';
};

// Преобразование ответа бэка → формата фронта
const convertToCompany = (
  data: BackendCounterpartyResponse
): Company => {
  return {
    id: data.company.inn,
    inn: data.company.inn,
    ogrn: data.company.ogrn,
    name: data.company.full_name,
    shortName: data.company.name,
    status: mapStatus(data.company.status),
    registrationDate: data.company.registration_date,
    address: data.company.legal_address,
    okved: '—',
    okvedDescription: data.company.tax_system
      ? `Налоговый режим: ${data.company.tax_system}`
      : '—',
    director: data.company.ceo_name || '—',
    employeesCount: 0,
    revenue: data.company.authorized_capital || 0,
    risks: data.risk_factors.map((factor, idx) => ({
      id: `risk-${idx}`,
      title: factor.title,
      description: factor.description,
      level: mapRiskLevel(factor.level),
    })),
  };
};

export async function checkCounterparty(
  inn: string
): Promise<Company | null> {
  try {
    const data = await apiPost<BackendCounterpartyResponse>(
      '/api/v1/counterparty/check',
      { query: inn }
    );
    return convertToCompany(data);
  } catch (error) {
    console.error('Counterparty API error:', error);
    return null;
  }
}