const puppeteer = require('puppeteer');
const crypto = require('crypto');

puppeteer.launch({headless:false}).then(async browser => {
    const page = await browser.newPage();
    page.on('console', msg => console.log(msg.text()));

    await page.exposeFunction('md5', text =>
        crypto.createHash('md5').update(text).digest('hex')
    );
    await page.evaluate(async () => {
        // use window.md5 to compute hashes
        const myString = 'PUPPETEER';
        const myHash = await window.md5(myString);
        console.log(`md5 of ${myString} is ${myHash}`);
    });
    await browser.close();
});
