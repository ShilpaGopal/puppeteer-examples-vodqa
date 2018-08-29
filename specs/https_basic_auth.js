const puppeteer = require('puppeteer');

const userName = 'admin';
const password = 'admin';

puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();

    //const auth = new Buffer(`${userName}:${password}`).toString('base64');
    // console.log(auth)
    // await page.setExtraHTTPHeaders({
    //     'Authorization': `Basic ${auth}`
    // });
    //
    // await page.setExtraHTTPHeaders(headers);

    await page.authenticate({username:userName, password:password});
    await page.goto('http://the-internet.herokuapp.com/basic_auth');
    const text = await page.evaluate(() => document.querySelector('.example').textContent);
    console.log(text)
    await browser.close()
})
