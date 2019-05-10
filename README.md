# Quick Credit [![Build Status](https://travis-ci.org/danielufeli/andela-qq.svg?branch=develop)](https://travis-ci.org/danielufeli/andela-qq)  [![Coverage Status](https://coveralls.io/repos/github/danielufeli/andela-qq/badge.svg)](https://coveralls.io/github/danielufeli/andela-qq)  [![Maintainability](https://api.codeclimate.com/v1/badges/d04d8b3cc0893a21985a/maintainability)](https://codeclimate.com/github/danielufeli/andela-qq/maintainability)
___

## Quick Credit 
is an online lending platform that provides short term soft loans to individuals. This
helps solve problems of financial inclusion as a way to alleviate poverty and empower low
income earners.

___

# Technologies

Quick Credit was developed with JavaScript (ES6) Node.js using [Express 4](http://expressjs.com/). 
Using the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

___

## Links to GitHub Pages for User/Admin

Homepage: https://danielufeli.github.io/andela-qq/UI/
Signup: https://danielufeli.github.io/andela-qq/UI/signup.html
Signin: https://danielufeli.github.io/andela-qq/UI/signin.html
User Dashboard: https://danielufeli.github.io/andela-qq/UI/dashboard.html
Admin Dashboard: https://danielufeli.github.io/andela-qq/UI/admin/

## Swagger Documentation
API endpoints Documentation URL - https://andelaqq.herokuapp.com/api/v1/docs/

## API Information
API endpoints URL - https://andelaqq.herokuapp.com/

|METHOD  |DESCRIPTION                             |ENDPOINT                                  |
|------- |----------------------------------------|------------------------------------------|
|POST    |Sign Up                                 |api/v1/auth/signup                        |
|POST    |Sign In                                 |api/v1/auth/signin                        |
|POST    |Apply for a Loan                        |api/v1/loans                              |
|GET     |Get all Loan Applications               |api/v1/loans                              |
|GET     |Get Specific Loan Application           |api/v1/loans/:loanid                      |
|GET     |Get Current Loans (not fully repaid)    |api/v1/loans/?status=approved&repaid=false|
|GET     |Get all Repaid Loans.                   |api/loans/?status=approved&repaid=true    |
|PATCH   |Mark a client as verified               |api/v1/users/<:user-email>/verify         |
|PATCH   |Approve or reject a loan application    |api/v1/loans/<:loan-id>                   |
|POST    |Create a loan repayment record          |api/v1/loans/<:loan-id>/repayment         |
|GET     |View loan repayment history             |api/v1/loans/<:loan-id>/repayments        |

___
### Sample Users
Admin-
Username: admin@quickcredit.com
Password: Domi@2019

User-
Username: user@quickcredit.com
Password: Domi@2019

___

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) 12.0.0 installed and [POSTMAN](https://www.getpostman.com/downloads/).

```sh
git clone https://github.com/danielufeli/andela-qq.git # or clone your own fork
cd andela-qq
npm install
npm start
```

Quick Credit app should now be running on [localhost:3000](http://localhost:3000/).
___

## Author
### Daniel Ufeli

## Licence

