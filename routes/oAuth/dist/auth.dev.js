"use strict";

var router = require('express').Router();

var User = require('../../model/User/User');

var jwt_auth = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var _require = require('../../model/validation'),
    registerValidation = _require.registerValidation,
    loginValidation = _require.loginValidation;

router.post('/register', function _callee(req, res) {
  var _registerValidation, error, emailDuplicationCheck, salt, hashedPassword, user, savedUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Data Validation
          _registerValidation = registerValidation(req.body), error = _registerValidation.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          emailDuplicationCheck = _context.sent;

          if (!emailDuplicationCheck) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).send('EMail already Exists'));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 10:
          salt = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 13:
          hashedPassword = _context.sent;
          // Create New User
          user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
          });
          _context.prev = 15;
          _context.next = 18;
          return regeneratorRuntime.awrap(user.save());

        case 18:
          savedUser = _context.sent;
          res.send({
            user_id: user._id
          }); // console.log(savedUser)

          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](15);
          res.status(400).send(_context.t0);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[15, 22]]);
});
router.post('/login', function _callee2(req, res) {
  var _loginValidation, error, user, validPassword, userToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Data Validation
          _loginValidation = loginValidation(req.body), error = _loginValidation.error;

          if (!error) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('EMail does not Exists'));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 10:
          validPassword = _context2.sent;

          if (validPassword) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Password doesn't match"));

        case 13:
          // Create and Assign User JWT Token
          userToken = jwt_auth.sign({
            _id: user._id
          }, process.env.TOKEN_SECRET);
          res.status(200).send({
            _id: user._id,
            token: userToken,
            message: 'Holla! Successful Login...!!'
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;