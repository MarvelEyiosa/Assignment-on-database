const express = require('express');
const {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent
} = require('../controller/studentController');

const router = express.Router();

router.post('/', createStudent);
router.get('/:id', getStudent);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
