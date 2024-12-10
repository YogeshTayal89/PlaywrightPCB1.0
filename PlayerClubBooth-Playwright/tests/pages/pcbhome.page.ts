import { Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBHomePage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;

    //home page locators
    search:Locator; enrollment:Locator;enrollmenticon:Locator; loadicon:Locator;
    
    //home page footer locators
    footersearchplayer:Locator; footerenrollment:Locator; footersettings:Locator;
    footerhome:Locator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        const framelocator = this.page.frameLocator(`${frameid}`);
        //home page locators
        this.search=framelocator.getByRole('heading', { name: 'SEARCH PLAYER' });
        this.enrollment=framelocator.getByRole('heading', { name: 'ENROLLMENT' });
        this.enrollmenticon=framelocator.getByText('add_circle');
        this.loadicon=framelocator.getByRole('img', { name: 'Angular Logo' });

        //home page footer locators
        this.footersearchplayer=framelocator.getByRole('link', { name: 'SEARCH PLAYER' })
        this.footerenrollment=framelocator.getByRole('link', { name: 'ENROLLMENT' });
        this.footersettings=framelocator.getByRole('link', { name: 'SETTINGS' });
        this.footerhome=framelocator.getByRole('link', { name: 'HOME' });

    }

    /**
     * This method is used to verify the PCB home Page
     */

    async verifyPCBHomePage(){
        await this.util.verifyElementPresent(this.search);
        await this.util.verifyElementPresent(this.enrollment);
        await this.util.verifyElementPresent(this.enrollmenticon);
    }

    /**
     * This method is used to navigate to enrollment page
     */
    async clickOnEnrollment(){
        await this.util.clickElement(this.enrollment);

    }

    /**
     * This method is used to navigate to search page
     */
    async clickOnSearch(){
        await this.util.clickElement(this.search);

    }

    /**
     * This method is used to cick the footer home link
     */
    async clickOnFooterHome(){
        await this.util.clickElement(this.footerhome);
    }

     /**
     * This method is used to cick the footer search link
     */
    async clickOnFooterSearch(){
        await this.util.clickElement(this.footersearchplayer)
    }

     /**
     * This method is used to cick the footer enrollment link
     */
    async clickOnFooterEnrollment(){
        await this.util.clickElement(this.footerenrollment)
    }

     /**
     * This method is used to cick the footer settings link
     */
    async clickOnFooterSettings(){
        await this.util.clickElement(this.footersettings)
    }
}