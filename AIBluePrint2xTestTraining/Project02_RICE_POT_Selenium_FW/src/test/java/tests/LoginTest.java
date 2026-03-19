package tests;

import io.qameta.allure.Description;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import pages.LoginPage;

public class LoginTest {
    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeTest
    public void setup() {
        try {
            driver = new ChromeDriver();
            driver.manage().window().maximize();
            driver.get("https://login.salesforce.com/?locale=in");
            loginPage = new LoginPage(driver);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    @Description("Valid testcase for Salesforce Login with Remember Me")
    public void testValidLogin() {
        try {
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
            loginPage.doLogin("invalid@salesforce.com", "InvalidPass!", false);
            String errorMsg = loginPage.getErrorMessage();
            Assert.assertFalse(errorMsg.isEmpty(), "Error message was not displayed.");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @AfterTest
    public void tearDown() {
        try {
            if (driver != null) {
                driver.quit();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
