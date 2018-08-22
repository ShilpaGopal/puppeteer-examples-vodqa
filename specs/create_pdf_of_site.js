const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto('http://automationpractice.com/', {waitUntil: 'networkidle2'});

    await page.setViewport({
        width:1280,
        height: 1024,
        deviceScaleFactor: 2
    });
    await page.pdf({path: './screenshots/home_page.pdf', format: 'A4'});

    await browser.close();
});