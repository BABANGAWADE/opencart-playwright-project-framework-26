
import { test, expect } from '@playwright/test'

//declare url globally
const url = 'https://sdetqa.vercel.app/autoplay#forms';

//declare test.describe block
test.describe('checkboxes', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(url);
    })


    test('TC_1_Verify SuncheckBox is Selected ', async ({ page }) => {

        //Select Sun checkbox  and verify -->Sun should be checked

        const sunCheckbox = page.getByLabel('Sun', { exact: true });
        await expect(sunCheckbox).toBeVisible();
        await sunCheckbox.check();
        await expect(sunCheckbox).toBeChecked();
        await page.waitForTimeout(2000);

    })

    test('TC_2_Verify User able to select all Checkboxes', async ({ page }) => {

        /*for that we need to store all Days lable into an string Array & using this all Days lables 
        we needd to check all the checkboxes
        */

        //so for that  storing all Days Labels in the form of string using below line

        const allDayscheckBoxes: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        //then we need to applying map on the all Days labels checkboxes as  it is returing arrays of checkBoxes
        const checkboxes = allDayscheckBoxes.map(index => page.getByLabel(index));

        /*
        logic of above line:-
        
        i will Take each day from the array and use that day as the label inside page.getByLabel().
        And map() collects those results into a new array. */

        //count number of checkboxes present

        console.log("Number of checkboxes are -->", checkboxes.length);
        expect(checkboxes.length).toBe(7);

        //now select all checkboxes  by using for of loop and assert each 

        for (const checkbox of checkboxes) {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
            await page.waitForTimeout(3000);
        })
    
    


        test('TC_3_Verify User able to Uncheck last 3 (Fri, Sat, Sun) and verify', async ({ page }) => {

          const allDayscheckBoxes: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        //then we need to applying map on the all Days labels checkboxes as  it is returing arrays of checkBoxes
        const checkboxes = allDayscheckBoxes.map(index => page.getByLabel(index));

            for (const checkbox of checkboxes.slice(-3)) {

                await checkbox.uncheck();
                expect(checkbox).not.toBeChecked();
            }
            await page.waitForTimeout(3000);

        })


        test('TC_4_Verify User able to Toggle all checkboxes', async ({ page }) => {

            const allDayscheckBoxes: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        //then we need to applying map on the all Days labels checkboxes as  it is returing arrays of checkBoxes
        const checkboxes = allDayscheckBoxes.map(index => page.getByLabel(index));

            /*Toggle all checkboxes Checked → unchecked, unchecked →checked
            select the checkboxes which are not selected and uncheck the checkboxes which are selected
            */

            for (const checkbox of checkboxes) {
                if (await checkbox.isChecked()) {
                    await checkbox.uncheck();
                    await expect(checkbox).not.toBeChecked();
                    await page.waitForTimeout(3000);

                }
                else {
                    await checkbox.check();
                    expect(checkbox).toBeChecked();

                }
                await page.waitForTimeout(3000);
            }

        })

        test('TC_5_Verify User able to select checkboxes by indexing 1, 3,5', async ({ page }) => {

            //Randomly select check boxes by index positions===here im selecting [1,3,5]-->Tue,Thu,Sat

            /*creating an array containing the positions/indexes of the checkboxes you want to select.
            //Take each value from the indexes array, one by one, and store it in i.
            //ive me the checkbox located at index i in the checkboxes array.
            */

            const allDayscheckBoxes: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        //then we need to applying map on the all Days labels checkboxes as  it is returing arrays of checkBoxes
        const checkboxes = allDayscheckBoxes.map(index => page.getByLabel(index));

            const indexes: number[] = [1, 3, 5]
            for (const i of indexes) {
                await checkboxes[i].check();

                await expect(checkboxes[i]).toBeChecked();
            }
            await page.waitForTimeout(2000);



        })
    })


