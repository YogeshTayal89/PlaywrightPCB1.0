import {test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBEnrollBasicPage from "../pages/pcbenrollbasic.page";
import PCBEnrollIdentificationPage from "../pages/pcbenrollidentification.page";
import PCBEnrollAddressPage from "../pages/pcbenrolladdress.page";
import PCBEnrollContactPage from "../pages/pcbenrollcontacts.page";
import PCBSearchPage from "../pages/pcbsearchpage";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let enrollmentdata:any;

test.describe('PCB Enroll Contacts Suite', () => {
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
    });
    

    test('Scenario Outline: As a user , I can navigate to pcb contacts page @Contacts @Smoke @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment contacts Page', async () => {
            const pcbenrollcontactsPage = new PCBEnrollContactPage(page);
            await pcbenrollcontactsPage.verifyEnrollContactsPageIsPresent();
        });

    });



    test('Scenario Outline: As a user , I can see the error message for mandatory fields @Contacts @Regression', async ({ page }) => {
        const pcbenrollcontactsPage = new PCBEnrollContactPage(page);
        await test.step('Then I should see PCB enrollment contacts Page', async () => {
            await pcbenrollcontactsPage.verifyEnrollContactsPageIsPresent();
        });

        await test.step('Then I can click on next button without entering any contacts details', async () => {
            await pcbenrollcontactsPage.clickOnNextButton();
        });

        await test.step('Then I can see the error message for mandatory fields', async () => {
            await pcbenrollcontactsPage.verifyMandatoryField();
        });

    });

  
    test('Scenario Outline: As a user , I can enter all values in enroll contacts page @Smoke @Contacts @Regression', async ({ page }) => {
        const pcbenrollcontactsPage = new PCBEnrollContactPage(page);
        await test.step('Then I should see PCB enrollment contacts Page', async () => {
            await pcbenrollcontactsPage.verifyEnrollContactsPageIsPresent();
        });

        await test.step('Then I can enter all the values in contacts', async () => {
           await pcbenrollcontactsPage.fillContactsDetails(enrollmentdata);
        });

        await test.step('Then I can verify all the values are entered ', async () => {
            await pcbenrollcontactsPage.verifyEnteredContactsDetails(enrollmentdata);
        });

    });

    test('Scenario Outline: As a user , I can see the search page on clicking cancel button @Contacts @Regression', async ({ page }) => {
        const pcbenrollcontactsPage = new PCBEnrollContactPage(page);
        await test.step('Then I should see PCB enrollment contacts Page', async () => {
            await pcbenrollcontactsPage.verifyEnrollContactsPageIsPresent();
        });
        await test.step('Then I can click on cancel button', async () => {
            await pcbenrollcontactsPage.clickOnCancelButton();
        });
        await test.step('Then I should see the search page', async () => {
            const pcbsearchpage=new PCBSearchPage(page);
            pcbsearchpage.verifySearchPageIsPresent();

        });

    });

    test('Scenario Outline: As a user , I can see the enroll address page with filled data on clicking back button @Contacts @Regression', async ({ page }) => {
        const pcbenrollcontactsPage = new PCBEnrollContactPage(page);
        await test.step('Then I should see PCB enrollment contacts Page', async () => {
            await pcbenrollcontactsPage.verifyEnrollContactsPageIsPresent();
        });
        await test.step('Then I can click on back button', async () => {
            await pcbenrollcontactsPage.clickOnBackButton();
        });
        await test.step('Then I should see the address page with the previously filled data', async () => {
           const pcbenrolladdresspage=new PCBEnrollAddressPage(page)
           pcbenrolladdresspage.verifyValuesAfterBackFromAnotherForm(enrollmentdata);

        });

    });

    test('Scenario Outline: As a user , I can add phone numbers using all the types and can see the UI verification on add and delete @Contacts @Regression', async ({ page }) => {
        const pcbenrollcontactsPage = new PCBEnrollContactPage(page);
        await test.step('Then I should see PCB enrollment contacts Page', async () => {
            await pcbenrollcontactsPage.verifyEnrollContactsPageIsPresent();
        });
        await test.step('I can add phone numbers using all the types and can see the UI verification on add and delete ', async () => {
            await pcbenrollcontactsPage.addAllPhoneTypeAndVerifyUI(enrollmentdata)
        });

    });

    test('Scenario Outline: As a user , I can add email id using all the types and can see the UI verification on add and delete @Contacts @Regression', async ({ page }) => {
        const pcbenrollcontactsPage = new PCBEnrollContactPage(page);
        await test.step('Then I should see PCB enrollment contacts Page', async () => {
            await pcbenrollcontactsPage.verifyEnrollContactsPageIsPresent();
        });
        await test.step('I can add email id using all the types and can see the UI verification on add and delete ', async () => {
            await pcbenrollcontactsPage.addAllEmailTypeAndVerifyUI(enrollmentdata)
        });

    });

    test('Scenario Outline: As a user , I can see the error message if we select already added type  @Contacts @Regression', async ({ page }) => {
        const pcbenrollcontactsPage = new PCBEnrollContactPage(page);
        await test.step('Then I should see PCB enrollment contacts Page', async () => {
            await pcbenrollcontactsPage.verifyEnrollContactsPageIsPresent();
        });
        await test.step('Then I can see the error message if we select already added type', async () => {
            await pcbenrollcontactsPage.verifyErrorMsgForSlectingAlreadyAddedType(enrollmentdata);
        });
    });
});
