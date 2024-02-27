import React, { useState } from 'react';
import "./res.scss"; // Assuming you have a stylesheet for styling
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../Auth/auth.action';

function RegisterPage() {
  const [formData, setFormData] = useState({
    // Initialize form data fields
    userName: '',
    userEmail: '',
    aboutUser: '',
    gender: '',
    dateOfBirth: '',
    role: 'Admin_Role', // Assuming Admin role by default
    userPassword: '',
  });

  const dispatch = useDispatch(); // Corrected to useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUserAction(formData));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create Your Account</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Username" className="input-field" />
        <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="Email" className="input-field" />
        <textarea name="aboutUser" value={formData.aboutUser} onChange={handleChange} placeholder="Tell us about yourself" className="input-field text-area"></textarea>
        <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="input-field" />
        <input type="password" name="userPassword" value={formData.userPassword} onChange={handleChange} placeholder="Password" className="input-field" />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
