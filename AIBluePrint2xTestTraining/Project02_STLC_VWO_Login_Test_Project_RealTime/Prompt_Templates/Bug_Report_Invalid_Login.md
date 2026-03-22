# Bug Report: Missing Client-Side Validation on Invalid Login

**Bug ID**: BUG-VWO-001  
**Title**: Missing HTML5 Client-Side Validation on Email Input Form triggers unnecessary API Call  

## Description
When a user inputs a fundamentally malformed email string (e.g., missing the `@` symbol) and attempts to log in, the front-end fails to validate the input locally. Instead of prompting the user immediately, it sends an unnecessary authentication request to the backend API, returning a generic global error rather than a specific field-level validation hint.

## Steps to Reproduce
1. Open a web browser and navigate to `https://app.vwo.com/#/login`.
2. Locate the email input field (`id="login-username"`).
3. Enter a malformed email address (e.g., `invalid-email`).
4. Enter any valid or random password into the password field (`id="login-password"`).
5. Click on the **Sign in** button (`id="js-login-btn"`).

## Expected vs Actual Behavior
* **Expected Result**: 
  The form submission should be blocked by HTML5 client-side validation (`type="email"` constraint). A standard browser tooltip (e.g., "Please include an '@' in the email address.") should appear on the email field. No API network request should be dispatched to the server.
* **Actual Result**: 
  The frontend completely bypasses field-level format validation. It submits the payload to the VWO authentication API, returning a global generic toast error message: *"Your email, password, IP address or location did not match"*.

## Severity & Priority
* **Severity**: Minor (S4) - Does not block core application functionality, but affects UX and wastes server resources.
* **Priority**: Low (P4) - Should be fixed in the next UI/UX sprint as a technical debt/polish item.
