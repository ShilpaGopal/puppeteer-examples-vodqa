const WebSocket = require('ws');
var fs = require('fs');

ws = new WebSocket("ws://localhost:9222/devtools/page/029240A56BAC590FD0AE83A022F12514");

ws.onopen = function () {
    console.log('websocket is connected ...');
    ws.send('{"id":1,"method":"Page.enable","params":{}}', (err) => {
        if (err) {
            console.log(err);
        }else{
            ws.send('{"id":2,"method":"Page.navigate","params":{"url":"https://thoughtworks-bangalore.github.io/vodQA/"}}', (err) => {
                if (err) {
                    console.log(err);
                }else{
                    ws.send('{"id":3,"method":"Page.captureScreenshot","params":{}}', (err) => {
                        if (err) {console.log(err);}
                    });
                }
            });
        }
    });
}

ws.onmessage = function (ev) {
    response = JSON.parse(ev.data);
    if(response.id == 3){
        const buffer = new Buffer(response.result.data, 'base64');
        fs.writeFile("./screenshots/ws_screenshot.png", buffer, function(err) {
            if(err) {return console.log(err);}
            console.log("The ScreenShot is Captured");
            ws.close();
        });
    }
}




















