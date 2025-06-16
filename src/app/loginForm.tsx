"use client";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    const error = validateEmail(newEmail);
    setEmailError(error);
    setIsEmailValid(error === "");
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    const error = validatePassword(newPassword);
    setPasswordError(error);
    setIsPasswordValid(error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isEmailValid) {
      alert("Please enter a valid email address");
      return;
    }
    if (!isPasswordValid) {
      alert("Please enter a valid password that meets all requirements");
      return;
    }
    
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your login logic here
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          color: '#374151',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Email:
        </label>
        <input 
          type="email" 
          value={email} 
          onChange={handleEmailChange}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: `1px solid ${emailError && email ? '#ef4444' : '#d1d5db'}`,
            borderRadius: '6px',
            fontSize: '16px',
            color: '#111827',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = emailError && email ? '#ef4444' : '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = emailError && email ? '#ef4444' : '#d1d5db'}
        />
        {emailError && email && (
          <div style={{
            marginTop: '8px',
            fontSize: '14px',
            color: '#ef4444'
          }}>
            {emailError}
          </div>
        )}
        {isEmailValid && email && (
          <div style={{
            marginTop: '8px',
            fontSize: '14px',
            color: '#10b981'
          }}>
            ✓ Valid email address
          </div>
        )}
      </div>
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          color: '#374151',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Password:
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            required
            style={{
              width: '100%',
              padding: '12px 45px 12px 12px',
              border: `1px solid ${passwordError && password ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '6px',
              fontSize: '16px',
              color: '#111827',
              backgroundColor: '#ffffff',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = passwordError && password ? '#ef4444' : '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = passwordError && password ? '#ef4444' : '#d1d5db'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
              fontSize: '14px',
              padding: '4px',
            }}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {passwordError && password && (
          <div style={{
            marginTop: '8px',
            fontSize: '14px',
            color: '#ef4444'
          }}>
            {passwordError}
          </div>
        )}
        {isPasswordValid && password && (
          <div style={{
            marginTop: '8px',
            fontSize: '14px',
            color: '#10b981'
          }}>
            ✓ Password meets all requirements
          </div>
        )}
      </div>
      <button 
        type="submit"
        disabled={!isPasswordValid || !isEmailValid}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: (!isPasswordValid || !isEmailValid) ? '#9ca3af' : '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: (!isPasswordValid || !isEmailValid) ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => {
          if (!e.target.disabled) {
            e.target.style.backgroundColor = '#2563eb';
          }
        }}
        onMouseOut={(e) => {
          if (!e.target.disabled) {
            e.target.style.backgroundColor = '#3b82f6';
          }
        }}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
