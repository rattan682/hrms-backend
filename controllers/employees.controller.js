const employeeModel = require('../models/employee.model')
const attendeceModel = require('../models/attendence.model')

const createEmployee = async (req, res) => {
  try {
    const data = req.body

    if (!req.file) {
      return res.status(404).json({ message: 'no file found', success: false })
    }

    const newEmployee = new employeeModel({ ...data, pic: req.file.path })
    await newEmployee.save()

    await attendeceModel.create({
      e_id: newEmployee._id,
      task: '',
      status: 'Absent'
    })

    return res.json({
      message: 'employee registered',
      success: true,
      details: newEmployee
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}
const getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find({})
    return res.json({
      message: 'employees listed successfully',
      success: true,
      details: employees
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}
const getEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const employee = await employeeModel.findOne({ _id: id })
    return res.json({
      message: 'success',
      success: true,
      details: employee
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const updatedEmployee = await employeeModel.findOneAndUpdate(
      { _id: id },
      data,
      { new: true }
    )
    return res.json({
      message: 'updated successfully',
      success: true,
      details: updatedEmployee
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const deletedEmployee = await employeeModel.findOneAndDelete({ _id: id })

    await attendeceModel.findOneAndDelete({ e_id: id })

    return res.json({
      message: 'deleted employee successfully',
      success: true,
      details: deletedEmployee
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}

const searchEmployee = async (req, res) => {
  try {
    const { search } = req.body

    let query = {}
    if (search) {
      query = {
        $or: [
          { e_name: { $regex: search, $options: 'i' } },
          { e_email: { $regex: search, $options: 'i' } },
          { e_position: { $regex: search, $options: 'i' } },
          { e_dept: { $regex: search, $options: 'i' } },
        ]
      }
    }

    const employees = await employeeModel.find(query)

    return res.json({
      message: 'candidates are listed',
      success: true,
      details: employees
    })
  } catch (error) {
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}

const filterEmployee = async (req, res) => {
  try {
    const { dept } = req.body

    let query = {}

    if (dept) {
      query.e_dept = dept
    }

    const employees = await employeeModel.find(query)

    return res.json({
      message: 'employees fetched successfully',
      success: true,
      details: employees
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false
    })
  }
}

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
  filterEmployee
}
