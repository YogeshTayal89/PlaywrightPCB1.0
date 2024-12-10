import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBPlayerDetailPage {

    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    framelocator: FrameLocator;
    basictabloc: Locator; marketingtabloc: Locator; cardstabloc: Locator; commentstabloc: Locator; relationstabloc: Locator;
    playerid:Locator;

    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);
        this.basictabloc = this.framelocator.getByRole('tab', { name: 'Basic' });
        this.commentstabloc = this.framelocator.getByRole('tab', { name: 'Comments' })
        this.marketingtabloc = this.framelocator.getByRole('tab', { name: 'Marketing' })
        this.cardstabloc = this.framelocator.getByRole('tab', { name: 'Cards' })
        this.relationstabloc = this.framelocator.getByRole('tab', { name: 'Relations' })
        this.playerid = this.framelocator.locator("//span[text()='Player ID']/following-sibling::span");
    }


    async verifyPlayerIDIsPresent(testdata:any){
        await this.util.verifyElementPresent(this.playerid)
        await this.util.verifyContainsText(this.playerid, testdata.playerid)
    }
    /**
     * This method is used to verify the Basic tab is present in search result page
     */
    async verifyBasicTabIsPresent() {
        await this.util.verifyElementPresent(this.basictabloc)
    }

    /**
     * This method is used to click on the Basic tab
     */
    async clickOnBasicTab() {
        await this.util.clickElement(this.basictabloc);
    }

    /**
      * This method is used to verify the Marketing tab is present in search result page
      */
    async verifyMarketingTabIsPresent() {
        await this.util.verifyElementPresent(this.marketingtabloc)
    }

    /**
    * This method is used to click on the Marketing tab
    */
    async clickOnMarktetingTab() {
        await this.util.clickElement(this.marketingtabloc);

    }

    /**
      * This method is used to verify the Cards tab is present in search result page
      */
    async verifyCardsTabIsPresent() {
        await this.util.verifyElementPresent(this.cardstabloc)
    }


    /**
    * This method is used to click on the cards tab
    */
    async clickOnCardsTab() {
        await this.util.clickElement(this.cardstabloc);

    }

    /**
      * This method is used to verify the Comments tab is present in search result page
      */
    async verifyCommentsTabIsPresent() {
        await this.util.verifyElementPresent(this.commentstabloc)
    }

    /**
    * This method is used to click on the comments tab
    */
    async clickOnCommentsTab() {
        await this.util.clickElement(this.commentstabloc);

    }

    /**
      * This method is used to verify the Relations tab is present in search result page
      */
    async verifyRelationsTabIsPresent() {
        await this.util.verifyElementPresent(this.relationstabloc)
    }

    /**
    * This method is used to click on the relations tab
    */
    async clickOnRelationsTab() {
        await this.util.clickElement(this.relationstabloc);

    }


}