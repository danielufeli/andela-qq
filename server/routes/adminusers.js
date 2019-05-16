import express from 'express';

import adminUserController from '../controllers/adminusers';
import auth from '../helpers/auth';
import checkIsAdmin from '../middleware/isAdmin';
import allValidator from '../middleware/allValidator';
import getUserId from '../middleware/getUserId';
import validateUserStatus from '../helpers/validation/status';

const router = express.Router();

// @route Get api/v1/users/test
// @desc Test post route
// @access Public

router.patch('/:useremail/verify', auth.verifyToken, checkIsAdmin, getUserId, allValidator(validateUserStatus), adminUserController.adminVerifyUser);

export default router;
