
import { test, expect } from '@playwright/test'

//declare url globally
const appUrl = "https://demoqa.com/alerts";

//declare describe block

test.describe('Handling dialogs', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(appUrl);

    })

    test.skip('TC_01_Verify Simple dialog alert', async ({ page }) => {

        //before clicking on alert btn we need to register dialog event handler
        page.on('dialog', (dialog) => {

            //verify type of dialog/alert
            console.log("dialog type is:", dialog.type());
            expect(dialog.type()).toContain('alert');

            //verify dialog/Alert Message
            console.log("dilaog message is:", dialog.message());
            expect(dialog.message()).toContain('You clicked a button');

            //accept dialog
            dialog.accept();


        })
        //click on simple alert button
        await page.locator("#alertButton").click();
        await page.waitForTimeout(4000);
    })

    test.skip('TC_02_Verify Confirm dialog alert', async ({ page }) => {

        //before clicking on alert btn we need to register dialog event handler
        page.on('dialog', (dialog) => {

            //verify type of dialog/alert
            console.log("dialog type is:", dialog.type());
            expect(dialog.type()).toContain('confirm');

            //verify dialog/Alert Message
            console.log("dilaog message is:", dialog.message());
            expect(dialog.message()).toContain('Do you confirm action?');

            //accept dialog
            dialog.accept();
            //dialog.dismiss();


        })
        //click on simple alert button
        await page.locator("#confirmButton").click();
        await page.waitForTimeout(4000);
    })


    test.only('TC_03_Verify Prompt dialog alert', async ({ page }) => {

        //before clicking on alert btn we need to register dialog event handler
        page.on('dialog', (dialog) => {

            //verify type of dialog/alert
            console.log("dialog type is:", dialog.type());
            expect(dialog.type()).toContain('prompt');

            //verify dialog/Alert Message
            console.log("dilaog message is:", dialog.message());
            expect(dialog.message()).toContain('Please enter your name');

            //accept dialog
            dialog.accept("BOBY PATIL");
            //dialog.dismiss();


        })
        //click on simple alert button
        await page.locator("#promtButton").click();
        await page.waitForTimeout(4000);
    })

})

/*

•	If the popups or the alerts are come from the browser or web application it self,then we will able to handle it through automation.
•	But when any popup come from OS(which is window based application)not from WEB(no where belongs to web) those types of popup we cannot automate.
•	Alerts automatically handled by playwright we don’t need to care of them. but still if we want to do some validations, then we can handle them by registering event handler.
•	We need to register dialog handler before the action that triggers the dialog.
Note:- inside the handler method we should not use (await) 

*/
