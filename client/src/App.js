import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddNote from './components/AddNote/AddNote';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import EditNote from './pages/EditNote';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  const {user} = useSelector((state)=>state.auth)
  return (
    <div className="container">
      <Navbar/>
      <Routes>
        <Route path='/' element = {user?<Dashboard/>:<Register/>}/>
       {user? <Route path='/writeNote' element = {<AddNote/>}/>:''}
       {user? <Route path='/editNote/:id' element = {<EditNote/>}/>:''}
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
