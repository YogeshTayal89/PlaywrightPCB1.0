import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBPlayerMarketingDetailsPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    framelocator:FrameLocator;

    //Form Locators
    promotiontab:Locator; couponstab:Locator; redeembtn:Locator;

    //Redeem Locators
    redeempopupheading:Locator;redeempopupcouponinput:Locator;redeempopupredeembtn:Locator; redeempopupcancelbtn:Locator;
    redeempopupmanderrmsg:Locator; 
    redeemsuccessmsg:Locator;redeemsuccessokbtn:Locator;
    redeemmsgtitle:Locator;redeemmsg:Locator;redeemmsgokbtn:Locator;
    redeemerrmsgtxt:string; redeemsuccessmesgtxt:string;
    couponlist:Locator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);
        //Form Locators
        this.promotiontab=this.framelocator.getByRole('button', { name: 'Promotion' });
        this.couponstab=this.framelocator.getByRole('button', { name: 'coupons' });
        this.redeembtn=this.framelocator.getByRole('button', { name: 'redeem REDEEM' });
        this.couponlist=this.framelocator.locator("(//*[@role='rowgroup'])[5]//tr");

        //Coupon rdeem locators
        this.redeempopupheading=this.framelocator.getByRole('heading', { name: 'Redeem Coupon' });
        this.redeempopupcouponinput=this.framelocator.getByPlaceholder('Enter Coupon Id.');
        this.redeempopupredeembtn=this.framelocator.getByRole('button', { name: 'REDEEM' });
        this.redeempopupcancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' });
        this.redeempopupmanderrmsg=this.framelocator.getByText('Please enter a valid coupon ID');
        this.redeemsuccessmsg=this.framelocator.getByText('Redeemed successfully.');
        this.redeemmsgtitle=this.framelocator.locator("//mat-dialog-container/div/h2[text()='Redeem Coupon']")
        this.redeemmsg=this.framelocator.locator("//mat-dialog-content/div/div/p");
        this.redeemsuccessokbtn=this.framelocator.getByRole('button', { name: 'OK' });
        this.redeemmsgokbtn=this.framelocator.getByRole('button', { name: 'OK' });
        this.redeemerrmsgtxt="Coupon ID: [cid] does not exist. Please make sure that the presented coupon is valid.";
        this.redeemsuccessmesgtxt="Coupon ID: [cid] Redeemed successfully."

    }

    /**
     * This method is used to verify the PCB player marketing details Page is present 
     */

    async verifyMarketingDetailsPageIsPresent(){

        await this.util.verifyElementPresent(this.promotiontab);
        await this.util.verifyElementPresent(this.couponstab);
      
    }

    /**
     * This method is used to verify Promotion tab is present
     */
    async verifyPromotionTabisPresent(){
        await this.util.verifyElementPresent(this.promotiontab);
    }

    /**
     * This method is used to verify coupon tab is present
     */
    async verifyCouponTabisPresent(){
        await this.util.verifyElementPresent(this.couponstab);
    }

    /**
     * This method is used to verify whetehr redeem button is enable
     */
    async verifyRedeemBtnEnable(){
         await this.util.verifyEnabled(this.redeembtn)
    }

    /**
     * This method is used to redeem a coupon which one is issued
     */

    async redeemCouponFromCouponsList():Promise<string[]>{
        let count:number= await this.util.getCount(this.couponlist);
        let couponid:string="";
        let couponname:any="";
        for(let i=0;i<count;i++)
        {
            if ((await this.util.getText(this.couponlist.nth(i).locator("//td[3]")))?.includes("Issued")){

                couponname=await this.util.getText(this.couponlist.nth(i).locator("//td[1]"))

                await this.util.clickElement(this.couponlist.nth(i).locator("//td[6]/button/span[1]/span"))

                await this.util.verifyElementPresent(this.redeempopupheading)

                couponid = await this.util.getValue(this.redeempopupcouponinput);

                await this.util.clickElement(this.redeempopupredeembtn);
                
                break;

            }
        }
        return [couponid,couponname];
    }

    /**
     * This method is used to redeem a coupon which one is issued
     */

    async getIssuedCouponNameAndID():Promise<string[]>{
        let count:number= await this.util.getCount(this.couponlist);
        let couponname:any="";
        let couponid:string="";
        for(let i=0;i<count;i++)
        {
            if ((await this.util.getText(this.couponlist.nth(i).locator("//td[3]")))?.includes("Issued")){

                couponname=await this.util.getText(this.couponlist.nth(i).locator("//td[1]"))
              

                await this.util.clickElement(this.couponlist.nth(i).locator("//td[6]/button/span[1]/span"))

                await this.util.verifyElementPresent(this.redeempopupheading)

                couponid = await this.util.getValue(this.redeempopupcouponinput);

                await this.util.clickElement(this.redeempopupcancelbtn);

                await this.util.verifyElementNotPresent(this.redeempopupheading);

                break;

            }
        }
        return [couponid,couponname];
    }

    /**
     * 
     * @param couponid Thsi method is used to redeem the coupon
     */
    async redeemCoupon(couponid:string){
        await this.util.clickElement(this.redeembtn)
        await this.util.verifyElementPresent(this.redeempopupheading);
        await this.util.typeText(this.redeempopupcouponinput,couponid);
        await this.util.clickElement(this.redeempopupredeembtn);
    }

    /**
     * This method is used to verify the redeem message of coupon
     * @param typeofmessgae 
     * @param couponid 
     */

    async verifyRedeemMessageOfCoupon(typeofmessgae:string,couponid:string){
        let message:string="";
        await this.util.verifyElementPresent(this.redeemmsgtitle);

        if(typeofmessgae=='error')
            {
                message=this.redeemerrmsgtxt.replace("[cid]",couponid)
                console.log(message)
            }
        else  if(typeofmessgae=='success')
            {
                message=this.redeemsuccessmesgtxt.replace("[cid]",couponid)
                console.log(message)
            }
        await this.util.verifyTextPresent(this.redeemmsg,message);

        await this.util.clickElement(this.redeemmsgokbtn)

        await this.util.verifyElementNotPresent(this.redeemmsgtitle)


    }

    /**
     * This method is used to verify the status from the group list
     */
    async verifyGivenStatusInGroupList(couponname:string,expectedstatus:string){
            await this.util.waitForPagetoLoad(this.page,5000);
            let status:any=await this.util.getText(this.couponlist.locator("//td[text()='"+couponname+"']//following-sibling::td[2]"))
            await this.util.verifyGivenTextContainsAnotherText(status,expectedstatus)

    }
    
    /**
     * This method is used to verify the mandatory validation of coupon input text
     */
    async verifyMandatoryFieldOfCouponInput(){
        await this.util.clickElement(this.redeembtn)
        await this.util.verifyElementPresent(this.redeempopupheading);
        await this.util.clickElement(this.redeempopupredeembtn);
        await this.util.verifyElementPresent(this.redeempopupmanderrmsg);
    }
}