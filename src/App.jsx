// import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage';
import Temp from './pages/Temp';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import UserDetailsInput from './pages/UserDetailsInput';
import { Outlet, Route, Routes } from 'react-router-dom';
import CampusDetailsInput from './pages/CampusDetailsInput';
import AddEvent from './pages/AddEvent';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Outlet/>}>
           <Route index element={<Homepage/>}/>
           <Route path='/temp' element={<Temp/>}/>
           <Route path='/signin' element={<Signin/>}/>
           <Route path='/signup' element={<Signup/>}/> 
           <Route path='/user-details' element={<UserDetailsInput/>}/>
           <Route path='/campus-details' element={<CampusDetailsInput/>}/>
           <Route path='/add' element={<AddEvent/>}/>

        </Route>
      </Routes>
    </div>
  )
}

export default App
