
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const LOGIN_MUTATION = gql`
//   mutation Login($username: String!, $password: String!) {
//     login(username: $username, password: $password) {
//       token
//       user {
//         id
//         username
//       }
//     }
//   }
// `;

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  // const [loginMutation] = useMutation(LOGIN_MUTATION);

  const { username, password } = formData;



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

      navigate('./Dashboard')
      
    } catch (error) {
      console.error('Login failed', error.message);
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
     
    </div>
  );
};

export default Login;



