import {Locator,FrameLocator, Page} from "@playwright/test"
import PlaywrightUtil from "../../utils/playwright-utils";


export default class Override {

   //library objects declaration
   page: Page;
   util: PlaywrightUtil;

   //Locators for login form
   overrideheader:Locator;overrideusername: Locator; overridepassword: Locator; overrridecancelbtn: Locator; overrideokbtn: Locator;

    //frame locator
    framelocator:FrameLocator;

   constructor(browserpage: Page) {
      this.page = browserpage
      this.util = new PlaywrightUtil();

      const frameid = "#iframe-PatronManagement";
      this.framelocator = this.page.frameLocator(`${frameid}`);

      this.overrideheader=this.framelocator.getByRole('heading', { name: 'Override' })
      this.overrideusername=this.framelocator.getByRole('textbox', { name: 'Enter user name' });
      this.overridepassword=this.framelocator.getByRole('textbox', { name: 'Enter password' });
      this.overrridecancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' });
      this.overrideokbtn=this.framelocator.getByRole('button', { name: 'OK' });

   }

/**
 * This method is used to override by providing the credentials
 * @param username 
 * @param password 
 */
   async overrideWithCredentials(username:string, password:string)
   {
      await this.util.typeText(this.overrideusername, username);
      await this.util.typeText(this.overridepassword, password);
      await this.util.clickElement(this.overrideokbtn)
   }
}