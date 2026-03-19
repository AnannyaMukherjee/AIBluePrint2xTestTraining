"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.saveSettings = exports.getSettings = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const settingsFilePath = path_1.default.join(__dirname, '../../settings.json');
const defaultSettings = {
    ollama: { baseUrl: 'http://localhost:11434' },
    lmStudio: { baseUrl: 'http://localhost:1234/v1' },
    grok: { apiKey: '' },
    openai: { apiKey: '' },
    claude: { apiKey: '' },
    gemini: { apiKey: '' },
    activeProvider: 'ollama'
};
// Ensure settings file exists
if (!fs_1.default.existsSync(settingsFilePath)) {
    fs_1.default.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2));
}
const getSettings = (req, res) => {
    try {
        const data = fs_1.default.readFileSync(settingsFilePath, 'utf8');
        res.status(200).json(JSON.parse(data));
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to read settings' });
    }
};
exports.getSettings = getSettings;
const saveSettings = (req, res) => {
    try {
        const newSettings = req.body;
        const currentData = fs_1.default.readFileSync(settingsFilePath, 'utf8');
        const currentSettings = JSON.parse(currentData);
        const updatedSettings = Object.assign(Object.assign({}, currentSettings), newSettings);
        fs_1.default.writeFileSync(settingsFilePath, JSON.stringify(updatedSettings, null, 2));
        res.status(200).json({ message: 'Settings saved successfully', settings: updatedSettings });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to save settings' });
    }
};
exports.saveSettings = saveSettings;
const testConnection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { provider } = req.body;
        const currentData = fs_1.default.readFileSync(settingsFilePath, 'utf8');
        const currentSettings = JSON.parse(currentData);
        if (provider === 'ollama') {
            try {
                const url = currentSettings.ollama.baseUrl || 'http://localhost:11434';
                // Ollama answers to GET / with "Ollama is running"
                const response = yield axios_1.default.get(url, { timeout: 3000 });
                if (response.data && response.data.includes('Ollama is running')) {
                    res.status(200).json({ message: 'Connection to Ollama successful!' });
                    return;
                }
                res.status(500).json({ error: 'Connected but Ollama signature not found.' });
                return;
            }
            catch (err) {
                res.status(500).json({ error: `Connection failed: ${err.message}` });
                return;
            }
        }
        else if (provider === 'lmStudio') {
            try {
                const url = currentSettings.lmStudio.baseUrl || 'http://localhost:1234/v1';
                // LM studio chat endpoint checking models
                const response = yield axios_1.default.get(`${url}/models`, { timeout: 3000 });
                if (response.status === 200) {
                    res.status(200).json({ message: 'Connection to LM Studio successful!' });
                    return;
                }
                res.status(500).json({ error: 'Failed to verify LM Studio local server.' });
                return;
            }
            catch (err) {
                res.status(500).json({ error: `Connection failed: ${err.message}` });
                return;
            }
        }
        // Fallback mock
        res.status(200).json({ message: `Config format loaded for ${provider}` });
    }
    catch (error) {
        res.status(500).json({ error: 'Connection test failed to execute.' });
    }
});
exports.testConnection = testConnection;
