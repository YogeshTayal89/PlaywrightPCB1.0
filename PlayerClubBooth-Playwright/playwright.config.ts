import { defineConfig} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
const RPconfig = {
  apiKey: String(process.env.RPAPIKEY),
  endpoint: String(process.env.RPENDPOINT),
  project: String(process.env.RPPROJECT),
  launch: 'PCBLaunch',
  attributes: [
    {
      key: 'tool',
      value: 'playwright',
    },
    {
      value: String(process.env.RPEXEDETAILS),
    },
  ],
  description: String(process.env.RPEXEDETAILS),
  includeTestSteps: true
};
export default defineConfig({
  //test directory  and common config
  testMatch: "tests/specs/*.ts",
  testDir: './tests',
  timeout: 5 * 60 * 1000,
  use: {
    baseURL: process.env.BASEURL,
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout:Number(process.env.ACTIONTIMEOUT),
    navigationTimeout: Number(process.env.NAVIGATIONTIMEOUT)
  },

  //For parallel execution
  workers: 1,
  reportSlowTests: null,

  //For report integration
  reporter: process.env.RP == 'true' ? [["./custom-reporters/dashboard-reporter.ts"],
  ['@reportportal/agent-js-playwright', RPconfig],
  ["html", { open: 'never' }],
  ["dot"]

  ] : [["./custom-reporters/dashboard-reporter.ts"],
  ["html", { open: 'never' }],
  ["dot"]

  ],

  //Assertion time out
  expect: {
    timeout: Number(process.env.ASSERTIONTIMEOUT)
  },


  maxFailures:0,

  //global tear down and setup script
  globalTeardown: "./test-setup/global-teardown.ts",
  globalSetup:"./test-setup/global-setup.ts",

  //For multi browser setup
  projects: [
    {
      name: 'chrome',
      use: {
         browserName:'chromium',
         channel: 'chrome',
         viewport:null,
         launchOptions: {
          args: ["--disable-web-security","--start-maximized","--guest"],
          headless:false,

        },

      },
    },

    {
      name: 'chromeheadless',
      use:  {
        channel: 'chrome',
        viewport:{ width: 1920, height: 1080 },
        launchOptions: {
          args: ["--disable-web-security"],
          headless:true,
        },
     },
    },

    {
      name: 'firefox',
      use: {
         browserName:'firefox',
         channel: 'firefox',
         viewport:{ width: 1920, height: 1080 },
         launchOptions: {
          args: ["--disable-web-security"],
          headless:false,

        },

      },
    },

    {
      name: 'safari',
      use: {
         browserName:'webkit',
         channel: 'webkit',
         viewport:{ width: 1920, height: 1080 },
         launchOptions: {
          args: ["--disable-web-security"],
          headless:false,

        },

      },
    },
    
  ],

});