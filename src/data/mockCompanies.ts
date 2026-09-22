import type { Company } from '../types/company';

export const mockCompanies: Company[] = [
  {
    id: '1',
    inn: '7707083893',
    ogrn: '1027700132195',
    name: 'Общество с ограниченной ответственностью «КурганПромСтрой»',
    shortName: 'ООО «КурганПромСтрой»',
    status: 'active',
    registrationDate: '2015-03-12',
    address: '640000, Курганская обл., г. Курган, ул. Ленина, д. 15, офис 302',
    okved: '41.20',
    okvedDescription: 'Строительство жилых и нежилых зданий',
    director: 'Иванов Иван Иванович',
    employeesCount: 47,
    revenue: 125000000,
    risks: [
      {
        id: 'r1',
        title: 'Нет данных о налоговых нарушениях',
        description: 'По данным ФНС задолженность отсутствует',
        level: 'low',
      },
      {
        id: 'r2',
        title: 'Судебные дела: 2',
        description: 'Найдено 2 арбитражных дела на сумму 350 000 ₽',
        level: 'medium',
      },
    ],
  },
  {
    id: '2',
    inn: '4501123456',
    ogrn: '1154501000123',
    name: 'Индивидуальный предприниматель Петров Петр Петрович',
    shortName: 'ИП Петров П.П.',
    status: 'active',
    registrationDate: '2018-07-21',
    address: '640002, Курганская обл., г. Курган, ул. Советская, д. 8, кв. 45',
    okved: '62.01',
    okvedDescription: 'Разработка компьютерного программного обеспечения',
    director: 'Петров Петр Петрович',
    employeesCount: 3,
    revenue: 4200000,
    risks: [
      {
        id: 'r3',
        title: 'Нет данных о нарушениях',
        description: 'По данным ФНС задолженность отсутствует',
        level: 'low',
      },
    ],
  },
  {
    id: '3',
    inn: '7701234567',
    ogrn: '1027700123456',
    name: 'Общество с ограниченной ответственностью «ТехноСервис»',
    shortName: 'ООО «ТехноСервис»',
    status: 'liquidating',
    registrationDate: '2010-11-05',
    address: '640003, Курганская обл., г. Курган, ул. Промышленная, д. 22',
    okved: '46.51',
    okvedDescription: 'Торговля оптовая компьютерами и программным обеспечением',
    director: 'Сидоров Алексей Владимирович',
    employeesCount: 12,
    revenue: 58000000,
    risks: [
      {
        id: 'r4',
        title: 'Компания в процессе ликвидации',
        description: 'В ЕГРЮЛ внесена запись о начале процедуры ликвидации',
        level: 'high',
      },
      {
        id: 'r5',
        title: 'Налоговая задолженность',
        description: 'Задолженность по налогам: 1 250 000 ₽',
        level: 'high',
      },
      {
        id: 'r6',
        title: 'Судебные дела: 5',
        description: 'Найдено 5 арбитражных дел на сумму 8 700 000 ₽',
        level: 'high',
      },
    ],
  },
];

export const findCompanyByInn = (inn: string): Company | undefined => {
  return mockCompanies.find((c) => c.inn === inn);
};

export const searchCompanies = (query: string): Company[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return mockCompanies.filter(
    (c) =>
      c.inn.includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q)
  );
};