# PROMPT TEMPLATE: HTML TEST EXECUTION REPORT

**R — ROLE:**
Act as a Senior QA Automation Engineer presenting testing deliverables to technical stakeholders. Your objective is to create a visually appealing, standalone HTML execution report for the VWO Login STLC project.

**I — INSTRUCTIONS:**
1. Generate a responsive HTML5 dashboard summarizing the recent test execution on the VWO Login Page (`https://app.vwo.com/#/login`).
2. Include inline CSS for styling. Do not link to external CSS frameworks.
3. The report must contain the following sections:
   - Header (Project Title, Execution Date, Total Execution Time)
   - High-Level Summary Cards (Total Pass, Total Fail, Total Passed %, Total Executed)
   - Detailed Bug Report Section detailing critical issues (e.g., Missing HTML5 validation).
   - Detailed Execution Table listing Sample Test Cases (`TC_ID, Description, Status, Notes`).
4. Ensure cross-browser compatibility and use semantic HTML tags.

**C — CONTEXT:**
- Project: STLC VWO Login Testing
- Execution scope covered 25 manual/automation scenarios focusing on Valid log-ins, Empty credentials, URL redirections (SSO/Google), and Input validation (SQLi, XSS).
- 24 tests passed, 1 test failed (Minor Bug: Extraneous API calls due to missing client-side validation formatting).

**E — EXPECTED OUTPUT:**
The output should be raw, complete HTML code spanning seamlessly from `<!DOCTYPE html>` to `</html>`. It should not require any external dependencies to view correctly when saved locally as an `.html` file.

**P — PARAMETERS:**
- Strictly avoid hallucinating bugs not present in our `Bug_Report_Invalid_Login.md`.
- No JavaScript dependencies (keep it static HTML/CSS).
- Color coding standards: Pass = Green (`#28a745`), Fail = Red (`#dc3545`), Info = Blue (`#17a2b8`).

**O — OUTPUT FORMAT:**
Provide the HTML contents inside a single Markdown codeblock. No extraneous intro/outro conversational text.

**T — TONE:**
Executive, clean, precise, and highly professional.
