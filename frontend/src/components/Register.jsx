import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
    // fetching UI data
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });
    let navigate = useNavigate();

    const inputEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData((preData) => {
            return {
                ...preData,
                [name]: value
            }
        });
    };

    // sending data to backend using fetch().
    const postData = async (event) => {
        event.preventDefault();

        const { name, email, password } = data;

        const res = await fetch('/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        console.log(res.json());

        if (res.status === 422) {
            alert("Registration Failed... You are alrady register Please Login...");
        }
        else {
            alert("Registration Successful...");
            navigate("/login");
        }
    };

    // Registration UI
    return (
        <>
            <div className="container">
                <div className="drop">
                    <div className="content">
                        <h3>Sign-Up</h3>
                        <form method='POST'>
                            <div className="inputBox">
                                <input type="text" placeholder="User Name" name='name' value={data.name} onChange={inputEvent} />
                            </div>
                            <div className="inputBox">
                                <input type="email" placeholder="Email" name='email' value={data.email} onChange={inputEvent} />
                            </div>
                            <div className="inputBox">
                                <input type="password" placeholder="password" name='password' value={data.password} onChange={inputEvent} />
                            </div>
                            <div className="inputBox">
                                <input type="submit" value="Sign Up" onClick={postData} />
                            </div>
                        </form>
                    </div>
                </div>
                <NavLink aria-current="page" to="/home" className="btns">Forget password</NavLink>
                <NavLink aria-current="page" to="/login" className="btns signup">Sign-In</NavLink>
            </div>
            <div className='copyRight'>
                <p> Copyright © by Krushna_3. All Rights Reserved.</p>
            </div>
        </>
    );
};

export default Register;