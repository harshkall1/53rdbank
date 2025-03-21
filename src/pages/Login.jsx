import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import body from '../assets/body.png';
import backimage from '../assets/backimage.png';
import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />
      <div className="login-hero">
        <div className="login-banneraera">

         <img src={backimage} alt="background" className='login-background-img' />
        </div>
        <div className="login-form-area">
          <div className="login-box">
            <div className='login-box-heading'>
              <h1>Log In</h1>
              </div>
            {/* Error Message */}
            {errorMessage && (
              <p
                className="login-error-message"
                style={{
                  color: '#d32f2f',
                  fontSize: '14px',
                  marginTop: '10px',
                  textAlign: 'center',
                  padding: '12px',
                  backgroundColor: '#ffebee',
                  border: '1px solid #ffcdd2',
                  borderRadius: '8px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {errorMessage}
              </p>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="login-input-group">
                <lable>User ID</lable>
                <input
                  type="text"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className='login-save-button'>
                <p>save</p></div>
              </div>

             {/* <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '15px',
                }}
              >
                 <div
                  style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                  }}
                >
                  <input type="checkbox" name="check" id="rememberMe" />
                  <label htmlFor="rememberMe" style={{ fontWeight: 'normal', fontSize: '12px' }}>
                    Save my User ID
                  </label>
                </div>
                <a href="#">Forgot User ID</a>
              </div> */}

              <div className="login-input-group">
                <lable>Password</lable>
                <input
                  type="password"
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

        

              <br />

              <button className="login-sign-in-btn" type="submit" disabled={loading}>
                {loading ? <Loader /> : 'Log in'}
              </button>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  paddingTop: '15px',
                }}
              >
                <a href="#">Forgot login ?</a>
              </div>
            </form>

            {/* Additional Links */}
            <div className="login-links">
              <div style={{
                display: "flex",
                gap: "10px",
              }}>

                <span style={{
                  color: "black",
                  fontSize: "16px"
                }}>
                 First Time User?
                </span>
                <a href="#" className="login-link">Register.</a>
              </div>
              {/* <a href="#" className="login-link">
                Corporate & Commercial banking login <MdKeyboardArrowRight size={20} />
              </a>
              <a href="#" className="login-link login-link-grey">
                Enroll in online banking
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <br />
      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;