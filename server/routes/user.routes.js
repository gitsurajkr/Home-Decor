const express = require('express');
// const SignupBodyValidation = require('../Validators/auth.validation')
// const  validateRequest  = require('../middlewares/validate.request');


const { UserSignUp,
    UserSignIn,
    userSignOut,
    userForgetPassword,
    passwordResetUpdate,
    getUser } = require('../controllers/auth.controller');

const router = express.Router();


router.post('/signup', UserSignUp);
router.post('/signin', UserSignIn);
router.post('/signin', UserSignIn);
router.post('/signout', userSignOut);
router.post('/password-reset/request', userForgetPassword);
router.post('/password-reset/update/:userId', passwordResetUpdate);
router.get('/get-user', getUser);


module.exports = router;
