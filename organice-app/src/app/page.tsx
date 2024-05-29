'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar'; // Adjust the import path as necessary
import Image from 'next/image'; // Import next/image for optimized images
import homepageImage from '../assets/image.png'; // Adjust the import path as necessary

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("dia")) {
      localStorage.removeItem("dia");
    }

    if (localStorage.getItem("semana")) {
      localStorage.removeItem("semana");
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-green-600">Organice</h1>
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <Image src={homepageImage} alt="Organice Homepage" width={1200} height={800} />
        </div>
      </div>
    </div>
  );
};

export default Page;
