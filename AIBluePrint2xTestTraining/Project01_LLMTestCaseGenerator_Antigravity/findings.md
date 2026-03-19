# Findings

*Research, discoveries, and constraints.*

## Scope & Inputs
- **Application Type**: Test Case Generator (API & Web App).
- **Test Types**: Functional and Non-Functional.
- **Input Mechanism**: Copy-pasted Jira requirements via text/chat UI.

## Local LLM Infrastructure & Integrations
- **Supported Providers**: Ollama API, LM Studio API, Grok API, OpenAI, Claude API, Gemini API.
- **Settings UI**: Based on `LocalLLM Diagram.png`, requires individual sections for each provider's configuration (URLs, API keys), a global "SAVE" button, and a "Test Connection" button.

## Architecture & Tech Stack
- **Backend**: Node.js + TypeScript.
- **Frontend**: React + TypeScript.
- **Layout**: Sidebar for History, Main panel for the Generator input/output. Settings UI accessible for configuration.

## Constraints & Formatting
- **Output Format**: Strictly Jira markup format.
- **Execution constraint**: Halt all coding until the Blueprint (`task_plan.md`) is approved by the user.
