const nodemailer = require('nodemailer')


const sendEmail = async options => {

    //1 create transporter 
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, 
        port: process.env.EMAIL_PORT, 
        auth: {
            user: process.env.EMAIL_USERNAME, 
            password: process.env.EMAIL_PASSWORD
        }
    })


    //2 define email options
    const mailOptions = {
        from: 'Rejan Bajracharya <hello@rejan.com>', 
        to: options.email, 
        subject: options.subject, 
        text: options.message, 
    }

    // actually send the email
    console.log('sending mail')
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
