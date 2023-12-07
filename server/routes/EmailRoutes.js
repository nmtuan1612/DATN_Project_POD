import express from 'express'
import * as nodemailer from 'nodemailer'
const EmailRouter = express.Router()

const MY_EMAIL = 'creoprintpodnmt@gmail.com'

EmailRouter.post('/send_recovery_email', async (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message))
})

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      //   host: 'smtp.forwardemail.net',
      port: 465,
      secure: true,
      service: 'gmail',
      debug: true,
      auth: {
        user: MY_EMAIL,
        pass: 'skowkwtqmcqpibgt'
      },
      tls: {
        rejectUnAuthorized: true
      }
    })

    const mail_configs = {
      from: MY_EMAIL,
      to: recipient_email,
      subject: 'CREOPRINT PASSWORD RECOVERY',
      html: `<!DOCTYPE html>
            <html lang="en" >
            <head>
                <meta charset="UTF-8">
                <title>CodePen - OTP Email Template</title>
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Creoprint support</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Creoprint. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br />Creoprint</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Creoprint Inc</p>
                    <p>Nguyen Manh Tuan</p>
                </div>
                </div>
            </div>
            <!-- partial -->
                
            </body>
            </html>`
    }
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error)
        return reject({ message: `An error has occured` })
      }
      return resolve({ message: 'Email sent succesfuly' })
    })
  })
}

export default EmailRouter
