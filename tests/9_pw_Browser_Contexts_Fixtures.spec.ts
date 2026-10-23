
/*
A Browser Context in Playwright represents an isolated (independent) browser session. 
Each context has its own cookies, local storage, session storage, and cache. 
This allows you to simulate multiple users within the same browser instance.


Browser ---> Contexts ----> pages/tabs

Browsers ---> chromium, firefox, webkit

Contexts ---> we can have multiple contexts for multiple users/apps for the same browser. 
              provide a way to operate multiple independent browser sessions.
page ---> New Tab, Window, Popup

Why Browser Context?
------------------
Browser Context provides session isolation without launching multiple browsers.

Browser
│
├── Context 1
│     └── Page 1
│
├── Context 2
│     └── Page 2


*/

import{test, expect,chromium} from '@playwright/test'

test.describe('Custom Fixtures in Playwright',async()=>{


    test('handling custom page fixture in Playwright',async({page})=>{

     await page.goto('https://www.saucedemo.com');
     await page.getByPlaceholder('Username',{exact:true}).fill('standard_user');
     await page.getByPlaceholder('Password',{exact:true}).fill('secret_sauce');
     await page.locator('#login-button').click();
     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

})

test('handling custom context fixture in playwright',async({context})=>{

//browser-->context-->page
// context (Incognito window)
/*
if we are using context as custome fixture,then we can create our own pages and we can deal with
every pages.we can create multiple pages.

*/

const page1=await context.newPage();
const page2=await context.newPage();
const page3=await context.newPage();

//using page1 reference
await page1.goto("https://demowebshop.tricentis.com/");
await page1.getByText('Register',{exact:true}).click();
await expect(page1).toHaveURL('https://demowebshop.tricentis.com/register');
await page1.waitForTimeout(5000);


//using page2 reference
await page2.goto('https://www.saucedemo.com');
await page2.getByPlaceholder('Username',{exact:true}).fill('standard_user');
await page2.getByPlaceholder('Password',{exact:true}).fill('secret_sauce');
await page2.locator('#login-button').click();
await expect(page2).toHaveURL('https://www.saucedemo.com/inventory.html');
await page2.waitForTimeout(5000);


//using page3 reference
await page3.goto('https://www.google.com/');
await page3.waitForTimeout(4000);

})

test.only("Handling custom Browser Fixture",async({browser})=>{

    /* browser
    - context 1
        - page1
         -page2

    - context 2
        - page1
        - page2
             */


        //creating context1
const context1=browser.newContext();

//creating page1 using context1
const context1_page1= (await context1).newPage();
(await context1_page1).goto('https://www.google.com/');
await (await context1_page1).waitForTimeout(4000);

//creating page2 using context1
const context1_page2=(await context1).newPage();
(await context1_page2).goto('https://www.saucedemo.com');
//await (await context1_page2).waitForTimeout(4000);
(await context1).close();


//creating context2
const context2=browser.newContext();
const context2_page1=(await context2).newPage();
(await context2_page1).goto('https://www.saucedemo.com');
//(await context2_page1).waitForTimeout(4000);




})


})
