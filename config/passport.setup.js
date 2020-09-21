const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../Model/user');


module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID:process.env.clientID,
        clientSecret:process.env.clientSecret,
        callbackURL:'/auth/google/redirect'
        
    }, async (accessToken , refreshToken , profile ,done)=>{

       
        const newUser= {
            googleID:profile.id,
            displayName:profile.displayName
        }
        try{
            let user = await User.findOne({googleID:profile.id});
            if(user){
                done(null,user)
            }else{
                user = await User.create(newUser);
                done(null,user)
            }
        } catch (err){
           console.error(err)
        }
    }

    
    ))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>done(err,user))
})
    
}