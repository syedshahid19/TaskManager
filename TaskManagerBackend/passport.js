const passport = require('passport'); 
const googleUser = require('./models/googleUser');
const GoogleStrategy = require('passport-google-oauth2').Strategy; 


passport.use(new GoogleStrategy({ 
	clientID:process.env.GOOGLE_CLIENT_ID,
	clientSecret:process.env.GOOGLE_CLIENT_SECRET,
	callbackURL:"/auth/google/callback", 
	passReqToCallback: true,
	
}, 
async(request, accessToken, refreshToken, profile, done) =>{ 
    // console.log("Google profile:", profile);
	const existingUser = await googleUser.findOne({ email: profile.emails[0].value });
	if (existingUser) {
        return done(null, existingUser);
    }
	const newUser = new googleUser({
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.given_name,
        lastName: profile.family_name,
      });
      await newUser.save();
      done(null, newUser);
} 
));

passport.serializeUser((user , done) => { 
	done(null , user.id); 
}) 
passport.deserializeUser(async(id, done) =>{ 
	const user1 = await googleUser.findById(id);
  done(null, user1);
}); 

