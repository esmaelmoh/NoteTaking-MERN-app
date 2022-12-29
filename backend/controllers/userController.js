const asyncHandler = require('express-async-handler')
const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (id)=>{
  return jwt.sign({id},process.env.SECRET_TOKEN,{expiresIn:"30d"})
}
const registerUser = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const { username, email, password } = req.body
    
    if (!username || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
    
    // Check if user exists
    const userExists = await User.findOne({ username })
    
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    
    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token:generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
const loginUser = asyncHandler(async(req,res)=>{
    const { username, password } = req.body

  // Check for user email
  const user = await User.findOne({ username })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token:generateToken(user._id)

    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
    
})
module.exports = {registerUser,loginUser}