import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";

export default class PCBSettingsPage {

    //library objects declaration
    page: Page;
    util: PlaywrightUtil;

    appearancetxt:Locator;
    framelocator: FrameLocator;


    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);
        this.appearancetxt=this.framelocator.getByRole('heading', { name: 'Appearance' })
        
    }

    /**
     * This method is used to verify the settings page is present
     */

    async verifySettingsPageIsPresent() {
        
        await this.util.verifyElementPresent(this.appearancetxt)
    }



}

