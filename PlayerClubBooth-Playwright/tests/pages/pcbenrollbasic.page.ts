import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";
import Override from "./override.page";
import PCBEnrollIdentificationPage from "./pcbenrollidentification.page";


export default class PCBEnrollBasicPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;

    //locators for the form
    basicinformationheading:Locator;
    firstnameerrormsg:Locator;lastnameerrormsg:Locator;doberrormsg:Locator;
    title:Locator; titlemrvalue:Locator; firstname:Locator; middlename:Locator;lastname:Locator;
    suffix:Locator;suffixvalue:Locator;preferredname:Locator;gender:Locator;gendermalevalue:Locator;
    dob:Locator;choosemonthandyear:Locator;prevyear:Locator;year:Locator; dateandmonth:Locator;country:Locator;countryvalue:Locator;taxid:Locator;
    ssn:Locator;crossref:Locator;pip:Locator;pipyesvalue:Locator;
    currentdate:Locator;

    //locator for buttons
    cancelbtn:Locator; nextbtn:Locator;backbtn:Locator;

    //locator for age minimum age confirmation
    ageconfirmheading:Locator;ageconfirmtextforconfig2:Locator;ageconfirmtextforconfig3:Locator;ageconfirmyesbtn:Locator;ageconfirmnobtn:Locator
    minimumagerrormsg:Locator;



    //locator for loading symbol
    loader:Locator;

    //Frame Locator
    framelocator:FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);

        //Locators for the form
        this.basicinformationheading=this.framelocator.getByText('Basic Information');
        this.firstnameerrormsg=this.framelocator.getByText('Please enter "First Name"');
        this.lastnameerrormsg=this.framelocator.getByText('Please enter "Last Name"');
        this.doberrormsg=this.framelocator.getByText('Please Select "DOB"');
        this.title=this.framelocator.locator('.mat-form-field-flex').first();
        this.titlemrvalue=this.framelocator.getByText('Mr.');
        this.firstname=this.framelocator.getByPlaceholder('Enter First Name');
        this.middlename=this.framelocator.getByPlaceholder('Enter Middle Name');
        this.lastname=this.framelocator.getByPlaceholder('Enter Last Name');
        this.suffix=this.framelocator.locator('li:nth-child(9) > .formControl > .igt-input-select > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex');
        this.suffixvalue=this.framelocator.getByText('PhD');
        this.preferredname=this.framelocator.getByPlaceholder('Enter Preferred Name');
        this.gender=this.gender=this.framelocator.getByText('Select Gender');
        this.gendermalevalue=this.framelocator.getByText('Male', { exact: true });
        this.dob=this.framelocator.getByRole('textbox', { name: 'MM/DD/YYYY' });
        this.choosemonthandyear=this.framelocator.getByLabel('Choose month and year');
        this.prevyear= this.framelocator.getByLabel('Previous 24 years');
        this.year=this.framelocator.getByLabel('1997');
        this.dateandmonth=this.framelocator.getByLabel('Wed Jan 01');
        this.country=this.framelocator.getByLabel('1Basic Information').getByText('United States of America');
        this.countryvalue=this.framelocator.getByRole('option', { name: 'United States of America' });
        this.taxid=this.framelocator.getByPlaceholder('Enter TaxID')
        this.crossref=this.framelocator.locator('li').filter({ hasText: 'Cross Ref' }).locator('#igt_input_');
        this.pip=this.framelocator.locator('.ng-star-inserted > .formControl > .igt-input-select > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex');
        this.pipyesvalue=this.framelocator.getByText('Yes');
        this.currentdate=this.framelocator.locator("//button/div[@class='mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-today']");
       
        //Locator for buttons
        this.cancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' });
        this.nextbtn=this.framelocator.getByRole('button', { name: 'NEXT'});
        this.backbtn=this.framelocator.getByRole('button', { name: 'BACK'});

         //locator for age minimum age confirmation
         this.ageconfirmheading=this.framelocator.getByRole('heading', { name: 'Confirmation' })
         this.ageconfirmtextforconfig2=this.framelocator.getByText('The birthday entered for this player does not meet the minimum age requirement. Are you sure you want to continue with the enrollment?');
         this.ageconfirmtextforconfig3=this.framelocator.getByText('The birthday entered for this player does not meet the minimum age requirement. Would you like to override this requirement?');
         this.ageconfirmnobtn=this.framelocator.getByRole('button', { name: 'NO' })
         this.ageconfirmyesbtn=this.framelocator.getByRole('button', { name: 'YES' })
         this.minimumagerrormsg=this.framelocator.getByText("The birthday entered for this player does not meet the minimum age requirement.");

        //Locator for loading symbol
        this.loader=this.framelocator.getByRole('img', { name: 'Angular Logo' });
    }

    /**
     * This method is used to verify the PCB enrolment basic Page is present 
     */

    async verifyBasicEnrollmentPagePresent(){
        await this.util.verifyElementPresent(this.basicinformationheading);
    }

    /**
     * This method is used to click the cancel button
     */
    async clickOnCancelButton(){
        await this.util.clickElement(this.cancelbtn);
        await this.util.verifyElementNotPresent(this.basicinformationheading);
    }

    /**
     * This method is used to click on the Next button
     */
    async clickOnNextButton(){        
        await this.util.waitForPagetoLoad(this.page,3000);
        await this.util.clickElement(this.nextbtn);

    }

    /**
     * This method is used to validate the error message of first name 
     * */
    async verifyErrorMessageOfFirstName(){
        await this.util.verifyElementPresent(this.firstnameerrormsg);
    }

    /**
     * This method is used to validate the error message of last anme
     */
    async verifyErrorMessageOfLastName(){
        await this.util.verifyElementPresent(this.lastnameerrormsg);
    }

    /**
     * This method is used to validate the error message of DoB
     */
    async verifyErrorMessageOfDOB(){
        await this.util.verifyElementPresent(this.doberrormsg);
    }

    /**
     * This method is used to fill the enrollment basic details
     */
    async fillBasicEnrollmentDetails(testdata:any){

        //Wait till loading symbol not present
        await this.util.verifyElementNotPresent(this.loader);

        //title
        await this.util.clickElement(this.title);
        await this.util.clickElement(this.titlemrvalue);

        //firstname , middlename and lastname
        await this.util.typeText(this.firstname,testdata.firstname);
        await this.util.typeText(this.middlename,testdata.middlename);
        await this.util.typeText(this.lastname,testdata.lastname);

        //suffix
        await this.util.clickElement(this.suffix);
        await this.util.clickElement(await this.getDropdownValue(testdata.suffix));

        await this.util.typeText(this.preferredname,testdata.preferredname);

        //Gender
        await this.util.clickElement(this.gender);
        await this.util.clickElement(await this.getDropdownValue(testdata.gender));

         //dob
         await this.util.clickElement(this.dob);
         await this.util.clickElement(this.choosemonthandyear);
         await this.util.clickElement(this.prevyear);
         await this.util.clickElement(this.year);
         await this.util.clickElement(this.dateandmonth);
         await this.util.clickElement(this.dateandmonth);

         //country
         await this.util.clickElement(this.country);
         await this.util.clickElement(await this.getDropdownValue(testdata.country));

         //Taxid, crossref and pip
         await this.util.typeText(this.taxid,testdata.taxid);
         await this.util.typeText(this.crossref,testdata.crossref);

         if(await this.util.isElementPresent(this.pip))
            {
                await this.util.clickElement(this.pip)
                await this.util.clickElement(this.pipyesvalue)
            }

    }


    /**
     * This method is used to fill the enrollment basic details with current date
     */
    async fillBasicEnrollmentDetailsWithCurrentDate(testdata:any){

        //Wait till loading symbol not present
        await this.util.verifyElementNotPresent(this.loader);

        //title
        await this.util.clickElement(this.title);
        await this.util.clickElement(this.titlemrvalue);

        //firstname , middlename and lastname
        await this.util.typeText(this.firstname,testdata.firstname);
        await this.util.typeText(this.middlename,testdata.middlename);
        await this.util.typeText(this.lastname,testdata.lastname);

        //suffix
        await this.util.clickElement(this.suffix);
        await this.util.clickElement(await this.getDropdownValue(testdata.suffix));

        await this.util.typeText(this.preferredname,testdata.preferredname);

        //Gender
        await this.util.clickElement(this.gender);
        await this.util.clickElement(await this.getDropdownValue(testdata.gender));

         //dob
         await this.util.clickElement(this.dob);
         await this.util.clickElement(this.currentdate);
         
         //country
         await this.util.clickElement(this.country);
         await this.util.clickElement(await this.getDropdownValue(testdata.country));

         //Taxid, crossref and pip
         await this.util.typeText(this.taxid,testdata.taxid);
         await this.util.typeText(this.crossref,testdata.crossref);

         if(await this.util.isElementPresent(this.pip))
            {
                await this.util.clickElement(this.pip)
                await this.util.clickElement(this.pipyesvalue)
            }

    }

    /**
     * This method is used to build the drop down value locators
     * @param value 
     * @returns  locator
     */
    async getDropdownValue(value:string):Promise<Locator>{

        return this.framelocator.locator("//span[text()=' "+value+" ']")

    }

    /**
     * This method is used to verify back button is disabled
     * 
     */
    async verifyBackButtonDisabled(){
        await this.util.verifyDisabled(this.backbtn)
    }

    /**
     * This method is used to verify the age confirmation popup yes functionality for the config value 3
     */
    async VerifyConfirmationWithYesButtonForConfig3(username:string,password:string){
        await this.util.verifyElementPresent(this.ageconfirmheading);
        await this.util.verifyElementPresent(this.ageconfirmtextforconfig3);
        await this.util.clickElement(this.ageconfirmyesbtn)
        const override=new Override(this.page);
        await override.overrideWithCredentials(username,password)
        const pcbenrollidentificationpage=new PCBEnrollIdentificationPage(this.page);
        await pcbenrollidentificationpage.verifyEnrollIdentificationPageIsPresent();
    }


    /**
     * This method is used to verify the age confirmation popup yes functionality for the config value 2
     */
    async VerifyConfirmationWithYesButtonForConfig2(username:string,password:string){
        await this.util.verifyElementPresent(this.ageconfirmheading);
        await this.util.verifyElementPresent(this.ageconfirmtextforconfig2);
        await this.util.clickElement(this.ageconfirmyesbtn)
        const pcbenrollidentificationpage=new PCBEnrollIdentificationPage(this.page);
        await pcbenrollidentificationpage.verifyEnrollIdentificationPageIsPresent();
    }


    /**
     * This method is used to verify the age confirmation popup no functionality
     */
    async VerifyConfirmationWithNoButton(){
        await this.util.verifyElementPresent(this.ageconfirmheading);
        await this.util.clickElement(this.ageconfirmnobtn)
        await this.util.verifyElementNotPresent(this.ageconfirmheading);
    }

    /**
     * This method is used to verify the dob minimum age error message for config value 4
     */

    async verifyErrorMessageForConfigValue4(){

        await this.util.verifyElementPresent(this.minimumagerrormsg)

    }

    /**
     * This method is used to verify the entered details
     */
    async verifyEnterdBasicDetails(testdata:any){
   
        await this.util.verifyTextPresent(this.title,"Mr.");
        await this.util.verifyValuePresent(this.firstname,testdata.firstname);
        await this.util.verifyValuePresent(this.middlename,testdata.middlename);
        await this.util.verifyValuePresent(this.lastname,testdata.lastname);
        await this.util.verifyTextPresent(this.suffix,testdata.suffix);
        await this.util.verifyValuePresent(this.preferredname,testdata.preferredname);
        await this.util.verifyTextPresent(this.gender,testdata.gender);
        await this.util.verifyContainsAnyText(this.dob);
        await this.util.verifyTextPresent(this.country,testdata.country);
        await this.util.verifyGivenStringsEqual((await this.util.getValue(this.taxid)).replace(/[^0-9.]/g, ''),testdata.taxid);
        await this.util.verifyValuePresent(this.crossref,testdata.crossref);
        await this.util.verifyTextPresent(this.pip,"Yes");
    
    }
     
}