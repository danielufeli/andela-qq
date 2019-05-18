import express from 'express';

import adminUserController from '../controllers/adminusers';
import auth from '../helpers/auth';
import checkIsAdmin from '../middleware/isAdmin';
import allValidator from '../middleware/allValidator';
import validateUserStatus from '../helpers/validation/status';

const router = express.Router();

/**
 * Route serving Admin Mark User as Verified.
 * @name patch/:useremail/verify
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {useremail} path - Express path
 */
router.patch('/:useremail/verify', auth.verifyToken, checkIsAdmin, allValidator(validateUserStatus), adminUserController.adminVerifyUser);

export default router;
