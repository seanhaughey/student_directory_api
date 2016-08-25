var express = require('express');
var router = express.Router();
var Student = require('../models/student')
const _ = require('lodash');

router.use((req, res, next) => {
req.body = _.pick(req.body, ['firstName', 'lastName', 'salary', 'bonusPoints'])
  next()
})

router.get('/', (req, res, next) => {
  Student.find({}, (err, students) => {
    if (err) {
      res.status(500).send()
    } else {
      res.json(students)
    }
  })
});

router.post('/', (req, res, next) => {
  const student = new Student(req.body)
  student.save((err) => {
    if (err) {
      res.status(500).send()
    } else {
      res.json(student)
    }
  })
})
router.get('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId,(err, student) => {
    if (err) {
      res.status(500).send()
    } else {
      if (student) {
        res.json(student)
      } else {
        res.status(404).send()
      }
    }
  })
})


router.delete('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId).remove((err) => {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
})
router.put('/:studentId', (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId, {$set: req.body}, (err, student) => {
    if (err) {
      res.status(500).send()
    } else {
      if (student) {
        Student.findById(req.params.studentId, (err, updatedStudent) => {
          res.json(updatedStudent)
        })
      } else {
        res.status(404).send()
      }
    }
  })
})


module.exports = router;
