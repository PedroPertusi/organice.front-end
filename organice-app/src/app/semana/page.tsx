'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Adjust this import based on your actual configuration
import Navbar from '../components/Navbar';

const Semana = () => {
  const [lembretes, setLembretes] = useState([]);
  const [semana, setSemana] = useState('');
  const [dateInput, setDateInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("dia")) {
      localStorage.removeItem("dia");
    }
    // Redirect if no token is found in localStorage
    if (!localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const storedSemana = localStorage.getItem('semana');
    if (storedSemana) {
      setSemana(storedSemana);
      fetchLembretesForSemana(storedSemana);
    }
  }, []);

  const handleDateSubmit = () => {
    if (dateInput) {
      const formattedWeek = formatWeek(dateInput);
      localStorage.setItem('semana', formattedWeek);
      setSemana(formattedWeek);
      fetchLembretesForSemana(formattedWeek);
    } else {
      alert("Please enter a valid date to view lembretes!");
    }
  };

  const formatWeek = (dateStr) => {
    const date = new Date(dateStr);
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1));
    const endOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 7));

    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const start = startOfWeek.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    const end = endOfWeek.toLocaleDateString('en-GB', options).replace(/ /g, '-');

    return `${start} to ${end}`;
  };

  const fetchLembretesForSemana = (selectedSemana) => {
    const [start, end] = selectedSemana.split(' to ');
    const storedLembretes = localStorage.getItem('lembretes');
    if (storedLembretes) {
      const lembretesArray = JSON.parse(storedLembretes);
      const filteredLembretes = lembretesArray.filter(lembrete => {
        const lembreteDate = new Date(lembrete.fim);
        return lembreteDate >= new Date(start) && lembreteDate <= new Date(end);
      });
      setLembretes(filteredLembretes);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Navbar />
      <div className="flex justify-center pt-8"> 
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {!semana && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Enter Date for Week</h2>
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
            {semana && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Lembretes for {semana}</h2>
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
                {!lembretes.length && <p style={{ color: 'black' }}>No lembretes available for {semana}.</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Semana;
