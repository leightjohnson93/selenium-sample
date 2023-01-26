import { Given, When, Then } from '@cucumber/cucumber';
import { Builder, By } from 'selenium-webdriver';
import { assert, expect } from "chai"

const driver = new Builder().forBrowser("chrome").build()
const password = "secret_sauce"

Given('I am on the website {string}', async (url: string) => {
    await driver.get(url)
});

When('I log in as a {string}', async (username: string) => {
    const usernamePromise = driver.findElement(By.id("user-name")).then(usernameEl => usernameEl.sendKeys(username))
    const passwordPromise = driver.findElement(By.id("password")).then(passwordEl => passwordEl.sendKeys(password))
    // We can enter username and password in parallel
    await Promise.all([usernamePromise, passwordPromise])
    await driver.findElement(By.id("login-button")).then(loginEl => loginEl.click())
})

Then('I should see the {string} page', async (page: string) => {
    const headerText = await driver.findElement(By.css(".header_secondary_container span")).then(header => header.getText())
    assert.equal(headerText, page)
});

Then('I should see a {string} error', async (errorString: string) => {
   const errorMessage =  await driver.findElement(By.xpath("//h3[@data-test='error']")).then(errorEl => errorEl.getText())
   expect(errorMessage).to.contain(errorString)
})