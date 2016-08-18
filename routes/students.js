var express = require('express');
var router = express.Router();
var Student = require('../models/student');

router.get('/', function(req, res, next) {
  Student.find({}, function (err, students) {
    if (err) {
      res.status(500).send();
    } else {
      res.json(students);
    }
  })
});

module.exports = router;
