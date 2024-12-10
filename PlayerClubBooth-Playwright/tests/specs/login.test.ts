import { test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

//variable for Login credentials
let username: any;
let password: any;

test.describe('Login suite', () => {

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
    });

    test('Scenario Outline: As a user , I can verify the login page title @Smoke @Login @Regression', async ({ page }) => {
        await test.step(`When the login page is loaded the title should be present`, async () => {
            const loginpage = new Loginpage(page);
            await loginpage.isLoginPagePresent();
            await loginpage.validatetitle();
        });

    });


    test('Scenario Outline: As a user , I can login to the application @Smoke @Login @Regression', async ({ page }) => {
        await test.step(`When I can login to the application using '${username}' and '${password}'`, async () => {
            const loginpage = new Loginpage(page);
            await loginpage.doLogin(username, password);
        });
        await test.step('Then I should see the dashboard screen', async () => {
            const dashboardpage = new DashboardPage(page);
            await dashboardpage.isDashboardPresent();
        });

    });

});

test('sample', async () => {
    let ttt:number=45.67;

    console.log(ttt.toExponential(4))



});
