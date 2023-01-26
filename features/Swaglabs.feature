Feature: Swaglabs
  As a user
  I want to be able to navigate to Swaglabs
  So that I can interact with it

  Background:
    Given I am on the website "https://www.saucedemo.com/"


  Scenario: Log in as a standard user
    When I log in as a "standard_user"
    Then I should see the "PRODUCTS" page

  Scenario: Log in as a locked out user
    When I log in as a "locked_out_user"
    Then I should see a "locked out" error

  Scenario: 

