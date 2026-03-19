package tests;

import base.BaseTest;
import io.qameta.allure.Description;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;

public class InvalidLoginTest extends BaseTest {

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
