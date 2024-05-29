'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter if using next/router or adjust as per your configuration
import { parseJwt } from '../utils/parseJwt';
import Navbar from '../components/Navbar';

const ListLembretes = () => {
  const [lembretes, setLembretes] = useState([]);
  const router = useRouter();

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

  useEffect(() => {
    const fetchLembretes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const payload = parseJwt(token);
      const userId = payload ? payload.jti : null;
      
      if (!userId) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/lembretes/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch lembretes');

        const lembretesFromServer = await response.json();
        setLembretes(lembretesFromServer);
        localStorage.setItem('lembretes', JSON.stringify(lembretesFromServer)); // Update local storage with fresh data
      } catch (error) {
        const storedLembretes = localStorage.getItem('lembretes');
        if (storedLembretes) setLembretes(JSON.parse(storedLembretes));
      }
    };

    fetchLembretes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Navbar />
      <div className="flex justify-center pt-8"> 
        <div className="w-full max-w-md">
          <div className="flex justify-end">
            <button
              onClick={() => router.push('/lembretes/create')}
              className="mb-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-150 ease-in-out"
            >
              Create Lembrete
            </button>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Your Lembretes</h2>
            <ul>
              {lembretes.map((lembrete) => (
                <li key={lembrete.id} className="mb-4 p-4 border rounded shadow" style={{ color: 'black' }}>
                  <h3 className="text-lg font-semibold">{lembrete.title}</h3>
                  <p>{lembrete.description}</p>
                  <p><strong>Start:</strong> {lembrete.inicio}</p>
                  <p><strong>End:</strong> {lembrete.fim}</p>
                </li>
              ))}
            </ul>
            {!lembretes.length && <p style={{ color: 'black' }}>No lembretes available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListLembretes;
