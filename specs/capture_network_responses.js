const puppeteer = require('puppeteer');

puppeteer.launch({headless:false}).then(async browser => {
    const page = await browser.newPage();
    const response = await page.goto('http://automationpractice.com/');
    page.on('response', response => {
        const req = response.request();
        console.log(req.method, response.status, req.url);
    });
    await browser.close();
});