import React, { useState } from 'react';
import './adminlogin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import email_icon from '../Assets/email.jpg';
import password_icon from '../Assets/password.png';

const AdminLogin = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [action, setAction] = useState("Admin Login");
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async () => {
        try {
            if (action === "Login") {
                const url = "http://localhost:8080/auth/adminlogin"; // Corrected endpoint for user login
                const { data: res } = await axios.post(url, data);
                console.log(res.message);
                // Assuming successful login redirects to user home page
                navigate('/adminhome');
            } else if (action === "Register") {
                // Add logic for user registration if needed
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
                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        required
                        className='input'
                    />
                </div>
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        required
                        className='input'
                    />
                </div>
            </div>
            <div className='submit-container'>
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Register"); handleSubmit(); }}>Register</div>
                <div className={action === "Register" ? "submit gray" : "submit"} onClick={() => { setAction("Login"); handleSubmit(); }}>Login</div>
            </div>
        </div>
    );
}

export default AdminLogin;
