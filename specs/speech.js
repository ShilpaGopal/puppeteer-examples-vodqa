const puppeteer = require('puppeteer');
const fs = require('fs')
const DEFAULT_TXT = 'Hello, Thanks for joining us in vodqa 2018. Bye until we meet next year';
const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

(async() => {

    const browser = await puppeteer.launch({
        executablePath,
        headless: false, // Speech synth API doesn't work in headless.
        args: [
            '--window-size=0,0', // Launch baby window for fun.
            '--window-position=0,0'],
    });

    const page = await browser.newPage();

    await page.evaluateOnNewDocument(
        txt => window.TEXT2SPEECH = txt, DEFAULT_TXT);
    const html = fs.readFileSync('./html/speech_synth.html', {encoding: 'utf-8'});
    await page.goto(`data:text/html,${html}`);

    const button = await page.$('button');
    button.click();
})();
