const exp = require('express');
const adminApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = require('../Middlewares/verifyToken');
const { executeCommands } = require('../util/script');

let adminscollection;
let userscollection;

adminApp.use((req, res, next) => {
    userscollection = req.app.get('userscollection');
    adminscollection = req.app.get('adminscollection');
    next();
});

adminApp.post('/login', expressAsyncHandler(async (req, res) => {
    // get user credentials from client
    const adminCred = req.body;
    // check for username
    const dbAdmin = await adminscollection.findOne({ username: adminCred.username });
    if (dbAdmin === null) {
        res.send({ message: "Invalid username" });
    } else {
        // check for email
        if (dbAdmin.email !== adminCred.email) {
            res.send({ message: "Invalid email" });
        } else {
            if (dbAdmin.password !== adminCred.password) {
                res.send({ message: "Invalid password" });
            } else {
                // create jwt token and encode it
                const signedToken = jwt.sign({ username: dbAdmin.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
                // send response
                res.send({ message: "Login success", token: signedToken, user: dbAdmin });
            }
        }
    }
}));
adminApp.post("/send-email", expressAsyncHandler(async (req, res) => {
    const { to, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // Your Gmail email
            pass: process.env.PASSWORD // Your Gmail password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL, // Sender email
        to: "udvisha2004@gmail.com", // Recipient email
        subject: "something", // Subject line
        text: "about the project " // Plain text body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', to);
        res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email' });
    }
}));
module.exports=adminApp;

adminApp.post('/execute-scripts', verifyToken, expressAsyncHandler(async (req, res) => {
    executeCommands()
        .then(() => {
            console.log('All commands executed successfully.');
            res.status(200).send('All commands executed successfully.');
        })
        .catch((error) => {
            console.error('Error executing commands:', error);
            res.status(500).send('Error executing commands.');
        });
}));

module.exports = adminApp;
