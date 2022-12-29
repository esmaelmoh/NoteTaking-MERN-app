import React, { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { FiLogIn } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../features/auth/authSlice'
import './Login.css'
const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)

  const [formData, setFormData] = useState({
      username: '',
      password: '',
    })
    console.log(formData)
    
    const { username, password } = formData

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const onSubmit = (e) => {
      e.preventDefault()
      const userData = {
          username,
          password,
        }
        dispatch(login(userData))
        navigate('/')
          }
    
  
  return (
    <>
    <div className="login-container">
    <section className='heading'>
        <h1>
          <div className="login-icon">
          <FaSignInAlt /> 
          <>LogIn</>
          </div>
        </h1>
        {/* <p>Login and start setting goals</p> */}
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type = 'text'
              className='form-control'
              name="username"
              value={username}
              placeholder='Enter your username'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
                value={password}
              placeholder='Enter your password'
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

export default Login