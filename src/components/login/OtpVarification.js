import React from 'react'
import { Link } from 'react-router-dom';
import "./login.css";
// import { registerLogin } from '../../api';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import authLayout from "../../hoc/authLayout";

function OtpVarification() {
     // const navigate = useNavigate();
     const [password, setPassword] = useState('');
     const [email, setEmail] = useState('');
     const [inCorrect, setIncorreact] = useState(false);
 
     const [status, setStatus] = useState('');
     const navigateToOtherPage = () => {
       // Use the history object to navigate to the other page
       // history.push('/');
       window.location.href = '/dashboard';
     };
   
     const handleSubmit = async (event) => {
       event.preventDefault(); // Prevent the default form submission behavior
   
     //   try {
     //     const formData = new FormData();
     //     formData.append('email', email);
     //     formData.append('password', password );
   
     //     const result = await registerLogin(formData);
     //     console.log(result);
     //     if(result.status){
     //       window.location.href = '/landing-page';
     //       // navigate = '/landing-page';
     //     }else {
     //       setIncorreact(true);
     //       console.log(inCorrect);
     //     }
     //     setStatus(result);
     //   } catch (error) {
     //     setIncorreact(true);
     //     console.log(inCorrect);
     //     console.error('Error registering user:', error);
     //     setStatus('Error registering user.');
     //   }
     };
  return (
    <div>
        <form className="login-form" onSubmit={handleSubmit}>
                <div className="d-flex align-items-center my-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Log In</h1>
                </div>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Otp</label>
                    <input type="number" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter a valid otp" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* <!-- Password input --> */}
               

                <div className="d-flex justify-content-between align-items-center">
                   
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                {/* <button type="submit" className="btn btn-primary btn-lg">Proceed</button> */}
                <button onClick={navigateToOtherPage} className="btn btn-primary btn-lg">Proceed</button>

                </div>
            </form>
    </div>
  )
}

export default authLayout(OtpVarification);