import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNote, fetchNotes, reset } from '../../features/note/noteSlice'
import './Dashboard.css'
import {AiOutlineDelete} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const dispatch = useDispatch()
  const {notes} = useSelector((state)=>state.note)
  const {user} = useSelector((state)=>state.auth)

  console.log(user)
  console.log(notes)
  useEffect(()=>{
    dispatch(fetchNotes()) 
  },[dispatch])
  if(!notes.length){
    return(
      <>
      <p>You Don't Have Notes Pls Add!</p>
      <button className='btn'><Link to='writeNote' style={{color:'white'}}> Add notes</Link></button>
      </>
    )
  }
  return (
    <div className='dashboard-container'>
      <h1 className='my-notes'>My Notes</h1>
      
      {notes?.map((item)=>{
        return <div key={item?._id} className= "note-card"> 
          <h3 className='note-title'>{item?.title}</h3>
          <p className='note-content'>{item?.content}</p>
          <div className="btn-container">
            {console.log(item?._id)}
            <button className="btn-d" 
               onClick={()=>{
                dispatch(deleteNote(item._id))
                window.location.reload();
               }}
               >
              <AiOutlineDelete/>
            </button>
            <button className="btn-e" >
            <Link to={`editNote/${item?._id}`} style={{textDecoration:'none',color:"inherit"}}> <FiEdit/></Link>
            </button>
          </div>
        </div>
      })}
    </div>
  )
}

export default Dashboard