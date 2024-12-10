import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBEnrollIdentificationPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    
    //form locators
    refusedid:Locator; type:Locator; id:Locator; country:Locator; state:Locator;
    expirydate:Locator; verifieddate:Locator; iderrormessage:Locator; stateerrormessage:Locator;typeerrormsg:Locator;
    expirydateerrormessage:Locator; countryvalue:Locator; statevalue:Locator;choosemonthyear:Locator;year:Locator;dateandmonth:Locator;
    addidbtn:Locator;idlabel:Locator;editidbtn:Locator;editcancelbtn:Locator;idupdatebtn:Locator;iddeletebtn:Locator;

    //For buttons
    cancelbtn:Locator; nextbtn:Locator;backbtn:Locator;

    //drop down values
    typdropdownvalues: string[] = ["Drivers License","Passport", "State License", "SSN","newid","Signature","Whiteslip"];

    //common locator for list fo types added
    typelist:Locator;
    


    //frame locator
    framelocator:FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);

        //Form Locators
        this.refusedid=this.framelocator.locator('(//igt-checkbox/mat-checkbox)[1]');
        this.type=this.framelocator.locator('.primary-text > li > .formControl > .igt-input-select > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').first()
        this.id=this.framelocator.getByPlaceholder('Enter ID#');
        this.country=this.framelocator.locator('#country mat-form-field');
        this.state=this.framelocator.locator('li:nth-child(7) > .formControl > .igt-input-select > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex');
        this.expirydate=this.framelocator.locator('//li[9]/mat-form-field/div/div[1]/div[3]/input')
        this.verifieddate=this.framelocator.locator('#mat-input-3');
        this.iderrormessage=this.framelocator.getByText('Please enter "ID"');
        this.stateerrormessage=this.framelocator.getByText('Please select “State”');
        this.expirydateerrormessage=this.framelocator.getByText('Please enter "Expiry Date"');
        this.typeerrormsg=this.framelocator.getByText('Please select different "Type".')
        this.countryvalue=this.framelocator.getByRole('option', { name: 'United States of America' }).locator('span').first();
        this.statevalue=this.framelocator.getByText('Alaska');
        this.choosemonthyear=this.framelocator.getByLabel('Choose month and year');
        this.year=this.framelocator.getByLabel('2030');
        this.dateandmonth=this.framelocator.getByLabel('Tue Jan 01');

        //id related locators
        this.idlabel=this.framelocator.locator("//ul[2]/li/div/span");
        this.addidbtn=this.framelocator.getByRole('button', { name: 'add ID' })
        this.editidbtn=this.framelocator.getByText('edit', { exact: true }).first();
        this.editcancelbtn=this.framelocator.getByText('cancel', { exact: true }).first();
        this.idupdatebtn=this.framelocator.getByRole('button', { name: 'add UPDATE' });
        this.iddeletebtn=this.framelocator.getByLabel('2Identification').getByText('delete').first();

        //form button locators 
        this.nextbtn=this.framelocator.getByRole('button', { name: 'Next'}).first();
        this.cancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' });
        this.backbtn=this.framelocator.getByRole('button', { name: 'BACK'});

        //List of types locator
        this.typelist=this.framelocator.locator('//div[2]/div/div[1]/div/div[1]/ul[2]')
        
}  

/**
 * This method is used to verify the enroll identification page is present
 */
async verifyEnrollIdentificationPageIsPresent(){

    await this.util.verifyElementPresent(this.refusedid);
}

/**
 * This method is used to validate refuseid is clickable
 */
async clickRefuseIdAndVerify(){

    await this.util.verifyEnabled(this.refusedid);
    await this.util.clickElement(this.refusedid);
}

/**
 * This method is used to verify the type dropdown values 
 *  */
async verifyTypeDropdownValues(){

    //For loop the dropdown values and compare it with expected values
    for (const element of this.typdropdownvalues) {
        await this.util.clickElement(this.type);
        await this.util.verifyElementPresent(await this.getDropdownValue(element));
        await this.util.clickElement(await this.getDropdownValue(element));
        await this.util.verifyTextPresent(this.type,element)
       
    }

}

/**
 * This method is used to fill the identification details
 */
async  fillIdentificationEnrollmentDetails(testdata:any){

    await this.util.clickElement(this.type);
    await this.util.clickElement(await this.getDropdownValue(testdata.idtype));
    await this.util.typeText(this.id,testdata.id);

    await this.util.clickElement(this.country);
    await this.util.clickElement(await this.getDropdownValue(testdata.country));

    await this.util.waitForPagetoLoad(this.page,5000);
    await this.util.clickElement(this.state);
    await this.util.clickElement(await this.getDropdownValue(testdata.state));

    await this.util.clickElement(this.expirydate);
    await this.util.clickElement(this.choosemonthyear);
    await this.util.clickElement(this.year);
    await this.util.clickElement(this.dateandmonth);
    await this.util.clickElement(this.dateandmonth);

}

/** This method is used to build the locator based on the text provided for dropdown selection */

async getDropdownValue(value:string):Promise<Locator>{

    return this.framelocator.locator("//span[text()=' "+value+" ']").nth(0);

}

