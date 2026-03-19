# Salesforce Login Automation Framework (RICE-POT)

This project is an enterprise-grade automation testing framework specifically designed to automate the Salesforce Login page (`login.salesforce.com`). It leverages **Selenium WebDriver**, **Java**, **TestNG**, and **Maven** to provide a robust, maintainable, and scalable testing solution.

This repository was generated as part of the AI Blueprint training, utilizing the **RICE-POT Prompt Framework** to ensure high enterprise coding standards. (See `RICE_POT.md` for more details on the generation).

## 🚀 Key Features

*   **Page Object Model (POM) Architecture:** Clean separation between the test logic and the web elements, enhancing maintainability.
*   **PageFactory Integration:** Optimized initialization of web elements (`@FindBy` annotations).
*   **TestNG Integration:** Structured test execution using annotations (`@Test`, `@BeforeMethod`, `@AfterMethod`) with `testng.xml` configuration.
*   **Robust Exception Handling:** Uses structured `try-catch` blocks for stability during test execution.
*   **Standard XPath Strategy:** Exclusively employs reliable XPath over CSS selectors.
*   **Smart Synchronization:** Utilizes `WebDriverWait` (Explicit Waits) instead of unreliable `Thread.sleep()`.
*   **Comprehensive Reporting:** Integrated with **Allure Reports** to provide rich, visual test execution summaries.

## 🛠️ Tech Stack

*   **Language:** Java 11+
*   **Automation Tool:** Selenium WebDriver (v4.18.1)
*   **Testing Framework:** TestNG (v7.9.0)
*   **Build Tool:** Maven
*   **Reporting:** Allure TestNG (v2.25.0)

## 📂 Project Structure

```text
Project02_RICE_POT_Selenium_FW/
├── src/
│   ├── main/java/com/salesforce/pages/
│   │   └── LoginPage.java             # Page Factory Elements & Methods for Salesforce Login
│   └── test/java/com/salesforce/
│       ├── base/
│       │   └── BaseTest.java          # WebDriver Setup, Initialization & Teardown
│       └── tests/
│           └── LoginTest.java         # Test Cases (Valid & Invalid Login Scenarios)
│
├── .gitignore                         # Git ignore configuration
├── RICE_POT.md                        # Documentation on the prompt engineering framework used
├── pom.xml                            # Maven project dependencies and build configuration
├── run.bat                            # Batch script to execute the test suite and serve allure reports
├── testng.xml                         # TestNG Suite Configuration
└── README.md                          # Project documentation
```

## ⚙️ Prerequisites

Before you begin, ensure you have met the following requirements:

*   **Java Development Kit (JDK):** Version 11 or higher installed and configured in system `PATH`.
*   **Apache Maven:** Installed and configured in system `PATH`.
*   **Web Browser:** Google Chrome, Firefox, or Edge.
*   **Allure Commandline:** (Optional, but required to manually serve reports if not using the maven plugin wrapper).

## ▶️ Setup and Execution

### Running via Batch Script (Windows)

The simplest way to execute the full test suite and automatically generate and open the Allure report is to use the provided batch script:

1. Double-click the `run.bat` file OR run it via command prompt:
```cmd
run.bat
```

### Running via Maven Commands

You can execute the tests directly using Maven from the project root directory:

**1. Clean and Compile:**
```bash
mvn clean compile
```

**2. Execute Tests:**
```bash
mvn test -DsuiteXmlFile=testng.xml
```

**3. Generate and Serve Allure Reports:**
```bash
mvn allure:serve
```
This will start a local web server and open the HTML test report in your default browser.

## 🧪 Test Coverage

The test suite within `LoginTest.java` is designed to cover critical authentication flows on `login.salesforce.com`, specifically focusing on:

1.  **Valid Authentication:** Successful login with correct username and password.
2.  **Invalid Authentication:** Failed login attempts with incorrect credentials to verify proper error message handling.
