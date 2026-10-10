
import{test,expect} from '@playwright/test'

test('Handling Multiple dropdown',async({page})=>{

    /*
    to select multiple dropdown all methods are similar as like single select drpdwn,
    only difference is that we need to pass array and provides multiple values of each type
     */

    await page.goto('https://testautomationpractice.blogspot.com/');

    const colordrpdwn= page.locator('#colors');

    //Selecting dropdown using visible text
    await colordrpdwn.selectOption(['Red','Blue']);
    await page.waitForTimeout(2000);
    
    //Selecting dropdown using value attribute
    await colordrpdwn.selectOption([{value:'green'},{value:'yellow'}]);
    await page.waitForTimeout(2000);

    
    //Selecting dropdown using label attribute
    await colordrpdwn.selectOption([{label:'White'},{label:'Green'}]);
    await page.waitForTimeout(2000);

      //Selecting dropdown using Indexing
      await colordrpdwn.selectOption([{index:0},{index:6}])  //output-->Red & green
      await page.waitForTimeout(2000);

      //Validate dropdown count

      const colordrpdwnoptions=colordrpdwn.locator('option');
      expect(colordrpdwnoptions).toHaveCount(7);

      //validate specific calue Yellow from dropdown

      const alldrpdwnText=(await colordrpdwnoptions.allTextContents()).map(Text=>Text.trim())
      await expect(alldrpdwnText).toContain('Yellow');

      console.log("all color dropdown options are--->",alldrpdwnText);

      console.log(("===================================="));
      
      


      //print all colordrpdwn text values

      for(const option of alldrpdwnText)
      {

        console.log(option);
        
      }





    
   
    



})
