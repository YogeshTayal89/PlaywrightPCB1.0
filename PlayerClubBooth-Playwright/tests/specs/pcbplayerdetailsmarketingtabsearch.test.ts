import {test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBPlayerDetailPage from "../pages/pcbplayerdetailpage";
import PCBPlayerMarketingDetailsPage from "../pages/pcbplayermarketingdetailspage";
import PCBSearchPage from "../pages/pcbsearchpage";
import PCBHomePage from "../pages/pcbhome.page";

const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let marketingdata:any;


test.describe('PCB Palyer Detail Marketing Tab Suite', () => {
    test.beforeAll(async () => {
      //reading credentials test data from ${environment}.json file
       username = testdata.credentials.testdata[0].username;
       password = testdata.credentials.testdata[0].password;
    
       //Marketing data
       marketingdata=testdata.redeemcoupons.testdata[0];

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
            await pcbsearchpage.doSearch(marketingdata.playerid);
            await pcbsearchpage.verifySearchResultIsPresent(marketingdata);
        });
        await test.step('Then it should show player details page, there click on Marketing tab button', async () => {
            const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
            await pcbplayerdetailpage.verifyMarketingTabIsPresent();
            await pcbplayerdetailpage.clickOnMarktetingTab();
        });
    });

    test('Scenario Outline: As a user , I can see redeem button is enabaled under marketing tab @MarketingTab @Regression', async ({ page }) => {
        await test.step('Then I can see Marketing details page ', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyMarketingDetailsPageIsPresent();
        });
        await test.step('Then I can see Redeem button is enabled ', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyRedeemBtnEnable();
        });

    });

    test('Scenario Outline: As a user , I can redeem the coupon from the list under marketing tab @MarketingTab @Regression', async ({ page }) => {
        let coupondetails:string[];
        let couponid:string="";
        let couponname:string="";

        await test.step('Then I can see Marketing details page ', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyMarketingDetailsPageIsPresent();
        });
        await test.step('When I can Redeem a coupon from the listed one', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            coupondetails= await pcpplayermarketingdetailpage.redeemCouponFromCouponsList();
            couponid=coupondetails[0];
            couponname=coupondetails[1];
        });

        await test.step('Then I can see the success message', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyRedeemMessageOfCoupon("success",couponid);
        });

        await test.step('Then the status need to be changed to "Redeem"', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyGivenStatusInGroupList(couponname,"Redeemed")
        });


    });

    test('Scenario Outline: As a user , I can see error message while redeeming invalid coupon id @MarketingTab @Regression', async ({ page }) => {
        await test.step('Then I can see Marketing details page ', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyMarketingDetailsPageIsPresent();
        });
        await test.step('When I can redeem a invalid coupon id', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.redeemCoupon(marketingdata.invalidcouponid);
        });

        await test.step('Then I can see the error message', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyRedeemMessageOfCoupon("error",marketingdata.invalidcouponid);
        });

    });


    test('Scenario Outline: As a user , I can see success message while redeeming valid coupon id @MarketingTab @Regression', async ({ page }) => {
        let coupondetails:string[];
        let couponid:string="";
        let couponname:string="";

        await test.step('Then I can see Marketing details page ', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyMarketingDetailsPageIsPresent();
        });

        await test.step('Then I can get the issue coupon id and name', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            coupondetails=await pcpplayermarketingdetailpage.getIssuedCouponNameAndID();
            couponid=coupondetails[0];
            couponname=coupondetails[1];
        });
        await test.step('When I can redeem a valid coupon id', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.redeemCoupon(couponid);
        });

        await test.step('Then I can see the success message', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyRedeemMessageOfCoupon("success",couponid);
        });

        await test.step('Then the status need to be changed to "Redeem"', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyGivenStatusInGroupList(couponname,"Redeemed")
        });
    });

    test('Scenario Outline: As a user , I can see mandatory field validation message if we are not entering anything on coupon field and click redeem button @MarketingTab @Regression', async ({ page }) => {
        await test.step('Then I can see Marketing details page ', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyMarketingDetailsPageIsPresent();
        });

        await test.step('When click redeem button in the redeem popup without entering coupon field then I can see the error message ', async () => {
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyMandatoryFieldOfCouponInput();
        });

    });

});
