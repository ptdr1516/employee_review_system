const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee');

// local strategy for user's credentials that are verified against the data stored in the database.(in this case email is required as username)
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done) {
    Employee.findOne({ email: email }, function(err, emp) {
        if (err) {
            console.log('Error in finding the user');
            return done(err);
        }
        if (!emp || emp.password != password) {
            console.log('Invalid username or password');
            return done(null, false);
        }

        return done(null, emp);
    });
}));