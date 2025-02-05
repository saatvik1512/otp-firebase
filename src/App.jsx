import { useState, useEffect } from 'react';
import { auth } from './firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import './App.css';

function App() {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const TEST_PHONE_NUMBER = '+917722969233'; // Your test number

  useEffect(() => {
    // Initialize reCAPTCHA
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
    });
  }, []);

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPhoneNumber(
        auth,
        TEST_PHONE_NUMBER,
        window.recaptchaVerifier
      );
      
      window.confirmationResult = result;
      setOtpSent(true); // Your test OTP
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const result = await window.confirmationResult.confirm(otp);
      alert('Login successful!');
      console.log('User:', result.user);
    } catch (error) {
      console.error('Error:', error);
      alert('Invalid OTP');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <div id="recaptcha-container"></div>

        {!otpSent ? (
          <form onSubmit={sendOtp}>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>
              Phone Authentication
            </h2>
            <input
              type="tel"
              placeholder="Enter your phone number (e.g., +911234567890)"
              style={{
                backgroundColor: '#d0d0d0',
                color: 'black',
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                padding: '0.75rem',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>Verify OTP</h2>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              style={{
                color:'black',
                backgroundColor: '#f9f9f9',
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                padding: '0.75rem',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;