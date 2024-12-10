import {test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBPlayerBasicDetailsPage from "../pages/pcbplayerbasicdetailspage";
import PCBPlayerDetailPage from "../pages/pcbplayerdetailpage";
import PCBSearchPage from "../pages/pcbsearchpage";
import PreRequisites from "../../test-setup/pre-requisites";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let coupondata:any;

//for db
let dburl:any;


test.describe('PCB Palyer Detail Basic Tab Suite', () => {
    test.beforeAll(async () => {
     //reading credentials test data from ${environment}.json file
     username = testdata.credentials.testdata[0].username;
     password = testdata.credentials.testdata[0].password;
    //reading dburl
     dburl=testdata.credentials.testdata[0].dbpm;

     //reading enrollment test data
     coupondata=testdata.redeemcoupons.testdata[0];

    });

    test.beforeEach(async ({ page }) => {

        const prerequisite=new PreRequisites();
        prerequisite.clearLock(dburl,coupondata.playerid)

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
            await pcbsearchpage.doSearch(coupondata.playerid);
        });
        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(coupondata);
        });
        await test.step('Then it should show player details page dialog, there click on Basic tab button', async () => {
            const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
            await pcbplayerdetailpage.verifyBasicTabIsPresent();
            await pcbplayerdetailpage.clickOnBasicTab();
        });

    });


    test('Scenario Outline: As a user , I can click rewards link to make sure rewards window is opening @BasicTab @Regression', async ({ page }) => {

        await test.step('When I can click the rewards arrow button', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.clickRewards();
        });

        await test.step('Then I can see the reward popup', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.verifyRewardPopupIsPresent();
        });

        await test.step('Then I can close the reward popup', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.closeRewardsPopup();
        });

    });

  

    test('Scenario Outline: As a user , I can click cashback arrow link to make sure cashback window is opening @BasicTab @Regression', async ({ page }) => {
        await test.step('When I can click the cashback arrow button', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.clickCashBack();
        });

        await test.step('Then I can see the cashback popup', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.verifyCashbackPopupIsPresent();
        });

        await test.step('Then I can close the cashback popup', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.closeCashbackPopup();
        });

    });

    test('Scenario Outline: As a user , I can click primarycomp arrow link to make sure primarycomp window is opening @BasicTab @Regression', async ({ page }) => {
        await test.step('When I can click the primary comp arrow button', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.clickPrimaryComp();
        });
        await test.step('Then I can see the primarycomp popup', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.verifyPrimaryCompPopupIsPresent();
        });

        await test.step('Then I can close the primarycomp popup', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.closePrimaryCompPopup();
        });

    });

    test('Scenario Outline: As a user , I can Issue rewards from Player Basic tab @BasicTab @Regression', async ({ page }) => {
        let remainingpoint:any;

        await test.step('When I can click the rewards arrow button', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.clickRewards();
        });

        await test.step('Then I can see the reward popup', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.verifyRewardPopupIsPresent();
        });

        await test.step('Then I can Issue a reward', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            remainingpoint=await pcbplayerbasicdetailspage.issueRewards(coupondata,username,password);
            console.log(remainingpoint[0]+"-->"+remainingpoint[1])
        });

        await test.step('Then I can see the balance poin in Basic Details Tab and Rewards popup', async()=>{
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.verifyReward(remainingpoint[0],remainingpoint[1])

        });

    });

    test('Scenario Outline: As a user , I can Issue cashback from Player Basic tab @BasicTab @Regression', async ({ page }) => {
        let remainingpoint:any;
        await test.step('When I can click the cashback arrow button', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.clickCashBack();
        });

        await test.step('Then I can see the cashback popup', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.verifyCashbackPopupIsPresent();
        });

        await test.step('Then I can Issue a cashback', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            remainingpoint=await pcbplayerbasicdetailspage.issueCashback(coupondata,username,password);
            console.log(remainingpoint[0]+"-->"+remainingpoint[1])
        });

        await test.step('Then I can see the balance poin in Basic Details Tab and Rewards popup', async()=>{
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.verifyCashback(remainingpoint[0],remainingpoint[1])

        });

    });

    test('Scenario Outline: As a user , I can Issue primary comp from Player Basic tab @BasicTab @Regression', async ({ page }) => {
        let remainingdollar:any;
        await test.step('When I can click the primary comp arrow button', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.clickPrimaryComp();
        });
        await test.step('Then I can see the primarycomp popup', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.verifyPrimaryCompPopupIsPresent();
        });

        await test.step('Then I can Issue a primarycomp', async () => {
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            remainingdollar=await pcbplayerbasicdetailspage.issuePrimarycomp(coupondata,username,password);
            console.log(remainingdollar[0])
        });

        await test.step('Then I can see the balance poin in Basic Details Tab and Rewards popup', async()=>{
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.verifyPrimarycomp(remainingdollar[0])

        });

    });

});
