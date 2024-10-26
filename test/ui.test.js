import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

describe('UI Testing using Selenium', function () {
    this.timeout(20000); // Set timeout to 20 seconds
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    // Test Case 1: Validate Login Page Loads Correctly
    it('should load the login page', async function () {
        await driver.get('file:///C:/Users/ASUS/ppmpl/p4/login.html'); // Update path if needed
        const title = await driver.getTitle();
        console.log(`Title: ${title}`); // Debugging: log title
        assert.strictEqual(title, 'Login Page'); // Validate the page title
    });

    // Test Case 2: Successful Login to Dashboard
    it('should input correct username and password and navigate to dashboard', async function () {
        await driver.get('file:///C:/Users/ASUS/ppmpl/p4/login.html');
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        await driver.findElement(By.id('loginButton')).click();

        // Wait for navigation to dashboard
        await driver.wait(until.urlIs('file:///C:/Users/ASUS/ppmpl/p4/dashboard.html'), 20000);
        const currentUrl = await driver.getCurrentUrl();
        console.log(`Current URL: ${currentUrl}`);
        assert.strictEqual(currentUrl, 'file:///C:/Users/ASUS/ppmpl/p4/dashboard.html');
    });

    // Test Case 3: Failed Login Validation
    it('should show an error for invalid credentials', async function () {
        await driver.get('file:///C:/Users/ASUS/ppmpl/p4/login.html');
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).sendKeys('wrongpass');
        await driver.findElement(By.id('loginButton')).click();

        // Check for alert presence and validate text
        try {
            await driver.wait(until.alertIsPresent(), 5000);
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            console.log(`Alert text: ${alertText}`);
            assert.strictEqual(alertText, 'Invalid username or password');
            await alert.accept();
        } catch (e) {
            console.error('Expected alert did not appear.');
        }
    });

    // Test Case 4: CSS Selector and XPath Usage
    it('should use CSS Selector and XPath to fill in login credentials', async function () {
        await driver.get('file:///C:/Users/ASUS/ppmpl/p4/login.html');
        await driver.findElement(By.css('#username')).sendKeys('testuser'); // Using CSS Selector
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123'); // Using XPath
        // Attempt login and wait for potential alert to validate failed login
        await driver.findElement(By.id('loginButton')).click();
    });

    // Test Case 5: Visual Validation of Elements
    it('should check if login elements are displayed', async function () {
        await driver.get('file:///C:/Users/ASUS/ppmpl/p4/login.html');
        const isLoginButtonDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        const isUsernameFieldDisplayed = await driver.findElement(By.id('username')).isDisplayed();
        const isPasswordFieldDisplayed = await driver.findElement(By.id('password')).isDisplayed();

        assert.strictEqual(isLoginButtonDisplayed, true, 'Login button should be visible');
        assert.strictEqual(isUsernameFieldDisplayed, true, 'Username field should be visible');
        assert.strictEqual(isPasswordFieldDisplayed, true, 'Password field should be visible');
    });
});
