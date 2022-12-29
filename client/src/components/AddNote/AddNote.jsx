import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../../features/note/noteSlice'
import {useNavigate} from 'react-router-dom'
import './AddNote.css'
const AddNote = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
   const [title, setTitle]= useState('')
   const [content, setContent]= useState('')
    const onSubmit = (e)=>{
      e.preventDefault()
      dispatch(createNote({title,content}))
      navigate('/')
      setTitle('')
      setContent('')
    }
  return (
    <>
    <h1 className='my-notes'>Write Note</h1>
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
          Add Note
        </button>
      </div>
    </form>
  </section>
</>
  )
}

export default AddNote