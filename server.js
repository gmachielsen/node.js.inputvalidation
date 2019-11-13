const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const app = express();

app.use(bodyParser.json());

const port = 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/api/user', [
    // 1) Fix that the POST sends a correct username which should be an email address.
    // username must be an email
    check('username').isEmail(),
    // password must be at least 5 chars long
    // 2) idem (password length > 4)
    check('password').isLength({ min: 5 })
  ], (request, response) => {
        console.log("Welcome!");
        const errors = validationResult(request);
        console.log(errors);
});





app.listen(port, () => {
    console.log('Server running on port: ', port);
  });

