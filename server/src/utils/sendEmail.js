import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_SERVER,
	port: process.env.SMTP_PORT,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export default async function main(token, type = "registration") {
	// send mail with defined transport object

	let email = {};

	switch (type) {
		case "registration":
			email = {
				from: '"Catspotter" <hittaller.anna@gmail.com>', // sender address
				to: "cicapracli@gmail.com", // list of receivers
				subject: "Welcome to Catspotter 🐾",
				text: "Welcome to Catspotter! Hi there, We're excited to have you on board! Just one more step to go to complete your registration, please click the button below to verify your email address. Thank you for joining us.  Cheers, Anna from Catspotter", // plain text body
				html: ` 
				<div style="max-width: 600px; margin: 0 auto;">
				<h2 style="color: #0066cc;">Welcome to Catspotter!</h2>
				<p>
					Hi there,<br>
					<br>
					We're excited to have you on board! Just one more step to go to unlock the full potential of the Catspotter network.
				</p>
				<p>
					To complete your registration, please click the button below to verify your email address:
				</p>
				<div style="text-align: center; margin-top: 20px;">
					<a href="http://localhost:3000/emailconfirm/${token}" style="display: inline-block; background-color: #0066cc; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
				</div>
				<p>
					Thank you for joining us. 
				</p>
				<p>
					Cheers,<br>
					Anna from Catspotter
				</p>
			</div>
      		`, // html body
			};

			break;
		case "forgotPass":
			email = {
				from: '"Catspotter" <hittaller.anna@gmail.com>', // sender address
				to: "cicapracli@gmail.com", // list of receivers
				subject: "Hello ✔ Instructions for changing your password", // Subject line
				text: "Hello world! Instructions for changing your password", // plain text body
				//rewrite email body *********************************************************
				html: `<b>Follow the following instructions:</b>
				<p>click <a href="http://localhost:3000/resetpassword/${token}">here</a> to change your password</p>
				`, // html body
			};

			break;
		default:
			return null;
	}

	const info = await transporter.sendMail(email);

	//console.log("Message sent: %s", info.messageId);
	//console.log(email)
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
