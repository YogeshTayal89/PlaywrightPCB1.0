import {test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBEnrollBasicPage from "../pages/pcbenrollbasic.page";
import PCBEnrollIdentificationPage from "../pages/pcbenrollidentification.page";
import PCBSearchPage from "../pages/pcbsearchpage";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let enrollmentdata:any;


test.describe('PCB Enroll Identification Suite', () => {
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
        await test.step('Then I can fill the baic enrollment details', async () => {
            const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
            await pcbenrollbasicpage.fillBasicEnrollmentDetails(enrollmentdata);
        });

        await test.step('Then I can click on next button ', async () => {
            const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
            await pcbenrollbasicpage.clickOnNextButton();
        });
    });
    

    test('Scenario Outline: As a user , I can navigate to pcb enrollment identification page @Identification @Smoke @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

    });


    test('Scenario Outline: As a user , I can click refusedid button @Identification', async ({ page }) => {
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can click on  refusedid', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.clickRefuseIdAndVerify();
        });

    });


    test('Scenario Outline: As a user , I can select values from type dropdown  @Identification @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can select values from type dropdown', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.verifyTypeDropdownValues();
        });

    });

    test('Scenario Outline: As a user , I can enter all values in enroll identification page @Smoke @Identification @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can enter all the values', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.fillIdentificationEnrollmentDetails(enrollmentdata)
        });

        await test.step('Then I can verify all the values are entered ', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.verifyEnterdIdentificationDetails(enrollmentdata);
        });

    });

    test('Scenario Outline: As a user , I can add and edit id @Identification @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can enter all the values', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.fillIdentificationEnrollmentDetails(enrollmentdata)
        });

        await test.step('Then I can add or edit id', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.verifyAddandEditID(enrollmentdata)
        });

    });


    test('Scenario Outline: As a user , I can delete a id @Identification @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can enter all the values', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.fillIdentificationEnrollmentDetails(enrollmentdata)
        });

        await test.step('Then I can add or edit id', async () => {
            const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
            await pcbenrollidentipage.verifyDeleteID(enrollmentdata);
        });

    });

    test('Scenario Outline: As a user , I can see the error message for state @Identification @Regression', async ({ page }) => {
        const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can click on next button without entering any identification information', async () => {
            await pcbenrollidentipage.clickOnNextButton();
        });

        await test.step('Then I can see the error message for state', async () => {
            await pcbenrollidentipage.verifyErrorMessageOfState();
        });

    });


    test('Scenario Outline: As a user , I can see the error message for expiry date @Identification @Regression', async ({ page }) => {
        const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can click on next button without entering any identification information', async () => {
            await pcbenrollidentipage.clickOnNextButton();
        });

        await test.step('Then I can see the error message for expiry date', async () => {
            await pcbenrollidentipage.verifyErrorMessageOfExpiryDate();
        });

    });


    test('Scenario Outline: As a user , I can see the error message for id @Identification @Regression', async ({ page }) => {
        const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can click on next button without entering any identification information', async () => {
            await pcbenrollidentipage.clickOnNextButton();
        });

        await test.step('Then I can see the error message for id', async () => {
            await pcbenrollidentipage.verifyErrorMessageOfID();
        });

    });

    test('Scenario Outline: As a user , I can see the search page on clicking cancel button @Identification @Regression', async ({ page }) => {
        const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can click on cancel button', async () => {
            await pcbenrollidentipage.clickOnCancelButton();
        });

        await test.step('Then I should see the search page', async () => {
            const pcbsearchpage=new PCBSearchPage(page);
            pcbsearchpage.verifySearchPageIsPresent();

        });

    });

    test('Scenario Outline: As a user , I can see the enroll basic page with filled data on clicking back button @Identification @Regression', async ({ page }) => {
        const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can click on back button', async () => {
            await pcbenrollidentipage.clickOnBackButton();
        });

        await test.step('Then I should see the enroll basic page with the previously filled data', async () => {
           const pcbenrollbasic=new PCBEnrollBasicPage(page);
           pcbenrollbasic.verifyEnterdBasicDetails(enrollmentdata);

        });

    });

    test('Scenario Outline: As a user , I can see the UI variation on selecting different type from dropdown @Identification @Regression', async ({ page }) => {
        const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can UI variation while selecting different type', async () => {
            await pcbenrollidentipage.verifyUIBehaviourOnSelectingTypes();
        });

    });


    test('Scenario Outline: As a user , I can add identification using all the types and can see the UI verification on add, edit and delete @Identification @Regression', async ({ page }) => {
        const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can add identification using all the types and can see the UI verification on add, edit and delete', async () => {
            await pcbenrollidentipage.addAllTypeAndVerifyUI(enrollmentdata)
        });

    });

    test('Scenario Outline: As a user , I can see the error message if we select already added type @Identification @Regression', async ({ page }) => {
        const pcbenrollidentipage = new PCBEnrollIdentificationPage(page)
        await test.step('Then I should see PCB enrollment identification Page', async () => {
            await pcbenrollidentipage.verifyEnrollIdentificationPageIsPresent();
        });

        await test.step('Then I can see the error message if we select already added type', async () => {
            await pcbenrollidentipage.verifyErrorMsgForSlectingAlreadyAddedType(enrollmentdata);
        });

    });

  
});
