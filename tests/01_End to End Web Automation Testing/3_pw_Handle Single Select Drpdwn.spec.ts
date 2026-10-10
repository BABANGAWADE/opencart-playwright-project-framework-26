

import{test,expect} from '@playwright/test'

test('Handle Single Select dropdown',async({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");
await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/")
await expect(page).toHaveTitle("Automation Testing Practice");
await page.waitForTimeout(2000);

//capture country dropdown element 
const countrydrpdwn=page.locator('#country');

//selects dropdwon values 1.using Visible text 
await countrydrpdwn.selectOption('United States');
await expect(countrydrpdwn).toHaveValue('usa');
await page.waitForTimeout(2000);

//selects dropdwon values 2.using Value attribute
await countrydrpdwn.selectOption({value:'germany'});
await expect(countrydrpdwn).toHaveValue('germany');
await page.waitForTimeout(2000);

//selects dropdwon values 3.using Label attribute
await countrydrpdwn.selectOption({label:'Australia'});
await expect(countrydrpdwn).toHaveValue('australia');
await page.waitForTimeout(2000);

//selects dropdwon values 4.using Index 
await countrydrpdwn.selectOption({index:9});
await expect(countrydrpdwn).toHaveValue('india');
await page.waitForTimeout(2000);

//validate  drpdwn options count
const drpdwnoptions=countrydrpdwn.locator('option'); //locator chaining
await expect(drpdwnoptions).toHaveCount(10);

//Validate specific value(india)in drpdwn

const alldrpdwnText=(await drpdwnoptions.allTextContents()).map(Text => Text.trim());
 expect(alldrpdwnText).toContain("India");

 console.log("all dropdown text values are--->",alldrpdwnText) //printing all texts Values

 console.log("===========================");
 

 //printing all Text Values using for of loop

 for(const option of alldrpdwnText )
 {
    console.log(option);
 }

 
})