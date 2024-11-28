import './App.css'
import SigninPage from './Page/SigninPage'
import SignupPage from './Page/SignupPage'
import LandingPage from './Page/LandingPage'
import ProductPage from './Page/ProductPage'
import ForgetPass from './Page/Forget-Pass'
import Changepassword from './Page/Change-Password'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>    
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/reset-password' element={<ForgetPass />} />
        <Route path='/update-password/:userId' element={<Changepassword />} />
        <Route path='/product-page' element={<ProductPage />} />

      </Routes>
    </BrowserRouter>
    // <>
    //   <ProductPage />
    // </>
  )
}

export default App
