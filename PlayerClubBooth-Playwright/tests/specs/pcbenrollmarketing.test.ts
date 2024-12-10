import {test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBEnrollBasicPage from "../pages/pcbenrollbasic.page";
import PCBEnrollIdentificationPage from "../pages/pcbenrollidentification.page";
import PCBEnrollAddressPage from "../pages/pcbenrolladdress.page";
import PCBEnrollContactPage from "../pages/pcbenrollcontacts.page";
import PCBEnrollMarketingPage from "../pages/pcbenrollmarketing.page";
import PCBSearchPage from "../pages/pcbsearchpage";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let enrollmentdata:any;

test.describe('PCB Enroll Marketing Suite', () => {
    test.beforeAll(async () => {
       //reading credentials test data from ${environment}.json file
       username = testdata.credentials.testdata[0].username;
       password = testdata.credentials.testdata[0].password;
 
       //reading enrollment test data
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
    });
    

    test('Scenario Outline: As a user , I can navigate to pcb marketing page @Marketing @Smoke @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment marketing Page', async () => {
            const pcbenrollmarketingpage = new PCBEnrollMarketingPage(page);
            await pcbenrollmarketingpage.verifyEnrollMarketingPageIsPresent();
        });

    });

    test('Scenario Outline: As a user , I can select values from attraction type dropdown @Marketing @Regression', async ({ page }) => {
        const pcbenrollmarketingpage = new PCBEnrollMarketingPage(page);
        await test.step('Then I should see PCB enrollment marketing Page', async () => {
            await pcbenrollmarketingpage.verifyEnrollMarketingPageIsPresent();
        });

        await test.step('Then I can select values from attraction type dropdown', async () => {
            await pcbenrollmarketingpage.verifyattractionTypeDropdownValues();
        });

    });

  
    test('Scenario Outline: As a user , I can enter all values in enroll marketing page @Smoke @Marketing @Regression', async ({ page }) => {
        const pcbenrollmarketingpage = new PCBEnrollMarketingPage(page);

        await test.step('Then I should see PCB enrollment marketing Page', async () => {
            await pcbenrollmarketingpage.verifyEnrollMarketingPageIsPresent();
        });

        await test.step('Then I can enter all the values in marketing', async () => {
           await pcbenrollmarketingpage.fillMarketingEnrollmentDetails(enrollmentdata);
        });

        await test.step('Then I can verify all the values are entered in Marketing', async () => {
            await pcbenrollmarketingpage.verifyEnterdMarketingDetails(enrollmentdata);
        });

    });

    test('Scenario Outline: As a user , I can see the search page on clicking cancel button @Marketing @Regression ', async ({ page }) => {
        const pcbenrollmarketingpage = new PCBEnrollMarketingPage(page);

        await test.step('Then I should see PCB enrollment marketing Page', async () => {
            await pcbenrollmarketingpage.verifyEnrollMarketingPageIsPresent();
        });
        await test.step('Then I can click on cancel button', async () => {
            await pcbenrollmarketingpage.clickOnCancelButton();
        });
        await test.step('Then I should see the search page', async () => {
            const pcbsearchpage=new PCBSearchPage(page);
            pcbsearchpage.verifySearchPageIsPresent();

        });

    });


    test('Scenario Outline: As a user , I can see the contacts page with filled data on clicking back button @Marketing @Regression ', async ({ page }) => {
        const pcbenrollmarketingpage = new PCBEnrollMarketingPage(page);

        await test.step('Then I should see PCB enrollment marketing Page', async () => {
            await pcbenrollmarketingpage.verifyEnrollMarketingPageIsPresent();
        });
        await test.step('Then I can click on back button', async () => {
            await pcbenrollmarketingpage.clickOnBackButton();
        });
        await test.step('Then I should see the contacts page with the previously filled data', async () => {
           const pcbcontactspage=new PCBEnrollContactPage(page);
           pcbcontactspage.verifyEnteredContactsDetails(enrollmentdata);

        });

    });

    test('Scenario Outline: As a user , I can add frequent flyers using all the types and can see the UI verification on add and delete @Marketing @Regression', async ({ page }) => {
        const pcbenrollmarketingpage = new PCBEnrollMarketingPage(page);

        await test.step('Then I should see PCB enrollment marketing Page', async () => {
            await pcbenrollmarketingpage.verifyEnrollMarketingPageIsPresent();
        });
        await test.step('I can add frequent flyers using all the types and can see the UI verification on add and delete ', async () => {
            await pcbenrollmarketingpage.addAllFlyerTypeAndVerifyUI(enrollmentdata);
        });

    });

    test('Scenario Outline: As a user , I can see the error message if we select already added type  @Marketing @Regression', async ({ page }) => {
        const pcbenrollmarketingpage = new PCBEnrollMarketingPage(page);

        await test.step('Then I should see PCB enrollment marketing Page', async () => {
            await pcbenrollmarketingpage.verifyEnrollMarketingPageIsPresent();
        });
        await test.step('Then I can see the error message if we select already added type', async () => {
            await pcbenrollmarketingpage.verifyErrorMsgForSlectingAlreadyAddedType(enrollmentdata);
        });
    });
});
