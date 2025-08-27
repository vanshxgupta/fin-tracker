import React from 'react'
import Login from './pages/auth/Login.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import Home from './pages/Dashboard/Home.jsx';
import Income from './pages/Dashboard/Income.jsx';
import Expense from './pages/Dashboard/Expense.jsx';
import UserProvider from './context/userContext.jsx';
import { Toaster } from "react-hot-toast";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



const App = () => {
  return (
    <UserProvider>
      <div className='text-xl font-medium text-black'>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOption={{
          className: "",
          style: {
            fontSize: "13px"
          },
        }}
      />
    </UserProvider>
  )
}

const Root = () => {
  // check if token exist in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  // redirect to dashboard if login otherwise to login
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
}

export default App
