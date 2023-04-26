import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    // fetching UI data
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const loginEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData((preData) => {
            return {
                ...preData,
                [name]: value
            }
        });
    }

    // sending data to backend using fetch().
    const loginData = async (event) => {
        event.preventDefault();

        const { email, password } = data;

        const res = await fetch('/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        // console.log(res.json());

        if (res.status === 420) {
            alert("Login Failed! Please Enter Valid Password...");
        }
        else if (res.status === 421) {
            alert("Login Failed! Please Enter a Valid Mail Or Register Your Self");
        }
        else {
            alert("Login Successful...");
            navigate("/home");
        }
    };

    // Login UI
    return (
        <>
            <div className="container">
                <div className="drop">
                    <div className="content">
                        <h3>Log-In</h3>
                        <form onSubmit={() => { alert(`Login successful`) }}>
                            <div className="inputBox">
                                <input type="email" placeholder="Email" name='email' value={data.email} onChange={loginEvent} />
                            </div>
                            <div className="inputBox">
                                <input type="password" placeholder="password" name='password' value={data.password} onChange={loginEvent} />
                            </div>
                            <div className="inputBox">
                                <input type="submit" value="Log In" onClick={loginData} />
                            </div>
                        </form>
                    </div>
                </div>
                <NavLink aria-current="page" to="/home" className="btns">Forget password</NavLink>
                <NavLink aria-current="page" to="/register" className="btns signup">Sign-Up</NavLink>
            </div>
            <div className='copyRight'>
                <p> Copyright © by Krushna_3. All Rights Reserved.</p>
            </div>
        </>
    );
};

export default Login;