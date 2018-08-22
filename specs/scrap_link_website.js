const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({Referer: 'https://news.ycombinator.com/'})
    await page.goto('https://news.ycombinator.com/');
    await page.waitForSelector('a.storylink');
    const stories = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a.storylink'))
        return links.map(link => link.href).slice(0, 10)
    })
    console.log(stories);
    await browser.close();
});