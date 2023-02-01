const { request } = require('express');
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

module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    Employee.findOne({ email: req.body.email }, function(err, emp) {
        if (err) {
            console.log('Error in finding the user');
            return;
        }
        if (!emp) {
            Employee.create(req.body, async function(err, emp) {
                if (err) {
                    console.log('Error in creating the user', err);
                    return;
                }
                Employee.count({}, async function(err, count) {
                    console.log('Number of Employees: '+ count);
                    if (count == 1) {
                        emp.isAdmin = "true";
                        await emp.save();
                        console.log('Promoted as admin');
                    }
                    else {
                        emp.isAdmin = "false";
                        await emp.save();
                        console.log('Promoted as employee');
                    }
                });
                console.log('Employee created successfully');

                return res.render('emp_sign_in');
            })
        }
        else {
            console.log('Employee Exists');
            return res.render('emp_sign_in');
        }
    })
}

module.exports.add = async function(req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    Employee.findOne({ email: req.body.email }, function(err, emp) {
        if (err) {
            console.log('Error in finding the user');
            return;
        }
        if (!emp) {
            Employee.create(req.body, async function(err, emp) {
                if (err) {
                    console.log('Error in creating the user', err);
                    return;
                }
                Employee.count({}, async function(err, count) {
                    console.log('Number of Employees: '+ count);
                    if (count == 1) {
                        emp.isAdmin = "true";
                        await emp.save();
                        console.log('Promoted as admin');
                    }
                    else {
                        emp.isAdmin = "false";
                        await emp.save();
                        console.log('Promoted as employee');
                    }
                });
                console.log('Employee created successfully');

                Employee.find({}, function(err, emp) {
                    console.log(emp);
                    if (err) {
                        console.log('Error in finding the employee');
                        return;
                    }
                return res.render('all_emp', {
                    emps: emp
                });
            })
        })
    }
    else {
            console.log('Employee Exists');
            Employee.find({}, function(err, emp) {
                console.log(emp);
                if (err) {
                    console.log('Error in finding the employee');
                    return;
                }
                return res.render('all_emp', {
                    emps: emp
                });
            })
            
        }
    })
}

module.exports.createSession = function(req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}

module.exports.showEmp = function(req, res) {
    Employee.find({}, function(err, emp) {
        console.log(emp);
        if (err) {
            console.log('Error in finding the employee');
            return;
        }
        return res.render('all_emp', {
            emps: emp
        });
    })
}

module.exports.addEmp = function(req, res) {
    Employee.find({}, function(err, emp) {
        console.log(emp);
        if (err) {
            console.log('Error in adding the employee');
            return;
        }
        return res.render('add_emp', {
            emps: emp
        });
    })
}

module.exports.assignWork = function(req, res) {
    Employee.find({}, function(err, emp) {
        if (err) {
            console.log('Error in finding the employee');
            return;
        }
        return res.render('assign_work', {
            emp: emp
        });
    })
}

module.exports.updateStatus = function(req, res) {
    console.log('req.body');

    Employee.findOne({ email: req.body.email },async function(err, emp) {
        if (err) {
            console.log('Error in finding the user');
            return;
        }
        emp.isAdmin = "true";
        await emp.save();
        return res.redirect('back');
    });
}

