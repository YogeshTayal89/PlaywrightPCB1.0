import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBEnrollMarketingPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    
    //form Locators
    attractiontype:Locator; language:Locator;anniversary:Locator;affiliation:Locator;flyertypes:Locator;flyertype:Locator;
    flyerinputs:Locator; addfrequentflyerbtn:Locator;deletefequentflyers:Locator;selectfrequentflyers:Locator
    flyerinput:Locator; company:Locator;position:Locator;year:Locator;dateandmonth:Locator;
    
    //Button locator
    nextbtn:Locator
    cancelbtn:Locator;
    backbtn:Locator;

    //Calendar Locators
    choosemonthandyear:Locator;prevyear:Locator;
    
    //frma locator
    framelocator:FrameLocator;

    //attractin type dropodwn values
    attractiontypedropdownvalues: string[] = ["Movies","Games", "Art"];
    flyeroptions:Locator;
    flyertypeerrormsg:Locator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);

        //form Locators
        this.attractiontype=this.framelocator.locator('(//li[1]/igt-input-select)[4]');
        this.language=this.framelocator.locator('li:nth-child(3) > .formControl > .igt-input-select > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex');   
        this.anniversary=this.framelocator.getByRole('textbox', { name: 'MM/DD/YYYY' });
        this.affiliation=this.framelocator.locator('(//ul/li[6]/igt-input-select/div/mat-form-field/div/div[1]/div[3]/mat-select/div)[2]');
        this.flyertype=this.framelocator.locator('(//*[@id="contentInside0"]/div/div[1]/div/igt-input-select/div/mat-form-field)[3]');
        this.flyerinput=this.framelocator.getByLabel('5Marketing').locator('#igt_input_search');
        this.company=this.framelocator.getByPlaceholder('Enter Company')
        this.position=this.framelocator.getByPlaceholder('Enter Position')
        this.choosemonthandyear=this.framelocator.getByLabel('Choose month and year');
        this.prevyear= this.framelocator.getByLabel('Previous 24 years');
        this.year=this.framelocator.getByLabel('1997');
        this.dateandmonth=this.framelocator.getByLabel('Wed Jan 01');

        //button locator
        this.nextbtn=this.framelocator.getByRole('button', { name: 'NEXT',exact:true });
        this.cancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' }).first();
        this.backbtn=this.framelocator.getByRole('button', { name: 'BACK'});

        //flyer related locators
        this.flyeroptions=this.framelocator.locator('//mat-option/span');
        this.flyertypes=this.framelocator.locator('//div[5]/div/div[1]/div/div/ul/li/div/div[1]/div/igt-input-select/div/mat-form-field/div/div[1]/div[3]/mat-select');
        this.flyerinputs=this.framelocator.locator("//input[@data-placeholder='Enter Frequent Flyer']");
        this.addfrequentflyerbtn=this.framelocator.getByRole('button', { name: 'add FREQUENT FLYER' });
        this.deletefequentflyers=this.framelocator.locator("//div[5]/div/div[1]/div/div/ul/li/div/div[2]/igt-icon/div/span[text()=' delete ']")
        this.selectfrequentflyers=this.framelocator.locator('//input[@name="frequent_Flyer"]');
        this.flyertypeerrormsg=this.framelocator.getByText('Please select different type.');
}  

/**
 * This method is used to verify the enroll marketing page is present
 */
async verifyEnrollMarketingPageIsPresent(){
    await this.util.verifyElementPresent(this.attractiontype);
}


/**
 * This method is used to fill the marketing details
 */
async  fillMarketingEnrollmentDetails(testdata:any){

    await this.util.clickElement(this.attractiontype);
    await this.util.clickElement(await this.getDropdownValue(testdata.mattractype));

    await this.util.clickElement(this.language);
    await this.util.clickElement(await this.getDropdownValue(testdata.mlanguage));

    await this.util.clickElement(this.anniversary);
    await this.util.clickElement(this.choosemonthandyear);
    await this.util.clickElement(this.prevyear);
    await this.util.clickElement(this.year);
    await this.util.clickElement(this.dateandmonth);
    await this.util.clickElement(this.dateandmonth);

    await this.util.clickElement(this.affiliation);
    await this.util.clickElement(await this.getDropdownValue(testdata.maffiliationtype));

    await this.util.clickElement(this.flyertype);
    await this.util.clickElement(await this.getDropdownValue(testdata.mflyertype));
    
    await this.util.typeText(this.flyerinput,testdata.mflyerdetails);
    await this.util.typeText(this.company,testdata.mcompany);
    await this.util.typeText(this.position,testdata.mposition);

}

