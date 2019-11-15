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
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else {
      // do the work
      let user = req.body;
      console.log(user);
      return res.status(200).send({ok: 'No problems found',
    user: user});
    }
});

app.listen(port, () => {
    console.log('Server running on port: ', port);
  });

