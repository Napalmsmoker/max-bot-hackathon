export type NewsCategory = 'events' | 'law' | 'support' | 'economy';

export interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory;
  excerpt: string;
  content: string;
  publishedAt: string;
  important: boolean;
  source: string;
  sourceUrl: string;
}

export const newsCategoryLabels: Record<
  NewsCategory,
  { label: string; icon: string; color: string }
> = {
  events: { label: 'Мероприятия', icon: '📅', color: '#6366F1' },
  law: { label: 'Изменения в законах', icon: '⚖️', color: '#F59E0B' },
  support: { label: 'Меры поддержки', icon: '🎁', color: '#22C55E' },
  economy: { label: 'Экономика', icon: '📊', color: '#0EA5E9' },
};