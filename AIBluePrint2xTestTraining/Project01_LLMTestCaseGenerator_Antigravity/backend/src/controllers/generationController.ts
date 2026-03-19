import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { LLMSettings } from './settingsController';

const settingsFilePath = path.join(__dirname, '../../settings.json');

// Helper to get current settings
const getActiveSettings = (): LLMSettings => {
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    return JSON.parse(data);
};

export const generateTestCases = async (req: Request, res: Response) => {
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
            const response = await axios.post(`${baseUrl}/api/generate`, {
                model: 'llama3', // default model, configurable later
                prompt: `${systemPrompt}\n\n${userPrompt}`,
                stream: false
            });
            generatedContent = response.data.response;
        } else if (provider === 'lmStudio') {
             const baseUrl = settings.lmStudio.baseUrl || 'http://localhost:1234/v1';
             const response = await axios.post(`${baseUrl}/chat/completions`, {
                 messages: [
                     { role: 'system', content: systemPrompt },
                     { role: 'user', content: userPrompt }
                 ],
                 temperature: 0.3
             });
             generatedContent = response.data.choices[0].message.content;
        } else {
             // Mocking other cloud providers for now until API keys are provided
             generatedContent = `{panel:title=Mock Test Case|bgColor=#f4f5f7}\nh3. Not Implemented\nProvider ${provider} handler not yet implemented.\n{panel}`;
        }

        res.status(200).json({ testCases: generatedContent });

    } catch (error: any) {
        console.error('Generation Error:', error.message);
        let errorMsg = 'Failed to generate test cases. Please ensure your LLM is running.';
        
        // Handle specific Ollama 404 which means the model isn't pulled yet
        if (error.response && error.response.status === 404) {
             errorMsg = `Model error: The requested model ("llama3" by default) is not found in your Ollama library. Please run 'ollama run llama3' in your terminal and try again.`;
        }

        res.status(500).json({ error: errorMsg });
    }
};
