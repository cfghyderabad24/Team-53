const exp = require('express');
const adminApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = require('../Middlewares/verifyToken');
let adminscollection;
let userscollection;
adminApp.use((req, res, next) => {
    userscollection = req.app.get('userscollection')
    adminscollection = req.app.get('adminscollection');
    
  
    next();
});
adminApp.post('/login', expressAsyncHandler(async (req, res) => {
    // get user credentials from client
    const adminCred = req.body;
    // check for username
    const dbAdmin = await adminscollection.findOne({ username: adminCred.username });
    // console.log(dbAdmin)
    if (dbAdmin === null) {
        res.send({ message: "Invalid username" });
    } else {
        // check for password
        if (dbAdmin.email !== adminCred.email) {
            res.send({ message: "Invalid email" });
        } else {
            if (dbAdmin.password !== adminCred.password) {
                res.send({ message: "Invalid password" });
            } else {
                // create jwt token and encode it
                const signedToken = jwt.sign({ username: dbAdmin.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
                // send res
                res.send({ message: "Login success", token: signedToken, user: dbAdmin });
            }
        }

    }
}));
module.exports=adminApp;