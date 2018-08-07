const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.tracing.start({path: './trace/trace.json'});
    await page.goto('hhtps://google.com');
    await page.tracing.stop();
    await browser.close();
});