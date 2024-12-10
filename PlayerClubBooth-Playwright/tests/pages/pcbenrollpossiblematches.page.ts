import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBEnrollPossibleMatchesPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    
    //form locators
    possiblematchesheader:Locator;savebtn:Locator;
    

    //override locators
    overrideconfirmdialogheader:Locator;overrideconfirmdialognobtn:Locator;overrideconfirmdialogyesbtn:Locator;overrideconfirmdialogtextloc:Locator;
    overrideusername:Locator;overridepassword:Locator;overrridecancelbtn:Locator;overrideokbtn:Locator;
    dialogtext:string;
    
    //frmae locator
    framelocator:FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);

        //form Locators
        this.possiblematchesheader=this.framelocator.getByRole('heading', { name: 'Possible Matches' })
        this.savebtn=this.framelocator.getByRole('button', { name: 'SAVE' })

        //Override locators
        this.overrideconfirmdialogheader=this.framelocator.getByRole('heading', { name: 'Override Required' })
        this.overrideconfirmdialognobtn=this.framelocator.getByRole('button', { name: 'NO' })
        this.overrideconfirmdialogyesbtn=this.framelocator.getByRole('button', { name: 'YES' })
        this.overrideconfirmdialogtextloc=this.framelocator.getByRole('paragraph');
        this.dialogtext="An override is required to ignore the potential duplicates. Would you like to override the transaction?";
        this.overrideusername=this.framelocator.getByRole('textbox', { name: 'Enter user name' });
        this.overridepassword=this.framelocator.getByRole('textbox', { name: 'Enter password' });
        this.overrridecancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' });
        this.overrideokbtn=this.framelocator.getByRole('button', { name: 'OK' });
}  

/**
 * This method is used to verify the enroll possible matches page is present
 */
async verifyEnrollPossibleMatchesPageIsPresent(){
    await this.util.verifyElementPresent(this.possiblematchesheader);
}

/**
 * This method is used to click the save button
 */
async clickOnSaveButton(username:string,password:string ){
    //Handling overr ride
    if(await this.util.isElementPresent(this.overrideconfirmdialogheader)){
        await this.util.clickElement(this.overrideconfirmdialogyesbtn);
        await this.util.typeText(this.overrideusername, username);
        await this.util.typeText(this.overridepassword, password);
        await this.util.clickElement(this.overrideokbtn)
    }
    else{
     await this.util.clickElement(this.savebtn);

    if(await this.util.isElementPresent(this.overrideconfirmdialogheader)){
        await this.util.clickElement(this.overrideconfirmdialogyesbtn);
        await this.util.typeText(this.overrideusername, username);
        await this.util.typeText(this.overridepassword, password);
        await this.util.clickElement(this.overrideokbtn)
    }
}
    
}

}