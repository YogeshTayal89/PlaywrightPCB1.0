import { Locator, Page, expect } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class DashboardPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;

    //dashboard locators
    profileicon: Locator; profilelogout: Locator; menu: Locator; navappl: Locator;
    pcb: Locator; 

    constructor(browserpage: Page) {
        this.page = browserpage;
        this.util = new PlaywrightUtil();

        this.profileicon = this.page.locator('//*[@id="user-avatar"]')
        this.profilelogout = this.page.locator('a').filter({ hasText: 'Logout' });
        this.pcb = this.page.getByRole('heading', { name: 'Players Club Booth' })
        
    }

    /**
     * This method is used to verify whether the dashbaord page is present or not
     */
    async isDashboardPresent() {
        await expect(this.profileicon).toBeVisible();
    }

    /**
     * This method is used to do the log out from application
     */
    async logout() {
        await this.util.clickElement(this.profileicon);
        await this.util.clickElement(this.profilelogout);
    }

    /**
     * This method is used to click the application  from application dashboard
     */
    async clickOnPCBApp() {
        await this.util.clickElement(this.pcb);
    }

}