import { Given, When, Then, AfterAll, BeforeAll } from "@cucumber/cucumber";
import { Builder, By, ThenableWebDriver } from "selenium-webdriver";
import { assert, expect } from "chai";

let driver: ThenableWebDriver;
const password = "secret_sauce";

BeforeAll(() => (driver = new Builder().forBrowser("chrome").build()));

Given("I am on the website {string}", async (url: string) => {
  await driver.get(url);
});

When("I log in as a {string}", async (username: string) => {
  const usernamePromise = driver
    .findElement(By.id("user-name"))
    .then((usernameInput) => usernameInput.sendKeys(username));
  const passwordPromise = driver
    .findElement(By.id("password"))
    .then((passwordInput) => passwordInput.sendKeys(password));
  // We can enter username and password in parallel
  await Promise.all([usernamePromise, passwordPromise]);
  await driver
    .findElement(By.id("login-button"))
    .then((loginEl) => loginEl.click());
});

Then("I should see the {string} page", async (page: string) => {
  const headerText = await driver
    .findElement(By.css(".header_secondary_container span"))
    .then((header) => header.getText());
  assert.equal(headerText, page);
});

Then("I should see a {string} error", async (errorString: string) => {
  const errorMessage = await driver
    .findElement(By.xpath("//h3[@data-test='error']"))
    .then((errorEl) => errorEl.getText());
  expect(errorMessage).to.contain(errorString);
});

When("I add an item to my cart", async () => {
  await driver
    .findElements(By.className("inventory_item"))
    .then((inventoryItems) =>
      inventoryItems[0]
        .findElement(By.css("button"))
        .then((addToCartButton) => addToCartButton.click())
    );
});

Then("I have an item in my cart", async () => {
  const badgeText = await driver
    .findElement(By.className("shopping_cart_badge"))
    .then((badge) => badge.getText());
  assert(badgeText, "1");
});

AfterAll(async () => await driver.close());
