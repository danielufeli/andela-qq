import express from 'express';

import adminUserController from '../controllers/adminusers';
import auth from '../helpers/auth';
import checkIsAdmin from '../middleware/isAdmin';

const router = express.Router();

// @route Get api/v1/users/test
// @desc Test post route
// @access Public

router.patch('/:useremail/verify', auth.verifyToken, checkIsAdmin, adminUserController.adminVerifyUser);

export default router;
