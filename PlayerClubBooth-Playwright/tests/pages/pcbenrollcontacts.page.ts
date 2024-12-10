import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBEnrollContactPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    
    //Form locators
   
    emailmandatorymsg:Locator;phonenumbermandatorymsg:Locator;phonetypeerrormsg:Locator;emailtypeerrormsg:Locator;
    phonetypes:Locator; phoneinputs:Locator; deletephones:Locator;selectphones:Locator;
    phonetype:Locator; phoneinput:Locator;deletephone:Locator;selectphone:Locator
    emailtypes:Locator;emailinputs:Locator;deleteemails:Locator;selectemails:Locator;
    emailtype:Locator;emailinput:Locator;deleteemail:Locator;selectemail:Locator;
    phoneoptions:Locator;emailoptions:Locator;


    //Button
    cancelbtn:Locator;nextbtn:Locator;backbtn:Locator;phoneaddbtn:Locator;emailaddbtn:Locator;
    
    //frame locator
    framelocator:FrameLocator;

    //slider
    allowtextmsg:Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);


        //All phone fields locator
        this.phonetypes=this.framelocator.locator('//ul[1]/li/div/div/div[@class="select-mobile"]/igt-input-select/div/mat-form-field/div/div[1]/div[3]/mat-select')
        this.phoneinputs=this.framelocator.locator('//ul[1]/li/div/div[1]/div[2]/input');
        this.deletephones=this.framelocator.locator('//div[4]/div[1]/div/div/div/ul[1]/li/div/div[2]/igt-icon/div/span');
        this.selectphones=this.framelocator.locator("//mat-radio-group[@name='phoneType']/mat-radio-button/label/span[1]/span[1]");
        this.phoneoptions=this.framelocator.locator('//mat-option/span');
       

        //The phone first row locators
        this.phonetype=this.phonetypes.first();
        this.phoneinput=this.phoneinputs.first();
        this.deletephone=this.deletephones.first();
        this.selectphone=this.selectphones.first()

        //All Emmail fields locator
        this.emailtypes=this.framelocator.locator('//ul[2]/li/div/div/div[@class="select-mobile"]/igt-input-select/div/mat-form-field/div/div[1]/div[3]/mat-select')
        this.emailinputs=this.framelocator.locator('//ul[2]/li/div/div[1]/div[2]/igt-input-text/form/mat-form-field/div/div[1]/div[3]/input')
        this.deleteemails=this.framelocator.locator('//div[4]/div[1]/div/div/div/ul[2]/li/div/div[2]/igt-icon/div/span')
        this.selectemails=this.framelocator.locator("//mat-radio-group[@name='emailType']/mat-radio-button/label/span[1]/span[1]");
        this.emailoptions=this.framelocator.locator('//mat-option/span');

        //The email first row locators
        this.emailtype=this.emailtypes.first();
        this.emailinput=this.emailinputs.first();
        this.deleteemail=this.deleteemails.first();
        this.selectemail=this.selectemails.first();

       

        //buttons
        this.phoneaddbtn=this.framelocator.getByRole('button', { name: 'add PHONE' });
        this.emailaddbtn=this.framelocator.getByRole('button', { name: 'add EMAIL' }); 
        this.nextbtn=this.framelocator.getByRole('button', { name: 'Next' });
        this.cancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' }).first();
        this.backbtn=this.framelocator.getByRole('button', { name: 'BACK'});

        //error message
        this.emailmandatorymsg=this.framelocator.getByText('Please enter "Email".')
        this.phonenumbermandatorymsg=this.framelocator.getByText('Please enter "Phone Number".')
        this.phonetypeerrormsg=this.framelocator.getByText('Please select different type.').first();
        this.emailtypeerrormsg=this.framelocator.getByText('Please select different type.').nth(1);

        //slider
         this.allowtextmsg=this.framelocator.locator("//div[4]/div[1]/div/div/div/ul[1]/li[2]/div/div/mat-slide-toggle/label/span[1]/input[@role='switch']")

}  

/**
 * This method is used to verify the enroll address page is present
 */
async verifyEnrollContactsPageIsPresent(){
    await this.util.verifyElementPresent(this.phonetype);
}


/**
 * This method is used to fill the conatcts details
 */
async  fillContactsDetails(testdata:any){

    await this.util.clickElement(this.phonetype);
    await this.util.clickElement(await this.getDropdownValue(testdata.phonetype));
    await this.util.typeText(this.phoneinput,testdata.phonenumber);
    
    await this.util.clickElement(this.emailtype);
    await this.util.clickElement(await this.getDropdownValue(testdata.emailtype));
    await this.util.typeText(this.emailinput,testdata.email);

    await this.selectAlowTextMsgSlider();

}

/**
 * This method is used to validate all the fields are entered properly
 * @param testdata 
 */

async verifyEnteredContactsDetails(testdata:any){
    await this.util.verifyTextPresent(this.phonetype,'Home');
    await this.util.verifyGivenStringsEqual((await this.util.getValue(this.phoneinput)).replace(/[^0-9.]/g, ''),testdata.phonenumber);
    await this.util.verifyTextPresent(this.emailtype,'Primary Email');
    await this.util.verifyValuePresent(this.emailinput,testdata.email);
    await this.verifyAlowTextMsgIsSelected();

}

/**
 * This method is used to click the next button
 */
async clickOnNextButton(){
    await this.util.clickElement(this.nextbtn);
}

/**
 * This method is used to form the dropdown value locator
 * @param value 
 * @returns 
 */

async getDropdownValue(value:string):Promise<Locator>{
    return this.framelocator.locator("//span[text()=' "+value+" ']");
}

