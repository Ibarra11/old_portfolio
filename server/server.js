const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();
app.use(bodyParser.json());


app.use( express.static( `${__dirname}/../build` ));
// it is an object that is able to send email

app.post('/api/send', (req, res) => {
    console.log('test');
    let {name, email, message} = req.body;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PSW
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Message from alanibarra.com',
        text: `Name: ${name} \nEmail: ${email} \nMessage: ${message}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200);
        }
    });

})

app.listen(3006, () => console.log('Server running'));