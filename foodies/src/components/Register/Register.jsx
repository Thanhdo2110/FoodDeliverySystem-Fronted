import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { registerUser } from '../../service/authService';

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({
            ...data,
            [name]: value
        }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await registerUser(data);
            if (response.status === 201) {
                toast.success('Registration successful!');
                setData({
                    name: '',
                    email: '',
                    password: ''
                });
            } else {
                toast.error('Registration failed, please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('An error occurred, please try again later.');
        }
    };

    const onResetHandler = () => {
        setData({
            name: '',
            email: '',
            password: ''
        });
    };

    return (
        <div className="login-wrapper"> 
            <div className="login-card">
                
                <h2 className="card-title">Sign Up</h2>
                
                <form onSubmit={onSubmitHandler}>
                
                    <div className="mb-3 input-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Full Name"
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Email address"
                            name="email"
                            value={data.email}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    
                    <div className="mb-4 input-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            onChange={onChangeHandler}
                            required
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mb-3">
                        SIGN UP
                    </button>
                    
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={onResetHandler}
                    >
                        RESET
                    </button>
                </form>

                <p className="signup-link-text">
                    Already have an account? <Link to="/login" className="signin-link">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;