import express from 'express';

import userController from '../controllers/users';
import allValidator from '../middleware/allValidator';
import validateUser from '../helpers/validation/users';
import checkUser from '../helpers/currentUser';
import validateSignin from '../helpers/validation/signin';
import checkDuplicate from '../middleware/mailSignup';

const router = express.Router();

// @route Get api/v1/users/test
// @desc Test post route
// @access Public

router.post('/signup', allValidator(validateUser), userController.userSignup);

router.post('/signin', allValidator(validateSignin), userController.userSignin);

export default router;
