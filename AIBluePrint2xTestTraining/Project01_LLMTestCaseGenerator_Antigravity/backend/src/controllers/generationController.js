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
exports.generateTestCases = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const settingsFilePath = path_1.default.join(__dirname, '../../settings.json');
// Helper to get current settings
const getActiveSettings = () => {
    const data = fs_1.default.readFileSync(settingsFilePath, 'utf8');
    return JSON.parse(data);
};
const generateTestCases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requirements, type } = req.body; // type might be 'functional' or 'non-functional'
        if (!requirements) {
            res.status(400).json({ error: 'Requirements text is required.' });
            return;
        }
        const settings = getActiveSettings();
        const provider = settings.activeProvider;
        // --- Core Prompt to enforce Jira constraints ---
        const systemPrompt = `You are a strict Test Case formatting AI that outputs EXACTLY in Jira Markdown format. 
You will be provided with software requirements. 
Generate ${type || 'functional'} test cases covering these requirements.
Your output MUST contain NO conversational text, NO markdown code blocks (\`\`\`markdown), and NO explanations.
Just output raw Jira markup that can be directly pasted into a Jira description field.
Use Jira panels ( {panel:title=Test Case|bgColor=#f4f5f7} ), headers (h2., h3.), tables (|| Step || Action || Expected Result ||), and text formatting (*bold*, _italic_) appropriately.
`;
        const userPrompt = `Requirements:\n${requirements}`;
        let generatedContent = '';
        // Dispatch to the active LLM provider
        if (provider === 'ollama') {
            const baseUrl = settings.ollama.baseUrl || 'http://localhost:11434';
            const response = yield axios_1.default.post(`${baseUrl}/api/generate`, {
                model: 'llama3', // default model, configurable later
                prompt: `${systemPrompt}\n\n${userPrompt}`,
                stream: false
            });
            generatedContent = response.data.response;
        }
        else if (provider === 'lmStudio') {
            const baseUrl = settings.lmStudio.baseUrl || 'http://localhost:1234/v1';
            const response = yield axios_1.default.post(`${baseUrl}/chat/completions`, {
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.3
            });
            generatedContent = response.data.choices[0].message.content;
        }
        else {
            // Mocking other cloud providers for now until API keys are provided
            generatedContent = `{panel:title=Mock Test Case|bgColor=#f4f5f7}\nh3. Not Implemented\nProvider ${provider} handler not yet implemented.\n{panel}`;
        }
        res.status(200).json({ testCases: generatedContent });
    }
    catch (error) {
        console.error('Generation Error:', error.message);
        let errorMsg = 'Failed to generate test cases. Please ensure your LLM is running.';
        // Handle specific Ollama 404 which means the model isn't pulled yet
        if (error.response && error.response.status === 404) {
            errorMsg = `Model error: The requested model ("llama3" by default) is not found in your Ollama library. Please run 'ollama run llama3' in your terminal and try again.`;
        }
        res.status(500).json({ error: errorMsg });
    }
});
exports.generateTestCases = generateTestCases;
