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

router.get('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId, function (err, student) {
    if (err) {
      res.status(500).send();
    } else {
      if (student) {
        res.json(student);
      } else {
        res.status(404).send();
      }
    }
  })
});



router.delete('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId).remove(function (err) {
     if (err) {
       res.status(500).send();
     } else {
       res.status(204).send();
     }
   })
});

module.exports = router;
