
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

// const LOGIN_MUTATION = /*actual login mutation definition here */;

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: {
          username: formData.username,
          password: formData.password,
        },
      });

      const { token, user } = data.login;

      console.log('Login successful');
      console.log('Token:', token);
      console.log('User:', user);
      
    } catch (error) {
      console.error('Login failed', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (form input fields) */}
        <button type="submit">Login</button>
      </form>
      {/* ... (additional UI elements or links) */}
    </div>
  );
};

export default Login;



