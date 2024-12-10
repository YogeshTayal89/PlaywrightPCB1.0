import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBPlayerRelationDetailsPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    framelocator:FrameLocator;
    link2playersheading:Locator;
    link2playerstext:Locator;

    unlink2playersheading:Locator;
    unlink2playerstext:Locator;

    //linksuccessmodal
    linksuccessheading:Locator;
    linksuccessmsg:Locator;

    //AlreadyLinked
    alreadylinkedheading:Locator;
    alreadyinkedtxt:Locator;

    //button
    yesbtn:Locator;nobtn:Locator;okbtn:Locator


    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);
        //linkingplayers popup
        this.link2playersheading=this.framelocator.getByRole('heading', { name: 'Link Two Players?' });
        this.link2playerstext=this.framelocator.getByText('Are you sure you want to link')

        //linking success
        this.linksuccessheading=this.framelocator.getByRole('heading', { name: 'Link Two Players' });
        this.linksuccessmsg=this.framelocator.getByText('linked successfully');

        //unlinkingplayers popup
        this.unlink2playersheading=this.framelocator.getByRole('heading', { name: 'Unlink Two Players?' })
        this.unlink2playerstext=this.framelocator.getByText('Are you sure you want to unlink')

        //AlreadyLinked
        this.alreadylinkedheading=this.framelocator.getByRole('heading', { name: 'Information' });
        this.alreadyinkedtxt=this.framelocator.getByText('already linked.');

        //Common buttons
        this.yesbtn=this.framelocator.getByRole('button', { name: 'YES' });
        this.nobtn=this.framelocator.getByRole('button', { name: 'NO' });
        this.okbtn=this.framelocator.getByRole('button', { name: 'OK' })

/*
        select top 1 LinkNumber from playerlink where playerid='130890'

update link set Status='I' where LinkNumber='722'

delete from playerlink where playerid='130890'*/
        
       
    }

    /**
     * This method is used to verify the PCB player relation details page is present
     */

    async verifyLinkingModalIsPresent(){
       
        await this.util.verifyElementPresent(this.link2playersheading);
        await this.util.verifyElementPresent(this.link2playerstext);
        await this.util.verifyElementPresent(this.yesbtn);
        await this.util.verifyElementPresent(this.nobtn);
      
    }

    async verifyLinkNofunctionality(){

        await this.util.clickElement(this.nobtn);
        await this.util.verifyElementNotPresent(this.link2playersheading);
       
    }

    async verifyLinkYesFunctionality(){

        await this.util.clickElement(this.yesbtn);
        await this.util.verifyElementPresent(this.linksuccessheading);
        await this.util.verifyElementPresent(this.linksuccessmsg);
        await this.util.clickElement(this.okbtn)
       
    }

}