/**
 * This method is used verify mandatory field validation
 */
async verifyMandatoryField(){
    await this.util.verifyElementPresent(this.phonenumbermandatorymsg);
    await this.util.verifyElementPresent(this.emailmandatorymsg);
}

/**
 * This method is used to click on the back button
 */
async clickOnBackButton(){
    await this.util.clickElement(this.backbtn);
}

/**
 * This method is used to click on the cancel button
 */
async clickOnCancelButton(){
    await this.util.clickElement(this.cancelbtn);
}

/**
 * This method is used to click on the add phone button
 */
async clickOnAddPhoneButton(){
    await this.util.clickElement(this.phoneaddbtn);
}

/**
 * This method is used to click on the add email button
 */
async clickOnAddEmailButton(){
    await this.util.clickElement(this.emailaddbtn);
}

/**
 * This method is used to verify the  all the phone type and verify the UI 
 * @param testdata 
 */
async addAllPhoneTypeAndVerifyUI(testdata:any){
    
    let phonevalue:string[]=[];
    let phonetypevalues:string[]=[];
    let newphonenumber:string;
    await this.util.clickElement(this.phonetype);
    const count=await this.util.getCount(this.phoneoptions);
    for (let i=0;i<count;i++) {
    newphonenumber=String(Number(testdata.phonenumber)+i);
    phonevalue.push(newphonenumber);

    if(i!=0)
    await this.util.clickElement(this.phonetypes.nth(i));
    //Getting phone options
    const addname:any=await this.util.getText(this.phoneoptions.nth(i));
    phonetypevalues.push(addname)

    await this.util.clickElement(this.phoneoptions.nth(i));
    

    await this.util.typeText(this.phoneinputs.nth(i),newphonenumber);

    if(i!=count-1)
    await this.clickOnAddPhoneButton();
    
    }//End of for loop

    //Verify all the added values are displayed

    for (let i=0;i<count;i++) {
     await this.util.verifyTextPresent(this.phonetypes.nth(i),phonetypevalues[i])
     await this.util.verifyGivenStringsEqual((await this.util.getValue(this.phoneinputs.nth(i))).replace(/[^0-9.]/g, ''),phonevalue[i]);
     await this.util.verifyElementPresent(this.deletephones.nth(i))
     await this.util.verifyElementPresent(this.selectphones.nth(i))
    }

    //Verify add address button should not be visible
    await this.util.verifyElementNotPresent(this.phoneaddbtn)
    

    //Delete and validate add address button is visible
    await this.util.clickElement(this.deletephone);
    await this.util.verifyElementPresent(this.phoneaddbtn)

}

/**
 * This method is used to verify the  all the phone type and verify the UI 
 * @param testdata 
 */
async addAllEmailTypeAndVerifyUI(testdata:any){
    
    let emailvalue:string[]=[];
    let emailtypevalues:string[]=[];
    let newemail:string;
    await this.util.clickElement(this.emailtype);
    const count=await this.util.getCount(this.emailoptions);
    for (let i=0;i<count;i++) {
    newemail=testdata.email+i;
    emailvalue.push(newemail);

    if(i!=0)
    await this.util.clickElement(this.emailtypes.nth(i));

    //Getting email options
    const addname:any=await this.util.getText(this.emailoptions.nth(i));
    emailtypevalues.push(addname)

    await this.util.clickElement(this.emailoptions.nth(i));
   

    await this.util.typeText(this.emailinputs.nth(i),newemail);

    if(i!=count-1)
    await this.clickOnAddEmailButton();
    
    }//End of for loop

    //Verify all the added values are displayed

    for (let i=0;i<count;i++) {
     await this.util.verifyTextPresent(this.emailtypes.nth(i),emailtypevalues[i])
     await this.util.verifyValuePresent(this.emailinputs.nth(i),emailvalue[i]);
     await this.util.verifyElementPresent(this.deleteemails.nth(i))
     await this.util.verifyElementPresent(this.selectemails.nth(i))
    }

    //Verify add address button should not be visible
    await this.util.verifyElementNotPresent(this.emailaddbtn)
    

    //Delete and validate add address button is visible
    await this.util.clickElement(this.deleteemail);
    await this.util.verifyElementPresent(this.emailaddbtn)

}

/**
 * This method is used to verify the 
 * @param testdata
 */
async verifyErrorMsgForSlectingAlreadyAddedType(testdata:any){
    await this.fillContactsDetails(testdata);

    //For Phone
    await this.clickOnAddPhoneButton()
    await this.util.clickElement(this.phonetypes.nth(1));
    await this.util.clickElement(await this.getDropdownValue(testdata.phonetype));
    await this.util.verifyElementPresent(this.phonetypeerrormsg)

     //For Email
     await this.clickOnAddEmailButton()
     await this.util.clickElement(this.emailtypes.nth(1));
     await this.util.clickElement(await this.getDropdownValue(testdata.emailtype));
     await this.util.verifyElementPresent(this.emailtypeerrormsg)
}

/**
 * This method is used to select the allow text message slider 
 * */
async selectAlowTextMsgSlider()
{
    if (await this.util.getAttributeValue(this.allowtextmsg,"aria-checked")=='false')
    {
        await this.util.clickElement(this.allowtextmsg.locator("//ancestor::mat-slide-toggle"));
        await this.util.verifyElementAttribute(this.allowtextmsg,"aria-checked","true")
    }
}

/**
 * This method is used to verify the Allow text msg slider is selected
 */

async verifyAlowTextMsgIsSelected()
{
    await this.util.verifyElementAttribute(this.allowtextmsg,"aria-checked","true")
}

}