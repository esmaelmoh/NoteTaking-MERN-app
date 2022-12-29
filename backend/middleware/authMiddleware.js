const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization&& req.headers.authorization.startsWith('Bearer')){
        try {
            console.log(req.headers.authorization)
             // Get token from header
             token = req.headers.authorization.split(' ')[1]
             console.log(token)
             //verify the token
             const decoded = jwt.verify(token,process.env.SECRET_TOKEN)

             //find user from the jwt id 
             const user = await User.findById(decoded.id).select('-password')
             console.log(user)
             req.user = user
             next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
module.exports = {protect}