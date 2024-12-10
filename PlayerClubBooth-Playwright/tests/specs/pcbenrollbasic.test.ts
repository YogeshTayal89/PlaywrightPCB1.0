import { test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBEnrollBasicPage from "../pages/pcbenrollbasic.page";
import PCBSearchPage from "../pages/pcbsearchpage";
import PreRequisites from "../../test-setup/pre-requisites";
import PCBEnrollIdentificationPage from "../pages/pcbenrollidentification.page";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//db url
let dburl:any;

//For config value
let configvalue:string;
let configreason:string;

//variable for enrollment data
let enrollmentdata:any;

test.describe('PCB Enroll Basic Suite', () => {
    test.beforeAll(async () => {
        //reading credentials test data from ${environment}.json file
        username = testdata.credentials.testdata[0].username;
        password = testdata.credentials.testdata[0].password;
        dburl = testdata.credentials.testdata[0].dbpm;

        //reading enrollment test data
        enrollmentdata=testdata.enrollment.testdata[0];

    });

    test.beforeEach(async ({ page },testInfo) => {

        if (testInfo.tags[0]=='@2'){
            configvalue='2';
            configreason='for warning message'
        }
        else if (testInfo.tags[0]=='@3'){
            configvalue='3';
            configreason='for minmum age verification popup'
        }
        else if (testInfo.tags[0]=='@4'){
            configvalue='4';
            configreason='for minmum age error message'
        }
        else{
            configvalue='1';
            configreason='for not showing any message'
        }

        await test.step(`Updated Configglobal config value to ${configvalue} of Item id 600 for ${configreason}`, async () => {
            const prerequisites=new PreRequisites();
            await prerequisites.updateEnrollmentDOBConfig(dburl,configvalue)
            console.log("Config Value updated to "+configvalue);
            });
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
            const pcblandingpage = new PCBHomePage(page);
            await pcblandingpage.verifyPCBHomePage();
        });

        await test.step('Then I can click on PCB Enroll', async () => {
            const pcblandingpage = new PCBHomePage(page);
            await pcblandingpage.clickOnEnrollment();
        });

    });


    test('Scenario Outline: As a user , I can navigate to pcb enrollment basic page @BasicInformation @Smoke @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

    });

    test('Scenario Outline: As a user , I can cancel the enrollment from enrollment basic page @BasicInformation @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can click on cancel button ', async () => {
            const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
            await pcbenrollbasicpage.clickOnCancelButton();
        });

        await test.step('Then I can see the search page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

    });

    test('Scenario Outline: As a user , I can see the error message for firstname @BasicInformation @Regression', async ({ page }) => {
        const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can click on next button without entering any basic information', async () => {
            await pcbenrollbasicpage.clickOnNextButton();
        });

        await test.step('Then I can see the error message for firstname', async () => {
            await pcbenrollbasicpage.verifyErrorMessageOfFirstName();
        });

    });

    test('Scenario Outline: As a user , I can see the error message for lastname @BasicInformation @Regression', async ({ page }) => {
        const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can click on next button without entering any basic information', async () => {
            await pcbenrollbasicpage.clickOnNextButton();
        });

        await test.step('Then I can see the error message for lastname', async () => {
            await pcbenrollbasicpage.verifyErrorMessageOfLastName();
        });

    });

    test('Scenario Outline: As a user , I can see the error message for dob @BasicInformation @Regression', async ({ page }) => {
        const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can click on next button without entering any basic information', async () => {
            await pcbenrollbasicpage.clickOnNextButton();
        });

        await test.step('Then I can see the error message for dob', async () => {
            await pcbenrollbasicpage.verifyErrorMessageOfDOB();
        });

    });

    test('Scenario Outline: As a user , I can see next button is clickable after entering all the basic enrollment details @BasicInformation @Regression', async ({ page }) => {
        const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can fill the baic enrollment details', async () => {
            await pcbenrollbasicpage.fillBasicEnrollmentDetails(enrollmentdata);
        });

        await test.step('Then I can click on next button ', async () => {
            await pcbenrollbasicpage.clickOnNextButton();
        });

    });

    test('Scenario Outline: As a user , I can see back button is disabled @BasicInformation @Regression', async ({ page }) => {
        const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can see back buton is disabled ', async () => {
            await pcbenrollbasicpage.verifyBackButtonDisabled();
        });

    });

    test('Scenario Outline: As a user , I can proceed to Identification page wihout seeing any error or confirmation message for the conifg value 1 @1 @BasicInformation @Regression', async ({ page }) => {
        const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can fill the baic enrollment details with current date', async () => {
            await pcbenrollbasicpage.fillBasicEnrollmentDetailsWithCurrentDate(enrollmentdata);
        });

        await test.step('Then I can click on next button ', async () => {
            await pcbenrollbasicpage.clickOnNextButton();
        });

        await test.step('Then I can move to identification page directly ', async () => {
        const pcbenrollidentificationpage=new PCBEnrollIdentificationPage(page);
        await pcbenrollidentificationpage.verifyEnrollIdentificationPageIsPresent();
            
        });

    });


    test('Scenario Outline: As a user , I can proceed to Identification page after selecting yes from cofirmation message age requirement window for the config value 2 @2 @BasicInformation @Regression', async ({ page }) => {
        const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can fill the baic enrollment details with current date', async () => {
            await pcbenrollbasicpage.fillBasicEnrollmentDetailsWithCurrentDate(enrollmentdata);
        });

        await test.step('Then I can click on next button ', async () => {
            await pcbenrollbasicpage.clickOnNextButton();
        });

        await test.step('Then I can move to identification page by selecting yes from minimum age confirmation dialog ', async () => {
            await pcbenrollbasicpage.VerifyConfirmationWithYesButtonForConfig2(username,password);
        });

    });

    test('Scenario Outline: As a user , I can proceed to Identification page after selecting yes from minimum age requirement window and override with super user for the conifg value 3 @3 @BasicInformation @Regression', async ({ page }) => {
        const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can fill the baic enrollment details with current date', async () => {
            await pcbenrollbasicpage.fillBasicEnrollmentDetailsWithCurrentDate(enrollmentdata);
        });

        await test.step('Then I can click on next button ', async () => {
            await pcbenrollbasicpage.clickOnNextButton();
        });

        await test.step('Then I can move to identification page by selecting yes from minimum age confirmation dialog and override using superuser', async () => {
            await pcbenrollbasicpage.VerifyConfirmationWithYesButtonForConfig3(username,password);
        });

    });

    test('Scenario Outline: As a user , I can see a error message of the minimum page requirement for the config value 4 @4 @BasicInformation @Regression', async ({ page }) => {
        const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can fill the baic enrollment details with current date', async () => {
            await pcbenrollbasicpage.fillBasicEnrollmentDetailsWithCurrentDate(enrollmentdata);
        });

        await test.step('Then I can click on next button ', async () => {
            await pcbenrollbasicpage.clickOnNextButton();
        });

        await test.step('Then I can see a error message', async () => {
            await pcbenrollbasicpage.verifyErrorMessageForConfigValue4();
        });

    });

    test('Scenario Outline: As a user , I can be in the same basic enroll page  after selecting no from minimum age requirement window @3 @BasicInformation @Regression', async ({ page }) => {
        const pcbenrollbasicpage = new PCBEnrollBasicPage(page);
        await test.step('Then I should see PCB enrollment basic Page', async () => {
            await pcbenrollbasicpage.verifyBasicEnrollmentPagePresent();
        });

        await test.step('Then I can fill the baic enrollment details with current date', async () => {
            await pcbenrollbasicpage.fillBasicEnrollmentDetailsWithCurrentDate(enrollmentdata);
        });

        await test.step('Then I can click on next button ', async () => {
            await pcbenrollbasicpage.clickOnNextButton();
        });

        await test.step('Then I can still in the same page by selecting no from minimum age confirmation dialog ', async () => {
            await pcbenrollbasicpage.VerifyConfirmationWithNoButton();
        });

    });

});
