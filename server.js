// const http = require('http');
const express = require('express');
const port = process.env.PORT || 1337;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();
var twl, user;
var prev = [];

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  prev.push(req.body.Body);
  twl = 'The Robots are coming! Head for the hills!';
  prev.push(twl);

  twiml.message(twl);
  console.log(req.body.Body);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.get('/', (req, res) => {
  user = prev.join('\n')
  res.send(user);
});
// http.createServer(app).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// });

app.listen(port, () => console.log(`listening on ${port}`))
