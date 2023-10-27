import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
 useToast
} from '@chakra-ui/react';

function Login() {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userID || !password) {
      toast({
        title: 'User ID and Password are required',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', {
        userID,
        password,
      });

      if (response) {
        Cookies.set('token', response.data.accessToken, { expires: 3 });
        Cookies.set('username', response.data.username, { expires: 3 });
        Cookies.set('userID', response.data.userID, { expires: 3 });
        window.localStorage.setItem('token', response.data.accessToken);
        toast({
          title: "Logging in",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate('/index');
        }, 3000)
      }
    } catch (err) {
      toast({
        title: err.response.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  return (
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'flex-start', 
      justifyContent: 'flex-start', 
      background: '#f0f0f0',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <form onSubmit={handleSubmit} style={{ 
        background: 'white',
        padding: '20px',
        boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.2)',
        borderRadius: '5px',
        width: '300px',
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="User ID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ 
            width: '100%', 
            padding: '10px', 
            background: 'blue', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
