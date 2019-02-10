// const http = require('http');
const express = require('express');
const port = process.env.PORT || 1337;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const expressWs = require('express-ws')(app);
const prev = ['test', 'data'];
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
const hbs = require('hbs');

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    prev.push(req.body.Body);
    let twl = 'The Robots are coming! Head for the hills!';
    prev.push(" -> " + twl);

    twiml.message(twl);
    console.log(req.body.Body);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

const data = () => {
    return prev.join('\\n');
};

app.get('/', (req, res) => {
    res.render(path.join(__dirname, "index.hbs"), {text: data()});
});

app.ws('/ws', (ws, req) => {
    ws.on('open', () => {
        console.log('ws open');
    });

    ws.on('message', (msg) => {
        ws.send(JSON.stringify(prev));
    });
});

app.listen(port, () => console.log(`listening on ${port}`))
