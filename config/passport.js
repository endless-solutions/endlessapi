var fs = require('fs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;

var EXPIRES_IN = process.env.JWT_EXPIRES_IN || "20h";
var PUBCERT = fs.readFileSync(process.env.JWT_PUBCERT || "keys/public_key.pem");
var PRICERT = fs.readFileSync(process.env.JWT_PUBCERT || "keys/private_key.pem");
var ALGORITHM = process.env.JWT_ALGORITHM || "RS512"
var ISSUER = process.env.JWT_ISSUER || "www.endlesssolutionsindia.com";
var AUDIENCE = process.env.JWT_AUDIENCE || "www.endlesssolutionsindia.com";

/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
  secretOrKey: PUBCERT,
  issuer : ISSUER,
  audience: AUDIENCE,
  passReqToCallback: false
};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {
  User.findOne({email: email})
    .exec(function (error, user) {
      if (error) return next(error, false, {});

      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: email + ' is not found'
      });

      // TODO: replace with new cipher service type
      if (!CipherService.comparePassword(password, user))
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Password is wrong'
        });

      return next(null, user, {});
    });
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
  var user = payload.user;
  return next(null, user, {});
}

passport.use(
  new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(
  new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

module.exports.jwtSettings = {
  expiresIn: EXPIRES_IN,
  key: PUBCERT,
  privatekey: PRICERT,
  algorithm : ALGORITHM,
  issuer : ISSUER,
  audience : AUDIENCE
};
