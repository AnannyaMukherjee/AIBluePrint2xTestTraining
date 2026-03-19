package com.salesforce.tests;

import com.salesforce.base.BaseTest;
import com.salesforce.pages.LoginPage;
import io.qameta.allure.Description;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    @Test
    @Description("Valid testcase for Salesforce Login with Remember Me")
    public void testValidLogin() {
        try {
            driver.get("https://login.salesforce.com/?locale=in");
            LoginPage loginPage = new LoginPage(driver);
            loginPage.doLogin("validuser@salesforce.com", "ValidPass123!", true);
            Assert.assertTrue(driver.getCurrentUrl().contains("lightning") || driver.getCurrentUrl().contains("home"), "Valid login failed.");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    @Description("Invalid testcase for Salesforce Login without Remember Me")
    public void testInvalidLogin() {
        try {
            driver.get("https://login.salesforce.com/?locale=in");
            LoginPage loginPage = new LoginPage(driver);
            loginPage.doLogin("invalid@salesforce.com", "InvalidPass!", false);
            String errorMsg = loginPage.getErrorMessage();
            Assert.assertFalse(errorMsg.isEmpty(), "Error message was not displayed.");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
