const router = require('express').Router();
const passport = require('passport');



//auth logout

//auth with google
router.get('/google' , passport.authenticate('google' ,{
    scope:['profile']
}));

router.get('/google/redirect' , passport.authenticate('google' ,{failureRedirect:'/'}) , (req , res)=>{
     res.redirect("/")
 });

//logout
router.get('/logout' , (req ,res)=>{
    req.logout();
    res.redirect('/')
})


module.exports = router;