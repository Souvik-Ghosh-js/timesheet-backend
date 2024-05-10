const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('./models/userModel'); // Your user model file

// JWT options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key' // Replace with your secret key
};

// Configure JWT strategy
passport.use(new JwtStrategy(jwtOptions, async function(payload, done) {
  try {
    // Find user by ID in payload
    const user = await User.findById(payload.userId);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Function to generate JWT token
function generateToken(userId) {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '12h' }); // Replace with your secret key
}

function restrictToAdmin(req, res, next) {
  passport.authenticate('jwt', { session: false }, async function(err, user) {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user || user.role != 1) { // Check if user is not authenticated or not an admin
      return res.status(403).json({ message: 'Unauthorized' });
    }
    req.user = user; // Attach user object to request object
    next(); // Proceed to next middleware
  })(req, res, next);
}

module.exports = { authenticate: passport.authenticate('jwt', { session: false }), generateToken, restrictToAdmin };
