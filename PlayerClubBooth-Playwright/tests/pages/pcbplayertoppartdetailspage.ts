import { FrameLocator, Locator, Page } from "@playwright/test";
import PlaywrightUtil from "../../utils/playwright-utils";


export default class PCBPlayerTopPartDetailsPage {
    
    //library objects declaration
    page: Page;
    util: PlaywrightUtil;
    framelocator:FrameLocator;
    
    //Form Locators
    statuslbl:Locator; statustxt:Locator;
    playername:Locator;enrolledid:Locator;playerid:Locator;


    constructor(page: Page) {
        this.page = page;
        this.util = new PlaywrightUtil();
        const frameid = "#iframe-PatronManagement";
        this.framelocator = this.page.frameLocator(`${frameid}`);

        //Form Locators
        this.statuslbl=this.framelocator.locator("//ul/li[1]/span[text()='Status']")
        this.statustxt=this.framelocator.locator("//ul/li[1]/span[2]/span").first()
        this.playername=this.framelocator.locator("//div[2]/div[1]/h3")
        this.enrolledid=this.framelocator.locator("//div[2]/div[1]/ul/li[3]/span[2]");
        this.playerid=this.framelocator.locator("//div[2]/div[1]/ul/li[5]/span[2]");
    }

    /**
     * This method is used to verify the PCB top part detail page is present
     */
     async verifyTopPartDetailsPageIsPresent(){
        await this.util.verifyElementPresent(this.statuslbl);
        await this.util.verifyElementPresent(this.statustxt);
      
    }

    /**
     * This method is used to get the player name
     * @returns playername
     */
    async getName():Promise<string[]>{

        let name:any;
        let playername:string[]=[];
        name=await this.util.getText(this.playername);
        playername=name.split(" ");
        return playername;

    }
    
    /**
     * This method is used to compare the actual name with expected
     * @param nameactual 
     * @param nameexpected 
     */

    async verifyPlayerName(nameactual:string,nameexpected:string)
    {
        await this.util.verifyGivenStringsEqual(nameactual,nameexpected);
    }


    /**
     * This method is used to verify the enrolled id
     */
    async verifyEnrolledID(enrolledid:string){

        let id:any= (await this.util.getText(this.enrolledid))?.toString().split(" ");
        await this.util.verifyGivenStringsEqual(id[0]+" "+id[1],"DL "+enrolledid);

    }

    /**
     * This method is used to verify the Playerid and status
     * @param playerid 
     */
    async verifyPlayerIDAndStatus(playerid:string){

        await this.util.verifyElementPresent(this.statuslbl);
        await this.util.verifyElementPresent(this.statustxt);
        let playeridtext:any=(await this.util.getText(this.playerid))?.toString().trim();
        if(playerid){
            await this.util.verifyGivenStringsEqual(playeridtext,playerid)
        }
        else{
            await this.util.verifyGivenStringsEqual(playeridtext,Number(playeridtext).toString());

        }

    }
  
}