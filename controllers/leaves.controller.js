const leavesModel = require('../models/leaves.model')

const createLeave = async (req, res) => {
  try {
    const data = req.body

    if (!req.file) {
      return res.status(404).json({ message: 'no file found', success: false })
    }

    const newLeave = new leavesModel({
      ...data,
      attachment: req.file.path
    })

    console.log(newLeave)
    await newLeave.save()
    return res.json({
      message: 'Leave registered',
      success: true,
      details: newLeave
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}

const getLeaves = async (req, res) => {
  try {
    const leaves = await leavesModel.find({})
    return res.json({
      message: 'leaves listed successfully',
      success: true,
      details: leaves
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}

const getLeave = async (req, res) => {
  try {
    const { id } = req.params
    const leave = await leavesModel.findOne({ _id: id })
    return res.json({
      message: 'success',
      success: true,
      details: leave
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    if (!id) {
      return res.json({ message: 'leave not found', success: false })
    }

    const info = req.file ? { ...data, attachment: req.file.path } : data
    const updateLeave = await leavesModel.findOneAndUpdate({ _id: id }, info, {
      new: true
    })

    return res.json({
      message: 'updated successfully',
      success: true,
      details: updateLeave
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}

const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params
    const deleteLeave = await leavesModel.findOneAndDelete({ _id: id })
    return res.json({
      message: 'deleted Leave  successfully',
      success: true,
      details: deleteLeave
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}

const leaveFilter = async (req, res) => {
  try {
    const { date } = req.query
    const { status } = req.body

    let query = {}

    if (date) {
      const selectedDate = new Date(date)
      query.startdate = { $lte: selectedDate }
      query.enddate = { $gte: selectedDate }
    }

    if (status) {
      query.status = status
    }

    const leaves = await leavesModel.find(query)

    return res.json({
      message: 'Leaves fetched successfully',
      success: true,
      details: leaves
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false
    })
  }
}

const searchLeaves = async (req, res) => {
  try {
    const { search } = req.body

    let query = {}
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { designation: { $regex: search, $options: 'i' } },
          { status: { $regex: search, $options: 'i' } }
        ]
      }
    }

    const leaves = await leavesModel.find(query)

    return res.json({
      message: 'leaves are listed',
      success: true,
      details: leaves
    })
  } catch (error) {
    return res.json({
      message: error || 'something went wrong',
      success: false
    })
  }
}

module.exports = {
  createLeave,
  getLeaves,
  getLeave,
  updateLeave,
  deleteLeave,
  leaveFilter,
  searchLeaves
}
