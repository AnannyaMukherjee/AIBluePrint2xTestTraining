import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const settingsFilePath = path.join(__dirname, '../../settings.json');

// Interface to type our Settings
export interface LLMSettings {
  ollama: { baseUrl: string };
  lmStudio: { baseUrl: string };
  grok: { apiKey: string };
  openai: { apiKey: string };
  claude: { apiKey: string };
  gemini: { apiKey: string };
  activeProvider: string;
}

const defaultSettings: LLMSettings = {
  ollama: { baseUrl: 'http://localhost:11434' },
  lmStudio: { baseUrl: 'http://localhost:1234/v1' },
  grok: { apiKey: '' },
  openai: { apiKey: '' },
  claude: { apiKey: '' },
  gemini: { apiKey: '' },
  activeProvider: 'ollama'
};

// Ensure settings file exists
if (!fs.existsSync(settingsFilePath)) {
  fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2));
}

export const getSettings = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read settings' });
  }
};

export const saveSettings = (req: Request, res: Response) => {
  try {
    const newSettings: Partial<LLMSettings> = req.body;
    const currentData = fs.readFileSync(settingsFilePath, 'utf8');
    const currentSettings = JSON.parse(currentData);

    const updatedSettings = { ...currentSettings, ...newSettings };
    fs.writeFileSync(settingsFilePath, JSON.stringify(updatedSettings, null, 2));

    res.status(200).json({ message: 'Settings saved successfully', settings: updatedSettings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save settings' });
  }
};

export const testConnection = async (req: Request, res: Response) => {
    try {
        const { provider } = req.body;
        const currentData = fs.readFileSync(settingsFilePath, 'utf8');
        const currentSettings = JSON.parse(currentData) as LLMSettings;

        if (provider === 'ollama') {
            try {
                const url = currentSettings.ollama.baseUrl || 'http://localhost:11434';
                // Ollama answers to GET / with "Ollama is running"
                const response = await axios.get(url, { timeout: 3000 });
                if (response.data && response.data.includes('Ollama is running')) {
                    res.status(200).json({ message: 'Connection to Ollama successful!' });
                    return;
                }
                res.status(500).json({ error: 'Connected but Ollama signature not found.' });
                return;
            } catch (err: any) {
                res.status(500).json({ error: `Connection failed: ${err.message}` });
                return;
            }
        } else if (provider === 'lmStudio') {
             try {
                const url = currentSettings.lmStudio.baseUrl || 'http://localhost:1234/v1';
                // LM studio chat endpoint checking models
                const response = await axios.get(`${url}/models`, { timeout: 3000 });
                if (response.status === 200) {
                     res.status(200).json({ message: 'Connection to LM Studio successful!' });
                     return;
                }
                res.status(500).json({ error: 'Failed to verify LM Studio local server.' });
                return;
             } catch(err: any) {
                 res.status(500).json({ error: `Connection failed: ${err.message}` });
                 return;
             }
        }

        // Fallback mock
        res.status(200).json({ message: `Config format loaded for ${provider}` });
    } catch (error) {
         res.status(500).json({ error: 'Connection test failed to execute.' });
    }
}
