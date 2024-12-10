import {Locator, Page} from "@playwright/test"
import PlaywrightUtil from "../../utils/playwright-utils";


export default class Loginpage {

   //library objects declaration
   page: Page;
   util: PlaywrightUtil;

   //Locators for login form
   sitedropdown: Locator; optionsiteone: Locator; usernamefield: Locator; passwordfield: Locator; loginbtn: Locator;

   //Locator for title of the page
   title:string;

   constructor(browserpage: Page) {
      this.page = browserpage
      this.util = new PlaywrightUtil();

      //Login form Locators
      this.sitedropdown = this.page.getByLabel('Site');
      this.optionsiteone = this.page.locator('a').filter({ hasText: 'SiteOne' });
      this.usernamefield = this.page.getByLabel('User ID');
      this.passwordfield = this.page.getByLabel('Password');
      this.loginbtn = this.page.getByRole('button', { name: 'Login' });
      //title locator
      this.title="System Web Portal";

   }

   /**
    * This mehtod is used to navigate to portal
    * @param url 
    */
   async doNavigateToPortal(url: string) {
      await this.util.openURL(this.page, url);
   }

   /**
    * This method is used to login to the application
    * @param username 
    * @param password 
    */
   async doLogin(username: string, password: string) {
      await this.util.typeText(this.usernamefield, username);
      await this.util.typeText(this.passwordfield, password);
      await this.util.clickElement(this.loginbtn);
   }

   /**
    * This method is used to verify the login page is present or not
    */
   async isLoginPagePresent() {
      await this.util.verifyElementPresent(this.usernamefield);
   }

   /**
    * This method is usd to validate the page title
    */

  async validatetitle(){
   await this.util.verifyGivenTextContainsAnotherText(await this.page.title(),this.title);

  }

}