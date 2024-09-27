import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Header from './components/Header.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import CreateListing from './pages/createListing.jsx'
import Listings from './pages/Listings.jsx'


const App = () => {
  return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/listing/:listingId" element={<Listings />} />

      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route  element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />} />
      <Route path='/create-listing' element={<CreateListing/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App