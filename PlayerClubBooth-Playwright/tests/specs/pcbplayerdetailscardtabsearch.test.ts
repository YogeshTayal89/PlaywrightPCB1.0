import {test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBSearchPage from "../pages/pcbsearchpage";
import PCBPlayerDetailPage from "../pages/pcbplayerdetailpage";
import PCBPlayerCardDetailsPage from "../pages/pcbplayercarddetailspage";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let enrollmentdata:any;

test.describe('PCB Player Detail Card Page Suite', () => {
    test.beforeAll(async () => {
      //reading credentials test data from ${environment}.json file
       username = testdata.credentials.testdata[0].username;
       password = testdata.credentials.testdata[0].password;   
       enrollmentdata=testdata.printcard.testdata[0];
     
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
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });
        await test.step('When I can do the search using any matching text', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(enrollmentdata.playerid);
        });
        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(enrollmentdata);
        });
        await test.step('Then it should show player details page dialog, there click on Cards tab button', async () => {
            const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
            await pcbplayerdetailpage.verifyCardsTabIsPresent();
            await pcbplayerdetailpage.clickOnCardsTab();
        });

    });

    test('Scenario Outline: As a user , I can print a card in card page @CardsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to Cards tab page', async () => {
            const pcpplayercarddetailpage=new PCBPlayerCardDetailsPage(page);
            await pcpplayercarddetailpage.verifyCardDetailsPageIsPresent()
        });

        await test.step('Then I can print a card', async () => {
            const pcpplayercarddetailpage=new PCBPlayerCardDetailsPage(page);
            await pcpplayercarddetailpage.verifyPrintCard();
        });

    });

    /**
     * The following test are no more valid. But keeping this incase any future refernce
     */
    test('Scenario Outline: As a user , I can print the new card in card page (no more valid)', async ({ page }) => {
        await test.step('Then I can navigate to Cards tab page', async () => {
            const pcpplayercarddetailpage=new PCBPlayerCardDetailsPage(page);
            await pcpplayercarddetailpage.verifyCardDetailsPageIsPresent()
        });

        await test.step('Then I can print the new card', async () => {
            const pcpplayercarddetailpage=new PCBPlayerCardDetailsPage(page);
            await pcpplayercarddetailpage.verifyNewCardPrint();
        });

    });

    /**
     * The following test are no more valid. Butt keeping this incase any future refernce
     */
    test('Scenario Outline: As a user , I can print the duplicate card in card page (no more valid)', async ({ page }) => {
        await test.step('Then I can navigate to Cards tab page', async () => {
            const pcpplayercarddetailpage=new PCBPlayerCardDetailsPage(page);
            await pcpplayercarddetailpage.verifyCardDetailsPageIsPresent()
        });

        await test.step('Then I can print the duplicate card', async () => {
            const pcpplayercarddetailpage=new PCBPlayerCardDetailsPage(page);
            await pcpplayercarddetailpage.verifyDuplicateCardPrint();
        });

    });


});
