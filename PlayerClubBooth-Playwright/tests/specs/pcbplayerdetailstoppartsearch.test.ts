import { test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBSearchPage from "../pages/pcbsearchpage";
import PCBPlayerTopPartDetailsPage from "../pages/pcbplayertoppartdetailspage";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let toppartsdata:any;



test.describe('PCB Player Detail Top Part Suite', () => {
    test.beforeAll(async () => {
        //reading credentials test data from ${environment}.json file
        username = testdata.credentials.testdata[0].username;
        password = testdata.credentials.testdata[0].password;
        
        //reading topparts test data
        toppartsdata = testdata.topparts.testdata[0];

    });
    
test.beforeEach(async ({ page }) => {
    await test.step("Given I am on the login screen", async () => {
        const loginpage = new Loginpage(page);
        await loginpage.doNavigateToPortal("/")
        });
        await test.step(`Then I can login to the application using '${username}' and '${password}'`, async () => {
            const loginpage = new Loginpage(page);
            await loginpage.doLogin(username, password);
        });

        await test.step('Then I should see dashboard screen', async () => {
            const dashboardpage = new DashboardPage(page);
            await dashboardpage.isDashboardPresent();
        });

        await test.step(`When I click on PCB application`, async () => {
            const dashboardpage = new DashboardPage(page);
            await dashboardpage.clickOnPCBApp();
        });
        await test.step('Then I should see PCB Home Page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.verifyPCBHomePage();
        });
        await test.step('Then I can click on PCB Search', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.clickOnSearch();
        });
        await test.step('When I can do the search using any matching text', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(toppartsdata.playerid);
            await pcbsearchpage.verifySearchResultIsPresent(toppartsdata);
        });
    });

    
    test('Scenario Outline: As a user , I can see player firstname in top part of the page @TopPart @Regression', async ({ page }) => {

        await test.step('Then I can navigate to players top part page', async () => {
            const pcbplayertopprtpage = new PCBPlayerTopPartDetailsPage(page);
            await pcbplayertopprtpage.verifyTopPartDetailsPageIsPresent();
        });
        await test.step('Then I can see players firstname in top part page', async () => {
            const pcbplayertopprtpage = new PCBPlayerTopPartDetailsPage(page);
            const playername=await pcbplayertopprtpage.getName();
            await pcbplayertopprtpage.verifyPlayerName(playername[1],toppartsdata.firstname)
    
        });
    
    });
        
    test('Scenario Outline: As a user , I can see player middlename in top part of the page @TopPart @Regression', async ({ page }) => {
        await test.step('Then I can navigate to players top part page', async () => {
            const pcbplayertopprtpage = new PCBPlayerTopPartDetailsPage(page);
            await pcbplayertopprtpage.verifyTopPartDetailsPageIsPresent()
        });
        await test.step('Then I can see players middlename in top part page', async () =>{
            const pcbplayertopprtpage = new PCBPlayerTopPartDetailsPage(page);
            const playername=await pcbplayertopprtpage.getName();
            await pcbplayertopprtpage.verifyPlayerName(playername[2],toppartsdata.middlename);
        });
    
    });
        
    test('Scenario Outline: As a user , I can see player lastname in top part of the page @TopPart @Regression', async ({ page }) => {
        
        await test.step('Then I can navigate to players top part page', async () => {
            const pcbplayertopprtpage = new PCBPlayerTopPartDetailsPage(page);
            await pcbplayertopprtpage.verifyTopPartDetailsPageIsPresent();
        });
        await test.step('Then I can see players  lastname in top part page', async () => {
            const pcbplayertopprtpage = new PCBPlayerTopPartDetailsPage(page);
            const playername=await pcbplayertopprtpage.getName();
            await pcbplayertopprtpage.verifyPlayerName(playername[3].replace(",",""),toppartsdata.lastname)

        });

    });
        
        
    test('Scenario Outline: As a user , I can see player enrolled id in top part of the page @TopPart @Regression', async ({ page }) => {
        
        await test.step('Then I can navigate to players top part page', async () => {
            const pcbplayertopprtpage = new PCBPlayerTopPartDetailsPage(page);
            await pcbplayertopprtpage.verifyTopPartDetailsPageIsPresent();
        });
        await test.step('Then I can see players  enrolled id in top part page', async () => {
            const pcbplayertopprtpage = new PCBPlayerTopPartDetailsPage(page);
            await pcbplayertopprtpage.verifyEnrolledID(toppartsdata.id);

        });

    });
        
    test('Scenario Outline: As a user , I can see playerid and status in top part of the page @TopPart @Regression', async ({ page }) => {
        await test.step('Then I can navigate to players top part page', async () => {
            const pcbplayertopprtpage = new PCBPlayerTopPartDetailsPage(page);
            await pcbplayertopprtpage.verifyTopPartDetailsPageIsPresent();
        });
        await test.step('Then I can see players playerid and status in top part page', async () => {
            const pcbplayertopprtpage = new PCBPlayerTopPartDetailsPage(page);
            await pcbplayertopprtpage.verifyPlayerIDAndStatus(toppartsdata.playerid);

        });

    });
        
    
 });