# RESTful Booker API Test Cases

## 📌 Overview
This project contains enterprise-level API test cases for the [RESTful Booker API](https://restful-booker.herokuapp.com/apidoc/index.html). The test suite was systematically generated using the **RICEPOT Framework**, ensuring comprehensive manual and automation test coverage based strictly on the documented API behavior.

## 🚀 API Details
**Base URL:** `https://restful-booker.herokuapp.com`

The test cases cover all documented endpoints of the RESTful Booker API:
- `POST /auth`: Authentication Token Generation
- `GET /booking`: Retrieve Booking IDs
- `GET /booking/:id`: Retrieve Specific Booking
- `POST /booking`: Create New Booking
- `PUT /booking/:id`: Update Existing Booking (Full Update)
- `PATCH /booking/:id`: Partially Update Booking
- `DELETE /booking/:id`: Delete Booking
- `GET /ping`: API Health Check

## 🧪 Test Coverage & Scope
The generated test cases are structured to provide maximum possible test coverage, verifying:
- **Positive Scenarios:** Validating expected behavior with correct payloads, headers, and required API states.
- **Negative Scenarios:** Identifying correct system behavior against invalid data, unauthorized requests, missing payloads, and invalid parameters.
- **Boundary Value Testing:** Checking API limits and optional constraint fulfillment.
- **Edge Conditions:** Validating specific constraints such as date logic (e.g., checkout dates preceding checkin dates) and unsupported data types.
- **Authentication & Authorization:** Verifying access control for securing `PUT`, `PATCH`, and `DELETE` endpoints using authorization tokens and Basic Auth.
- **Error Handling:** Validating exact HTTP response status codes `(400, 403, 404, 405, 500)` alongside expected JSON error messages.

## 📂 Project Structure
- `Restful_Booker_API_Test_Cases.csv` - The core test suite file documented in a structured, executable CSV format directly compatible with Microsoft Excel, Google Sheets, or other spreadsheet applications.

## 🛠️ How to Use
1. **Access the File**: Open `Restful_Booker_API_Test_Cases.csv` using Microsoft Excel or any compatible spreadsheet software.
2. **Review the Sections**:
   - **Header Section & Overview:** High-level breakdown of the overarching API scenarios and project context.
   - **Detailed Test Definitions:** Step-by-step documentation detailing the **Test ID**, **Method**, **Endpoint**, **Payload**, **Headers**, **Parameters**, and **Validation Requirements**.
3. **Execution**: Execute the test cases sequentially or individually tailored to your test suites. You can manually run these tests in **Postman** / **Insomnia** or systematically transition them into testing automation frameworks like **Rest-Assured**, **Playwright**, or **Cypress**.

## 📖 Framework: RICEPOT
This artifact was formulated relying on strict **RICEPOT Framework** principles for optimal prompt-engineering delivery:
- **R (Role):** Engineered matching the capabilities of a 15+ years experienced QA Manual & Automation professional.
- **I (Instructions):** Meticulous requirements mapping directly to API reference documents.
- **C (Context):** Logical alignment with the booking business logic.
- **E (Expected Output):** Professional, fully readable Excel-compatible output format.
- **P (Parameters):** Enterprise-level accuracy lacking undocumented hallucinated endpoints.
- **O (Output Format):** Scalable standard Comma Separated Values (.csv).
- **T (Tone):** Direct, technical, strictly compliant formatting.

## 📅 Version Control
* **Test Creation Date:** 2026-03-20
* **API Targeted:** RESTful Booker Version 1.0
