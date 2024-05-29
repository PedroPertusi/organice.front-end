'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import if using next/router for useRouter

const Navbar = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        // This will run on the client side only
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Remove everything from localStorage
        router.push('/'); // Redirect to home page
    };

    return (
        <nav className="bg-green-600 text-white flex justify-between items-center p-4 w-full">
            <div 
                className="text-2xl font-bold cursor-pointer"
                onClick={() => router.push('/')}
            >
                <h1>Organice</h1>
            </div>
            <div className="flex space-x-4">
                {token ? (
                    <>
                        <button 
                            onClick={() => router.push('/lembretes')}
                            className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Lembretes
                        </button>
                        <button 
                            onClick={() => router.push('/dia')}
                            className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Dia
                        </button>
                        <button 
                            onClick={() => router.push('/semana')}
                            className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Semana
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={() => router.push('/signup')}
                            className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Sign Up
                        </button>
                        <button 
                            onClick={() => router.push('/login')}
                            className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Login
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
