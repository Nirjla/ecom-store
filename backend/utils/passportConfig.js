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
            try {
                  console.log(profile);
                  console.log(JWT)
                  // console.log(GOOGLE.CLIENT_ID)
                  // Extract necessary fields from the profile object
                  const { id, displayName, given_name, family_name, email } = profile;

                  // Find the user by google_id
                  let user = await User.findOne({ google_id: id });
                  if (!user) {
                        // If user doesn't exist, create a new user
                        user = new User({
                              google_id: id,
                              first_name: given_name,
                              last_name: family_name,
                              email: email,
                        });
                        await user.save();
                  }

                  // Generate JWT token
                  const token = jwt.sign({ id: user._id, email: user.email }, JWT, { expiresIn: '1h' });

                  return done(null, { token });
            } catch (err) {
                  return done(err, false);
            }
      }
));

passport.serializeUser((user, done) => {
      done(null, user);
});

passport.deserializeUser((user, done) => {
      done(null, user);
});
