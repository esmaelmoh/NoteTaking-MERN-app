const router = require('express').Router()

const {getNotes,setNote,updateNote,deleteNote} = require('../controllers/noteController.js')
const { protect } = require('../middleware/authMiddleware.js')
router.get('/',protect,getNotes)
router.post('/',protect,setNote)
router.put('/:id',protect,updateNote)
router.delete('/:id',protect,deleteNote)

module.exports= router