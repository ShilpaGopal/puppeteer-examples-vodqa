const puppeteer = require('puppeteer');

puppeteer.launch({headless:false}).then(async browser => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
        if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
            interceptedRequest.abort();
        else
            interceptedRequest.continue();
    });
    await page.goto('https://google.com');
    await browser.close();
});