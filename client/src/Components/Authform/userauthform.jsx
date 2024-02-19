// AuthForm.jsx
import React, { useState } from 'react';
import './userauthform.css';
import { Link, useNavigate } from 'react-router-dom';
import email_icon from '../Assets/email.jpg';
import password_icon from '../Assets/password.png';
import name_icon from '../Assets/Name.png';
import username_icon from '../Assets/username.png';
import date_of_birth_icon from '../Assets/date_of_birth.png';
import contact_icon from '../Assets/contact.png';
import address_icon from '../Assets/address.png';
import axios from 'axios';
import AdminAuthForm from './adminauthform';


const UserAuthForm = ({ }) => {
    const [data, setData] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        DOB: "",
        contact: "",
        address: ""
    });

    const navigate = useNavigate();
    const [action, setAction] = useState("Sign Up");
    const [error, setError] = useState("");




    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async () => {
        try {
            if (action === "Sign Up") {
                const url = "http://localhost:8080/auth/userregister";
                const { data: res } = await axios.post(url, data);
                console.log(res.message);
                navigate('/userlogin');
            } 
            // else if (action === "Login") {
            //     const url = "http://localhost:3000/userlogin";
            //     const { data: res } = await axios.post(url, data);
            //     console.log(res.message);
            // }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                setError(error.response.data.message);
            }
        }
    }


    return (
        <div className='auth'>
        <div className='container'>
            <div className='header'>
                <div className='text' >{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
              <div className='input'>
                    <img src={username_icon} alt='' />
                    <input type='text'
                        placeholder='Username'
                        name='username'
                        onChange={handleChange}
                        value={data.username}
                        required
                        className='input' />
                </div>

                    <div className='input'>
                        <img src={name_icon} alt='' />
                        <input type='text'
                            placeholder='Name'
                            name='name'
                            onChange={handleChange}
                            value={data.name}
                            required
                            className='input' />
                    </div>
                
                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input type='text'
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        required
                        className='input' />
                </div>
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input type='text'
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        required
                        className='input' />
                </div>
               
                    <div className='input'>
                        <img src={date_of_birth_icon} alt='' />
                        <input type='text'
                            placeholder='Date of Birth'
                            name='DOB'
                            onChange={handleChange}
                            value={data.DOB}
                            required
                            className='input' />
                    </div>
               
                    <div className='input'>
                        <img src={contact_icon} alt='' />
                        <input type='text'
                            placeholder='Contact'
                            name='contact'
                            onChange={handleChange}
                            value={data.contact}
                            required
                            className='input' />
                    </div>

                {action === "Login" ? <div></div> :
                    <div className='input'>
                        <img src={address_icon} alt='' />
                        <input type='text'
                            placeholder='Address'
                            name='address'
                            onChange={handleChange}
                            value={data.address}
                            required
                            className='input' />
                    </div>}
            </div>
            <div className='submit-container'>
            <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login"); handleSubmit(); }}
            >Login</div>

                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up"); handleSubmit(); }}

                >Sign Up</div>
                
            </div>
        </div>

        <AdminAuthForm/>
        </div>
    )
}

export default UserAuthForm;
