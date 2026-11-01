
/*
1.click():---> await locator.click()	
[Click a specific element using its locator; 
best choice for buttons, links, checkboxes, and other standard controls.]

2.doubleClick():---> await locator.dblclick()	
[Double-click a located element, such as a row or item that opens on double-click.]

3.hover():---> await locator.hover()	
[Move the pointer over an element to reveal a menu, tooltip, or hover state.]

4.dragTo():---> await source.dragTo(target)	
[Drag one element and drop it onto another, such as reordering cards or moving an item between lists.]

5.Rightclick():---> await locator.click({ button: 'right' })	
[Perform a right-click or configure click behavior such as modifiers and click count]

*/

import{test,expect} from '@playwright/test'

test('Verify Mouse Hover Action', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/hovers');

//mouse hover on userProfile1
const user1Profile= page.locator('div[class="figure"]').first();
await user1Profile.hover();
await page.waitForTimeout(5000);

//verify user1Profile Text
const user1Text= page.getByText('name: user1',{exact:true});
await expect(user1Text).toHaveText('name: user1');

//mouse hover on userProfile2

const user2Profile= page.locator('div[class="figure"]').nth(1);
await user2Profile.hover();
await page.waitForTimeout(5000);

//verify user2Profile Text
const user2Text= page.getByText('name: user2',{exact:true});
await expect(user2Text).toHaveText('name: user2');


//mouse hover on userProfile3

const user3Profile= page.locator('div[class="figure"]').nth(2);
await user3Profile.hover();
await page.waitForTimeout(5000);

//verify user3Profile Text
const user3Text= page.getByText('name: user3',{exact:true});
await expect(user3Text).toHaveText('name: user3');


})

test("Verify doubleClick Mouse Action",async({page})=>{

    await page.goto('https://testpages.eviltester.com/pages/interaction/javascript-events/');

    await page.getByRole('button',{name:'ondoubleclick'}).dblclick();
    await page.waitForTimeout(5000);

    //verify doubleclick status
    const doubleClickStatus= page.locator('#ondoubleclickstatus');
    await expect(doubleClickStatus).toHaveText('Event Triggered');


})

test('Verify Drag and Drop Mouse Action',async({page})=>{

    await page.goto('https://testpages.eviltester.com/pages/interaction/drag-drop/');
    
    //Drag Lable1
    const sourcedrag1= page.locator('#draggable1');
    const targetdrag1=page.locator('#droppable1');
    await sourcedrag1.dragTo(targetdrag1);
    await page.waitForTimeout(5000);

    //verify text after dropped
   const droppableStatus1= page.locator('#droppable1 p');
   await expect(droppableStatus1).toHaveText('Dropped!');

    //Drag Lable2
    const sourcedrag2= page.locator('#draggable2');
    const targetdrag2=page.locator('#droppable2');
    await sourcedrag2.dragTo(targetdrag2);
    await page.waitForTimeout(5000);

    //verify text after dropped
   const droppableStatus2= page.locator('#droppable2 p');
   await expect(droppableStatus2).toHaveText('Dropped!');


})

test.only('Verify Right Click Mouse Action',async({page})=>{

    await page.goto('https://vinothqaacademy.com/mouse-event/');
    await page.getByRole('button',{name:'Right Click Me'}).click({button:'right'})
    await page.waitForTimeout(5000);

    //capture all options
    const allOptions= page.locator('#contextMenu button');
    const optionText=await allOptions.allInnerTexts();
    console.log('right click options are:',optionText);
    
    //#contextMenu button

})


