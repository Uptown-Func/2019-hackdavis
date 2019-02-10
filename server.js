// const http = require('http');
const express = require('express');
const port = process.env.PORT || 1337;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
var twl, user;
var prev = [];
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug')

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  prev.push(req.body.Body);
  twl = 'The Robots are coming! Head for the hills!';
  prev.push(" -> " + twl);

  twiml.message(twl);
  console.log(req.body.Body);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

/*app.get('/', (req, res) => {
  //
  //res.send(user);
  res.sendFile(path.join(__dirname, "/index.html"));
  //res.send("This will be all the messages Thank you for your input.");
});

app.get('/data', (req, res) => {
  res.send("This will be all the messages \n Thank you for your input.");
})
// http.createServer(app).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// });*/

app.get('/', (req, res) => {
  let user = prev;
  user = user.join('\\n')
  /*
   * corresponding trick here (read pug file first)!
   * use of \\ to escape the second \ to output the raw "\n"
   * this way we can rely on the browser to interpret the \n
   * otherwise the browser would complain there is EOL on the raw new line :(
   *
   * Also, try `npm i -g nodemon` in your terminal to not need to stop/start the server every time.
   * Look up the nodemon documentation for more/why.
   */
  res.render(path.join(__dirname, "/index.pug"), {text: user})
})

app.listen(port, () => console.log(`listening on ${port}`))
