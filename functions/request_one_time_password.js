const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function (req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'you must provide a phone number' });
  }
  const phone = String(req.body.phone).replace(/[^\d]g/, "")


  admin.auth().getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000);
      twilio.messages.create({
        body: 'Your code is' + code,
        to: phone,
        from: '+17819954799'
      }, (err) => {
        if (err) { return res.status(422).send({ error: err }) }
      })
      return admin.database().ref('users' + phone)
        .update({ code: code, codeValid: true }, () => {
          res.status(200).send({ success: true })
        })
    })
    .catch(err => {
      //res.status(422).send({ error: 'User not found!'})
      res.status(422).send({ error: err })
    })
}