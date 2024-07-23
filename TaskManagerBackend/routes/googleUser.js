const express = require('express');
const router = express();
const passport = require('passport'); 
const jwt = require("jsonwebtoken");
require("../passport");


// Auth 
router.get('/auth/google' , passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
}))

// Auth Callback 
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    (req, res) => {
        if (req.user) {
            const token = jwt.sign({ id: req.user.id,  email:req.user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
			console.log(token);
            res.cookie('token', token, { httpOnly: false, secure: true, sameSite: 'Strict' });
            res.redirect('http://localhost:3000/dashboard');
        } else {
            res.redirect('http://localhost:3000/login');
        }
    }
);


module.exports = router;
