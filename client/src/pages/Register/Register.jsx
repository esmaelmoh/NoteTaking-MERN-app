import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import './Register.css'
import {useDispatch} from 'react-redux'
import { register } from '../../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
      })
      console.log(formData)
      const { username, email, password, password2 } = formData
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        if (password !== password2) {
          console.log("the password doesnt match")
        //   toast.error('Passwords do not match')
        } else {
          const userData = {
            username,
            email,
            password,
          }
          dispatch(register(userData))
          navigate('/login')
            }
      } 
  return (
    <>
    <div className="register-container">

      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        {/* <p>Please create an account</p> */}
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='username'
              value={username}
              placeholder='Enter your username'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
    </>
  )
}

export default Register