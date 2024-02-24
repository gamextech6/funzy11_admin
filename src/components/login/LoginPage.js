import React, { useState } from 'react';
import "./login.css";
import authLayout from "../../hoc/authLayout";
import { loginUser } from '../../api';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [inCorrect, setIncorreact] = useState(false);
  const navigateToOtherPage = () => {
    // Username validation
    if (!userName) {
      setUserNameError('User Name is required');
      return;
    }
    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(userName, password);
      window.location.href = '/dashboard';
      // Handle the response here, e.g., redirect to another page
      console.log(response);

    } catch (error) {
      setIncorreact(true);
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <div className="d-flex align-items-center my-4">
          <h1 className="text-center fw-normal mb-0 me-3">Log In</h1>
        </div>

        {/* User Name input */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">User Name</label>
          <input
            type="text"
            id="form3Example3"
            className={`form-control form-control-lg ${userNameError ? 'is-invalid' : ''}`}
            placeholder="Enter a valid user name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setUserNameError('');
            }}
          />
          {userNameError && <div className="invalid-feedback">{userNameError}</div>}
        </div>

        {/* Password input */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">Password</label>
          <input
            type="password"
            id="form3Example3"
            className={`form-control form-control-lg ${passwordError ? 'is-invalid' : ''}`}
            placeholder="Enter a valid password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
          />
          {passwordError && <div className="invalid-feedback">{passwordError}</div>}
        </div>
        {inCorrect == true ? <><p style={{ color: "red" }}>Email or Password not match</p></> : <></>}
        <div className="text-lg-start mt-4 pt-2">
          <button onClick={navigateToOtherPage} className="btn btn-lg" style={{backgroundColor:"#D54EC8", color:"white"}}>Proceed</button>
        </div>
      </form>
    </div>
  );
}

export default authLayout(LoginPage);
