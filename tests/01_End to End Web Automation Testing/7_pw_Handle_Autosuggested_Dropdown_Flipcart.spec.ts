

import { test, expect } from '@playwright/test'

//declare url gobally
const appUrl = "https://www.flipkart.com/";

//declare describe block
test.describe('Handle Autosuggested dropdowns', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(appUrl);



    })

    test('TC_01_Verify_Flipcart Autosuggested dropdown', async ({ page }) => {

        //Verify url
        await expect(page).toHaveURL("https://www.flipkart.com/");

        // Search for a Product 
        //Locate the search box.
        //const searchBox=page.getByPlaceholder('Search for Products, Brands and More',{exact:true});
        const searchBox = page.locator('input[class="nw1UBF v1zwn26"]').first();

        //Verify that the search box is visible. 
        await expect(searchBox).toBeVisible();

        //Enter "smart" into the search field.
        await searchBox.fill("smart");
        await page.waitForTimeout(3000);

        //Capture all the suggestion elements. 
        const allOPtions = page.locator("li[class='Swx5kP']");


        //count number of option
        const count = await allOPtions.count();
        console.log("total number of options are:", count);

        //get all suggested Texts value
        const allautosuggestedText = await allOPtions.allTextContents();
        console.log('all auto suggested Texts values are:', allautosuggestedText);

        //Verify that at least one suggestion is displayed.  
        //expect(allOPtions.first()).toBeVisible();


        //Print all suggestions one by one in the terminal.using for of loop
        for (const allTexts of allautosuggestedText) {
            console.log(allTexts);

        }

        //Print the 5th suggestion (if available). --->smartphone

        if (count >= 5) {
            console.log(
                '5th suggestion:',
                await allOPtions.nth(4).innerText()

            );
           
        }


        //Iterate through options & --->Each option text should be printed 1 by 1
        //at line no-78 script is getting failed.

        
        for (let i = 0; i < count; i++) {
            const singleOption = allOPtions.nth(i)                  //capture singleoption from all options
            const optionText = await singleOption.textContent();    //capture Text of that single option
            console.log("option selected is:", optionText);         //print that singleoption
            if (optionText === 'smart watch waterproof')            //Verify that option
            {
                await singleOption.click();                         //click on same matching option
                break;
            }
        }


    })


})
