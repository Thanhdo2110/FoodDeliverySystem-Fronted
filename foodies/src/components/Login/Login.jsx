import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import { login } from '../../service/authService';

const Login = () => {
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // Thêm loading state

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // Bắt đầu loading
    
    try {
      const response = await login(data);
      
      if (response.status === 200) {
        const token = response.data.token;
        
        // Lưu token
        setToken(token);
        localStorage.setItem('token', token);
        
        toast.success('Login successful!');
        
        // Navigate sau 500ms
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        toast.error('Unable to login. Please try again');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Hiển thị lỗi chi tiết từ backend
      const errorMessage = error.message || 'Invalid email or password';
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const onResetHandler = () => {
    setData({
      email: '',
      password: ''
    });
  };

  return (
    <div className="login-wrapper"> 
      <div className="login-card">
        
        <h2 className="card-title">Sign In</h2>
        
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 input-group">
            <input 
              type="email" 
              className="form-control" 
              placeholder="Email address"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary mb-3"
            disabled={loading}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
          
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={onResetHandler}
            disabled={loading}
          >
            RESET
          </button>
        </form>
        
        <p className="signin-link-text">
          Don't have an account? <Link to="/register" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;