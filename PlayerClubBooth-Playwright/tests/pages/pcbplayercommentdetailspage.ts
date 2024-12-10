import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBPlayerCommentDetailsPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    framelocator:FrameLocator;
    addcommentbtn:Locator;

    //Comments Locator
    addcommentheader:Locator;commentinput:Locator;cancelbtn:Locator;submitbtn:Locator; editcommentheader:Locator;
    highprioritytogglebtn:Locator;highprioritytogglelbl:Locator;
    applygloballytogglebtn:Locator;applygloballytogglelbl:Locator;
    privatetogglebtn:Locator;privatetogglelbl:Locator;
    expirydatelbl:Locator;expirydateinput:Locator;
    addgroupslbl:Locator;addgropusselectbox:Locator;
    togglebtnselectedclass:string; togglebtnnotselectedclass:string;togglebtndisabledclass:string;
    deletbutton:Locator;deleteheader:Locator;deletetext:Locator;deletecancelbtn:Locator;deleteyesbtn:Locator;
    addedprivatecommentinlist:Locator;visibilityofficon:Locator;visibilityonicon:Locator;editbutton:Locator;
    emptypriority:Locator;highpriority:Locator;nocommentsmsg:Locator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);
        this.addcommentbtn=this.framelocator.getByRole('button', { name: 'add COMMENT' })

        //Add commnt Locator
        this.addcommentheader=this.framelocator.getByRole('heading', { name: 'Add Comment' })
        this.editcommentheader=this.framelocator.getByRole('heading', { name: 'Edit Comment' })
        this.commentinput=this.framelocator.locator("//mat-form-field/div/div[1]/div[3]/textarea");
        this.cancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' });
        this.submitbtn=this.framelocator.getByRole('button', { name: 'SUBMIT' })
        this.highprioritytogglebtn=this.framelocator.locator("//li[1]/div/mat-slide-toggle")
        this.highprioritytogglelbl=this.framelocator.locator("//li[1]/div/label[text()='High Priority']")
        this.applygloballytogglebtn=this.framelocator.locator("//li[2]/div/mat-slide-toggle");
        this.applygloballytogglelbl=this.framelocator.locator("//li[2]/div/label[text()='Apply Globally']")
        this.privatetogglebtn=this.framelocator.locator("//li[3]/div/mat-slide-toggle");
        this.privatetogglelbl=this.framelocator.locator("//li[3]/div/label[text()='Private']");
        this.expirydatelbl=this.framelocator.locator("//li[1]/div/label[text()='Expiry Date']")
        this.expirydateinput=this.framelocator.getByPlaceholder('MM/DD/YYYY')
        this.addgroupslbl=this.framelocator.locator("//label[text()='Add Visible Groups']");
        this.addgropusselectbox=this.framelocator.locator("//igt-input-multi-select");
        this.togglebtnselectedclass="mat-slide-toggle ml-3 mr-3 mat-accent cdk-focused cdk-mouse-focused mat-checked";
        this.togglebtnnotselectedclass="mat-slide-toggle ml-3 mr-3 mat-accent";
        this.togglebtndisabledclass="mat-slide-toggle ml-3 mr-3 mat-accent mat-disabled"
        this.deleteheader=this.framelocator.getByRole('heading', { name: 'Delete Comment?' })
        this.deletetext=this.framelocator.getByText('Do you want to delete this comment?');
        this.visibilityofficon=this.framelocator.getByRole('button', { name: 'visibility_off' }).first();
        this.addedprivatecommentinlist=this.framelocator.locator("//td[4][text()=' Private '][1]");
        this.editbutton=this.framelocator.getByRole('button', { name: 'edit', exact: true });
        this.deletbutton=this.framelocator.getByRole('button', { name: 'delete' });
        this.emptypriority=this.framelocator.locator("//tr[1]/td[3]/span[text()=' --']");
        this.highpriority=this.framelocator.locator("//tr[1]/td[3]/span[text()=' High']")
        this.visibilityonicon=this.framelocator.getByRole('button', { name: 'visibility' }).first();
        this.nocommentsmsg=this.framelocator.locator("//h2[text()='No Comments found']");
        this.deletecancelbtn=this.framelocator.getByRole('button', { name: 'CANCEL' })
        this.deleteyesbtn=this.framelocator.getByRole('button', { name: 'YES' })
    }

    /**
     * This method is used to verify the PCB player comment details page is present
     */
    async verifyCommentDetailsPageIsPresent(){
        await this.util.verifyElementPresent(this.addcommentbtn)
        
    }

    /**
     * this method is used to click the add comment button
     */
    async clickAddcommentButton(){
        await this.util.clickElement(this.addcommentbtn);
    }

    /**
     * This mehtod is used to validate the add comment popup elements
     */
    async verifyAddcommentPopup(){

        await this.util.verifyElementPresent(this.addcommentheader)
        await this.util.verifyElementPresent(this.commentinput)
        await this.util.verifyElementPresent(this.highprioritytogglelbl);
        await this.util.verifyElementPresent(this.highprioritytogglebtn);
        await this.util.verifyElementPresent(this.applygloballytogglelbl);
        await this.util.verifyElementPresent(this.applygloballytogglebtn);
        await this.util.verifyElementPresent(this.privatetogglelbl)
        await this.util.verifyElementPresent(this.privatetogglebtn)
        await this.util.verifyElementPresent(this.expirydatelbl)
        await this.util.verifyElementPresent(this.expirydateinput)
        await this.util.verifyElementPresent(this.applygloballytogglelbl)
        await this.util.verifyElementPresent(this.applygloballytogglebtn)
        await this.util.verifyElementPresent(this.cancelbtn)
        await this.util.verifyElementPresent(this.submitbtn)

    }

     /**
     * this method is used to click the cancel button from add comment page
     */
     async verifyCancelButton(){
        await this.util.clickElement(this.cancelbtn);
        await this.util.verifyElementNotPresent(this.addcommentheader)

    }

    /**
     * This method is used to add and edit a comment by enabling private toogle button
     */
    async addAndEditCommentWithPrivate(){
        await this.util.typeText(this.commentinput,"Private")
        await this.util.verifyElementAttribute(this.privatetogglebtn,"class",this.togglebtnnotselectedclass)
        await this.util.clickElement(this.privatetogglebtn);
        await this.util.verifyElementAttribute(this.privatetogglebtn,"class",this.togglebtnselectedclass)
        await this.util.verifyElementAttribute(this.applygloballytogglebtn,"class",this.togglebtndisabledclass);
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Private' }).first());
        await this.util.verifyElementPresent(this.emptypriority)
        await this.util.verifyElementPresent(this.visibilityofficon);
        await this.util.clickElement(this.editbutton);
        await this.util.verifyElementPresent(this.editcommentheader)
        await this.util.typeText(this.commentinput,"Privateupdated");
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Privateupdated' }).first());

    }

    /**
     * This method is used to add and edit a comment by enabling private and high priority
     */
    async addAndEditCommentOfPrivateWithHighPriority(){
        await this.util.typeText(this.commentinput,"Private")
        await this.util.verifyElementAttribute(this.privatetogglebtn,"class",this.togglebtnnotselectedclass)
        await this.util.verifyElementAttribute(this.highprioritytogglebtn,"class",this.togglebtnnotselectedclass)
        await this.util.clickElement(this.privatetogglebtn);
        await this.util.verifyElementAttribute(this.privatetogglebtn,"class",this.togglebtnselectedclass)
        await this.util.clickElement(this.highprioritytogglebtn);
        await this.util.verifyElementAttribute(this.highprioritytogglebtn,"class",this.togglebtnselectedclass)
        await this.util.verifyElementAttribute(this.applygloballytogglebtn,"class",this.togglebtndisabledclass);
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Private' }).first());
        await this.util.verifyElementPresent(this.highpriority)
        await this.util.verifyElementPresent(this.visibilityofficon);
        await this.util.clickElement(this.editbutton);
        await this.util.verifyElementPresent(this.editcommentheader)
        await this.util.typeText(this.commentinput,"Privateupdated");
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Privateupdated' }).first());

    }

    /**
     * This method is used to add and edit a comment by enabling global toogle button
     */
    async addAndEditCommentWithGlobal(){
        await this.util.typeText(this.commentinput,"Global")
        await this.util.verifyElementAttribute(this.applygloballytogglebtn,"class",this.togglebtnnotselectedclass)
        await this.util.clickElement(this.applygloballytogglebtn);
        await this.util.verifyElementAttribute(this.applygloballytogglebtn,"class",this.togglebtnselectedclass)
        await this.util.verifyElementAttribute(this.privatetogglebtn,"class",this.togglebtndisabledclass);
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Global' }).first());
        await this.util.verifyElementPresent(this.emptypriority)
        await this.util.verifyElementPresent(this.visibilityonicon);
        await this.util.clickElement(this.editbutton);
        await this.util.verifyElementPresent(this.editcommentheader)
        await this.util.typeText(this.commentinput,"Globalupdated");
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Globalupdated' }).first());

    }

    /**
     * This method is used to add and edit a comment by enabling Global and high priority
     */
    async addAndEditCommentOfGlobalWithHighPriority(){
        await this.util.typeText(this.commentinput,"Global")
        await this.util.verifyElementAttribute(this.applygloballytogglebtn,"class",this.togglebtnnotselectedclass)
        await this.util.verifyElementAttribute(this.highprioritytogglebtn,"class",this.togglebtnnotselectedclass)
        await this.util.clickElement(this.applygloballytogglebtn);
        await this.util.verifyElementAttribute(this.applygloballytogglebtn,"class",this.togglebtnselectedclass)
        await this.util.clickElement(this.highprioritytogglebtn);
        await this.util.verifyElementAttribute(this.highprioritytogglebtn,"class",this.togglebtnselectedclass)
        await this.util.verifyElementAttribute(this.privatetogglebtn,"class",this.togglebtndisabledclass);
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'global' }).first());
        await this.util.verifyElementPresent(this.highpriority)
        await this.util.verifyElementPresent(this.visibilityonicon);
        await this.util.clickElement(this.editbutton);
        await this.util.verifyElementPresent(this.editcommentheader)
        await this.util.typeText(this.commentinput,"Globalupdated");
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Globalupdated' }).first());

    }

 /**
     * This method is used to add and edit a comment without enabling any toggles button
     */
    async addAndEditCommentWithDefault(){
        await this.util.typeText(this.commentinput,"Default")
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Default' }).first());
        await this.util.verifyElementPresent(this.emptypriority)
        await this.util.verifyElementNotPresent(this.visibilityonicon);
        await this.util.verifyElementNotPresent(this.visibilityofficon);
        await this.util.clickElement(this.editbutton);
        await this.util.verifyElementPresent(this.editcommentheader)
        await this.util.typeText(this.commentinput,"Defaultupdated");
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Defaultupdated' }).first());

    }

    /**
     * This method is used to add and edit a comment  with high priority and not  enabling any toggles button
     */
    async addAndEditCommentOfDefaultWithHighPriority(){
        await this.util.clickElement(this.highprioritytogglebtn);
        await this.util.verifyElementAttribute(this.highprioritytogglebtn,"class",this.togglebtnselectedclass)
        await this.util.typeText(this.commentinput,"Default")
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Default' }).first());
        await this.util.verifyElementPresent(this.highpriority)
        await this.util.verifyElementNotPresent(this.visibilityonicon);
        await this.util.verifyElementNotPresent(this.visibilityofficon);
        await this.util.clickElement(this.editbutton);
        await this.util.verifyElementPresent(this.editcommentheader)
        await this.util.typeText(this.commentinput,"Defaultupdated");
        await this.util.clickElement(this.submitbtn)
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: 'Defaultupdated' }).first());

    }

    /**
     * This method is used to delete a comment
     */
    async deleteAComment(){
        await this.util.clickElement(this.deletbutton);
        await this.util.verifyElementPresent(this.deleteheader)
        await this.util.verifyElementPresent(this.deletetext)
        await this.util.clickElement(this.deletecancelbtn);
        await this.util.verifyElementNotPresent(this.deleteheader)
        await this.util.clickElement(this.deletbutton);
        await this.util.verifyElementPresent(this.deleteheader)
        await this.util.clickElement(this.deleteyesbtn);
        await this.verifyNoComments();
    }

    /**
     * This method is used to verify no comments text
     */
    async verifyNoComments(){
        await this.util.verifyElementPresent(this.nocommentsmsg);
    }

}