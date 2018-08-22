const puppeteer = require('puppeteer');

puppeteer.launch({headless:false}).then(async browser => {
    const page = await browser.newPage();

    // 1. Intercept network requests.
    await page.setRequestInterception(true);

    page.on('request', interceptedRequest => {
        // 2. Ignore requests for resources that don't produce DOM
        const whitelist = ['document', 'script', 'xhr', 'fetch'];

        if (!whitelist.includes(interceptedRequest.resourceType()))
            interceptedRequest.abort();
        else
        // 3. Pass through all other requests.
            interceptedRequest.continue();
    });

    await page.goto('http://automationpractice.com/');
    await browser.close();
});