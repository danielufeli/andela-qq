import express from 'express';

import loanController from '../controllers/loans';
import auth from '../helpers/auth';
import checkIsAdmin from '../middleware/isAdmin';
import checkUser from '../middleware/checkUser';
import allValidator from '../middleware/allValidator';
import validateLoan from '../helpers/validation/loans';
import validateLoanStatus from '../helpers/validation/loanstatus';
import validateAmount from '../helpers/validation/amount';

const router = express.Router();

// @route Get api/v1/loans
// @desc Test post route
// @access Public

router.get('', auth.verifyToken, checkIsAdmin, loanController.allLoans);
router.get('/:loanid', auth.verifyToken, checkIsAdmin, loanController.specificLoans);
router.get('/:loanid/repayments', auth.verifyToken, checkUser, loanController.viewAllRepayments);
router.post('/:loanid/repayment', auth.verifyToken, checkIsAdmin, allValidator(validateAmount), loanController.loanRepayments);
router.post('', auth.verifyToken, allValidator(validateLoan), loanController.createLoan);
router.patch('/:loanid', auth.verifyToken, checkIsAdmin, allValidator(validateLoanStatus), loanController.adminApproveLoans);

export default router;
