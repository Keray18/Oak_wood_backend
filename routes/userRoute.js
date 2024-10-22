const express = require('express')
const { 
    registerUser,
    loginUser,
    getProtectedData
 } = require('../controllers/User.js')

const {
    authenticateToken,
    authorizeRole
} = require('../middleware/authMiddleware.js')


const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/protected', authenticateToken, getProtectedData)
router.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.status(200).json({ message: "Welcome Admin!" })
})


// router.delete('/users/:id', deleteUser)


module.exports = router