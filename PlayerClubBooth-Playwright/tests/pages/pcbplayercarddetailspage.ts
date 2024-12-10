import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBPlayerCardDetailsPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    framelocator:FrameLocator;

    //form locators
    printcardbtn:Locator; cardtab:Locator; cardrow:Locator;editbtn:Locator;

    //add or update pin locators
    addcardpinheader:Locator;enterpinlbl:Locator;enterpininput:Locator;reenterpinlbl:Locator;reenterpininput:Locator;
    updatecardpinheader:Locator;enteroldpinlbl:Locator;enteroldpininput:Locator;
    pincancelbtn:Locator;pinsavebtn:Locator; pinupdatebtn:Locator;
    pinlessthan4digitsmsg:Locator; pinmismatcherrormsg:Locator; updateoldpinlessthan4digitmsg:Locator; updatenewpinlessthan4digitmsg:Locator;invalidoldpinmsg:Locator;
    invalidoldpinmsgokbtn:Locator;resetpinbtn:Locator;
    pinaddedsuccessmsgheader:Locator;pinaddedsuccessmsg:Locator;pinaddedsuccessmsgokbtn:Locator; pinupdatedsuccessmsgheader:Locator;pinupdatedsuccessmsg:Locator;
    pinupdatedsuccessmsgokbtn:Locator;

    //card print
    newcardprintheader:Locator; newcardprintradio:Locator; newcardprintradiolbl:Locator;newcardprinttxt:Locator;
    duplicatecardprintheader:Locator; duplicatecardprintradio:Locator; duplicatecardprintradiolbl:Locator;duplicatecardprinttxt:Locator;
    printnumberofcardslbl:Locator;printnumberofcardsinput:Locator;
    printcancelbtn:Locator;printcardbtninpopup:Locator;
    printmsg:Locator;printmsgokbtn:Locator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);

        //Current Page Locators
        this.printcardbtn=this.framelocator.locator("//button/span[contains(text(),'PRINT CARD')]");
        this.cardtab=this.framelocator.getByRole('heading', { name: 'Cards' });
        this.cardrow=this.framelocator.locator("//table/tbody/tr");
        this.editbtn=this.framelocator.getByRole('button', { name: 'edit', exact: true });

        //Set card pin locator
        this.addcardpinheader=this.framelocator.getByRole('heading', { name: 'Set Card PIN' });
        this.enterpinlbl=this.framelocator.getByText('Enter PIN', { exact: true });
        this.enterpininput=this.framelocator.getByPlaceholder('Enter PIN', { exact: true });
        this.reenterpininput=this.framelocator.getByPlaceholder('Re-enter PIN', { exact: true });
        this.reenterpinlbl=this.framelocator.getByText('Re-enter PIN');
        this.pincancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' });
        this.pinsavebtn=this.framelocator.getByRole('button', { name: 'SAVE' });
        this.pinlessthan4digitsmsg=this.framelocator.getByText('PIN must be 4 to 8 digits.');
        this.pinmismatcherrormsg=this.framelocator.getByText('Re-entered PIN doesn\'t match with the entered PIN.');
        this.pinaddedsuccessmsgheader=this.framelocator.getByRole('heading', { name: 'PIN Set' });
        this.pinaddedsuccessmsg=this.framelocator.getByText('PIN has been added successfully');
        this.pinaddedsuccessmsgokbtn=this.framelocator.getByRole('button', { name: 'OK' });

        //update card pin locator
        this.updatecardpinheader=this.framelocator.getByRole('heading', { name: 'Change Card PIN' });
        this.enteroldpinlbl=this.framelocator.getByText('Enter Old PIN')
        this.enteroldpininput=this.framelocator.getByPlaceholder('Enter old PIN');
        this.updateoldpinlessthan4digitmsg=this.framelocator.locator('p').filter({ hasText: /^PIN must be 4 to 8 digits\.$/ });
        this.updatenewpinlessthan4digitmsg=this.framelocator.getByText('PIN must be 4 to 8 digits.').nth(1);
        this.pinupdatebtn=this.framelocator.getByRole('button', { name: 'UPDATE' })
        this.invalidoldpinmsg=this.framelocator.getByText('Old PIN is incorrect.');
        this.invalidoldpinmsgokbtn=this.framelocator.getByRole('button', { name: 'OK' });
        this.pinupdatedsuccessmsgheader=this.framelocator.getByRole('heading', { name: 'PIN Changed' });
        this.pinupdatedsuccessmsg=this.framelocator.getByText('PIN has been changed successfully');
        this.pinupdatedsuccessmsgokbtn=this.framelocator.getByRole('button', { name: 'OK' });

        //Reset pin button
        this.resetpinbtn=this.framelocator.getByRole('button', { name: 'RESET PIN' });
        
        
        //new card print
        this.newcardprintheader=this.framelocator.getByRole('heading', { name: 'New Card Print' });
        this.newcardprintradio=this.framelocator.locator('.mat-radio-outer-circle').first();
        this.newcardprintradiolbl=this.framelocator.getByText('Print new card');
        this.newcardprinttxt=this.framelocator.getByText('If you print a new card, the active cards will be deactivated')

        //dupllicate card print
        this.duplicatecardprintheader=this.framelocator.getByRole('heading', { name: 'Duplicate Card Print' })
        this.duplicatecardprintradio=this.framelocator.locator('//ul/li[1]/mat-radio-button[2]')
        this.duplicatecardprintradiolbl=this.framelocator.getByText('Print duplicate')
        this.duplicatecardprinttxt=this.framelocator.getByText('A copy of active card will be printed')

        //print card common locators
        this.printnumberofcardslbl=this.framelocator.getByText('Number of Cards');
        this.printnumberofcardsinput=this.framelocator.locator('#mat-input-1');
        this.printcancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' });
        this.printcardbtninpopup=this.framelocator.getByRole('button', { name: 'PRINT CARD' });
        this.printmsg=this.framelocator.getByLabel('Device Manager Connection');
        this.printmsgokbtn=this.framelocator.getByRole('button', { name: 'OK' });
    }

    /**
     * This method is used to verify the PCB player card details page is present
     */

    async verifyCardDetailsPageIsPresent(){
        await this.util.verifyElementPresent(this.printcardbtn)
        await this.util.verifyElementPresent(this.cardtab);
      
    }

    /**
     * This method is used to Edit or Add Button
     */
    async clickCardsAddorEditButton(){
        await this.util.clickElement(this.editbtn);

    }

    /**
     * This method is used to verify the success message of add pin
     */
    async  verifyAddedSuccessMsg(){
        await this.util.verifyElementPresent(this.pinaddedsuccessmsgheader);
        await this.util.verifyElementPresent(this.pinaddedsuccessmsg);
        await this.util.clickElement(this.pinaddedsuccessmsgokbtn);
        await this.util.verifyElementNotPresent(this.pinaddedsuccessmsgheader);
    }

    /**
     * This method is used to verify the success message of update button
     */
    async  verifyUpdatedSuccessMsg(){
        await this.util.verifyElementPresent(this.pinupdatedsuccessmsgheader);
        await this.util.verifyElementPresent(this.pinupdatedsuccessmsg);
        await this.util.clickElement(this.pinupdatedsuccessmsgokbtn);
        await this.util.verifyElementNotPresent(this.pinupdatedsuccessmsgheader);
    }

    /**
     * This method is used to add the pin and validate error message for incorrect pins
     */
    async addCorrectPIN(){

        await this.clickCardsAddorEditButton();

        await this.util.verifyElementPresent(this.addcardpinheader);
        await this.util.verifyElementPresent(this.enterpinlbl)
        await this.util.verifyElementPresent(this.reenterpinlbl);
        //less than 4 digits
        await this.util.typeText(this.enterpininput,"123");
        await this.util.typeText(this.reenterpininput,"123");
        await this.util.clickElement(this.pinsavebtn);
        await this.util.verifyElementPresent(this.pinlessthan4digitsmsg);

        //Cancel
        await this.util.clickElement(this.pincancelbtn);
        await this.util.verifyElementNotPresent(this.addcardpinheader);

        //Mismatch
        await this.clickCardsAddorEditButton();
        await this.util.verifyElementPresent(this.addcardpinheader);
        await this.util.typeText(this.enterpininput,"1234");
        await this.util.typeText(this.reenterpininput,"12345");
        await this.util.clickElement(this.pinsavebtn);
        await this.util.verifyElementPresent(this.pinmismatcherrormsg);

        //Succcess message
        await this.util.typeText(this.enterpininput,"1234");
        await this.util.typeText(this.reenterpininput,"1234");
        await this.util.clickElement(this.pinsavebtn);
        await this.verifyAddedSuccessMsg();

    }

    /**
     * This method is used to update the pin and validate error message for incorrect pins
     */
    async updateCorrectPIN(){

        await this.clickCardsAddorEditButton();

        await this.util.typeText(this.enterpininput,"1234");
        await this.util.typeText(this.reenterpininput,"1234");
        await this.util.clickElement(this.pinsavebtn);
        await this.verifyAddedSuccessMsg();

        await this.clickCardsAddorEditButton();
        await this.util.verifyElementPresent(this.updatecardpinheader);
        await this.util.verifyElementPresent(this.enteroldpinlbl)
        await this.util.verifyElementPresent(this.enterpinlbl)
        await this.util.verifyElementPresent(this.reenterpinlbl);

        //less than 4digits
        await this.util.typeText(this.enteroldpininput,"123");
        await this.util.typeText(this.enterpininput,"123");
        await this.util.typeText(this.reenterpininput,"123");
        await this.util.clickElement(this.pinupdatebtn);
        await this.util.verifyElementPresent(this.updateoldpinlessthan4digitmsg);
        await this.util.verifyElementPresent(this.updatenewpinlessthan4digitmsg);

        //Cancel
        await this.util.clickElement(this.pincancelbtn);
        await this.util.verifyElementNotPresent(this.updatecardpinheader);

        await this.clickCardsAddorEditButton();
        await this.util.verifyElementPresent(this.updatecardpinheader);

        //Invalid old pin
        await this.util.typeText(this.enteroldpininput,"12345");
        await this.util.typeText(this.enterpininput,"1234");
        await this.util.typeText(this.reenterpininput,"1234");
        await this.util.clickElement(this.pinupdatebtn);
        await this.util.verifyElementPresent(this.invalidoldpinmsg);
        await this.util.clickElement(this.invalidoldpinmsgokbtn);
        await this.util.verifyElementNotPresent(this.invalidoldpinmsg);


        //pin mismatch
        await this.clickCardsAddorEditButton();
        await this.util.typeText(this.enteroldpininput,"1234");
        await this.util.typeText(this.enterpininput,"1234");
        await this.util.typeText(this.reenterpininput,"12345");
        await this.util.clickElement(this.pinupdatebtn);
        await this.util.verifyElementPresent(this.pinmismatcherrormsg);

        //success msg
        await this.util.typeText(this.enteroldpininput,"1234");
        await this.util.typeText(this.enterpininput,"1234");
        await this.util.typeText(this.reenterpininput,"1234");
        await this.util.clickElement(this.pinupdatebtn);
        await this.verifyUpdatedSuccessMsg();
        
    }

    /**
     * Method is used to verify new card print functionality
     */
    async verifyNewCardPrint(){
        await this.util.clickElement(this.printcardbtn);
        await this.util.verifyElementPresent(this.duplicatecardprintheader);
        await this.util.clickElement(this.newcardprintradio);
        await this.util.clickElement(this.newcardprintheader);
        await this.util.verifyElementPresent(this.newcardprintradiolbl);
        await this.util.verifyElementPresent(this.newcardprinttxt);
        await this.util.verifyElementPresent(this.printnumberofcardslbl);
        await this.util.verifyElementPresent(this.printnumberofcardsinput);

        //verify cancel btn
        await this.util.clickElement(this.printcancelbtn);
        await this.util.verifyElementNotPresent(this.newcardprintheader);

        //verify print btn
        await this.util.clickElement(this.printcardbtn);
        await this.util.verifyElementPresent(this.duplicatecardprintheader);
        await this.util.clickElement(this.newcardprintradio);
        await this.util.verifyElementPresent(this.newcardprintheader);
        await this.util.clickElement(this.printcardbtninpopup);
        await this.util.verifyElementPresent(this.printmsg);
        await this.util.clickElement(this.printmsgokbtn);
        await this.util.verifyElementNotPresent(this.printmsg);
    }

    /**
     * This method is used to verify the print card message
     */
    async verifyPrintCard(){
        await this.util.clickElement(this.printcardbtn);
        await this.util.verifyElementPresent(this.printmsg);
        await this.util.clickElement(this.printmsgokbtn);
    }

    /**
     * Method is used to verify duplicate card print functionality
     */
    async verifyDuplicateCardPrint(){
        await this.util.clickElement(this.printcardbtn);
        await this.util.verifyElementPresent(this.duplicatecardprintheader);
        await this.util.clickElement(this.duplicatecardprintradio);
        await this.util.verifyElementPresent(this.duplicatecardprintheader);
        await this.util.verifyElementPresent(this.duplicatecardprintradiolbl);
        await this.util.verifyElementPresent(this.duplicatecardprinttxt);
        await this.util.verifyElementPresent(this.printnumberofcardslbl);
        await this.util.verifyElementPresent(this.printnumberofcardsinput);

        //verify cancel btn
        await this.util.clickElement(this.printcancelbtn);
        await this.util.verifyElementNotPresent(this.duplicatecardprintheader);

        //verify print btn
        await this.util.clickElement(this.printcardbtn);
        await this.util.verifyElementPresent(this.duplicatecardprintheader);
        await this.util.clickElement(this.duplicatecardprintradio);
        await this.util.clickElement(this.printcardbtninpopup);
        await this.util.verifyElementPresent(this.printmsg);
        await this.util.clickElement(this.printmsgokbtn);
        await this.util.verifyElementNotPresent(this.printmsg);
    }

}