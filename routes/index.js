const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/homeController');

router.get('/', passport.checkAuthentication, homeController.home);
router.get('/sign-in', homeController.signin);
router.get('/sign-up', homeController.signup);
router.get('/sign-out', homeController.destroySession);
router.get('/add-emp', passport.checkAuthentication ,homeController.addEmp);
router.get('/show-emp', passport.checkAuthentication, homeController.showEmp);
router.get('/assign-work', passport.checkAuthentication, homeController.assignWork);
router.get('/delete/:id', passport.checkAuthentication, homeController.deleteEmployee);

router.post('/create', homeController.create);
router.post('/add', passport.checkAuthentication, homeController.add);
router.post('/update-status', passport.checkAuthentication, homeController.updateStatus);
router.post('/assign-review', passport.checkAuthentication, homeController.assignReview);
router.post('/add-review', passport.checkAuthentication, homeController.addReview);
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: 'emp-sign-in'
    },
), homeController.createSession
);


module.exports = router;