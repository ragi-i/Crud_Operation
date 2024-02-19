// AuthForm.jsx
import React, { useState } from 'react';
import './adminauthform.css';
import email_icon from '../Assets/email.jpg';
import password_icon from '../Assets/password.png';
import name_icon from '../Assets/Name.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminAuthForm = ({}) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
      
    });
    const navigate = useNavigate();
    const [action,setAction]=useState(" Admin Sign Up");
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async () => {
        try {
            if (action === "Admin Sign Up") {
                const url = "http://localhost:8080/auth/adminregister";
                const { data: res } = await axios.post(url, data);
                console.log(res.message);
            } else if (action === "Admin Login") {
                const url = "http://localhost:8080/auth/adminlogin";
                const { data: res } = await axios.post(url, data);
                console.log(res.message);
                navigate('/adminlogin');
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                setError(error.response.data.message);
            }
        }
    }

   
  return (
    <div className='container'>
        <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
        </div>
        <div className='inputs'>
        
            {action==="Admin Login"?<div></div> :
            <div className='input'>
                <img src={name_icon} alt=''/>
                <input type='text'
                 placeholder='Name'
                 name='name' 
                 onChange={handleChange}
                 value={data.name}
                 required
                 className='input'/>
                 </div>
                  }
            <div className='input'>
                <img src={email_icon} alt=''/>
                <input type='text' 
                placeholder='Email'
                name='email' 
                onChange={handleChange}
                value={data.email}
                required
                className='input'/>
            </div>
            <div className='input'>
                <img src={password_icon} alt=''/>
                <input type='text' 
                placeholder='Password'
                name='password' 
                onChange={handleChange}
                value={data.password}
                required
                className='input'/>
            </div>
           
        </div>
        <div className='submit-container'>
            <div className={action==="Admin Login"?"submit gray":"submit"} onClick={()=>{setAction("Admin Sign Up");handleSubmit();}}>Admin Sign Up</div>
            <div className={action==="Admin Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Admin Login");handleSubmit();}}>Admin Login</div>
         
        </div>
    </div>
  )
}

export default AdminAuthForm;
