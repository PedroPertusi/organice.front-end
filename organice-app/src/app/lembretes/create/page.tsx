// pages/CreateLembrete.jsx or wherever the component is located
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import from 'next/router'
import { parseJwt } from '../../utils/parseJwt'; // Ensure the correct path to 'parseJwt'
import Navbar from '../../components/Navbar'; // Verify the path to Navbar
import { useEffect } from 'react';

const CreateLembrete = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const router = useRouter();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
  };

  useEffect(() => {
      // Redirect if no token is found in localStorage
      if (localStorage.getItem("dia")) {
        localStorage.removeItem("dia");
      }

      if (localStorage.getItem("semana")) {
        localStorage.removeItem("semana");
      }

      if (!localStorage.getItem('token')) {
          router.push('/');
      }
  }, [router]);

  const handleCreateLembrete = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Retrieve the token from storage and parse it
    const token = localStorage.getItem('token'); // Adjust key name as needed
    const payload = parseJwt(token);
    const userId = payload ? payload.jti : null; // Ensure you have a valid token

    if (!userId) {
      alert('User ID is missing');
      return;
    }

    const lembreteIn = {
      title,
      description,
      inicio: formatDate(inicio),  // Formatting the date
      fim: formatDate(fim), 
    };

    try {
      const response = await fetch('http://localhost:8080/lembretes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'id-user': userId, // Now dynamically setting the user ID
        },
        body: JSON.stringify(lembreteIn),
      });

      if (!response.ok) {
        throw new Error('Failed to create lembrete');
      }

      router.push('/lembretes');
    } catch (error) {
        if (!localStorage.getItem('lembretes')) {
            localStorage.setItem('lembretes', JSON.stringify([lembreteIn]));
        } else {
            const lembretes = JSON.parse(localStorage.getItem('lembretes') ?? '');
            localStorage.setItem('lembretes', JSON.stringify([...lembretes, lembreteIn]));
        }
        router.push('/lembretes');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Create a New Lembrete</h2>
          <form onSubmit={handleCreateLembrete} className="space-y-4">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>
            <div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>
            <div>
              <input
                type="date"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>
            <div>
              <input
                type="date"
                value={fim}
                onChange={(e) => setFim(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Create Lembrete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLembrete;
