const User = require('./models/user')

exports.createUser = (req, res, next) => {
  /** Here you need to validate user input. 
   Let's say only Name and email are required field
 */
  
  const { userName, email, phone, status } = req.body
  if (userName && email &&  isValidEmail(email)) { 
    
    // isValidEmail is some custom email function to validate email which you might need write on your own or use npm module
    User.create({
      userName,
      email,
      phone,
      status,   
    })
    .then(user => res.json(user))
    .catch(next)
  }
}


const { body } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        body('userName', 'userName does not exists').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('phone').optional().isInt(),
        body('status').optional().isIn(['enabled', 'disabled'])
       ]   
    }
  }
}

const { validationResult } = require('express-validator/check');

exports.createUser = async (req, res, next) => {
   try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const { userName, email, phone, status } = req.body
      
      const user = await User.create({

        userName,

        email,

        phone,

        status,   
      })

      res.json(user)
   } catch(err) {
     return next(err)
   }
}