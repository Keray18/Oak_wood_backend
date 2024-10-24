const jwt = require('jsonwebtoken')


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.status(401).json({ message: "No token provided" })

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if(err) {
            return res.status(403).json({ message: "Invalid Token" })
        }
        req.user = user
        next()
    })
}

const authorizeRole = (role) => {
    return (req, res, next) => {
        if(req.user.role != role) return res.status(403).json({ message: "Access denied" })
        next()
    }
}

module.exports = { authenticateToken, authorizeRole }