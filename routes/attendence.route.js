const express = require('express')
const {
  getAttendence,
  getAttendee,
  deleteAttendence,
  updateAttendence,
  searchAttendence,
  filterAttendence
} = require('../controllers/attendance.controller')
const router = express.Router()

router.get('/getall', getAttendence)
router.get('/getone/:id', getAttendee)
router.delete('/deleteone/:id', deleteAttendence)
router.patch('/update/:id', updateAttendence)
router.post('/search', searchAttendence)
router.post('/filter', filterAttendence)

module.exports = router
