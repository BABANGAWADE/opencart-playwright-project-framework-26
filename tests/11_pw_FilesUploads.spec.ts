import{test,expect} from 'playwright/test'

//declare url globally
const appUrl="https://sdetqa.vercel.app/autoplay";

test.describe('Handling Files Uploads in PLaywright',async()=>{

test.beforeEach('Initiate url',async ({page})=>{
await page.goto(appUrl);
await expect(page).toHaveTitle('Web Automation Playground');

})

test.afterEach('Closing the Apps',async ({page})=>{
await page.close();

})
//Main test
test("Verify user able to upload single file of any format",async({page})=>{

    const singleFileInput= page.locator("#singleFileInput");
    const UploadSingleFileIButton= page.getByText('Upload Single File', { exact: true });
    const singleFileStatusField=page.locator('#singleFileStatus');

    await singleFileInput.setInputFiles('tests/uploads/dummy-1-pages.pdf');
    await UploadSingleFileIButton.click();
    await expect(singleFileStatusField).toHaveText(/dummy-1-pages.pdf/);
    await page.waitForTimeout(5000);

})

})