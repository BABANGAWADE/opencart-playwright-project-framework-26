
/*
In Playwright with TypeScript, we handle iframes mainly using frameLocator() or frame(). 
Unlike Selenium, Playwright does not require us to explicitly switch into an iframe and switch back to the parent frame.

In our banking application testing, if a third-party verification or payment component is embedded inside an iframe, 
I can use page.frameLocator() to locate the iframe and interact with its fields and buttons. 
For parent-page elements, I use the normal page.locator() or getByRole() methods.
If I need to interact with both parent and child frames, 
I can use the appropriate locator for each directly. 
For nested iframes, I can chain frameLocator() calls. This makes the test code more readable and maintainable.




*/

import { test, expect } from '@playwright/test'

test('Verify user able to handle simple frame', async ({ page }) => {

    await page.goto('https://demoqa.com/frames');

    const frame1 = page.frameLocator('#frame1');

    const frame1Text = frame1.getByText('This is a sample page', { exact: true })
    console.log('frame1 tetx is:', frame1Text);
    await expect(frame1Text).toHaveText('This is a sample page')

})

test.only('Verify user able to handle Nested-iFrame',async({page})=>{

await page.goto('https://demoqa.com/nestedframes');

//Verify  child frame text element

const parentFrame= page.frameLocator('#frame1');
const childFrame=parentFrame.frameLocator('iframe').getByText('Child Iframe');
const childFrameText=childFrame.getByText('Child Iframe',{exact:true});
console.log(childFrameText);
await expect(childFrameText).toHaveText('Child Iframe');



//await page.frameLocator('#frame1').locator('iframe:visible')
//await page.frameLocator('#frame1').frameLocator('iframe').getByText('Child Iframe')

})






