import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Forgot() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState('');
  let navigate = useNavigate();

  async function forgetPassword() {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        { email }
      );
      setLoading(false);
      setIsCodeSent(true);
      setEmail(''); // Clear the email input
      console.log(response.data); // You can handle the response as per your requirements
    } catch (error) {
      setLoading(false);
      setError('Failed to send code. Please try again.');
      console.error(error);
    }
  }

  async function verifyResetCode() {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        {'resetCode': email }
      );
      setLoading(false);
      console.log(response.data); 
      if (response.data.status === 'Success') {
        setIsCodeSent(true);
        navigate('/reset')

      }
    } catch (error) {
      setLoading(false);
      setError('Failed to verify code. Please try again.');
      console.error(error);
    }
  }

  return (
    <>
      <div className="container my-5">
        <h2>Please Enter your verification code:</h2>
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          id="Email"
          placeholder={isCodeSent ? 'Verification Code' : 'Email:'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="btn bg-main text-white"
          onClick={isCodeSent ? verifyResetCode : forgetPassword}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Verify'}
        </button>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </>
  );
}
