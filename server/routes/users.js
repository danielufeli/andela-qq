import express from 'express';

import userController from '../controllers/users';
import allValidator from '../middleware/allValidator';
import validateUser from '../helpers/validation/users';
import validateSignin from '../helpers/validation/signin';

const router = express.Router();

router.post('/signup', allValidator(validateUser), userController.userSignup);

router.post('/signin', allValidator(validateSignin), userController.userSignin);

export default router;
