const Users = require('../models/UserModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const registerUser = async(req, res) => {
    const { name, email, password, role } = req.body

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = await Users.create({ name, email, password: hashedPass, role })
        if(!newUser) return res.status(400).json({ message: "Error Creating a user" }) 

        res.status(201).json({ message: "User registered successfully!", user: newUser })

    } catch(error) {
        res.status(400).json({ "message": error.message })
    }
}

const loginUser = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await Users.findOne({ where: { email } })
        if(!user) return res.status(404).json({ message: "user not found" })
        
        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.status(401).json({ message: "invalid credentials" })

        const token = jwt.sign(
            {uuid: user.uuid, role: user.role},
            process.env.JWT_SEC,
            {expiresIn: "7d"}
        )
        res.status(200).json({ message: "Login Successful", token})

    } catch(error) {
        res.status(500).json({ message: error.message })
    }

}

// const updateUser = (req, res) => {
    
// }

const getProtectedData = (req, res) => {
    if(req.user.role === "admin") {
        res.status(200).json({ message: "Welcome Admin, Enter your batcave." })
    } else {
        res.status(403).json({ message: "Access Forbidden: Permission Denied." })
    }
}


module.exports = {
    registerUser,
    loginUser,
    getProtectedData
}