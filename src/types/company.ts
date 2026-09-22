export type CompanyStatus = 'active' | 'liquidating' | 'liquidated';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface CompanyRisk {
  id: string;
  title: string;
  description: string;
  level: RiskLevel;
}

export interface Company {
  id: string;
  inn: string;
  ogrn: string;
  name: string;
  shortName: string;
  status: CompanyStatus;
  registrationDate: string;
  address: string;
  okved: string;
  okvedDescription: string;
  director: string;
  employeesCount: number;
  revenue: number;
  risks: CompanyRisk[];
}