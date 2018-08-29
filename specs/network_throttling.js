const puppeteer = require('puppeteer')

puppeteer.launch({headless: false}).then(async browser => {
    // Create a new tab
    const page = await browser.newPage()
    await page.setViewport({width: 1200, height: 900});

    // Connect to Chrome DevTools
    const client = await page.target().createCDPSession()

    //Set throttling property  to Good 2G network
    await client.send('Network.emulateNetworkConditions', {
        'offline': false,
        'downloadThroughput': 450 * 1024 / 8,
        'uploadThroughput': 150 * 1024 / 8,
        'latency': 20
    })

    // Navigate and take a screenshot
    await page.goto('https://thoughtworks-bangalore.github.io/vodQA/')
    await page.screenshot({path: 'screenshot.png'})
    await browser.close()
})