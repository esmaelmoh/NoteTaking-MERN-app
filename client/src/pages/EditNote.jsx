import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNote, fetchNotes, updateNote } from '../features/note/noteSlice'
import {useNavigate, useParams} from 'react-router-dom'
const EditNote = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
   dispatch(fetchNotes())
  }, [])
   const {id} = useParams()
   const note= useSelector((state)=> state.note.notes.find((item)=>item?._id === id))
   const [data, setData]= useState('')
   const [title, setTitle]= useState(note?.title)
   const [content, setContent]= useState(note?.content)
   
   

    const onSubmit = (e)=>{
      e.preventDefault()
      dispatch(updateNote({title,content,id},))
      navigate('/')
      setTitle('')
      setContent('')
    }
  return (
    <>
    <h1 className='my-notes'>Edit Note</h1>
    <section className='add-form'>
    <form onSubmit={onSubmit}>
      <div className='add-form-group'>
        <input
          type='text'
          value={title}
          placeholder='Write Title'
          onChange={(e)=>setTitle(e.target.value)}
          className='add-form-control '
        />
      </div>
      <div className='add-form-group'>
        <textarea
          type='text'
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          placeholder='Write Content'
          className='add-form-control'
          />
      </div>

      <div className='add-form-group'>
        <button type='submit' className='btn btn-block'>
          Submit
        </button>
      </div>
    </form>
  </section>
</>
  )
}

export default EditNote