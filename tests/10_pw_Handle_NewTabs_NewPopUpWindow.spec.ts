
/*
Each BrowserContext can have multiple pages. 
A Page refers to a 'single tab' or a 'popup window' within a browser context. 
It should be used to navigate to URLs and interact with the page content.

* if we have multiple pages i.e more than 2 pages then use below approach 
i.e.indexing of page(start with 0)

* if there're only 2 pages are there then go with  approach, i.e parent Page  & chilPage name
and then we can interact with each of elements

*context.waitForEvent('page') waits for a new page in the current browser context.

*When should you use each one?
---> Use page.waitForEvent('popup') when clicking a specific button or link on the current page,
 opens a popup or new tab.

---> Use context.waitForEvent('page') when you want to capture any new page created within
 the browser context, regardless of which existing page opened it.

 Remember: popup = new page opened by the current page; 
 context's page event = new page opened anywhere within that browser context.

*/


import { test, expect } from '@playwright/test'

test.describe('Handling playwright NewTabs_NewPopUpWindows', async () => {

    //Handling New Tabs
    test('TC_01_Verify a new tab opens after clicking a link', async ({ browser }) => {

        //create our own context
        const context = await browser.newContext();

        //by using reference of context we can create Main Page
        const mainPage = await context.newPage();

        //launch url
        await mainPage.goto('https://sdetqa.vercel.app/autoplay');

        //verify title of Main Page
        console.log('Title of Main Page is:', await mainPage.title());
        await expect(mainPage).toHaveTitle('Web Automation Playground');


        //so now before clicking on new window tab button, we needd to register page event first.
        //await context.waitForEvent('page'); //status should be pending,fullfill,rejected

        //now clicking on new tab window button by taking help of main page
        //await mainPage.getByRole('button',{name:'New Tab'}).click();


        //now above both statement we needd to execute parallaly by using promise.all()
        const [newChildPage] = await Promise.all([context.waitForEvent('page'), mainPage.getByRole('button', { name: 'New Tab' }).click()]);

        //now interacting with newChildPage elements
        await expect(newChildPage).toHaveURL('https://playwright.dev/');

        //Verify title of newPage
        console.log('Title of new page opened is:', await newChildPage.title());
        await expect(newChildPage).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');

        //verify number of pages exists
        const numberOfPages = await context.pages();
        console.log('Number of pages exist are:', numberOfPages.length);

        //close ne page tab
        context.close();



    })

    test.only('TC_02_Verify a new popUp Window opens after clicking a link', async ({ browser }) => {

        //create our own context
        const context = await browser.newContext();

        //by using reference of context we can create Main Page
        const mainPage = await context.newPage();

        //launch url
        await mainPage.goto('https://sdetqa.vercel.app/autoplay');

        //verify title of Main Page
        console.log('Title of Main Page is:', await mainPage.title());
        await expect(mainPage).toHaveTitle('Web Automation Playground');


        //so now before clicking on new popup window tab button, we needd to register 'popup' event first.
        //page.waitForEvent('popup'); //status should be pending,fullfill,rejected

        //now clicking on new tab window button by taking help of main page
        //await mainPage.getByRole('button',{name:'New Window'}).click();


        //now above both statement we needd to execute parallaly by using promise.all()
        const [newPopUpPage] = await Promise.all([mainPage.waitForEvent('popup'), mainPage.getByRole('button', { name: 'New Window' }).click()]);

        //now interacting with newChildPage elements
        await expect(newPopUpPage).toHaveURL('https://playwright.dev/');

        //Verify title of newPage
        console.log('Title of new page opened is:', await newPopUpPage.title());
        await expect(newPopUpPage).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');

        //verify number of pages exists
        const numberOfPages = await context.pages();
        console.log('Number of pages exist are:', numberOfPages.length);

        //close ne page tab
        context.close();
    })


})
