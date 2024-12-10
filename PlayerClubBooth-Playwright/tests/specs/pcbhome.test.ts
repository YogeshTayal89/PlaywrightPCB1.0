import {test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBSearchPage from "../pages/pcbsearchpage";
import PCBEnrollBasicPage from "../pages/pcbenrollbasic.page";
import PCBSettingsPage from "../pages/pcbsettingspage";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

test.describe('PCB Home Page Suite', () => {
    test.beforeAll(async () => {
      //reading credentials test data from ${environment}.json file
       username = testdata.credentials.testdata[0].username;
       password = testdata.credentials.testdata[0].password;
      

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

    });
    

    test('Scenario Outline: As a user , I can navigate to pcb home page @Home @Smoke @Regression', async ({ page }) => {
        await test.step(`When I click on PCB application`, async () => {
            const dashboardpage = new DashboardPage(page);
            await dashboardpage.clickOnPCBApp();
        });
        await test.step('Then I should see PCB home Page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.verifyPCBHomePage();
        });

    });

    test('Scenario Outline: As a user , I can navigate to search page by clicking search card from home page @Home @Smoke @Regression', async ({ page }) => {
        await test.step(`When I click on PCB application`, async () => {
            const dashboardpage = new DashboardPage(page);
            await dashboardpage.clickOnPCBApp();
        });
        await test.step('Then I should see PCB home Page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.verifyPCBHomePage();
        });
        await test.step('Then I can click on search card from the home page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.clickOnSearch();
        });

        await test.step('Then I can see search page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
            
        });

    });

    test('Scenario Outline: As a user , I can navigate to search page by clicking enroll card from home page @Home @Smoke @Regression', async ({ page }) => {
        await test.step(`When I click on PCB application`, async () => {
            const dashboardpage = new DashboardPage(page);
            await dashboardpage.clickOnPCBApp();
        });
        await test.step('Then I should see PCB home Page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.verifyPCBHomePage();
        });
        await test.step('Then I can click on enroll card from the home page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.clickOnEnrollment();
        });

        await test.step('Then I can see enrollment page', async () => {
            const pcbenrollpage = new PCBEnrollBasicPage(page);
            await pcbenrollpage.verifyBasicEnrollmentPagePresent();
        });

    });


    test('Scenario Outline: As a user , I can navigate to search page by clicking search link from footerlinks @Home @Smoke @Regression', async ({ page }) => {
        await test.step(`When I click on PCB application`, async () => {
            const dashboardpage = new DashboardPage(page);
            await dashboardpage.clickOnPCBApp();
        });
        await test.step('Then I should see PCB home Page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.verifyPCBHomePage();
        });

        await test.step('When I can click footer search link', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.clickOnFooterSearch();
        });

        await test.step('Then I can see search page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
            
        });

    });

    test('Scenario Outline: As a user , I can navigate to enroll page by clicking enroll link from footerlinks @Home @Smoke @Regression', async ({ page }) => {
        await test.step(`When I click on PCB application`, async () => {
            const dashboardpage = new DashboardPage(page);
            await dashboardpage.clickOnPCBApp();
        });
        await test.step('Then I should see PCB home Page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.verifyPCBHomePage();
        });

        await test.step('When I can click footer enroll link', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.clickOnFooterEnrollment();
        });

        await test.step('Then I can see enrollment page', async () => {
            const pcbenrollpage = new PCBEnrollBasicPage(page);
            await pcbenrollpage.verifyBasicEnrollmentPagePresent();
        });

    });
   
    test('Scenario Outline: As a user , I can navigate to home page by clicking home link from footerlinks @Home @Smoke @Regression', async ({ page }) => {
        await test.step(`When I click on PCB application`, async () => {
            const dashboardpage = new DashboardPage(page);
            await dashboardpage.clickOnPCBApp();
        });
        await test.step('Then I should see PCB home Page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.verifyPCBHomePage();
        });

        await test.step('When I can click footer search link', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.clickOnFooterSearch();
        });

        await test.step('Then I can see search page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
            
        });

        await test.step('When I can click footer home link', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.clickOnFooterHome();
        });

        await test.step('Then I should see PCB home Page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.verifyPCBHomePage();
        });
    });

    test('Scenario Outline: As a user , I can navigate to settings page by clicking settings link from footerlinks @Home @Smoke @Regression', async ({ page }) => {
        await test.step(`When I click on PCB application`, async () => {
            const dashboardpage = new DashboardPage(page);
            await dashboardpage.clickOnPCBApp();
        });
        await test.step('Then I should see PCB home Page', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.verifyPCBHomePage();
        });

        await test.step('When I can click footer search link', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.clickOnFooterSettings();
        });

        await test.step('Then I can see settings page', async () => {
            const pcbsettingspage = new PCBSettingsPage(page)
            await pcbsettingspage.verifySettingsPageIsPresent();
        });

    });

});
