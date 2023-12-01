import nodemailer from "nodemailer";
const email: string | undefined = process.env.email;
const password: string | undefined = process.env.email;
const transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: true, // Use TLS
    auth: {
        user: `${email}`,
        pass: `${password}`,
    },
});
type MailOptions = {
    from:string;
    to:string;
    subject:string;
    html:string;
  };

const sendEmail = (mailOptions: MailOptions) => {
    return transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

export {sendEmail, MailOptions}
