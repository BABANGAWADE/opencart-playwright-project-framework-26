

import { test, expect } from '@playwright/test'

const appUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"

test.describe('Handling_BootStrap_Hidden_Dropdowns', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(appUrl);

    })

    test('TC_01_Verify Employment Status Bootstrap dropdown', async ({ page }) => {

        //Login step
        const userNameField = page.getByPlaceholder('Username', { exact: true });
        await userNameField.fill('Admin')
        await page.waitForTimeout(2000);

        const passwordField = page.getByPlaceholder('Password', { exact: true });
        await passwordField.fill('admin123');
        await page.waitForTimeout(2000);

        const loginButton = page.getByRole('button', { name: 'Login' });
        await loginButton.click();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')



        //cliknon  PIM LInk
        const pimlink = page.getByRole('link', { name: 'PIM' })
        await pimlink.click();

        //Validate Employement status dropdown

        //locate dropdown
        const employementdrpdwnArrow = page.locator('form i').first();
        await employementdrpdwnArrow.click();

        //Capture all dropdown options 
        const employementDropdownOptions = page.locator('div[role="listbox"] span');
        await expect(employementDropdownOptions).toHaveCount(6);

        //Count number of options 
        const employementdDropdownCount = await employementDropdownOptions.count();
        console.log("All employementDropdownOptions are:", employementdDropdownCount);
        expect(employementdDropdownCount).toBe(6);

        //Get text of all options 
        const allTextValues = await employementDropdownOptions.allTextContents();
        console.log("All dropdown Texts Values are", allTextValues);


        //Iterate through options & --->Each option text should be printed 1 by 1
        for (let i = 0; i < employementdDropdownCount; i++) {
            const singleOption = employementDropdownOptions.nth(i)  //capture singleoption from all options
            const optionText = await singleOption.textContent();    //capture Text of that single option
            console.log("option selected is:", optionText);         //print that singleoption
            if (optionText === 'Full-Time Contract')                //Verify that option
            {
                await singleOption.click();                         //click on same matching option
                await page.waitForTimeout(3000);
                break;
            }

        }


        //Find option "Full-Time Contract" Matching option should be identified
        expect(allTextValues).toContain("Full-Time Contract");
    })


})

/*Why are two options printed?
1. First iteration (i = 0): Playwright reads Freelance and prints it. 
The if condition is false, so it does not click.
2. Second iteration (i = 1): Playwright reads Full-Time Contract and prints it. 
The condition is true, so it clicks this option and exits the loop using break.*/