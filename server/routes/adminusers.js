import express from 'express';

import adminUserController from '../controllers/adminusers';
import auth from '../helpers/auth';
import checkIsAdmin from '../middleware/isAdmin';
import allValidator from '../middleware/allValidator';
import validateUserStatus from '../helpers/validation/status';

const router = express.Router();

router.patch('/:useremail/verify', auth.verifyToken, checkIsAdmin, allValidator(validateUserStatus), adminUserController.adminVerifyUser);

export default router;
