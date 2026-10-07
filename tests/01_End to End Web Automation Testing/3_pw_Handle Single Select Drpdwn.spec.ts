
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

//selects dropdwon values 1.using Visible text 






})