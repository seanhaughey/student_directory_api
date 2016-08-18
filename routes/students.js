var express = require('express');
var router = express.Router();
var Student = require('../models/student');
const _ = require('lodash');

router.use(function (req, res, next) {
  req.body = _.pick(req.body, ['firstName', 'lastName', 'salary', 'bonusPoints'])
  next();
})

router.get('/', function(req, res, next) {
  Student.find({}, function (err, students) {
    if (err) {
      res.status(500).send();
    } else {
      res.json(students);
    }
  })
});

router.post('/', (req, res, next) => {
  const student = new Student(req.body);
  student.save(function (err) {
    if (err) {
      res.status(500).send();
    } else {
      res.json(student);
    }
  });
});

module.exports = router;
