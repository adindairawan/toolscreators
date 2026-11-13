import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SafeZonePage } from './pages/SafeZonePage';
import { CarouselPage } from './pages/CarouselPage';
import { DiscordPage } from './pages/DiscordPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tiktok-safe-zone" element={<SafeZonePage platform="tiktok" />} />
            <Route path="/reels-safe-zone" element={<SafeZonePage platform="reels" />} />
            <Route path="/shorts-safe-zone" element={<SafeZonePage platform="shorts" />} />
            <Route path="/carousel-splitter" element={<CarouselPage />} />
            <Route path="/discord-timestamps" element={<DiscordPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
