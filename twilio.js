const dotenv = require('dotenv').config();
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Ya YEET!',
     from: '+19045670713',
     to: '+15103164552'
   })
  .then(message => console.log(message.sid))
  .done();
