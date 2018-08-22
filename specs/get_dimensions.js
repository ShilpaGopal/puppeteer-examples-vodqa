const puppeteer = require('puppeteer');

puppeteer.launch({headless:false}).then(async browser => {
    const page = await browser.newPage();
    await page.goto('http://automationpractice.com/');

    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });

    console.log('Dimensions:', dimensions);

    await browser.close();
});