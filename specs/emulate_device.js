const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];

puppeteer.launch({
    headless: false,
    slowMo: 250}).then(async browser => {
    const page = await browser.newPage();
    await page.emulate(iPhonex);
    await page.goto('http://automationpractice.com/');
    await page.focus('#search_query_top')
    await page.keyboard.type('i am typing using puppeteer !');
    await page.screenshot({ path: './screenshots/keyboard.png' })
    await browser.close();
});