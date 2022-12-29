import React from 'react'
import './Navbar.css'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { RiAddCircleLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../features/auth/authSlice'
import { useEffect } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const handleLogout = ()=>{
    dispatch(logout())
    navigate('/')

  }
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Note Taker</Link>
      </div>
      <ul>
        {user ? (
            <>
            <li>
              <Link to='/writeNote' className='add-note-link'>
                <RiAddCircleLine /> Add Note
              </Link>
            </li>
            <li style={{color:'gray'}}>
                @{user.username}
            </li>
          <li>
            <button className='btn-l' onClick={handleLogout} >
              <FaSignOutAlt /> Logout
            </button>
          </li>
            </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Navbar