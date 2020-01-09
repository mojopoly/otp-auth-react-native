const twilio = require('twilio');
const accountSid = 'ACcc5ff9e4cdb6d719a492bbc527daafa6';
const authToken = 'e3f24f4c6207ee2edac9d05bf823b77a';

module.exports = new twilio.Twilio(accountSid, authToken);


