import { test, expect } from '@playwright/test'

//declare the App Url globally
const url = 'https://sdetqa.vercel.app/autoplay#forms';

//create test.describe block

test.describe('Form filling', () => {

    //create beforeEach block
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });


    // 1. Page Load Validation
    test('01_Verify Page Load Validation', async ({ page }) => {

        //Verify page is load successfully
        await expect(page).toHaveURL('https://sdetqa.vercel.app/autoplay#forms')

        //Verify text "AutoPlay" is visible
        const logoText = page.getByText('AutoPlay', { exact: true });
        await expect(logoText).toBeVisible();

    })

    //2. Input Fields Validation

    test('02_Verify Input field validation', async ({ page }) => {

        //Locate Full name field --> Field should be visible & enabled

        const fullNamefield = page.getByLabel('Full name', { exact: true });
        await expect(fullNamefield).toBeVisible();
        await expect(fullNamefield).toBeEnabled();

        //Check maxlength attribute of Full name--> Max length should be 15
        await expect(fullNamefield).toHaveAttribute('maxlength', '15');

        //Enter "John Canedy" in Full name and verify value should be entered correctly
        await fullNamefield.fill("John Canedy");
        await expect(fullNamefield).toHaveValue('John Canedy');
        await page.waitForTimeout(3000);


        //Locate Email field -->Field should be visible
        const emailField = page.getByLabel('Email', { exact: true });
        await expect(emailField).toBeVisible();

        //Enter "Boby95@gmail.com" --> verify Value should match input
        await emailField.fill('Boby95@gmail.com');
        await expect(emailField).toHaveValue('Boby95@gmail.com');
        await page.waitForTimeout(3000);

        //Locate Phone field --> verify Field should be visible
        const phoneNumberField = page.getByLabel('Phone', { exact: true });
        await expect(phoneNumberField).toBeVisible();

        //Enter "+91 9923519286" -->Verify Value should match input
        await phoneNumberField.fill("9923519286");
        await expect(phoneNumberField).toHaveValue("9923519286");
        await page.waitForTimeout(3000);

        //Locate Address  field--->Verify  Field should be visible
        const addressField = page.getByLabel('Address', { exact: true });
        await expect(addressField).toBeVisible();
        await addressField.fill("wakad pune \n chichwad PCMC");
        await page.waitForTimeout(3000);
        await expect(addressField).toHaveValue("wakad pune \n chichwad PCMC")
          })

          test ('03_Verify Radio Button (Gender) Validation', async({page})=>{

            //Locate Male &  radio buttons and Verify--> should be visible
          const mailradioBtn= page.getByLabel('Male', { exact: true })
          await expect(mailradioBtn).toBeVisible();
          await expect(mailradioBtn).not.toBeChecked();
          await mailradioBtn.check();
          await expect(mailradioBtn).toBeChecked();

          await page.waitForTimeout(2000);

          //Locate Female &  radio buttons and Verify--> should be visible
          const femaleradioBtn= page.getByLabel('Female',{exact:true});
          await expect(femaleradioBtn).toBeVisible();
          await expect(femaleradioBtn).not.toBeChecked();
          await femaleradioBtn.check();
          await expect(femaleradioBtn).toBeChecked();
          })

})