const express = require('express')
const asyncHandler = require('express-async-handler')
const Note = require('../models/NoteModel')

const getNotes = asyncHandler(async (req,res)=>{
    const note = await Note.find({user:req.user.id}).sort({createdAt:-1})

    res.json(note)
    // throw new Error('this is not the value your are requested')
})

const setNote = asyncHandler(async (req,res)=>{
    if(!req.body.title || !req.body.content){
        res.status(400)
        throw new Error('Please add a title and content field')
    }
    const note = await Note({title:req.body.title,content:req.body.content,user:req.user.id})
    note.save()
    res.status(200).json(note)
})

const updateNote = asyncHandler(async (req,res)=>{
    console.log(req.params.id)
    console.log(req.params)
    console.log(req.body)
    const note = await Note.findById(req.params.id)
    // console.log(note)
    if (!note) {
      res.status(400)
      throw new Error('Note not found')
    }
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedNote)
})

const deleteNote = asyncHandler(async (req,res)=>{
    console.log(typeof(req.params.id))
    const note = await Note.findById(req.params.id)
    if (!note) {
      res.status(400)
      throw new Error('Note by this id not found')
    }
  
  await note.remove()

  res.status(200).json({ id: `Note with this id: ${req.params.id} deleted!` })

})

module.exports = {getNotes,updateNote,deleteNote,setNote}