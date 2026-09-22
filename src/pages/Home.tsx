import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    id: 'counterparty',
    icon: '🔍',
    title: 'Проверка контрагента',
    description: 'Соберите данные об организации или ИП из официальных источников',
    path: '/counterparty',
    available: true,
  },
  {
    id: 'subsidies',
    icon: '💰',
    title: 'Каталог субсидий',
    description: 'Подберите меры поддержки для вашего бизнеса',
    path: '/subsidies',
    available: true,
  },
  {
    id: 'knowledge',
    icon: '📚',
    title: 'База знаний',
    description: 'Гайды и статьи по бизнес-процессам',
    path: '/knowledge',
    available: false,
  },
  {
    id: 'news',
    icon: '📢',
    title: 'Новости и анонсы',
    description: 'Мероприятия и изменения в законах',
    path: '/news',
    available: false,
  },
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, maxWidth: 640, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            margin: '0 0 8px',
            color: 'var(--text-primary)',
          }}
        >
          Бизнес-Навигатор КГУ
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
          Цифровые инструменты для предпринимателей Курганской области
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => item.available && navigate(item.path)}
            disabled={!item.available}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: 20,
              background: item.available ? 'var(--card-bg)' : 'var(--bg-tertiary)',
              border: `1px solid ${
                item.available ? 'var(--border-color)' : 'var(--bg-tertiary)'
              }`,
              borderRadius: 16,
              color: item.available ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: item.available ? 'pointer' : 'not-allowed',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontSize: 32 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 4,
                  color: item.available
                    ? 'var(--text-primary)'
                    : 'var(--text-muted)',
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: item.available
                    ? 'var(--text-secondary)'
                    : 'var(--text-muted)',
                }}
              >
                {item.description}
              </div>
            </div>
            {item.available ? (
              <div style={{ fontSize: 20, color: 'var(--accent)' }}>›</div>
            ) : (
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>скоро</div>
            )}
          </button>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          padding: 12,
          background: 'var(--bg-secondary)',
          borderRadius: 10,
          fontSize: 11,
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}
      >
        Хакатон MAX 350 · Курганский государственный университет
      </div>
    </div>
  );
};