const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: 'gharbi.wided@esprit.tn',
			  pass: 'cdrzdbqyiwomudjj'
			}
		  });


var mailOptions = {
  from: 'gharbi.wided@esprit.tn',
  to: email,
  subject: subject,
  text: text,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  
});
}
