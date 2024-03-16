import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reset() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let nav=useNavigate()


  async function resetPassword() {
    try {  
      setLoading(false);
      console.log(email,password)
      const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        {"email":email,
        "newPassword": password}
        
      );
      console.log(response)
      setLoading(true);
      console.log(response.data); 
      console.log(response.status); 

      if (response.status == 200) {
        localStorage.setItem("token",response.data.token)
        return (
           nav('/Home')
       
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container my-5">
        <h2 className="fw-bolder">Reset your account password</h2>
        <input
          type="email"
          className="form-control w-100 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control w-100"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn bg-main my-4 text-white" onClick={resetPassword}>
          {loading ? 'Reset Password' : <i className="fa fa-spinner fa-spin"></i>}
        </button>
      </div>
    </>
  );
}