/*jshint esversion: 6 */

const User = require('../models/user');
const path = require('path');

module.exports = (req, res)=>{

        let user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.save((error,user)=>{
            if(error) {
                return res.redirect('/users/register');
            }
            res.redirect('/');
        });
};
