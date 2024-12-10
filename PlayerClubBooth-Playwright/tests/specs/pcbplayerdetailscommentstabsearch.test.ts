import { test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBPlayerDetailPage from "../pages/pcbplayerdetailpage";
import PCBPlayerCommentDetailsPage from "../pages/pcbplayercommentdetailspage";
import PCBSearchPage from "../pages/pcbsearchpage";
import DBUtils from "../../utils/db-utils";
import PreRequisites from "../../test-setup/pre-requisites";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);


//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let commetsdata:any;

//dburl
let dburl: any;


test.describe('PCB Palyer Detail Comments Tab Suite', () => {
    test.beforeAll(async () => {
        //reading credentials test data from ${environment}.json file
        username = testdata.credentials.testdata[0].username;
        password = testdata.credentials.testdata[0].password;
        dburl = testdata.credentials.testdata[0].dbpm;

        //Reading comments test data
        commetsdata = testdata.comments.testdata[0];

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
            await pcbsearchpage.doSearch(commetsdata.playerid);
        });
        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(commetsdata);
        });
        await test.step('Then I can clear the comments', async () => {
            const prerequisite = new PreRequisites();
            await prerequisite.clearComments(dburl,commetsdata.playerid);
        });
        await test.step('Then it should show player details page dialog, there click on comments tab button', async () => {
            const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
            await pcbplayerdetailpage.verifyCommentsTabIsPresent();
            await pcbplayerdetailpage.clickOnCommentsTab();
        });

    });

    test('Scenario Outline: As a user , I can verify the elemens in Add comment page @CommentsTab @Regression', async ({ page }) => {

        await test.step('Then I can navigate to Comments tab page', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
        });
        await test.step('Then I can validate the add comment page elements', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.clickAddcommentButton();
            await pcbplayercommentdetailpage.verifyAddcommentPopup();
        });

    });

    test('Scenario Outline: As a user , I can add or edit private comments @CommentsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to Comments tab page', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
        });
        await test.step('Then I can add or edit private comments', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.clickAddcommentButton();
            await pcbplayercommentdetailpage.addAndEditCommentWithPrivate();
        });

    });

    test('Scenario Outline: As a user , I can add or edit private comments with high priority @CommentsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to Comments tab page', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
        });
        await test.step('Then I can add or edit private comments with high priority', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.clickAddcommentButton();
            await pcbplayercommentdetailpage.addAndEditCommentOfPrivateWithHighPriority();
        });

    });

    test('Scenario Outline: As a user , I can add or edit global comments @CommentsTab ', async ({ page }) => {
        await test.step('Then I can navigate to Comments tab page', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
        });
        await test.step('Then I can add or edit global comments', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.clickAddcommentButton();
            await pcbplayercommentdetailpage.addAndEditCommentWithGlobal();
        });

    });

    test('Scenario Outline: As a user , I can add or edit global comments with high prioirty @CommentsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to Comments tab page', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
        });
        await test.step('Then I can add or edit global comments with high priority', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.clickAddcommentButton();
            await pcbplayercommentdetailpage.addAndEditCommentOfGlobalWithHighPriority();
        });

    });

    test('Scenario Outline: As a user , I can add or edit default comments @CommentsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to Comments tab page', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
        });
        await test.step('Then I can add or edit default comments', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.clickAddcommentButton();
            await pcbplayercommentdetailpage.addAndEditCommentWithDefault()
        });

    });


    test('Scenario Outline: As a user , I can add or edit default comments with high priority @CommentsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to Comments tab page', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
        });
        await test.step('Then I can add or edit default comments with high priority', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.clickAddcommentButton();
            await pcbplayercommentdetailpage.addAndEditCommentOfDefaultWithHighPriority()
        });

    });

    test('Scenario Outline: As a user , I should not see expired comments @CommentsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to Comments tab page', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
        });
        await test.step('Then I can add default comments', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.clickAddcommentButton();
            await pcbplayercommentdetailpage.addAndEditCommentWithDefault()
        });

        await test.step('When I run query to make the expirydate is today date', async () => {
            const dbutils = new DBUtils(dburl);
            await dbutils.doUpdateOrDelete("update playercomment set Expiration=(SELECT CONVERT(DATETIME, CONVERT(DATE, GETDATE()), 121)) where playerid ='" + commetsdata.playerid + "' and userid='1' and Status='A'")
        });

        await test.step('Then I should not see comments', async () => {
            const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
            await pcbplayerdetailpage.clickOnMarktetingTab();
            await pcbplayerdetailpage.clickOnCommentsTab();
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyNoComments();
        });
    });

    test('Scenario Outline: As a user , I can click cancel button from add comments @CommentsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to Comments tab page', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
        });
        await test.step('Then I can add default comments', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.clickAddcommentButton();
            await pcbplayercommentdetailpage.verifyCancelButton()
        });

    });


    test('Scenario Outline: As a user , I can delete a comment @CommentsTab @Regression', async ({ page }) => {
        await test.step('Then I can navigate to Comments tab page', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
        });
        await test.step('Then I can add default comments', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.clickAddcommentButton();
            await pcbplayercommentdetailpage.addAndEditCommentWithDefault()
        });

        await test.step('When I delete a comment I should not see comments', async () => {
            const pcbplayercommentdetailpage = new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.deleteAComment();
            await pcbplayercommentdetailpage.verifyNoComments();
            
        });

    });

});
