const puppeteer = require('puppeteer');

puppeteer.launch({headless:false}).then(async browser => {
    const page = await browser.newPage();
    await page.tracing.start({path: './trace/trace.json', screenshots: true});
    await page.goto('http://automationpractice.com/');
    await page.tracing.stop();
    await browser.close();
});