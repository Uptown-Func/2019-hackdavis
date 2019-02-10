const express = require('express');
const app = express();
const port = process.env.PORT || 1337;
const expressWs = require('express-ws')(app);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const path = require('path');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

const prev = [];
app.locals.prev = prev;

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    let wml = 'The Robots are coming! Head for the hills!';

    prev.push(`${req.body.Body}`);
    prev.push(`${wml}`);

    twiml.message(wml);
    console.log(req.body.Body);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.get('/', (req, res) => {
    console.log(prev);
    res.sendFile(path.join(__dirname, "index.html"));
});

app.ws('/ws', (ws, req) => {
    ws.on('message', (msg) => {
        ws.send(JSON.stringify(prev));
    });
});

app.listen(port, () => console.log(`listening on ${port}`));
