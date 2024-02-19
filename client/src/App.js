import logo from './logo.svg';
import React from 'react';
import './App.css';
import AdminAuthForm from './Components/Authform/adminauthform';
import UserAuthForm from '../src/Components/Authform/userauthform';
import AdminHomePage from './Components/adminhomepage/Adminhome';
import UserHomePage from './Components/userhomepage/Userhome';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import UserLogin from './Components/SignIn/userlogin.jsx';
import AdminLogin from './Components/SignIn/adminlogin.jsx';


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<UserAuthForm />} /> */}
        {/* <Route path="/" element={<UserAuthForm />} /> */}
        <Route path="/" element={<UserAuthForm />} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/userhome" element={<UserHomePage />} />
        <Route path="/adminhome" element={<AdminHomePage/>} />
        {/* <Route path="/adminlogin" element={<AdminAuthForm />} /> */}

        {/* Add more routes as needed */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

