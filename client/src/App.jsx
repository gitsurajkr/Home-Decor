import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SigninPage from './Page/SigninPage'
import SignupPage from './Page/SignupPage'

import LandingPage from './Page/LandingPage'
import ForgetPass from './Page/Forget-Pass'
import Changepassword from './Page/Change-Password'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
     {/* <LandingPage /> */}
     {/* <FrontCard /> */}
     {/* <Cardset /> */}
     {/* <Review /> */}
     {/* <Changepassword /> */}
     <Routes>
      <Route path='/' element={<SignupPage/>}  />
      <Route path='/signup' element={<SignupPage/>}  />
      <Route path='/signin' element={<SigninPage/>}  />
      <Route path='/reset-password' element={<ForgetPass/>}  />
      <Route path='/update-password/:userId' element={<Changepassword/>}  />


     </Routes>

    </BrowserRouter>
  )
}

export default App
