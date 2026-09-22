export type BusinessType = 'ip' | 'ooo' | 'self_employed';

export type IndustryType = 'manufacturing' | 'it' | 'agriculture' | 'trade' | 'services';

export type SubsidyStatus = 'open' | 'closing_soon' | 'closed';

export interface SubsidyDocument {
  id: string;
  title: string;
}

export interface Subsidy {
  id: string;
  title: string;
  organizer: string;
  description: string;
  fullDescription: string;
  amountMin: number;
  amountMax: number;
  amountLabel: string;
  industries: IndustryType[];
  businessTypes: BusinessType[];
  region: string;
  deadline: string;
  status: SubsidyStatus;
  sourceUrl: string;
  documents: SubsidyDocument[];
  conditions: string[];
}

export const industryLabels: Record<IndustryType, string> = {
  manufacturing: 'Производство',
  it: 'IT и связь',
  agriculture: 'Сельское хозяйство',
  trade: 'Торговля',
  services: 'Услуги',
};

export const businessTypeLabels: Record<BusinessType, string> = {
  ip: 'ИП',
  ooo: 'ООО',
  self_employed: 'Самозанятый',
};

export const statusLabels: Record<SubsidyStatus, { label: string; color: string }> = {
  open: { label: 'Приём открыт', color: '#22C55E' },
  closing_soon: { label: 'Скоро дедлайн', color: '#F59E0B' },
  closed: { label: 'Приём закрыт', color: '#64748B' },
};