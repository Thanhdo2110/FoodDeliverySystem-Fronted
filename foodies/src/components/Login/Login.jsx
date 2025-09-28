import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="login-wrapper"> 
      <div className="login-card">
        
        <h2 className="card-title">Sign In</h2>
        
        <form>
          <div className="mb-3 input-group">
            <input type="email" className="form-control" placeholder="Email address" />
          </div>
          
          <div className="mb-4 input-group">
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          
         
          <button type="submit" className="btn btn-primary mb-3">
            SIGN IN
          </button>
          
          
          <button type="button" className="btn btn-danger">
            RESET
          </button>
        </form>
        
        {/* Liên kết chuyển sang Sign Up */}
        <p className="signin-link-text">
          Don't have an account? <Link to="/register" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;