package tests;

import base.BaseTest;
import io.qameta.allure.Description;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;

public class ValidLoginTest extends BaseTest {

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
}
