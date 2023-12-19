import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup';
import DashBoard from './pages/DashBoard'
import Error from './components/Error/Error'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddTransaction from './pages/AddTransaction';
import AllTransactions from './pages/AllTransactions';
import Leaderboard from './pages/Leaderboard';
import SendMail from './components/password/SendMail';
import ResetPassword from './components/password/ResetPassword';

function App() {
  

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='/add-transaction' element={<AddTransaction />} />
      <Route path='/transactions' element={<AllTransactions />} />
      <Route path='/leaderboard' element={<Leaderboard />} />
      <Route path='/sendMail'  element={<SendMail />} />
      <Route path='/reset-password/:id' element={<ResetPassword />} />
      <Route path='*' element={<Error />} />
    </Routes>
    </>
  );
}

export default App;
