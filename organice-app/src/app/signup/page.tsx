'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar'; // Ensure the correct path to Navbar
import { useEffect } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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

  const handleSignUp = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
        const user = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!user.ok) {
            throw new Error('Invalid credentials');
        }

        router.push('/login');
    } catch (error) {
        router.push('/login');
    }
  };

  return (
    
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Create Your Account</h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
            Already have an account? <a href="/login" className="text-green-500">Login here</a>
          </div>
          <p className="text-center mt-6 text-gray-600">
            By signing up, you agree to our <a href="/terms" className="text-green-500">Terms of Service</a> and <a href="/privacy" className="text-green-500">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
