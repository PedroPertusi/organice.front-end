'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Adjust this import based on your actual configuration
import Navbar from '../components/Navbar';

const Dia = () => {
  const [lembretes, setLembretes] = useState([]);
  const [dia, setDia] = useState('');
  const [dateInput, setDateInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("semana")) {
      localStorage.removeItem("semana");
    }
    // Redirect if no token is found in localStorage
    if (!localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const storedDia = localStorage.getItem('dia');
    if (storedDia) {
      setDia(storedDia);
      fetchLembretesForDia(storedDia);
    }
  }, []);

  const handleDateSubmit = () => {
    if (dateInput) {
      const formattedDate = formatDate(dateInput);
      localStorage.setItem('dia', formattedDate);
      setDia(formattedDate);
      fetchLembretesForDia(formattedDate);
    } else {
      alert("Please enter a valid date to view lembretes!");
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const timeZoneOffset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const adjustedDate = new Date(date.getTime() + timeZoneOffset);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return adjustedDate.toLocaleDateString('en-GB', options).replace(/ /g, '-');
  };

  const fetchLembretesForDia = (selectedDia) => {
    const storedLembretes = localStorage.getItem('lembretes');
    if (storedLembretes) {
      const lembretesArray = JSON.parse(storedLembretes);
      const filteredLembretes = lembretesArray.filter(lembrete => lembrete.fim.includes(selectedDia));
      setLembretes(filteredLembretes);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Navbar />
      <div className="flex justify-center pt-8"> 
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {!dia && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Enter Date</h2>
                <div className="flex flex-col items-center">
                  <input
                    type="date"
                    value={dateInput}
                    onChange={e => setDateInput(e.target.value)}
                    className="mb-4 p-2 border rounded text-black" // Ensuring the text color is black
                    style={{ color: 'black' }} // Inline style for text color
                  />
                  <button
                    onClick={handleDateSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            {dia && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Lembretes for {dia}</h2>
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
                {!lembretes.length && <p style={{ color: 'black' }}>No lembretes available for {dia}.</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dia;
