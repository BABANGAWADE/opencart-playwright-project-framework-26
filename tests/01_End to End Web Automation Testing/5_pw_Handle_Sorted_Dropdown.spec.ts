
import { test, expect } from "@playwright/test"

//declare url globally
const appUrl = "https://testautomationpractice.blogspot.com/";

//declare describe block
test.describe('Handling sorted dropdown', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(appUrl);

    })

    test('TC_01_Verify Dropdown is sorted ', async ({ page }) => {

        //locate all dropdown options
        const allAnimalOptions = page.locator('#animals option'); //already sorted list in dropdown
        await expect(allAnimalOptions).toHaveCount(10);

        //capture allDropdownTextValues
        const allAnimalTextValues = (await allAnimalOptions.allTextContents()).map(Text => Text.trim());

        //printing all values 
        console.log("All Animal Text Values are:", allAnimalTextValues);

        //now storing allAnimalTextValues(originalTexts )values into 2 array


        //original array
        const originalList = allAnimalTextValues;

        //sorted array
        const sortedList = [...allAnimalTextValues].sort();
        //const sortedList=[allAnimalTextValues].sort(); //will change original list & assertion will failed

        /*
        Note:- here in array sort() is mutable.it means it will change original value.so due to this,
        we need to use (...) spread operator.so ti will not change orriginal list
        */

        console.log("original list", originalList);
        console.log("sorted list", sortedList);

        expect(originalList).toEqual(sortedList);

    })

    test.only('Verify Dropdown is sorted or not', async ({ page }) => {

        //locate all dropdown options
        const allCountryOptions = page.locator('#country option'); // Unsorted list in dropdown
        await expect(allCountryOptions).toHaveCount(10);

        //capture allDropdownTextValues
        const allCountryTextValues = (await allCountryOptions.allTextContents()).map(Text => Text.trim());

        //printing all values 
        console.log("All Country Text Values are:", allCountryTextValues);

        //now storing allAnimalTextValues(originalTexts )values into 2 array


        //original array
        const originalList = allCountryTextValues;

        //sorted array
        const sortedList = [...allCountryTextValues].sort();
        //const sortedList=[allAnimalTextValues].sort(); //will change original list & assertion will failed

        /*
        Note:- here in array sort() is mutable.it means it will change original value.so due to this,
        we need to use (...) spread operator.so ti will not change orriginal list
        */

        console.log("original list", originalList);
        console.log("sorted list", sortedList);

        expect(originalList).toEqual(sortedList);

    })

})

