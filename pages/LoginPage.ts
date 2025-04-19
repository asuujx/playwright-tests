import { expect, Page } from "@playwright/test";

export class LoginPage {
   constructor(private page: Page) {}

   async goto() {
      await this.page.goto("https://www.saucedemo.com/");
   }

   async login(username: string, password: string) {
      await this.page.fill("#user-name", username);
      await this.page.fill("#password", password);
      await this.page.click("#login-button");
   }

   async isOnInventoryPage() {
      await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
   }

   async isErrorMessageVisible(errorMessageText: string) {
      const errorMessage = this.page.locator("[data-test='error']");
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText(errorMessageText);
   }
}