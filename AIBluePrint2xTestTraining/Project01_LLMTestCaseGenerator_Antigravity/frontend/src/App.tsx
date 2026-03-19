import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Settings, PenBox, History } from 'lucide-react';
import GeneratorPage from './pages/GeneratorPage';
import SettingsPage from './pages/SettingsPage';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-[#14161a] border-r border-[#2d3139] h-screen flex flex-col p-4">
      <div className="flex items-center gap-2 mb-8 mt-2 px-2">
         <PenBox className="text-[#6495ED]" />
         <h1 className="text-xl font-bold tracking-tight text-white">QA Blueprint</h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        <Link to="/" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === '/' ? 'bg-[#252a31] text-white' : 'text-[#a0aab5] hover:text-white hover:bg-[#1d2127]'}`}>
           <History size={18} />
           History & Generator
        </Link>
        <Link to="/settings" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === '/settings' ? 'bg-[#252a31] text-white' : 'text-[#a0aab5] hover:text-white hover:bg-[#1d2127]'}`}>
           <Settings size={18} />
           Settings
        </Link>
      </nav>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#0f1115] text-[#e0e0e0]">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8 border-l border-[#1a1c22]">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<GeneratorPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
