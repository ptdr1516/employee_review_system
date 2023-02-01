const express = require('express');
const Employee = require('../models/employee');


module.exports.home = function(req, res) {
    let Emp = req.user;

    return res.render('home', {
        emp: Emp,
    });
}

module.exports.signin = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    else {
        return res.render('emp_sign_in');
    }
}

module.exports.signup = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    else {
        return res.render('emp_sign_up');
    }
}