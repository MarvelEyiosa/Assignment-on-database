const mongoose = require('mongoose');
const Student = require('../model/studentModel');

const createStudent = async (req, res) => {
  try {
    const { name, registrationNumber, email } = req.body;
    const student = await Student.create({ name, registrationNumber, email });

    return res.status(201).json({
      message: 'Student account created successfully',
      data: student
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res.status(409).json({ message: `${duplicateField} already exists` });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Unable to create student account' });
  }
};



const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid student ID' });
  }

  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({ data: student });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch student details' });
  }
};



const updateStudent = async (req, res) => {
  const { id } = req.params;
  const fields = Object.keys(req.body);

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid student ID' });
  }

  if (fields.length !== 1 || fields[0] !== 'name') {
    return res.status(400).json({
      message: 'Only the name field can be updated'
    });
  }

  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({
      message: 'Student name updated successfully',
      data: student
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Unable to update student profile' });
  }
};



const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid student ID' });
  }

  try {
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({
      message: 'Student account deleted successfully',
      data: student
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete student account' });
  }
};

module.exports = { createStudent, getStudent, updateStudent, deleteStudent };
