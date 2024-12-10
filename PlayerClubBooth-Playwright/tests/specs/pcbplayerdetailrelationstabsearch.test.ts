import { test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBPlayerDetailPage from "../pages/pcbplayerdetailpage";
import PCBSearchPage from "../pages/pcbsearchpage";
import PCBPlayerRelationDetailsPage from "../pages/pcbplayerrelationsdetailspage";
import PreRequisites from "../../test-setup/pre-requisites";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let relationdata:any;

//For DB
let dburl: any;



test.describe('PCB Player Detail Relations Tab Suite', () => {
    test.beforeAll(async () => {
        //reading credentials test data from ${environment}.json file
        username = testdata.credentials.testdata[0].username;
        password = testdata.credentials.testdata[0].password;

        //db url
        dburl = testdata.credentials.testdata[0].dbpm;

        //relation data
        relationdata = testdata.relations.testdata[0];

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
                await pcbsearchpage.doSearch(relationdata.playerid);
            });
            await test.step('Then I can see the search result', async () => {
                const pcbsearchpage = new PCBSearchPage(page);
                await pcbsearchpage.verifySearchResultIsPresent(relationdata);
            });

            await test.step('Then I can clear the linked player from db', async () => {
                const prerequisite = new PreRequisites();
                await prerequisite.clearLinkedPlayer(dburl,relationdata.playerid)
            });

            await test.step('Then it should show player details page dialog, there click on relations tab button', async () => {
                const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
                await pcbplayerdetailpage.verifyRelationsTabIsPresent();
                await pcbplayerdetailpage.clickOnRelationsTab();
            });

    });

    test('Scenario Outline: As a user , I can link a player by selecting yes option from the link player modal @RelationsTab @Regression', async ({ page }) => {

        await test.step('Then I can navigate to relations tab page', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyRelationDetailsPageIsPresent();
        });
        await test.step('When I can click add link button ', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.clickAddLink();
        });
        await test.step('Then I can search for a player and click link button ', async () => {
            const searchpage=new PCBSearchPage(page);
            await searchpage.doSearch(relationdata.playeridtobelinked)
            await searchpage.verifySearchResultFromRelationsTab(relationdata.playeridtobelinked);
            await searchpage.clickLinkButton();   
            
        });
        await test.step('Then I can see the link player modal and I can click yes button and see the linked player', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyLinkingModalIsPresent();
            await pcbplayerrelationdetailspage.verifyLinkYesFunctionality(relationdata.playeridtobelinked);
        });

    });


    test('Scenario Outline: As a user , I can pause the link player by selecting no option from the link player modal @RelationsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to relations tab page', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyRelationDetailsPageIsPresent();
        });
        await test.step('When I can click add link button ', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.clickAddLink();
        });
        await test.step('Then I can search for a player and click link button ', async () => {
            const searchpage=new PCBSearchPage(page);
            await searchpage.doSearch(relationdata.playeridtobelinked)
            await searchpage.verifySearchResultFromRelationsTab(relationdata.playeridtobelinked);
            await searchpage.clickLinkButton();   
            
        });
        await test.step('Then I can see the link player modal and I can click No button to not to link', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyLinkingModalIsPresent();
            await pcbplayerrelationdetailspage.verifyLinkNofunctionality();
            
        });

    });

    test('Scenario Outline: As a user , I can unlink a player by selecting yes option from the link player modal @RelationsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to relations tab page', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyRelationDetailsPageIsPresent();
        });
        await test.step('When I can click add link button ', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.clickAddLink();
        });
        await test.step('Then I can search for a player and click link button ', async () => {
            const searchpage=new PCBSearchPage(page);
            await searchpage.doSearch(relationdata.playeridtobelinked)
            await searchpage.verifySearchResultFromRelationsTab(relationdata.playeridtobelinked);
            await searchpage.clickLinkButton();   
            
        });
        await test.step('Then I can see the link player modal and I can click yes button and see the linked player', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyLinkingModalIsPresent();
            await pcbplayerrelationdetailspage.verifyLinkYesFunctionality(relationdata.playeridtobelinked);
            
        });
        await test.step('Then I can unlink a player', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.clickUnlink();
            await pcbplayerrelationdetailspage.verifyUnLinkingModalIsPresent();
            await pcbplayerrelationdetailspage.verifyUnLinkYesFunctionality(relationdata.playeridtobelinked);
            
        });

    });

    test('As a user , I can pause the unlink player by selecting no option from the unlink player modal @RelationsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to relations tab page', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyRelationDetailsPageIsPresent();
        });
        await test.step('When I can click add link button ', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.clickAddLink();
        });
        await test.step('Then I can search for a player and click link button ', async () => {
            const searchpage=new PCBSearchPage(page);
            await searchpage.doSearch(relationdata.playeridtobelinked)
            await searchpage.verifySearchResultFromRelationsTab(relationdata.playeridtobelinked);
            await searchpage.clickLinkButton();   
            
        });
        await test.step('Then I can see the link player modal and I can click yes button and see the linked player', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyLinkingModalIsPresent();
            await pcbplayerrelationdetailspage.verifyLinkYesFunctionality(relationdata.playeridtobelinked);
            
        });
        await test.step('Then I can unlink a player', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.clickUnlink();
            await pcbplayerrelationdetailspage.verifyUnLinkingModalIsPresent();
            await pcbplayerrelationdetailspage.verifyUnLinkNofunctionality();
            
        });

    });

    test('Scenario Outline: As a user , I can see the error message while trying to link already linked player @RelationsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to relations tab page', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyRelationDetailsPageIsPresent();
        });
        await test.step('When I can click add link button ', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.clickAddLink();
        });
        await test.step('Then I can search for a player and click link button ', async () => {
            const searchpage=new PCBSearchPage(page);
            await searchpage.doSearch(relationdata.playeridtobelinked)
            await searchpage.verifySearchResultFromRelationsTab(relationdata.playeridtobelinked);
            await searchpage.clickLinkButton();   
            
        });
        await test.step('Then I can see the link player modal and I can click yes button and see the linked player', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyLinkingModalIsPresent();
            await pcbplayerrelationdetailspage.verifyLinkYesFunctionality(relationdata.playeridtobelinked);
            
        });
        await test.step('When I can click add link button ', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.clickAddLink();
        });
        await test.step('Then again I can search for a player and click link button ', async () => {
            const searchpage=new PCBSearchPage(page);
            await searchpage.doSearch(relationdata.playeridtobelinked)
            await searchpage.verifySearchResultFromRelationsTab(relationdata.playeridtobelinked);
            await searchpage.clickLinkButton();   
        });
        await test.step('Then I can see the already linked error message', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyMessgaeForAlreadyAddedPlayer();
            await pcbplayerrelationdetailspage.clickOkButton();
        });

    });


    test('Scenario Outline: As a user , I can click back button from search link page to see relations page  @RelationsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to relations tab page', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyRelationDetailsPageIsPresent();
        });
        await test.step('When I can click add link button it should show search page ', async () => {
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.clickAddLink();
        });
        await test.step('Then I can click back button from search page to see relations page', async () => {
            const searchpage=new PCBSearchPage(page);
            await searchpage.clickBackButton();
            const pcbplayerrelationdetailspage = new PCBPlayerRelationDetailsPage(page)
            await pcbplayerrelationdetailspage.verifyRelationDetailsPageIsPresent();
        });

    });

});
