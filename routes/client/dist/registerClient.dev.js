"use strict";

var router = require('express').Router();

var Client = require('../../model/client/client');

var jwt_auth = require('jsonwebtoken');

var _require = require('../posts'),
    route = _require.route;

router.get('/client/:userType', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.params.userType === "investor") {
            res.status(201).send('Ok');
          } else if (req.params.userType === "company") {
            res.status(202).send('Ok');
          } else if (req.params.userType === "individual") {
            res.status(202).send('Ok');
          }

          res.status(404).send('Not Found');

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;