import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";
import PCBPlayerDetailPage from "./pcbplayerdetailpage";

export default class PCBSearchPage {

    //library objects declaration
    page: Page;
    util: PlaywrightUtil;

    //Form Locators
    searchinput: Locator; searchbtn: Locator; enrollbtn: Locator; searchicon: Locator;
    noresult: Locator; playerid: Locator; searchcancelicon: Locator
    searchmultymatch: Locator;
    errormsglessthan3chars: Locator;
    errormsgmorethan50chars: Locator;
    linkbtn:Locator;backbtn:Locator;

    framelocator: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);

        //form Locators
        this.searchinput = this.framelocator.locator("//*[@id='igt_input_search']");
        this.searchbtn = this.framelocator.locator("//*[@id='btnSearch']/span/button");
        this.enrollbtn = this.framelocator.locator("//*[@id='btnEnroll']/span/button");
        this.searchicon = this.framelocator.locator("//*[@id='search-icon']/div/mat-icon");
        this.noresult = this.framelocator.locator("//*[@id='no-result-found-title']");
        this.playerid = this.framelocator.locator("//span[text()='Player ID']/following-sibling::span");
        this.searchcancelicon = this.framelocator.locator("//*[@id='cancel-icon']/div/mat-icon");
        this.searchmultymatch = this.framelocator.locator("//table/tbody/tr[1]");
        this.errormsglessthan3chars = this.framelocator.getByText("Please enter a minimum of 3 characters to search player");
        this.errormsgmorethan50chars = this.framelocator.getByText("Please enter less than 50 characters to search player");
        this.linkbtn=this.framelocator.locator('td').filter({ hasText: 'link_on' }).first();
        this.backbtn=this.framelocator.locator('#btnEnroll');
    }

    /**
     * This method is used to verify the enroll search page is present
     */

    async verifySearchPageIsPresent() {
        await this.util.verifyElementPresent(this.searchinput);
    }


    /**
     * This method is usd to verify enroll button is present or not
     */

    async verifyEnrollButtonInSearchPage() {
        await this.util.verifyElementPresent(this.enrollbtn);
    }

    /**
     * This method is used to perform the search operation for the given text
     * @param searchtext 
     */
    async doSearch(searchtext: any) {

        await this.util.typeText(this.searchinput, searchtext);
        this.clickOnSearchBtn();

    }

    /**
     * This method is used to type the text in search field
     * @param searchtext 
     */

    async typeInSearchField(searchtext: any) {
        await this.util.clickElement(this.searchinput);
        await this.util.typeTextLikeFromKeyboard(this.searchinput, searchtext);
        this.searchinput.dispatchEvent("keyboardevent");
    }

    /**
     * This method is used to click the search button
     */
    async clickOnSearchBtn() {
        await this.util.clickElement(this.searchbtn);
    }

    /**
     * This method is used to click the enroll button
     */
    async clickEnrollBtn() {
        await this.util.clickElement(this.enrollbtn);
    }

    /**
     * This method is used to verify search result is present
     * 
     */
    async verifySearchResultIsPresent(testdata: any) {

        const playerdetailpage=new PCBPlayerDetailPage(this.page);

        if (await this.util.isElementPresent(this.searchmultymatch.locator("//td[text()='" + testdata.playerid + "']"))) {
            await this.util.clickElement(this.searchmultymatch.locator("/td[text()=" + testdata.playerid + "]"))
        }
        playerdetailpage.verifyPlayerIDIsPresent(testdata);
    }

    /**
     * This method is used to verify search instruction text
     * 
     */
    async verifySearchInstructionText() {
        await this.util.verifyElementPresent(this.searchinput);
        await this.util.verifyElementAttribute(this.searchinput, "data-placeholder", "Type or Scan ID & press enter to search")
    }

    /**
     * This method is used to verify the cancel icon
     */
    async verifySearchCancelIcon(searchtext: any) {
        await this.util.verifyValuePresent(this.searchinput, searchtext);
        await this.util.verifyElementPresent(this.searchcancelicon)
        await this.util.clickElement(this.searchcancelicon)
        await this.util.verifyValuePresent(this.searchinput, "");

    }

    /**
     * This method is used to verify the error message for less than 3 chars
     */
    async verifyErrorMessageforLessThan3chars() {
        await this.util.verifyElementPresent(this.errormsglessthan3chars)
    }

    /**
     * This method is used to verify the error message for more than 50 chars
     */
    async verifyErrorMessageforGreaterThan50chars() {
        await this.util.verifyElementPresent(this.errormsgmorethan50chars)
    }

    /**
     * This method is used to verify no search result found error message
     */
    async verifyNoResultFoundMessage(){
        await this.util.verifyTextPresent(this.noresult,"No results found")
    }

    /**
     * This method is used to verify the searhc result present from Relations tab
     */

    async verifySearchResultFromRelationsTab(playerid:string){
        await this.util.verifyElementPresent(this.framelocator.getByRole('cell', { name: playerid }))
    }
    /**
     * This method is used to click the  link button of first row result
     */

    async clickLinkButton(){
        await this.util.clickElement(this.linkbtn);
    }

    async clickBackButton(){
        await this.util.clickElement(this.backbtn);
    }

}

