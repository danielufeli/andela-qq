import express from 'express';

import loanController from '../controllers/loans';
import auth from '../helpers/auth';
import checkUser from '../middleware/checkUser';

const router = express.Router();

// @route Get api/v1/loans
// @desc Test post route
// @access Public

router.get('', auth.verifyToken, loanController.allLoans);
router.get('/:loanid', auth.verifyToken, loanController.specificLoans);
router.get('/:loanid/repayments', auth.verifyToken, checkUser, loanController.viewAllLoans);
router.post('/:loanid/repayment', auth.verifyToken, loanController.loanRepayments);
router.post('', auth.verifyToken, loanController.createLoan);
router.patch('/:loanid', auth.verifyToken, loanController.adminApproveLoans);


export default router;
