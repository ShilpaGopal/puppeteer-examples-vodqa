const puppeteer = require('puppeteer');
const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

puppeteer.launch({
    headless: false,
    executablePath}).then(async browser => {
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
    await page.waitFor(4000)
    await page.screenshot({
        path: './screenshots/fake_location.png',
        fullPage: true
    })
    await browser.close();
});