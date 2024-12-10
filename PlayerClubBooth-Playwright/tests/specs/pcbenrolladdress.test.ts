import {test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBEnrollBasicPage from "../pages/pcbenrollbasic.page";
import PCBEnrollIdentificationPage from "../pages/pcbenrollidentification.page";
import PCBEnrollAddressPage from "../pages/pcbenrolladdress.page";
import PCBSearchPage from "../pages/pcbsearchpage";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

//variable for enrollment data
let enrollmentdata:any;


test.describe('PCB Enroll Address Suite', () => {
    test.beforeAll(async () => {
      //reading credentials test data from ${environment}.json file
      username = testdata.credentials.testdata[0].username;
      password = testdata.credentials.testdata[0].password;

      //reading enrollment test data
      enrollmentdata=testdata.enrollment.testdata[0];

    });

    test.beforeEach(async ({ page },testInfo) => {
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

        if(testInfo.tags[0]=="@refuseIDFlow"){
            await test.step('Then I can select refuseid and click on Next button', async () => {
                const pcbenrollidentipage = new PCBEnrollIdentificationPage(page);
                await pcbenrollidentipage.clickRefuseIdAndVerify();
                await pcbenrollidentipage.clickOnNextButton();
            });
            
        }
        else{
            await test.step('Then I can fill the  identification details and click on Next button', async () => {
                const pcbenrollidentipage = new PCBEnrollIdentificationPage(page);
                await pcbenrollidentipage.fillIdentificationEnrollmentDetails(enrollmentdata);
                await pcbenrollidentipage.clickOnNextButton();
            });
        }
        
    });
    

    test('Scenario Outline: As a user , I can navigate to pcb enrollment address page @Address @Smoke @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment address Page', async () => {
            const pcnenrolladdress = new PCBEnrollAddressPage(page);
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });

    });


    test('Scenario Outline: As a user , I can select values from address type dropdown @Address @Regression', async ({ page }) => {
        await test.step('Then I should see PCB enrollment address Page', async () => {
            const pcnenrolladdress = new PCBEnrollAddressPage(page);
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });

        await test.step('Then I can select values from address type dropdown', async () => {
            const pcnenrolladdress = new PCBEnrollAddressPage(page);
            await pcnenrolladdress.verifyAddressTypeDropdownValues();
        });

    });

    test('Scenario Outline: As a user , I can see the error message for addressline1 @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);
        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });

        await test.step('Then I can click on next button without entering any address information', async () => {
            await pcnenrolladdress.clickOnNextButton();
        });

        await test.step('Then I can see the error message for addressline1', async () => {
            await pcnenrolladdress.verifyErrorMessageOfAddressLine1();
        });

    });


    test('Scenario Outline: As a user , I can see the error message for zipcode @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);
        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });

        await test.step('Then I can click on next button without entering any address information', async () => {
            await pcnenrolladdress.clickOnNextButton();
        });

        await test.step('Then I can see the error message for zipcode', async () => {
            await pcnenrolladdress.verifyErrorMessageOfZipcode();
        });

    });

    test('Scenario Outline: As a user , I can see the error message for state @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);
        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });

        await test.step('Then I can click on next button without entering any address information', async () => {
            await pcnenrolladdress.clickOnNextButton();
        });

        await test.step('Then I can see the error message for state', async () => {
            await pcnenrolladdress.verifyErrorMessageOfState();
        });

    });


    test('Scenario Outline: As a user , I can see the error message for city @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);
        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });

        await test.step('Then I can click on next button without entering any address information', async () => {
            await pcnenrolladdress.clickOnNextButton();
        });

        await test.step('Then I can see the error message for city', async () => {
            await pcnenrolladdress.verifyErrorMessageOfCity();
        });

    });
  
    test('Scenario Outline: As a user , I can enter all values in enroll address page @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);

        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });

        await test.step('Then I can enter all the values', async () => {
           await pcnenrolladdress.fillAddressDetails(enrollmentdata);
        });

        await test.step('Then I can verify all the values are entered ', async () => {
            await pcnenrolladdress.verifyEnterdAddressDetails(enrollmentdata);
        });

    });

    test('Scenario Outline: As a user , I can see the search page on clicking cancel button @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);

        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });
        await test.step('Then I can click on cancel button', async () => {
            await pcnenrolladdress.clickOnCancelButton();
        });
        await test.step('Then I should see the search page', async () => {
            const pcbsearchpage=new PCBSearchPage(page);
            pcbsearchpage.verifySearchPageIsPresent();

        });
    });


    test('Scenario Outline: As a user , I can see the Identification page with added data on clicking back button @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);

        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });
        await test.step('Then I can click on back button', async () => {
            await pcnenrolladdress.clickOnBackButton();
        });
        await test.step('Then I should see the search page', async () => {
            const pcbenrollidentipage=new PCBEnrollIdentificationPage(page);
            pcbenrollidentipage.verifyValuesAfterBackFromAnotherForm(enrollmentdata);
        });
    });


    test('Scenario Outline: As a user , I can see the Identification page with refuseid selected on clicking back button @refuseIDFlow @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);

        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });
        await test.step('Then I can click on back button', async () => {
            await pcnenrolladdress.clickOnBackButton();
        });
        await test.step('Then I should see Identification page wih refuseid selected', async () => {
            const pcbenrollidentipage=new PCBEnrollIdentificationPage(page);
            await pcbenrollidentipage.verifyRefuseIDCheckBoxIsChecked();
        });
    });

    test('Scenario Outline: As a user , I can add address using all the types and can see the UI verification on add, edit and delete @refuseIDFlow @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);

        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });
       
        await test.step('Then I can add address using all the types and can see the UI verification on add, edit and delete', async () => {
            await pcnenrolladdress.addAllAddressTypeAndVerifyUI(enrollmentdata);
        });
    });

    test('Scenario Outline: As a user , I can add and edit a address @refuseIDFlow @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);

        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });
        await test.step('Then I can fill the address details', async () => {
            await pcnenrolladdress.fillAddressDetails(enrollmentdata)
        });
        await test.step('Then I can add and edit a address', async () => {
            await pcnenrolladdress.verifyAddandEditAddress(enrollmentdata)
        });
    });


    test('Scenario Outline: As a user , I can add and delete a address @refuseIDFlow @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);

        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });
        await test.step('Then I can fill the address details', async () => {
            await pcnenrolladdress.fillAddressDetails(enrollmentdata)
        });
        await test.step('Then I can add and delete a address', async () => {
            await pcnenrolladdress.verifyDeleteAddress(enrollmentdata)
        });
    });

    test('Scenario Outline: As a user , I can see the mandatory warning message if we are not adding mailing address @refuseIDFlow @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);

        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });
        await test.step('Then I can fill the address details', async () => {
            await pcnenrolladdress.fillAddressDetails(enrollmentdata)
        });
        await test.step('Then I can select only credit slider', async () => {
            await pcnenrolladdress.selectOnlyCreditAddressSliderAndVerify()
        });

        await test.step('Then I can see the warning message on clicking next button', async () => {
            await pcnenrolladdress.clickOnNextButton();
            await pcnenrolladdress.verifyWarningMessageNotSelectingMailingAddress();
        });
    });


    test('Scenario Outline: As a user , I can add bad address and can see bad address lable in the added list @refuseIDFlow @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);

        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });
        await test.step('Then I can fill the address details', async () => {
            await pcnenrolladdress.fillAddressDetails(enrollmentdata)
        });
        await test.step('Then I can select only Bad slider', async () => {
            await pcnenrolladdress.selectOnlyBadAddressSliderAndVerify()
        });

        await test.step('Then I can see the Bad Address label in the address list after adding the bad address', async () => {
            await pcnenrolladdress.clickOnAddAddreessBtn();
            await pcnenrolladdress.verifyBadAddresLabel();
        });
    });

    test('Scenario Outline: As a user , I can see the error message if we select already added type @refuseIDFlow @Address @Regression', async ({ page }) => {
        const pcnenrolladdress = new PCBEnrollAddressPage(page);

        await test.step('Then I should see PCB enrollment address Page', async () => {
            await pcnenrolladdress.verifyEnrollAddressPageIsPresent();
        });
        await test.step('Then I can see the error message if we select already added type', async () => {
            await pcnenrolladdress.verifyErrorMsgForSlectingAlreadyAddedType(enrollmentdata);
        });
    });
});
