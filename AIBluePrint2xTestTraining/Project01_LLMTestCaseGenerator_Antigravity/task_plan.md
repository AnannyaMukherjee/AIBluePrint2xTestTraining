# Task Plan & Blueprint

*Phase 1: Discovery (Completed) -> Waiting for Blueprint Approval.*

## Phases
1. **Phase 1: Initialization & Discovery (Current)**
   - Gather requirements, define tech stack, and finalize the Blueprint.
2. **Phase 2: Project Setup & Architecture**
   - Initialize Node.js (TypeScript) Backend.
   - Initialize React Frontend (TypeScript).
   - Set up routing and base project structure.
3. **Phase 3: Backend API Integration**
   - Build endpoints for LLM provider connections (Ollama, LM Studio, Grok, OpenAI, Claude, Gemini).
   - Implement "Test Connection" functionality for all providers.
   - Implement the core Test Case Generation endpoint.
4. **Phase 4: Frontend UI Development**
   - Build layout based on `LocalLLM Diagram.png` (History sidebar, Generator view).
   - Build Settings page for LLM configuration (API Keys, URLs, Save, Test Connection).
   - Build the Generator UI to accept Jira requirements via chat/text box.
5. **Phase 5: Core Generating Logic & Formatting**
   - Craft the system prompts to enforce Jira format output.
   - Ensure the generator handles Functional and Non-Functional test cases for both APIs and Web Apps.
6. **Phase 6: Testing & Verification**
   - Verify UI functionality.
   - Validate LLM outputs match strict Jira format.

## Goals
- Build a robust Test Case Generator for API and Web Applications.
- Support deep integration with multiple LLMs (Local and Cloud).
- Provide a clean, intuitive UI exactly mapping the provided design.
- Output high-quality Functional and Non-Functional test cases strictly in Jira markup.

## Checklists
- [x] Gather core requirements.
- [x] Review UI design (`LocalLLM Diagram.png`).
- [ ] **Pending User Approval on this Blueprint.**
- [ ] Initialize Node.js/React projects.
- [ ] Build Settings UI and Backend logic.
- [ ] Build Generator UI and Backend logic.
