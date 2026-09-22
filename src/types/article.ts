export type ArticleCategory =
  | 'registration'
  | 'taxes'
  | 'staff'
  | 'subsidies'
  | 'export'
  | 'marketing';

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  content: string;
  readingTime: number; // в минутах
  updatedAt: string;
  tags: string[];
}

export const categoryLabels: Record<ArticleCategory, { label: string; icon: string }> = {
  registration: { label: 'Регистрация бизнеса', icon: '📝' },
  taxes: { label: 'Налоги и отчётность', icon: '💰' },
  staff: { label: 'Кадры', icon: '👥' },
  subsidies: { label: 'Субсидии и гранты', icon: '🎁' },
  export: { label: 'Экспорт', icon: '🌍' },
  marketing: { label: 'Маркетинг', icon: '📈' },
};