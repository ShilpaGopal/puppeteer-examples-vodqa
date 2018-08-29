const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto('http://automationpractice.com/');
    await page.screenshot({path: './screenshots/homePage.png'});
    await browser.close();
});


