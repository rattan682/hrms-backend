const express = require('express')
const {
  registerUser,
  loginuser,
  logout
} = require('../controllers/user.controller')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginuser)
router.post('/logout', logout)

module.exports = router