/**
 * This method is used to click the next button
 */
async clickOnNextButton(){
    await this.util.clickElement(this.nextbtn);
}

/**
 * This method is used to click the cancel button
 */
async clickOnCancelButton(){
    await this.util.clickElement(this.cancelbtn);
}


/**
 * This method is used to click the back button
 */
async clickOnBackButton(){
    await this.util.clickElement(this.backbtn);
}


/**
 * This method is used to verify the error message of ID
 */
async verifyErrorMessageOfID()
{
    await this.util.verifyElementPresent(this.iderrormessage);
}

/**
 * This method is used to verify the error message of state
 */

async verifyErrorMessageOfState()
{
    await this.util.verifyElementPresent(this.stateerrormessage);
}


/**
 * This method is used to verify the error message of expiry date
 */

async verifyErrorMessageOfExpiryDate()
{
    await this.util.verifyElementPresent(this.expirydateerrormessage);
}



/**
 * This method is used to validate Add and Edit functionality of ID field
 * @param testdata 
 */
async verifyAddandEditID(testdata:any){

    await this.util.clickElement(this.addidbtn);
    await this.util.verifyTextPresent(this.idlabel,testdata.id)
    await this.util.verifyTextPresent(this.type,this.typdropdownvalues[1])
    await this.util.clickElement(this.editidbtn);
    await this.util.verifyTextPresent(this.type,this.typdropdownvalues[0])
    await this.util.verifyValuePresent(this.id,testdata.id)

    await this.util.typeText(this.id,testdata.id+1)
    await this.util.clickElement(this.idupdatebtn);
    await this.util.verifyTextPresent(this.idlabel,testdata.id+1)
    await this.util.verifyTextPresent(this.type,this.typdropdownvalues[1])
}

/**
 * This method is used to verify delete a id
 * @param testdata 
 */
async verifyDeleteID(testdata:any){

    await this.util.clickElement(this.addidbtn);
    await this.util.verifyTextPresent(this.idlabel,testdata.id)
    await this.util.verifyTextPresent(this.type,this.typdropdownvalues[1])
    await this.util.clickElement(this.iddeletebtn);
    await this.util.verifyElementPresent(this.id);
    await this.util.verifyElementNotPresent(this.idlabel);
  
}


/**
 * This method is used to validate all the fields are entered properly
 * @param testdata 
 */

async verifyEnterdIdentificationDetails(testdata:any){
   
    await this.util.verifyTextPresent(this.type,this.typdropdownvalues[0])
    await this.util.verifyValuePresent(this.id,testdata.id)
    await this.util.verifyTextPresent(this.country,testdata.country)
    await this.util.verifyTextPresent(this.state,testdata.state)
    await this.util.verifyContainsAnyText(this.expirydate);
  
}

/**
 * This method is used to validate the UI behaviour on selecting Types from dropdown
 * @param testdata 
 */

async verifyUIBehaviourOnSelectingTypes(){
    //On Selecting Drivers License
    await this.util.clickElement(this.type);
    await this.util.clickElement(await this.getDropdownValue(this.typdropdownvalues[0]));
    await this.util.verifyEnabled(this.id)
    await this.util.verifyEnabled(this.country)
    await this.util.verifyEnabled(this.state)
    await this.util.verifyEnabled(this.expirydate);
    await this.util.verifyEnabled(this.verifieddate);

    //On Selecting Passport
    await this.util.clickElement(this.type);
    await this.util.clickElement(await this.getDropdownValue(this.typdropdownvalues[1]));
    await this.util.verifyEnabled(this.id)
    await this.util.verifyEnabled(this.country)
    await this.util.verifyElementNotPresent(this.state)
    await this.util.verifyEnabled(this.expirydate);
    await this.util.verifyEnabled(this.verifieddate);

    //On Selecting State License
    await this.util.clickElement(this.type);
    await this.util.clickElement(await this.getDropdownValue(this.typdropdownvalues[2]));
    await this.util.verifyEnabled(this.id)
    await this.util.verifyEnabled(this.country)
    await this.util.verifyEnabled(this.state)
    await this.util.verifyEnabled(this.expirydate);
    await this.util.verifyEnabled(this.verifieddate);

    //On Selecting SSN
    await this.util.clickElement(this.type);
    await this.util.clickElement(await this.getDropdownValue(this.typdropdownvalues[3]));
    await this.util.verifyEnabled(this.id)
    await this.util.verifyEnabled(this.country)
    await this.util.verifyEnabled(this.state)
    await this.util.verifyDisabled(this.expirydate);
    await this.util.verifyEnabled(this.verifieddate);

     //On Selecting new id
     await this.util.clickElement(this.type);
     await this.util.clickElement(await this.getDropdownValue(this.typdropdownvalues[4]));
     await this.util.verifyEnabled(this.id)
     await this.util.verifyEnabled(this.country)
     await this.util.verifyEnabled(this.state)
     await this.util.verifyEnabled(this.expirydate);
     await this.util.verifyEnabled(this.verifieddate);


      //On Selecting Signatue
      await this.util.clickElement(this.type);
      await this.util.clickElement(await this.getDropdownValue(this.typdropdownvalues[5]));
      await this.util.verifyEnabled(this.id)
      await this.util.verifyElementNotPresent(this.country)
      await this.util.verifyElementNotPresent(this.state)
      await this.util.verifyDisabled(this.expirydate);
      await this.util.verifyDisabled(this.verifieddate);


       //On Selecting whiteslip
       await this.util.clickElement(this.type);
       await this.util.clickElement(await this.getDropdownValue(this.typdropdownvalues[6]));
       await this.util.verifyEnabled(this.id)
       await this.util.verifyEnabled(this.country)
       await this.util.verifyElementNotPresent(this.state)
       await this.util.verifyEnabled(this.expirydate);
       await this.util.verifyEnabled(this.verifieddate);
  
}


