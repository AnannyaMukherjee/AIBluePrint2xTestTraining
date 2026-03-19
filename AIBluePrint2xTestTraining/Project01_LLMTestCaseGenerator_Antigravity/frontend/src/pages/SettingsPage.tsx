import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Plug } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    ollama: { baseUrl: 'http://localhost:11434' },
    lmStudio: { baseUrl: 'http://localhost:1234/v1' },
    grok: { apiKey: '' },
    openai: { apiKey: '' },
    claude: { apiKey: '' },
    gemini: { apiKey: '' },
    activeProvider: 'ollama'
  });

  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    // Load settings from backend on mount
    axios.get('/api/settings').then(res => {
        if(res.data) setSettings(res.data);
    }).catch(err => console.error(err));
  }, []);

  const handleChange = (provider: string, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [provider]: { ...prev[provider as keyof typeof prev], [field]: value }
    }));
  };

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, activeProvider: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/settings/save', settings);
      setStatusMsg('Settings saved successfully!');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      setStatusMsg('Failed to save settings.');
    }
  };

  const handleTestConnection = async () => {
    try {
      const res = await axios.post('/api/settings/test', { provider: settings.activeProvider });
      setStatusMsg(res.data.message || 'Connection Success!');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      setStatusMsg(`Connection failed to ${settings.activeProvider}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Local LLM & Provider Settings</h2>
      
      <div className="space-y-4">
          <div className="flex flex-col gap-2">
             <label className="text-sm text-gray-400 font-medium">Active Model Provider</label>
             <select 
               className="bg-[#1d2127] border border-[#2d3139] rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
               value={settings.activeProvider}
               onChange={handleProviderChange}
             >
                <option value="ollama">Ollama (Local)</option>
                <option value="lmStudio">LM Studio (Local)</option>
                <option value="openai">OpenAI</option>
                <option value="claude">Claude</option>
                <option value="gemini">Gemini</option>
                <option value="grok">Grok</option>
             </select>
          </div>

          {/* Settings specific to each provider based on diagram */}
          <div className="bg-[#1d2127] border border-[#2d3139] rounded-lg p-6 space-y-4">
             <h3 className="font-semibold text-lg border-b border-[#2d3139] pb-2">Ollama Settings</h3>
             <input type="text" value={settings.ollama.baseUrl} onChange={(e) => handleChange('ollama', 'baseUrl', e.target.value)} placeholder="http://localhost:11434" className="w-full bg-[#0f1115] border border-[#2d3139] rounded-md p-2" />
          </div>

          <div className="bg-[#1d2127] border border-[#2d3139] rounded-lg p-6 space-y-4">
             <h3 className="font-semibold text-lg border-b border-[#2d3139] pb-2">LM Studio Settings</h3>
             <input type="text" value={settings.lmStudio.baseUrl} onChange={(e) => handleChange('lmStudio', 'baseUrl', e.target.value)} placeholder="http://localhost:1234/v1" className="w-full bg-[#0f1115] border border-[#2d3139] rounded-md p-2" />
          </div>

          <div className="bg-[#1d2127] border border-[#2d3139] rounded-lg p-6 space-y-4">
             <h3 className="font-semibold text-lg border-b border-[#2d3139] pb-2">OpenAI API Keys</h3>
             <input type="password" value={settings.openai.apiKey} onChange={(e) => handleChange('openai', 'apiKey', e.target.value)} placeholder="sk-..." className="w-full bg-[#0f1115] border border-[#2d3139] rounded-md p-2" />
          </div>
          
          <div className="bg-[#1d2127] border border-[#2d3139] rounded-lg p-6 space-y-4 opacity-50">
               <h3 className="font-semibold text-lg border-b border-[#2d3139] pb-2">Grok / Claude / Gemini API Keys</h3>
               <p className="text-sm text-gray-500 line-clamp-2">Not implemented in UI demo phase, inputs go here.</p>
          </div>
      </div>

      <div className="flex gap-4 justify-center pt-4">
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium">
          <Save size={18} />
          SAVE
        </button>
        <button onClick={handleTestConnection} className="flex items-center gap-2 px-6 py-2 bg-[#2d3139] hover:bg-[#3d4149] text-white rounded-md transition-colors font-medium border border-gray-600">
          <Plug size={18} />
          Test Connection
        </button>
      </div>
      
      {statusMsg && (
        <div className="text-center mt-4 text-green-400 font-medium">
          {statusMsg}
        </div>
      )}
    </div>
  );
}
