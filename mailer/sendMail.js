var sgMail = require('@sendgrid/mail');
var MailTemplate = require('./template');

const VerificationEmail = (Email, FirstName, Link) => {
  sgMail.setApiKey('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');
  const msg = {
    to: Email, // Change to your recipient
    from: 'Innocent', // Change to your verified sender
    subject: 'Account Activation',
    text: 'Greetings',
    html: MailTemplate(`<b> Hello ${FirstName}, <br/> kindly use the below link to activate your account <br/>  <b> ${Link} </b>`),
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

module.exports = { VerificationEmail };
