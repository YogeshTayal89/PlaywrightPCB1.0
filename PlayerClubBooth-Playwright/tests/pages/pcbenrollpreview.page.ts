import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";
import PCBEnrollPossibleMatchesPage from "./pcbenrollpossiblematches.page";


export default class PCBEnrollPreviewPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    
    //Form Locators
    playerinfo:Locator;savebtn:Locator;nextbtn:Locator;
    
    //frmae locator
    framelocator:FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);

        //Form Locators
        this.playerinfo=this.framelocator.getByRole('heading', { name: 'Player Info' });
        this.nextbtn=this.framelocator.getByRole('button', { name: 'NEXT' });
        this.savebtn=this.framelocator.getByRole('button', { name: 'SAVE' });
}  

/**
 * This method is used to verify the enroll preview page is present
 */

async verifyEnrollPreviewPageIsPresent(){
    await this.util.verifyElementPresent(this.playerinfo);
}

/**
 * This method is used to click the save button
 */
async clickOnSaveButton(){
    await this.util.clickElement(this.savebtn);
}

/**
 * This method is used to click the Next button
 */
async clickOnNextButton(){
    await this.util.clickElement(this.nextbtn);
}

/**
 * This method is used to click the save button
 */
async verifySaveNextBtn(){
    if(await this.util.isElementPresent(this.savebtn)){
        await this.util.verifyElementPresent(this.savebtn)
    }
    else{
        await this.util.verifyElementPresent(this.nextbtn);
    }
}

/**
 * This method is used to create a player
 * @param username 
 * @param password 
 */
async createAPlayer(username:string,password:string){
    if(await this.util.isElementPresent(this.nextbtn)){
        await this.util.clickElement(this.nextbtn);
        const pcbpossiblemathcespage=new PCBEnrollPossibleMatchesPage(this.page);
        pcbpossiblemathcespage.clickOnSaveButton(username,password);
    }
    else{
        await this.util.clickElement(this.savebtn);
    }
}
}