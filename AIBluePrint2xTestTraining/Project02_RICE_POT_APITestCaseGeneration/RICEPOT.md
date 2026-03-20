# TEST CASE GENERATION FROM API DOCUMENTATION USING RICEPOT FRAMEWORK

**R — ROLE:**
You are a QA Manual and Automation Tester with 15+ years of experience. You have a strong understanding of QA processes and API testing, including working with API documentation such as the Restful Booker API (https://restful-booker.herokuapp.com/apidoc/index.html).  
Your task is to create enterprise-level API test cases based strictly on the provided API documentation.

**I — INSTRUCTIONS:**
1. [CRITICAL] Carefully read and analyze the provided API documentation:
   https://restful-booker.herokuapp.com/apidoc/index.html

2. [CRITICAL] Understand and extract:
   - Functional requirements
   - API workflows
   - Authentication and authorization mechanisms
   - Request/response structures
   - Validation rules

3. [MANDATORY] Include test coverage for:
   - All available endpoints
   - Positive scenarios
   - Negative scenarios
   - Edge cases
   - Boundary value testing
   - Request and response validation
   - Error handling

4. [MANDATORY] Include token-based authentication flow:
   - Generate an authorization token
   - Use it for secured endpoints (e.g., PUT /booking, DELETE /booking)

5. [MANDATORY] Maintain:
   - Consistent structure
   - High readability
   - Logical grouping of test cases

6. [STRICT RULES]:
   - Do NOT add comments or explanations
   - Do NOT create or assume endpoints not present in the documentation
   - Do NOT hallucinate scenarios outside the documented behavior

7. [OUTPUT]:
   - Generate test cases in spreadsheet-compatible format
   - Ensure correctness, completeness, and traceability

**C — CONTEXT:**
The API documentation includes details about:
- Endpoints
- Payloads and schemas
- Required headers (e.g., Content-Type, Accept: application/json)
- Authentication process
- Business logic and constraints

All test cases must strictly align with the documented API behavior.

**E — EXPECTED OUTPUT:**
The output must follow this Excel-compatible structure:

1. Header Section:
   - Project Name
   - Created Date

2. Test Case Overview:
   - Scenario_ID
   - Scenario Description
   - Priority

3. Detailed Test Case Definitions:
   - TC_ID
   - Scenario_ID
   - Test Case Name
   - Test Case Description
   - Endpoint
   - HTTP Method
   - Headers
   - Payload
   - Parameters
   - Expected Response
   - Validation

**P — PARAMETERS:**
- Ensure enterprise-level quality and completeness
- Maintain high accuracy based on API documentation
- Cover maximum possible test scenarios
- Include boundary values and edge conditions
- Ensure zero logical inconsistencies

**O — OUTPUT FORMAT:**
- Generate the complete test suite in structured CSV format
- The CSV must be directly usable in Excel
- Maintain clean formatting and proper column alignment

**T — TONE:**
- Technical
- Professional
- Enterprise-standard
- Strictly format-compliant
