const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();

    const responses = new Map();
    page.on('response', r => responses.set(r.url().split('/').pop(), r));

    await page.goto('http://automationpractice.com/');
    console.log(responses.get('global.css').fromCache());

    await page.reload();
    console.log(responses.get('global.css').fromCache());

    await page.setCacheEnabled(false);

    await page.reload();
    console.log(responses.get('global.css').fromCache());

    await browser.close();
});