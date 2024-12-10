import {test } from "@playwright/test";
import Loginpage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";
import PCBHomePage from "../pages/pcbhome.page";
import PCBSearchPage from "../pages/pcbsearchpage";
import PCBEnrollBasicPage from "../pages/pcbenrollbasic.page";
import PCBPlayerDetailPage from "../pages/pcbplayerdetailpage";
const testdata = require(`../testdata/${String(process.env.ENVIRONMENT)}.json`);

let username: any;
let password: any;
let dburl:any;
let searchtestdata1:any; let searchtestdata2:any; let searchtestdata3:any;


test.describe('PCB Search Page Suite', () => {
    test.beforeAll(async () => {
      //reading credentials test data from ${environment}.json file
       username = testdata.credentials.testdata[0].username;
       password = testdata.credentials.testdata[0].password;
       dburl=testdata.credentials.testdata[0].dbpm;

       searchtestdata1=testdata.search.testdata[0];
       searchtestdata2=testdata.search.testdata[1];
       searchtestdata3=testdata.search.testdata[2];

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

    });
    

    test('Scenario Outline: As a user , I can navigate to pcb search page @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

    });


    test('Scenario Outline: As a user , I can verify search button is working @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using any matching text', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.playerid);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });


    test('Scenario Outline: As a user , I can verify search is working for comma separated value @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using comma separated text', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.firstname+","+searchtestdata1.playerid);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });


    test('Scenario Outline: As a user , I can see search instruction text @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('Then I can see the search instruction text', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchInstructionText();
        });

    });

    test('Scenario Outline: As a user , I can verify the  cancel icon in search field @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can type the search text in search field', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.typeInSearchField(searchtestdata1.firstname);
        });

        await test.step('Then I can click cancel icon in search field', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchCancelIcon(searchtestdata1.firstname);
        });

    });


    test('Scenario Outline: As a user , I can re enter the search field and do search @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can type the search text in search field', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.typeInSearchField(searchtestdata1.firstname);
        });

        await test.step('Then I can click cancel icon in search field', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchCancelIcon(searchtestdata1.firstname);
        });
        await test.step('When I can re-eneter the text and do the search', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.playerid);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });
   
    test('Scenario Outline: As a user , I can enroll button in the search page @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('Then I can see enroll button Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifyEnrollButtonInSearchPage();
        });

    });


    test('Scenario Outline: As a user , I can navigate to enroll button from the search page @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('Then I can see enroll button Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifyEnrollButtonInSearchPage();
        });

        await test.step('When I can click on enroll button of Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.clickEnrollBtn();
        });

        await test.step('Then I can see pcb enroll page', async () => {
            const pcbenrollpage = new PCBEnrollBasicPage(page);
            await pcbenrollpage.verifyBasicEnrollmentPagePresent();
        });

    });

    test('Scenario Outline: As a user , I can veriy search is working for fullname @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using fullname', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.firstname+","+searchtestdata1.middlename+","+searchtestdata1.lastname);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });

    test('Scenario Outline: As a user , I can veriy search is working for SSN @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using SSN', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.ssnid);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });

    test('Scenario Outline: As a user , I can veriy search is working for DriverLicenseID @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using  DriverLicens', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata2.licenseid);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata2);
        });

    });

    test('Scenario Outline: As a user , I can veriy search is working for Players DOB @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using DOB of a player', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.dob);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });

    test('Scenario Outline: As a user , I can veriy search is working for PlayerID @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using PalyerID', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.playerid);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });

    test('Scenario Outline: As a user , I can veriy search is working for FirstName of a player @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using FirstName of a player', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.firstname);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });

    
    test('Scenario Outline: As a user , I can veriy search is working for Firstname and MiddleName of a player @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using FirstName and MiddleName of a player', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.firstname+","+searchtestdata1.middlename);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });

    test('Scenario Outline: As a user , I can veriy search is working for FirstName and LastName of a player @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using FirstName and LastName of a player', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.firstname+","+searchtestdata1.lastname);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });


    test('Scenario Outline: As a user , I can veriy search is working for Card Number of a player @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using Card Number of a player', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.cardnumber);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });


    test('Scenario Outline: As a user , I can see the error message for less than three char text while searching a player @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using less than three char text', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.lessthan3digit);
        });

        await test.step('Then I should see the error message', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifyErrorMessageforLessThan3chars();
        });

    });

    test('Scenario Outline: As a user , I can see the error message for more than fifty char text while searching a player @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using more than 50 char text', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.morethan50char);
        });

        await test.step('Then I should see the error message', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifyErrorMessageforGreaterThan50chars();
        });

    });


    test('Scenario Outline: As a user , I can verify search is working for three comma separated value @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using comma separated text', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.firstname+","+searchtestdata1.middlename+","+searchtestdata1.lastname);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

    });

    test('Scenario Outline: As a user , I can see the error message for empty text @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using empty char text', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.emptytext);
        });

        await test.step('Then I should see the error message', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifyErrorMessageforLessThan3chars();
        });

    });

    test('Scenario Outline: As a user , I can verify search is working for Passport Number of a player @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using Passport Number of a player', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata3.passportnumber);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata3);
        });

    });

    test('Scenario Outline: As a user , I can see no serach result message for invalid search criteria @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using Passport Number of a player', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch("south");
        });

        await test.step('Then I can see the no results found error message', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifyNoResultFoundMessage();
        });

    });

    test('Scenario Outline: As a user , I can see Basic Tab in player details page @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using playerid of a player', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.playerid);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

        await test.step('Then I can see the Basic Tab in player details page', async () => {
            const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
            await pcbplayerdetailpage.verifyBasicTabIsPresent();
        });

    });

    test('Scenario Outline: As a user , I can see Marketing Tab in player details page @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using playerid of a player', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.playerid);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

        await test.step('Then I can see the Marketing Tab in player details page', async () => {
            const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
            await pcbplayerdetailpage.verifyMarketingTabIsPresent();
        });

    });

    test('Scenario Outline: As a user , I can see Card Tab in player details page @Search @Regression', async ({ page }) => {
        await test.step('Then I should see PCB Search Page', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchPageIsPresent();
        });

        await test.step('When I can do the search using playerid of a player', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.doSearch(searchtestdata1.playerid);
        });

        await test.step('Then I can see the search result', async () => {
            const pcbsearchpage = new PCBSearchPage(page);
            await pcbsearchpage.verifySearchResultIsPresent(searchtestdata1);
        });

        await test.step('Then I can see the Card Tab in player details page', async () => {
            const pcbplayerdetailpage = new PCBPlayerDetailPage(page);
            await pcbplayerdetailpage.verifyCardsTabIsPresent();
        });

    });


});
