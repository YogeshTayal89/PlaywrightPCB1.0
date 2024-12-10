import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBPlayerBasicDetailsPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    framelocator:FrameLocator;
    //Form Locators
    playerinfoheadingloc:Locator; balancesheadingloc:Locator; preferredname:Locator;phonenumber:Locator;
    emailid:Locator;address:Locator;
    //Reward loctors
    rewardsarrow:Locator;rewardtotalpointinbasictab:Locator;rewardsheading:Locator;rewardsclosebtn:Locator;rewardstype:Locator;rewardrescomment:Locator;rewardsissuebtn:Locator;
    rewardtotalpoint:Locator;rewardtotaldollarinpopup:Locator;rewarddeduction:Locator;

    //Cashback locators
    cashbackarrow:Locator;cashbacktotaldollarinbasictab:Locator;cashbackheading:Locator;cashbackclosebtn:Locator;cashbacktype:Locator;cashbackrescomment:Locator;cashbackissuebtn:Locator;
    cashbacktotalpoint:Locator;cashbacktotaldollarinpopup:Locator;cashbackdeduction:Locator;

    //Primary comp Locators
    primarycomparrow:Locator;primarycompheading:Locator;primarycompclosebtn:Locator;primarycomptotaldollarinbasictab:Locator;primarycomptype:Locator;
    primarycomptotaldollarinpopup:Locator;primarycompdeduction:Locator;primarycomprescomment:Locator;primarycompissuebtn:Locator;

    //Authorize window locators
    authorizeheader:Locator;authorizeusername:Locator;authorizepassword:Locator;authorizeokbtn:Locator;authorizecancelbtn:Locator;

    //successmessage locators
    successmsg:Locator; successokbtn:Locator

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);

        //Form Locators
        this.playerinfoheadingloc=this.framelocator.getByRole('heading', { name: 'Player Info' })
        this.balancesheadingloc=this.framelocator.getByRole('heading',{name:'Balances'})
        this.preferredname=this.framelocator.locator("//li[text()='Preferred Name']/following-sibling::li[1]")
        this.phonenumber=this.framelocator.locator("//li[text()='Phone']/following-sibling::li[1]");
        this.emailid=this.framelocator.locator("//li[text()='Email']/following-sibling::li[1]");
        this.address=this.framelocator.locator("//li[text()='Address']/following-sibling::li[1]");
        //Rewards
        this.rewardtotalpointinbasictab=this.framelocator.locator('//div[2]/igt-card/div/mat-card/mat-card-content/div/ul/li[1]/span[2]/span');
        this.rewardsarrow=this.framelocator.locator("//li[1]/span[2]/span/div[text()=' arrow_right ']");
        this.rewardsheading=this.framelocator.getByRole('heading', { name: 'Rewards balance' });
        this.rewardstype=this.framelocator.locator("//li[2]/label[text()='Type']/following-sibling::igt-input-select");
        this.rewardtotalpoint=this.framelocator.locator('(//*[@id="igt_input_"])[1]')
        this.rewardtotaldollarinpopup=this.framelocator.locator('(//*[@id="igt_input_"])[2]')
        this.rewarddeduction=this.framelocator.locator('(//*[@id="igt_input_"])[6]')
        this.rewardrescomment=this.framelocator.getByPlaceholder('Enter restricted comment');
        this.rewardsissuebtn=this.framelocator.getByRole('button', { name: 'Issue' });
        this.rewardsclosebtn=this.framelocator.getByRole('button', { name: 'Close' })

        //Cashback
        this.cashbacktotaldollarinbasictab=this.framelocator.locator('//div[2]/igt-card/div/mat-card/mat-card-content/div/ul/li[2]/span[2]/span');
        this.cashbackarrow=this.framelocator.locator("//li[2]/span[2]/span/div[text()=' arrow_right ']")
        this.cashbackheading=this.framelocator.getByRole('heading', { name: 'Point' });
        this.cashbacktype=this.framelocator.locator("//li[2]/label[text()='Type']/following-sibling::igt-input-select");
        this.cashbacktotalpoint=this.framelocator.locator('(//*[@id="igt_input_"])[1]')
        this.cashbacktotaldollarinpopup=this.framelocator.locator('(//*[@id="igt_input_"])[2]')
        this.cashbackdeduction=this.framelocator.locator('(//*[@id="igt_input_"])[6]')
        this.cashbackrescomment=this.framelocator.getByPlaceholder('Enter restricted comment');
        this.cashbackissuebtn=this.framelocator.getByRole('button', { name: 'Issue' });
        this.cashbackclosebtn=this.framelocator.getByRole('button', { name: 'Close' })

        //Primary Comp locators
        this.primarycomptotaldollarinbasictab=this.framelocator.locator('//div[2]/igt-card/div/mat-card/mat-card-content/div/ul/li[3]/span[2]/span');
        this.primarycomparrow=this.framelocator.locator("//li[3]/span[2]/span/div[text()=' arrow_right ']");
        this.primarycompheading=this.framelocator.getByRole('heading', { name: 'Primary Comp' })
        this.primarycomptype=this.framelocator.locator("//li[2]/label[text()='Type']/following-sibling::igt-input-select")
        this.primarycomptotaldollarinpopup=this.framelocator.locator('(//*[@id="igt_input_"])[1]');
        this.primarycompdeduction=this.framelocator.locator('(//*[@id="igt_input_"])[5]')
        this.primarycomprescomment=this.framelocator.getByPlaceholder('Enter restricted comment');
        this.primarycompissuebtn=this.framelocator.getByRole('button', { name: 'Issue' });
        this.primarycompclosebtn=this.framelocator.getByRole('button', { name: 'Close' })
       
        //Authorize window
        this.authorizeheader=this.framelocator.getByRole('heading', { name: 'Authorize Comp' });
        this.authorizeusername=this.framelocator.getByRole('textbox', { name: 'Enter user name' });
        this.authorizepassword=this.framelocator.getByRole('textbox', { name: 'Enter password' });
        this.authorizeokbtn=this.framelocator.getByRole('button', { name: 'OK' });
        this.authorizecancelbtn=this.framelocator.getByLabel('Authorize Comp').getByRole('button', { name: 'Cancel' })

        //successmessage
        this.successmsg=this.framelocator.locator("//p[text()=' Comp issued successfully ']")
        this.successokbtn=this.framelocator.locator('mat-dialog-actions').filter({ hasText: 'OK' }).locator('div');
       
      
       
    }


    /**
     * This method is used to verify the PCB enrolment basic Page is present 
     */

     async verifyBasicDetailsPageIsPresent(){
      await this.util.verifyElementPresent(this.playerinfoheadingloc);
      await this.util.verifyElementPresent(this.balancesheadingloc);
    }

    /**
     * This method is used to verify player info text is present
     */
    async verifyPlayerInfoText(){
        await this.util.verifyElementPresent(this.playerinfoheadingloc);
    }

    /**
     * This method is used to verify balances test is present
     */
    async verifyBalancesText(){
        await this.util.verifyElementPresent(this.playerinfoheadingloc);
    }


    /**
     * This method is used to verify the preferred name
     */
    async verifyPreferredName(testdata:any){
        await this.util.verifyTextPresent(this.preferredname,testdata.preferredname)
    }

    /**
     * This method is used to verify the phone number
     */
    async verifyPhoneNumber(testdata:any){
        const phonenumberfromloc:any=await this.util.getText(this.phonenumber);
        await this.util.verifyGivenStringsEqual(phonenumberfromloc.replace(/[^0-9.]/g, ''),testdata.phonenumber);
    }

    /**
     * This method is used to verify the email id
     */
    async verifyEmailID(testdata:any){
        await this.util.verifyTextPresent(this.emailid,"Primary Email  : "+testdata.email)
    }

     /**
     * This method is used to verify the address
     */
     async verifyAddress(testdata:any){
        await this.util.verifyContainsText(this.address,"Home  : "+testdata.addressline+", "+testdata.addressline+", "+testdata.addresscity+", "+(testdata.addresszipcode).toString().replace(/[^\w]/g, ''))
    }

    /**
     * This method is used to click the rewards 
     */

     async clickRewards(){
        await this.util.clickElement(this.rewardsarrow);
    }
    /**
     * This method is used to verify Reward popup
     */
    async verifyRewardPopupIsPresent(){
        await this.util.verifyElementPresent(this.rewardsheading);
    }

    /**
     * This method is used to close the Rewards popup
     */
    async closeRewardsPopup(){
        await this.util.clickElement(this.rewardsclosebtn);
    }

     /**
     * This method is used to click the Cashback
     */

     async clickCashBack(){
        await this.util.clickElement(this.cashbackarrow);
    }

    /**
     * This method is used to verify cashback popup
     */
    async verifyCashbackPopupIsPresent(){
        await this.util.verifyElementPresent(this.cashbackheading);
    }

    /**
     * This method is used to close the Rewards popup
     */
    async closeCashbackPopup(){
        await this.util.clickElement(this.cashbackclosebtn);
    }

    /**
     * This method is used to click the Primary comp 
     */

    async clickPrimaryComp(){
        await this.util.clickElement(this.primarycomparrow);
    }

     /**
     * This method is used to verify primary comp popup
     */
     async verifyPrimaryCompPopupIsPresent(){
        await this.util.verifyElementPresent(this.primarycompheading);
    }

    /**
     * This method is used to close the PrimaryComp popup
     */
    async closePrimaryCompPopup(){
        await this.util.clickElement(this.primarycompclosebtn);
    }
    
    /**
     * This method is used to issue rewards and will return remaining balance
     */
    async issueRewards(testdata:any,username:string,password:string):Promise<number[]>{
        await this.util.verifyElementPresent(this.rewardstype.locator("//descendant::span[text()='"+testdata.rewardtype+"']"))
        await this.util.clickElement(this.framelocator.getByRole('cell', { name: testdata.rewardcompname }))
        await this.util.waitForPagetoLoad(this.page,3000);
        let totalpoint:number=Number((await this.util.getValue(this.rewardtotalpoint)).toString().replace(/[^0-9.]/g, ''))
        let totaldollar:number=Number((await this.util.getValue(this.rewardtotaldollarinpopup)).toString().replace(/[^0-9.]/g, ''))
        let deductedpoint:number=Number((await this.util.getValue(this.rewarddeduction)).toString().replace(/[^0-9.]/g, ''))
        let pointtodollar:number=totalpoint/totaldollar;
        console.log("reward deduction "+await this.util.getText(this.rewarddeduction))

        console.log("Rw "+(await this.util.getValue(this.rewarddeduction)).toString().replace(/[^0-9.]/g, ''))


        await this.util.typeText(this.rewardrescomment,testdata.restrictedcommenttext)
        await this.util.clickElement(this.rewardsissuebtn)
        if(await this.util.isElementPresent(this.authorizeheader))
            {
                await this.util.typeText(this.authorizeusername,username);
                await this.util.typeText(this.authorizepassword,password)
                await this.util.clickElement(this.authorizeokbtn)
            }
        
            await this.util.verifyElementPresent(this.successmsg)
            await this.util.clickElement(this.successokbtn);
            let remainingpoint:number=totalpoint-deductedpoint;
            let remainingdollar:number=remainingpoint/pointtodollar;
            return [remainingpoint,remainingdollar]
            
    }

    /** 
     * This method is used to verify the rewards in basictab and reward popup
     */

    async verifyReward(remainingpoint:any,remainingdollar:any){
        await this.util.verifyElementPresent(this.rewardtotalpointinbasictab);
        let rewardpointinbasictab:any =(await this.util.getText(this.rewardtotalpointinbasictab))?.toString().replace(/[^0-9.]/g, '');
        await this.util.verifyGivenStringsEqual(rewardpointinbasictab,String(remainingpoint));
        await this.clickRewards();
        await this.verifyRewardPopupIsPresent();
        let rewardpointinpopup:any=(await this.util.getValue(this.rewardtotalpoint))?.toString().replace(/[^\w]/g, '')
        await this.util.verifyGivenStringsEqual(rewardpointinpopup,String(remainingpoint));
        let rewardamountinpopup:any=(await this.util.getValue(this.rewardtotaldollarinpopup))?.toString().replace(/[^0-9.]/g, '')
        await this.util.verifyGivenStringsEqual(rewardamountinpopup,String(remainingdollar.toFixed(2)));

    }


    /**
     * This method is used to issue cashback and will return remaining balance
     */
    async issueCashback(testdata:any,username:string,password:string):Promise<number[]>{
        await this.util.verifyElementPresent(this.cashbacktype.locator("//descendant::span[text()='"+testdata.cashbacktype+"']"))
        await this.util.clickElement(this.framelocator.getByRole('cell', { name: testdata.cashbackcompname }))
        await this.util.waitForPagetoLoad(this.page,3000);
        let totalpoint:number=Number((await this.util.getValue(this.cashbacktotalpoint)).toString().replace(/[^0-9.]/g, ''))
        let totaldollar:number=Number((await this.util.getValue(this.cashbacktotaldollarinpopup)).toString().replace(/[^0-9.]/g, ''))
        let deductedpoint:number=Number((await this.util.getValue(this.cashbackdeduction)).toString().replace(/[^0-9.]/g, ''))

        let pointtodollar:number=totalpoint/totaldollar;

        console.log(totalpoint +"->"+totaldollar+"->"+deductedpoint+"->"+pointtodollar)

        await this.util.typeText(this.cashbackrescomment,testdata.restrictedcommenttext)
        await this.util.clickElement(this.cashbackissuebtn)
        if(await this.util.isElementPresent(this.authorizeheader))
            {
                await this.util.typeText(this.authorizeusername,username);
                await this.util.typeText(this.authorizepassword,password)
                await this.util.clickElement(this.authorizeokbtn)
            }
        
            await this.util.verifyElementPresent(this.successmsg)
            await this.util.clickElement(this.successokbtn);
            let remainingpoint:number=totalpoint-deductedpoint;
            let remainingdollar:number=remainingpoint/pointtodollar;
            return [remainingpoint,remainingdollar]
    }
    
    /** 
     * This method is used to verify the cashback in basictab and  popup
     */

    async verifyCashback(remainingpoint:any,remainingdollar:any){


        await this.util.verifyElementPresent(this.cashbacktotaldollarinbasictab);
        let cashbackdollarinbasictab:any =(await this.util.getText(this.cashbacktotaldollarinbasictab))?.toString().replace(/[^0-9.]/g, '');
        await this.util.verifyGivenStringsEqual(cashbackdollarinbasictab,String(remainingdollar.toFixed(2)));
        await this.clickCashBack();
        await this.verifyCashbackPopupIsPresent();
        let cashbackpointinpopup:any=(await this.util.getValue(this.cashbacktotalpoint))?.toString().replace(/[^0-9.]/g, '')
        await this.util.verifyGivenStringsEqual(cashbackpointinpopup,String(remainingpoint));
        let cashbackamountinpopup:any=(await this.util.getValue(this.cashbacktotaldollarinpopup))?.toString().replace(/[^0-9.]/g, '')
        await this.util.verifyGivenStringsEqual(cashbackamountinpopup,String(remainingdollar.toFixed(2)));

    }


    /**
     * This method is used to issue primarycomp and will return remaining balance
     */
    async issuePrimarycomp(testdata:any,username:string,password:string):Promise<number[]>{
        await this.util.verifyElementPresent(this.primarycomptype.locator("//descendant::span[text()='"+testdata.primarycomptype+"']"))
        await this.util.clickElement(this.framelocator.getByRole('cell', { name: testdata.primarycompname }))
        await this.util.waitForPagetoLoad(this.page,3000);
        let totaldollar:number=Number((await this.util.getValue(this.primarycomptotaldollarinpopup)).toString().replace(/[^0-9.]/g, ''))
        let deducteddollar:number=Number((await this.util.getValue(this.primarycompdeduction)).toString().replace(/[^0-9.]/g, ''))

        
        await this.util.typeText(this.cashbackrescomment,testdata.restrictedcommenttext)
        await this.util.clickElement(this.cashbackissuebtn)
        if(await this.util.isElementPresent(this.authorizeheader))
            {
                await this.util.typeText(this.authorizeusername,username);
                await this.util.typeText(this.authorizepassword,password)
                await this.util.clickElement(this.authorizeokbtn)
            }
        
            await this.util.verifyElementPresent(this.successmsg)
            await this.util.clickElement(this.successokbtn);
            let remainingdollar:number=totaldollar-deducteddollar;
            return [remainingdollar]
    }
    
    /** 
     * This method is used to verify the primarycomp in basictab and  popup
     */

    async verifyPrimarycomp(remainingdollar:any){
        await this.util.verifyElementPresent(this.primarycomptotaldollarinbasictab);
        let primarycompdollarinbasictab:any =(await this.util.getText(this.primarycomptotaldollarinbasictab))?.toString().replace(/[^0-9.]/g, '');
        await this.util.verifyGivenStringsEqual(primarycompdollarinbasictab,String(remainingdollar.toFixed(2)));
        await this.clickPrimaryComp();
        await this.verifyPrimaryCompPopupIsPresent();
        let primarycompinpopup:any=(await this.util.getValue(this.primarycomptotaldollarinpopup))?.toString().replace(/[^0-9.]/g, '')
        await this.util.verifyGivenStringsEqual(primarycompinpopup,String(remainingdollar.toFixed(2)));

    }
}