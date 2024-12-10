import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBPrintCardPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    
    printpageheader:Locator;printcard:Locator;cancelbtn:Locator;printbtn:Locator;
    
    framelocator:FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);
        this.printpageheader=this.framelocator.getByRole('heading', { name: 'Print Card' })
        this.printcard=this.framelocator.getByRole('img', { name: 'card' });
        this.cancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' });
        this.printbtn=this.framelocator.getByRole('button', { name: 'PRINT' });
}  

/**
 * This method is used to verify the enroll print card page is present
 */

async verifyEnrollPrintCardPageIsPresent(){

    await this.util.verifyElementPresent(this.printpageheader);
    await this.util.verifyElementPresent(this.printcard);
}


/**
 * This method is used to click the print button
 */
async clickOnPrintButton(){
    await this.util.clickElement(this.printbtn);
}

/**
 * This method is used to click the cancel button
 */
async clickOnCancelButton(){
    await this.util.clickElement(this.cancelbtn);
}

}