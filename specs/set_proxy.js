const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({
        args: [
            '--proxy-server=127.0.0.1:9876',
            '--proxy-bypass-list=<-loopback>',
            '--proxy-auth: userx:passx',
            '--proxy-type: meh'
        ]
    });
    const page = await browser.newPage();
    await page.goto('http://automationpractice.com/');
    await browser.close();
})();
