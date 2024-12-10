import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
import * as fs from 'fs';

/**
 * This class is used to create the custom report for dashboard integration
 */

export default class DashboardReporter implements Reporter {

    reporttext: string; //Used to create xml template

    resulttemplate: string; //used to create testcases part

    count: number = 0; // counter for testcase

    /**
     * This method is called before all the test begin
     * @param config 
     * @param suite 
     */
    onBegin(config: FullConfig, suite: Suite): void {
        this.reporttext = "<?xml version='1.0' encoding='UTF-8'?>";
        this.reporttext = this.reporttext.concat("\n<testResults version='1.0'>");
    }

    /**
     * this method is called before a test begin
     * @param test 
     * @param result 
     */
    onTestBegin(test: TestCase, result: TestResult): void {
        this.resulttemplate = "";
    }

    /**
     * This method is called before the test end
     * @param test 
     * @param result 
     */
    onTestEnd(test: TestCase, result: TestResult): void {
        this.count++;
        let tcname: string = this.count + " - " + test.title;
        let timetaken: string = String(result.duration);
        let status: string = result.status;
        let tcstatus: string;
        let message: string;
        if (status == 'passed') {
            tcstatus = "true";
            message = "Passed. No issues observed during execution.";
        }
        else {
            tcstatus = "false"
            message = "Failed.Due to " + (result.error?.message)?.toString().replace(/<(.|\n)*?>/g, '');
            
        }


        this.resulttemplate = "\n<httpSample t='" + timetaken + "'  s='" + tcstatus + "' lb='" + tcname + "'>"
        this.resulttemplate = this.resulttemplate.concat("\n<sample></sample>");
        this.resulttemplate = this.resulttemplate.concat("\n<responseData class='java.lang.String'>" + message + "</responseData>");
        this.resulttemplate = this.resulttemplate.concat("\n</httpSample>");
        this.reporttext = this.reporttext.concat(this.resulttemplate);

        console.log("\n=======================================");
        console.log ("Test Name : "+tcname);
        console.log ("Execution Time : "+timetaken);
        console.log ("Status : "+status);
        console.log ("Message : "+message);


    }

    /**
     * This method is called after all the test end
     * @param result 
     */
    onEnd(result: FullResult): void | Promise<void> {
        this.reporttext = this.reporttext.concat("\n</testResults>");
        fs.writeFileSync('./custom-reporters/DashboardReport/DashboardReport.xml', this.reporttext);
    }

}