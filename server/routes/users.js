import express from 'express';

import userController from '../controllers/users';
import allValidator from '../middleware/allValidator';
import validateUser from '../helpers/validation/users';
import validateSignin from '../helpers/validation/signin';
import userObjects from '../middleware/userObjects';

const router = express.Router();

const { userSignup, userSignin } = userController;

router.post('/signup', allValidator(validateUser), userObjects.currentUser, userSignup);

router.post('/signin', allValidator(validateSignin), userSignin);

export default router;
