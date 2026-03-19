package pages;

import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    @FindBy(xpath = "//input[@type='email']")
    public WebElement username;

    @FindBy(xpath = "//input[@type='password']")
    public WebElement password;

    @FindBy(xpath = "//input[@type='checkbox' and @id='rememberUn']")
    public WebElement rememberMeCheckbox;

    @FindBy(xpath = "//input[@type='submit']")
    public WebElement loginButton;

    @FindBy(xpath = "//div[@id='error']")
    public WebElement loginError;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    public void doLogin(String user, String pass, boolean rememberMe) {
        try {
            wait.until(ExpectedConditions.visibilityOf(username)).sendKeys(user);
            wait.until(ExpectedConditions.visibilityOf(password)).sendKeys(pass);
            
            if (rememberMe) {
                WebElement checkbox = wait.until(ExpectedConditions.elementToBeClickable(rememberMeCheckbox));
                if (!checkbox.isSelected()) {
                    checkbox.click();
                }
            }
            
            wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();
        } catch (TimeoutException e) {
            throw new RuntimeException(e);
        }
    }

    public String getErrorMessage() {
        try {
            return wait.until(ExpectedConditions.visibilityOf(loginError)).getText();
        } catch (TimeoutException e) {
            throw new RuntimeException(e);
        }
    }
}
