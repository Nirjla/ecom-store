const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../model/User');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const { GOOGLE, JWT } = require('../constants');

passport.use(new GoogleStrategy({
    clientID: GOOGLE.CLIENT_ID,
    clientSecret: GOOGLE.CLIENT_SECRET,
    callbackURL: GOOGLE.CALLBACK_URL,
    passReqToCallback: true,
},
    async (request, accessToken, refreshToken, profile, done) => {
        console.log(profile);

        // Find or create user logic
      //   let user = await User.findOne({ googleId: profile.id });

      //   if (!user) {
      //       user = new User({
      //           googleId: profile.id,
      //           displayName: profile.displayName,
      //           email: profile.email
      //       });
      //       await user.save();
      //   }

      //   const token = jwt.sign({ id: user._id, displayName: user.displayName }, JWT, { expiresIn: '1h' });

      //   return done(null, { token });
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
