import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { CounterpartyCheck } from './pages/CounterpartyCheck';
import { Subsidies } from './pages/Subsidies';
import { SubsidyDetail } from './pages/SubsidyDetail';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { ArticleDetail } from './pages/ArticleDetail';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  useEffect(() => {
    const webApp = (window as any).WebApp;
    if (webApp) {
      webApp.ready();
      console.log('MAX Bridge ready. Platform:', webApp.platform);
    }
  }, []);

  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counterparty" element={<CounterpartyCheck />} />
        <Route path="/subsidies" element={<Subsidies />} />
        <Route path="/subsidies/:id" element={<SubsidyDetail />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/knowledge/:id" element={<ArticleDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;