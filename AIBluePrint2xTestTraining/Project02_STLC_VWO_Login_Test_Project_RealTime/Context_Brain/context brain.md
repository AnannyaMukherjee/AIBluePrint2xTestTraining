# VWO Login Page Context Brain

## Application Overview
VWO (Visual Website Optimizer) is an all-in-one platform for A/B testing, conversion rate optimization, and visitor behavior analysis. The login page (https://app.vwo.com/#/login) serves as the entry point for registered users.

## Inputs & UI Elements
- **Email Input ID**: `login-username` (Placeholder: "Enter email ID", Type: text)
- **Password Input ID**: `login-password` (Placeholder: "Enter password", Type: password)
- **Password Mask Toggle**: Visible button (looks like an eye icon) right next to the password input field.
- **Login Button**: Main Sign In button with ID `js-login-btn`.
- **Remember Me Checkbox**: Available below the login inputs to preserve sessions.
- **Forgot Password Link**: Available just above the Sign in options.
- **SSO Authentication Buttons**:
  - `Sign in with Google` (ID: `js-google-signin-btn`)
  - `Sign in using SSO`

## Valid and Invalid Behaviors
### Valid Behaviors
- **Successful Login**: Entering valid email, password, and correct location/IP allows user redirection to the application dashboard.
- **SSO / Google OAuth Logins**: Clicking third-party login buttons successfully redirects the user to the third-party provider's authorization page.
- **Password Mask Toggling**: Clicking the masking eye icon successfully toggles visibility between dots/asterisks and plain text.

### Invalid Behaviors
- **Empty Credentials Submission**: Leaving the username and password blank—or omitting either one—and submitting fires a generic error banner at the top of the form.
- **Malformed Email Formats**: The form does NOT use standard HTML5 field-level email character validation. For example, entering simple string characters like `invalid-email` and hitting Sign In skips field validation and attempts an API call, resulting in a generic error.
- **Invalid Credentials Validation Error**: Entering incorrect data strictly triggers a specific global error: *"Your email, password, IP address or location did not match"*. For security against enumeration, it purposefully does not specify which part was wrong.

## Assumptions
- There is no CAPTCHA triggered by default.
- Javascript must be fully enabled in the client browser, otherwise form hooks (`js-login-btn`) and API requests may fail.
- SSO features depend on active enterprise setups and correct organization domains context.
