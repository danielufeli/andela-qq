import express from 'express';

import userController from '../controllers/users';

const router = express.Router();

// @route Get api/v1/users/test
// @desc Test post route
// @access Public

router.post('/signup', userController.userSignup);

export default router;