/**
 * This method is used to validate all the fields are entered properly
 * @param testdata 
 */
async verifyEnterdMarketingDetails(testdata:any){
   
    await this.util.verifyTextPresent(this.attractiontype,testdata.mattractype);
    await this.util.verifyTextPresent(this.language,testdata.mlanguage);
    await this.util.verifyContainsAnyText(this.anniversary);
    await this.util.verifyTextPresent(this.affiliation,testdata.maffiliationtype);
    await this.util.verifyTextPresent(this.flyertype,testdata.mflyertype);
    await this.util.verifyValuePresent(this.flyerinput,testdata.mflyerdetails);
    await this.util.verifyValuePresent(this.company,testdata.mcompany);
    await this.util.verifyValuePresent(this.position,testdata.mposition);

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
 * @returns locator
 */
async getDropdownValue(value:string):Promise<Locator>{

    return this.framelocator.locator("//span[text()=' "+value+" ']");

}

/**This method is used to verify the attraction type dropdown values  */
async verifyattractionTypeDropdownValues(){
    for (const element of this.attractiontypedropdownvalues) {
        await this.util.clickElement(this.attractiontype);
        await this.util.verifyElementPresent(await this.getDropdownValue(element));
        await this.util.clickElement(await this.getDropdownValue(element));
        await this.util.verifyTextPresent(this.attractiontype,element)
       
    }
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
 * This method is used to click on the cancel button
 */
async clickOnAddFrequentFlyerButton(){
    await this.util.clickElement(this.addfrequentflyerbtn);
}

/**
 * This method is used to verify the  all the phone type and verify the UI 
 * @param testdata 
 */
async addAllFlyerTypeAndVerifyUI(testdata:any){
    
    let flyervalue:string[]=[];
    let flyertypevalues:string[]=[];
    let newphonenumber:string;
    await this.util.clickElement(this.flyertype);
    const count=await this.util.getCount(this.flyeroptions);
    for (let i=0;i<count;i++) {
    const flyerinfo=testdata.mflyerdetails+i
    flyervalue.push(flyerinfo);
    if(i!=0)
    await this.util.clickElement(this.flyertypes.nth(i));
    //Getting phone options
    const addname:any=await this.util.getText(this.flyeroptions.nth(i));
    flyertypevalues.push(addname)

    await this.util.clickElement(this.flyeroptions.nth(i));
    

    await this.util.typeText(this.flyerinputs.nth(i),flyerinfo);

    if(i!=count-1)
    await this.clickOnAddFrequentFlyerButton();
    
    }//End of for loop

    //Verify all the added values are displayed

    for (let i=0;i<count;i++) {
     await this.util.verifyTextPresent(this.flyertypes.nth(i),flyertypevalues[i])
     await this.util.verifyValuePresent(this.flyerinputs.nth(i),flyervalue[i]);
     await this.util.verifyElementPresent(this.deletefequentflyers.nth(i))
     await this.util.verifyElementPresent(this.selectfrequentflyers.nth(i))
    }

    //Verify add address button should not be visible
    await this.util.verifyElementNotPresent(this.addfrequentflyerbtn)
    

    //Delete and validate add address button is visible
    await this.util.clickElement(this.deletefequentflyers.nth(1));
    await this.util.verifyElementPresent(this.addfrequentflyerbtn)

}

/**
 * This method is used to verify the error msg for already added type
 * @param testdata
 */
async verifyErrorMsgForSlectingAlreadyAddedType(testdata:any){
    await this.fillMarketingEnrollmentDetails(testdata);

    //For Phone
    await this.clickOnAddFrequentFlyerButton()
    await this.util.clickElement(this.flyertypes.nth(1));
    await this.util.clickElement(await this.getDropdownValue(testdata.mflyertype));
    await this.util.verifyElementPresent(this.flyertypeerrormsg)
}
}