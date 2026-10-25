
/*
We handle file downloads using the download event. 
First, We register page.waitForEvent('download') event before clicking the download button to avoid missing the event. 
Then we capture the Download object, retrieve the suggested filename by using download.suggestedFilename(); 
and using saveAs() we store the file at the required custome location. 
Finally,we validating that the downloaded file is exists or not using assertion method:-
     const fileExists=fs.existsSync(downloadPath);
     await expect(fileExists).toBeTruthy();

Remember this sequence: waitForEvent('download') → click → capture download → saveAs() → validate file.

Important methods to remember:- 
Method	                                    Purpose
page.waitForEvent('download')-->	Waits for a download to start
download.suggestedFilename()-->  	Gets the filename suggested by the server
download.saveAs(path)--------->	    Saves the downloaded file to the specified location
*/



import { test, expect } from '@playwright/test'
import fs from 'fs'

test('Verify user able to download file successfully', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay');


    const [download] = await Promise.all(
        [page.waitForEvent('download'),                                 //register 'download' event
        page.getByRole('button', { name: 'Download File' }).click()]); //locate download btn element

    await page.waitForTimeout(4000);

    //retrive suggested file name and Verify name
    const fileName = download.suggestedFilename();
    console.log("suggested file name is:", fileName);
    expect(fileName).toContain('sample.txt');


    //save custom location/path into 1 Variable
    const downloadPath = "downloads/sample.txt";

    //save the downloaded file into custom location using SaveAs();
    await download.saveAs(downloadPath);

    //verify file is dowload or not
    const fileExists = fs.existsSync(downloadPath);
    await expect(fileExists).toBeTruthy();

})