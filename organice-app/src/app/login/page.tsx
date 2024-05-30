'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import { useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect if no token is found in localStorage
    if (localStorage.getItem("dia")) {
      localStorage.removeItem("dia");
    }

    if (localStorage.getItem("semana")) {
      localStorage.removeItem("semana");
    }
  }, [router]);

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      return response.json();
    })
    .then(data => {
        const token = data.token;
        localStorage.setItem('token', token);
        router.push('/');
    })
    .catch(error => {
      console.error(error);
      // localStorage.setItem('token', 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI4YmE1NjE3ZC01MTJlLTRjM2UtOTI0NC1jNmRhODVhZGM1NDUiLCJpc3MiOiJJbjVwRXIiLCJzdWIiOiJFZHVhcmRvIFYiLCJyb2xlIjoicmVndWxhciIsIm5iZiI6MTcxNjk1MDIwMiwiZXhwIjoxNzQ4NDg2MjAyfQ.PwXuBkmry0tcxBHv1z0Doz95v7KitjGPxBf4Ywcqc5BxhBmtqEwmAmb-ugop_xsmW4iRSGIgcQp3SgIbW2iENA');
      // router.push('/');
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign In
            </button>
          </form>
          <div className="text-center mt-4">
            Don't have an account? <a href="/signup" className="text-green-500">Sign Up here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
