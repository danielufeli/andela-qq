const checkDuplicate = (error, res) => {
  if (error.constraint === 'users_email_key') { return res.status(409).json({ status: 409, message: 'The user with this email has already registered' }); }
  if (error.constraint === 'users_mobileno_key') { return res.status(409).json({ status: 409, message: 'The user with this mobileno has already registered' }); }
  return error;
};

export default checkDuplicate;
