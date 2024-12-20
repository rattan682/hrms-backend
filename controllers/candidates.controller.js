const candidateModel = require('../models/candidate.model')
const employeeModel = require('../models/employee.model')

const createCandidate = async (req, res) => {
  try {
    const data = req.body

    if (!req.file) {
      return res.status(404).json({ message: 'no file found', success: false })
    }

    const newCandidate = new candidateModel({
      ...data,
      c_resume: req.file.path
    })
    await newCandidate.save()
    return res.json({
      message: 'candidate registered',
      success: true,
      details: newCandidate
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}
const getCandidates = async (req, res) => {
  try {
    const { filter, search } = req.body

    let query = {}

    if (filter) {
      query = { ...filter }
    }

    if (search) {
      query = {
        ...query,
        $or: [
          { c_name: { $regex: search, $options: 'i' } },
          { c_email: { $regex: search, $options: 'i' } },
          { c_position: { $regex: search, $options: 'i' } }
        ]
      }
    }

    const candidates = await candidateModel.find(query)
    return res.json({
      message: 'candidates listed successfully',
      success: true,
      details: candidates
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}
const getCandidate = async (req, res) => {
  try {
    const { id } = req.params
    const candidate = await candidateModel.findOne({ _id: id })
    return res.json({
      message: 'success',
      success: true,
      details: candidate
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}
const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    if (!id) {
      return res.json({ message: 'no user found', success: false })
    }

    if (data?.status == 'selected') {
      await employeeModel.create({
        e_name: data?.name,
        e_email: data?.c_email,
        e_phone: data?.c_phone,
        e_position: data?.c_position
      })
    }

    const info = req.file ? { ...data, resume: req.file.path } : data
    const updateCandidate = await candidateModel.findOneAndUpdate(
      { _id: id },
      info,
      { new: true }
    )
    return res.json({
      message: 'updated successfully',
      success: true,
      details: updateCandidate
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}
const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params
    const deleteCandidate = await candidateModel.findOneAndDelete({ _id: id })
    return res.json({
      message: 'deleted candidate  successfully',
      success: true,
      details: deleteCandidate
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}

module.exports = {
  createCandidate,
  getCandidates,
  getCandidate,
  updateCandidate,
  deleteCandidate
}