/**
 * This method is used to add all the type
 * @param testdata 
 */

async addAllTypeAndVerifyUI(testdata:any){
    let i=0;
    let idvalue:string[]=[];
    let newid:string;
    for (const element of this.typdropdownvalues) {
    i=i+1;
    newid=testdata.id+i;
    idvalue.push(newid);
    //For Drivers License
    await this.util.clickElement(this.type);
    await this.util.clickElement(await this.getDropdownValue(element));
    await this.util.typeText(this.id,newid);

    if (element!='Signature'){
    await this.util.clickElement(this.country);
    await this.util.clickElement(await this.getDropdownValue(testdata.country));
    }

    if (element!='Passport' && element!='Signature' && element !='Whiteslip'){
         await this.util.waitForPagetoLoad(this.page,5000);
         await this.util.clickElement(this.state);
         await this.util.clickElement(await this.getDropdownValue(testdata.state));
    }

    if (element!='SSN' && element!='Signature'){
         await this.util.clickElement(this.expirydate);
         await this.util.clickElement(this.choosemonthyear);
         await this.util.clickElement(this.year);
         await this.util.clickElement(this.dateandmonth);
         await this.util.clickElement(this.dateandmonth);
        }
    
        await this.util.clickElement(this.addidbtn);
    }//End of for loop

    //Verify all the added values are displayed

     i=1; //Re initialize the counter variable
    for (const element of this.typdropdownvalues) {
     await this.util.verifyContainsText(this.typelist.locator("//li["+i+"]/label"),element)
     await this.util.verifyTextPresent(this.typelist.locator("//li["+i+"]/div/span"),idvalue[i-1])
     await this.util.verifyElementPresent(this.typelist.locator("//li["+i+"]/div/div/igt-icon[1]/div/span[text()=' edit ']"))
     await this.util.verifyElementPresent(this.typelist.locator("//li["+i+"]/div/div/igt-icon[2]/div/span[text()=' delete ']"))
     await this.util.verifyElementPresent(this.typelist.locator("//li["+i+"]/div/div/mat-radio-group/mat-radio-button"))
     i=i+1;
    }

    //Verify add id button should not be visisble
    await this.util.verifyElementNotPresent(this.addidbtn)
    

    //Edit and validate updateid button is visible
    await this.util.clickElement(this.editidbtn)
    await this.util.verifyElementPresent(this.idupdatebtn)

    //Cance the delete button and validate add and update id button not visible
    await this.util.clickElement(this.editcancelbtn)
    await this.util.verifyElementNotPresent(this.idupdatebtn)
    await this.util.verifyElementNotPresent(this.addidbtn)

    //Delete and validate addid button is visible
    await this.util.clickElement(this.iddeletebtn);
    await this.util.verifyElementNotPresent(this.idupdatebtn)
    await this.util.verifyElementPresent(this.addidbtn)

}

/**
 * This method is used to verify the 
 * @param testdata
 */
async verifyErrorMsgForSlectingAlreadyAddedType(testdata:any){
    await this.fillIdentificationEnrollmentDetails(testdata);
    await this.util.clickElement(this.addidbtn);
    await this.util.clickElement(this.type);
    await this.util.clickElement(await this.getDropdownValue(testdata.idtype));
    await this.util.verifyElementPresent(this.typeerrormsg)
}

/**
 * This method is used to validate the added data after clicking back button
 * @param testdata 
 */
async verifyValuesAfterBackFromAnotherForm(testdata:any){

    await this.util.verifyContainsText(this.typelist.locator("//li[1]/label"),testdata.idtype)
    await this.util.verifyTextPresent(this.typelist.locator("//li[1]/div/span"),testdata.id)
    await this.util.verifyElementPresent(this.typelist.locator("//li[1]/div/div/igt-icon[1]/div/span[text()=' edit ']"))
    await this.util.verifyElementPresent(this.typelist.locator("//li[1]/div/div/igt-icon[2]/div/span[text()=' delete ']"))
    await this.util.verifyElementPresent(this.typelist.locator("//li[1]/div/div/mat-radio-group/mat-radio-button"))
    
}

/**
 * Method used to verify the refuseidcheckbox is checked
 */

async verifyRefuseIDCheckBoxIsChecked(){
    await this.util.verifyElementAttribute(this.refusedid,"class","mat-checkbox mat-primary mat-checkbox-checked");

}

}