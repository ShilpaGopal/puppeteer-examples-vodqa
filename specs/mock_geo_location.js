const puppeteer = require('puppeteer');

const escapeXpathString = str => {
    const splitedQuotes = str.replace(/'/g, `', "'", '`);
    return `concat('${splitedQuotes}', '')`;
};

const clickByText = async (page, text) => {
    const escapedText = escapeXpathString(text);
    const linkHandlers = await page.$x(`//a[contains(text(), ${escapedText})]`);

    if (linkHandlers.length > 0) {
        await linkHandlers[0].click();
    } else {
        throw new Error(`Link not found: ${text}`);
    }
};

puppeteer.launch({
    headless: false}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1600, height: 900});

    await page.evaluateOnNewDocument(function() {
        navigator.geolocation.getCurrentPosition = function (cb) {
            setTimeout(() => {
                cb({
                    'coords': {
                        accuracy: 21,
                        altitude: null,
                        altitudeAccuracy: null,
                        heading:null,
                        latitude: 23.129163,
                        longitude: 113.264435,
                        speed:null
                    }
                })
            }, 1000)
        }
    });


    // const client = await page.target().createCDPSession();
    // await client.send("Emulation.setGeolocationOverride", {
    //     latitude: 23.129163,
    //     longitude: 113.264435,
    //     accuracy: 100
    // });

    // await page.evaluate(`window.navigator.geolocation.getCurrentPosition =
    //         function(success){
    //         var position = {"coords" : {
    //         "latitude": "23.129163",
    //         "longitude": "113.264435"
    //         }
    //         }; success(position);}`);


    await page.goto('https://the-internet.herokuapp.com/geolocation')
    await page.waitForSelector('button')
    await page.click('button')
    await page.waitFor(2000)
    await clickByText(page, `See it on Google`);
    await page.waitForNavigation({waitUntil: 'load'});
    await page.waitFor(4000)
    await page.screenshot({
        path: './screenshots/fake_location.png',
        fullPage: true
    })
    await browser.close();
});