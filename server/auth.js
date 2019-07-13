import passport from 'passport';
import { Strategy } from 'passport-google-token';
import { Google_Client_ID, Google_Client_Secret } from './config';

passport.serializeUser((user, done) => {
  done(null, user)
});

passport.serializeUser((user, done) => {
  done(null, user)
});

passport.use(
  new Strategy({
    clientID: Google_Client_ID,
    clientSecret: Google_Client_Secret
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, { email: profile._json.email });//this is passed to req.user object
  }
));