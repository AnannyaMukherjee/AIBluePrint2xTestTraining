package listeners;

import base.BaseTest;
import io.qameta.allure.Attachment;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class TestListener implements ITestListener {

    @Attachment(value = "Failure Screenshot", type = "image/png")
    public byte[] saveScreenshot(WebDriver driver) {
        try {
            return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
        } catch (Exception e) {
            throw new RuntimeException("Failed to capture screenshot", e);
        }
    }

    @Override
    public void onTestFailure(ITestResult result) {
        try {
            Object testClass = result.getInstance();
            if (testClass instanceof BaseTest) {
                WebDriver driver = ((BaseTest) testClass).getDriver();
                if (driver != null) {
                    saveScreenshot(driver);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Screenshot capture failed on test failure", e);
        }
    }
}
