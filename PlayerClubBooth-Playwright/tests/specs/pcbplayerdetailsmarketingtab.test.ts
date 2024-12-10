import {test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBEnrollBasicPage from "../pages/pcbenrollbasic.page";
import PCBEnrollIdentificationPage from "../pages/pcbenrollidentification.page";
import PCBEnrollAddressPage from "../pages/pcbenrolladdress.page";
import PCBEnrollContactPage from "../pages/pcbenrollcontacts.page";
import PCBEnrollMarketingPage from "../pages/pcbenrollmarketing.page";
import PCBEnrollPreviewPage from "../pages/pcbenrollpreview.page";
import PCBPrintCardPage from "../pages/pcbprint.page";
import PCBPlayerDetailPage from "../pages/pcbplayerdetailpage";
import PCBPlayerBasicDetailsPage from "../pages/pcbplayerbasicdetailspage";
import PCBPlayerCommentDetailsPage from "../pages/pcbplayercommentdetailspage";
import PCBPlayerMarketingDetailsPage from "../pages/pcbplayermarketingdetailspage";

const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let enrollmentdata:any;


test.describe('PCB Palyer Detail Marketing Tab Suite', () => {
    test.beforeAll(async () => {
      //reading credentials test data from ${environment}.json file
       username = testdata.credentials.testdata[0].username;
       password = testdata.credentials.testdata[0].password;

       //enrollment data
       enrollmentdata=testdata.enrollment.testdata[0];
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
        await test.step('When I can click on PCB Enroll', async () => {
            const pcbhomepage = new PCBHomePage(page);
            await pcbhomepage.clickOnEnrollment();
        });
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });
        await test.step('Then I can fill the baic enrollment details and click on Next button', async () => {
            const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
            await pcbenrollbasicpage.fillBasicEnrollmentDetails(enrollmentdata);
            await pcbenrollbasicpage.clickOnNextButton();
        });

        await test.step('Then I can fill the identification details and click on Next button', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page);
            await pcbenrollidentipage.fillIdentificationEnrollmentDetails(enrollmentdata);
            await pcbenrollidentipage.clickOnNextButton();
        });
        await test.step('Then I can fill the address details and click on Next button', async () => {
            const pcbenrolladdress  = new PCBEnrollAddressPage(page);
            await pcbenrolladdress.fillAddressDetails(enrollmentdata);
            await pcbenrolladdress.clickOnNextButton();
        });
        await test.step('Then I can fill the contacts details and click on Next button', async () => {
            const pcbenrollcontacts  = new PCBEnrollContactPage(page);
            await pcbenrollcontacts.fillContactsDetails(enrollmentdata);
            await pcbenrollcontacts.clickOnNextButton();
        });

        await test.step('Then I can fill the marketing details and click on Next button', async () => {
            const pcbenrollmarketing  = new PCBEnrollMarketingPage(page);
            await pcbenrollmarketing.fillMarketingEnrollmentDetails(enrollmentdata);
            await pcbenrollmarketing.clickOnNextButton();
        });

        await test.step('Then I can click on Next button from preview page', async () => {
            const pcbenrollpreviewpage = new PCBEnrollPreviewPage(page)
            await pcbenrollpreviewpage.verifyEnrollPreviewPageIsPresent();
            await pcbenrollpreviewpage.createAPlayer(username,password)
        });

        await test.step('Then it should show print dialog, there click on cancel button', async () => {
            const pcbprintcardpage=new PCBPrintCardPage(page);
            await pcbprintcardpage.verifyEnrollPrintCardPageIsPresent();
            await pcbprintcardpage.clickOnCancelButton();
        });

        await test.step('Then it should show player details page, there click on Marketing tab button', async () => {
            const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
            await pcbplayerdetailpage.verifyMarketingTabIsPresent();
            await pcbplayerdetailpage.clickOnMarktetingTab();
        });
    });

    test('Scenario Outline: As a user , I can navigate to player details Marketing tab page (4 scripts merged) @MarketingTab @Smoke @Regression', async ({ page }) => {
        const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
        await test.step('Then I can Navigate to Basic tab page', async () => {
            await pcbplayerdetailpage.verifyBasicTabIsPresent();
            await pcbplayerdetailpage.clickOnBasicTab();
            const pcbplayerbasicdetailspage = new PCBPlayerBasicDetailsPage(page);
            await pcbplayerbasicdetailspage.verifyBasicDetailsPageIsPresent();
        });

        await test.step('Then I can navigate to Comments tab page', async () => {
            await pcbplayerdetailpage.verifyCommentsTabIsPresent();
            await pcbplayerdetailpage.clickOnCommentsTab();
            const pcbplayercommentdetailpage=new PCBPlayerCommentDetailsPage(page);
            await pcbplayercommentdetailpage.verifyCommentDetailsPageIsPresent();
           
        });
        await test.step('Then I can navigate to Marketing tab page', async () => {
            await pcbplayerdetailpage.verifyMarketingTabIsPresent();
            await pcbplayerdetailpage.clickOnMarktetingTab();
            const pcpplayermarketingdetailpage=new PCBPlayerMarketingDetailsPage(page);
            await pcpplayermarketingdetailpage.verifyMarketingDetailsPageIsPresent();
        });

    });

});
