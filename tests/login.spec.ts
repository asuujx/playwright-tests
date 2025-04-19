import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("login with valid credentials", async ({ page }) => {
   const loginPage = new LoginPage(page);
   await loginPage.goto();
   await loginPage.login("standard_user", "secret_sauce");
   await loginPage.isOnInventoryPage();
});

test("login with invalid credentials", async ({ page }) => {
   const loginPage = new LoginPage(page);
   await loginPage.goto();
   await loginPage.login("invalid_user", "invalid_password");
   await loginPage.isErrorMessageVisible("Epic sadface: Username and password do not match any user in this service");
});

test("login with empty credentials", async ({ page }) => {
   const loginPage = new LoginPage(page);
   await loginPage.goto();
   await loginPage.login("", "");
   await loginPage.isErrorMessageVisible("Epic sadface: Username is required");
});

test("login with locked out user", async ({ page }) => {
   const loginPage = new LoginPage(page);
   await loginPage.goto();
   await loginPage.login("locked_out_user", "secret_sauce");
   await loginPage.isErrorMessageVisible("Epic sadface: Sorry, this user has been locked out.");
});