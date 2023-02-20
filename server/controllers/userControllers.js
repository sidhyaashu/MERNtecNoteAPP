const User = require('../models/UserM.js')
const Note = require('../models/NoteM.js')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


//get all users
//get user get/user
//@access private

const getAllUsers= asyncHandler(async(req,res)=>{
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({message:"No user Found"})
    }

    res.json(users)
})

//createUser 
//get user POST/user
//@access private

const createNewUser= asyncHandler(async(req,res)=>{
    const { username,password,roles } = req.body
    if(!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({message:"All fields are reqired"})
    }
    // Chek for duplicates
    const duplicate = await User.findOne({username}).lean().exec()
    if(duplicate){
        return res.status(409).json({message:"User Already exist"})
    }

    //Hash The password
    const hashedPwd = await bcrypt.hash(password,10)

    const userObject = {
        username,
        password : hashedPwd,
        roles
    }

    //Create and store new user
    const user = await User.create(userObject)

    if(user){
        res.status(201).json({message:`New user ${username} created`})
    }else{
        res.status(400).json({message:"Invalid user data received"})
    }

})

//updateuser 
//get user POST/user
//@access private

const updateUser= asyncHandler(async(req,res)=>{
    const { id, username,roles,active,password } = req.body

    //Confirm data
    if(!id || !username ||!Array.isArray(roles) || !roles.length || typeof active !== 'boolean')
    {
        return res.status(400).json({message:"All fields are require"})
    }

    const user = await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    //Check for duplicate
    const duplicate = await User.findOne({username}).lean().exec()

    //Allow update to the original user
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message:'Duplicate username'})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        user.password = await bcrypt.hash(password,10)
    }

    const updatedUser = await user.save()
    res.json({message:`${updatedUser.username} updateded`})
})

//deleteUser 
//get user POST/user
//@access private

const deleteUser= asyncHandler(async(req,res)=>{
    const { id } = req.body
    if(!id){
        return res.status(400).json({message:"User id required"})
    }

    const notes = await Note.findOne({user:id}).lean().exec()
    if(notes?.length){
        return res.status(400).json({message:'User has assigned notes'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`
    res.json(reply)
})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}