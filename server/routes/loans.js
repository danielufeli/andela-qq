import express from 'express';

import loanController from '../controllers/loans';
import auth from '../helpers/auth';
import checkIsAdmin from '../middleware/isAdmin';
import allValidator from '../middleware/allValidator';
import validateLoan from '../helpers/validation/loans';
import validateLoanStatus from '../helpers/validation/loanstatus';
import validateAmount from '../helpers/validation/amount';

const router = express.Router();

const {
  allLoans, specificLoans, viewAllRepayments, loanRepayments, createLoan, adminApproveLoans,
} = loanController;

router.get('', auth.verifyToken, checkIsAdmin, allLoans);
router.get('/:loanid', auth.verifyToken, checkIsAdmin, specificLoans);
router.get('/:loanid/repayments', auth.verifyToken, viewAllRepayments);
router.post('/:loanid/repayment', auth.verifyToken, checkIsAdmin, allValidator(validateAmount), loanRepayments);
router.post('', auth.verifyToken, allValidator(validateLoan), createLoan);
router.patch('/:loanid', auth.verifyToken, checkIsAdmin, allValidator(validateLoanStatus), adminApproveLoans);

export default router;
