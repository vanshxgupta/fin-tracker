import { useState } from 'react'
import React from 'react'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
         <Route path="/" element={<Root/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="/dashboard" element={<Home/>}/>
         <Route path="/income" element={<Income/>}/>
         <Route path="/expense" element={<Expense/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

const Root=()=>{
  //if token exists in localstorage
  const isauthenticated=localStorage.getItem("token")

  //redirect to dashboard if isauthenticated,
  return isauthenticated?
  (<Navigate to="/dashboard"/>)
  :
  (<Navigate to="/login"/>);

}
