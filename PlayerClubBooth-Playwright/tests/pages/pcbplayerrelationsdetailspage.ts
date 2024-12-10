import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";

export default class PCBPlayerRelationDetailsPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    framelocator:FrameLocator;

    //Buttons
    addlinkbtn:Locator;
    unlinkbtn:Locator;

    //Modal dialog for lining and unlinking
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

    //common buttons
    yesbtn:Locator;nobtn:Locator;okbtn:Locator

    //loading gif locator
    loaderimg:Locator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);
        this.addlinkbtn=this.framelocator.getByRole('button', { name: 'add LINK' })
        this.unlinkbtn=this.framelocator.locator('td').filter({ hasText: 'link_off' }).first();

         //linkingplayers popup
         this.link2playersheading=this.framelocator.getByRole('heading', { name: 'Link Two Players?' });
         this.link2playerstext=this.framelocator.getByText('Do you want to link')
 
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

         //Loading gif locator
         this.loaderimg=this.framelocator.getByRole('img', { name: 'Loader Image' })
 
       
    }

    /**
     * This method is used to verify the PCB player relation details page is present
     */
    async verifyRelationDetailsPageIsPresent(){
        await this.util.verifyElementPresent(this.addlinkbtn);
      
    }

    /**
     * This method is used to click the Add link button
     */
    async clickAddLink(){
        await this.util.clickElement(this.addlinkbtn);
    }

    /**
     * This method is used to verify the linked player is present
     * @param playerid 
     */
    async verifyLinkedPlayerIsPresent(playerid:string){
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: playerid }))

    }

    /**
     * This method is used to verify the unlinked player is not displayed
     * @param playerid 
     */
    async verifyUnLinkedPlayerIsNotPresent(playerid:string){
        await this.util.verifyElementNotPresent(this.framelocator.getByRole('cell', { name: playerid }))
    }

    /**
     * This method is used to click the unlink button
     */
    async clickUnlink(){
        await this.util.clickElement(this.unlinkbtn);
    }
    

    /**
     * This method is used to verify the link modal dialog is present
     */
    async verifyLinkingModalIsPresent(){
       await this.util.verifyElementNotPresent(this.loaderimg)
        await this.util.verifyElementPresent(this.link2playersheading);
        await this.util.verifyElementPresent(this.link2playerstext);
        await this.util.verifyElementPresent(this.yesbtn);
        await this.util.verifyElementPresent(this.nobtn);
      
    }

    /**
     * This method is used verify No button from link confirmation dialog
     */
    async verifyLinkNofunctionality(){
        await this.util.clickElement(this.nobtn);
        await this.util.verifyElementNotPresent(this.link2playersheading);
       
    }

    /**
     * This method is usd to click yes button
     */
    async clickYesButton(){
        await this.util.clickElement(this.yesbtn);
    }

    /**
     * This method is usd to click no button
     */
    async clickNoButton(){
        await this.util.clickElement(this.nobtn);
    }

    /**
     * This method is usd to click ok button
     */
    async clickOkButton(){
        await this.util.clickElement(this.okbtn);
    }

    /**
     * This method is used to verify the playerid linking functionality
     * @param playerid 
     */
    async verifyLinkYesFunctionality(playerid:string){
        await this.clickYesButton();
        await this.util.verifyElementPresent(this.linksuccessheading);
        await this.util.verifyElementPresent(this.linksuccessmsg);
        await this.util.clickElement(this.okbtn)
        await this.verifyLinkedPlayerIsPresent(playerid);
       
    }

    /**
     * This method is ued to verify the modal is not present
     */
    async verifyUnLinkingModalIsPresent(){
        await this.util.verifyElementPresent(this.unlink2playersheading);
        await this.util.verifyElementPresent(this.unlink2playerstext);
        await this.util.verifyElementPresent(this.yesbtn);
        await this.util.verifyElementPresent(this.nobtn);
      
    }

    /***
     * This method is used to verify the unlink no button
     */
    async verifyUnLinkNofunctionality(){
        await this.clickNoButton();
        await this.util.verifyElementNotPresent(this.unlink2playersheading);
       
    }

    /**
     * This method is used to verify the unlink a player functionality
     * @param playerid 
     */
    async verifyUnLinkYesFunctionality(playerid:string){
        await this.clickYesButton();
        await this.util.verifyElementPresent(this.addlinkbtn);
        await this.verifyUnLinkedPlayerIsNotPresent(playerid);
       
    }

    /**
     * This method is used to verify the error message , if user try to link already linked player
     */
    async verifyMessgaeForAlreadyAddedPlayer(){
        await this.util.verifyElementPresent(this.alreadylinkedheading)
        await this.util.verifyElementPresent(this.alreadyinkedtxt)
    }
}