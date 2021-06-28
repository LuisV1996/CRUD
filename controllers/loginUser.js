/*jshint esversion: 6 */

const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports= (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    User.findOne({username: username}, (error,user)=>{
        if(user){
            bcrypt.compare(password,user.password,(error,same)=>{
                if(same){
                    res.redirect('/');
                }
                else{
                    res.redirect('/auth/login');
                }
            });
        }
        else{
            res.redirect('/auth/login');
        }
    });
};