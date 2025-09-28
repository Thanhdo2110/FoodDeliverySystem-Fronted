import React from 'react';
import { Link } from 'react-router-dom';


const Register = () => {
    return (
        <div className="login-wrapper"> 
            <div className="login-card">
                
                <h2 className="card-title">Sign Up</h2>
                
                <form>
                
                    <div className="mb-3 input-group">
                        <input type="text" className="form-control" placeholder="Full Name" />
                    </div>

                  
                    <div className="mb-3 input-group">
                        <input type="email" className="form-control" placeholder="Email address" />
                    </div>
                    
                   
                    <div className="mb-4 input-group">
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>

                    
                    <button type="submit" className="btn btn-primary mb-3">
                        SIGN UP
                    </button>
                    
                   
                    <button type="button" className="btn btn-danger">
                        RESET
                    </button>
                </form>

                {/* Liên kết chuyển về Sign In */}
                <p className="signup-link-text">
                    Already have an account? <Link to="/login" className="signin-link">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;