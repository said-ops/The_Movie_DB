import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import Watchlist from './Watchlist'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/Search' element={<SearchPage/>} />
          <Route path='/Watchlist' element={<Watchlist/>} />
          <Route path='/Sign-In' element={<SignIn/>} />
          <Route path='/Sign-Up' element={<SignUp/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App