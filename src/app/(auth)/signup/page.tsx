"use client";

import { useRouter } from 'next/navigation'; // Use `next/router` instead of `next/navigation`
import React, { useState } from 'react';
import { verifySignupSchema } from '@/schemas/signUpSchemas'; // Adjust path as per your project structure

interface SignupInterface {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupInterface>({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>(''); 
  const [isLoading,setIsLoading]=useState<boolean>(false);

  const handleSignupFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    // Clear the error message when user edits the form again
    setError('');
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data); // Log API response

      if (response.ok) {
        router.push(`/verify?email=${formData.email}`); // Navigate to verification page
        console.log(data.message); // Show success message
        setIsLoading(false)
      } else {
        setError(data.message); // Set error message
        setIsLoading(false)
      }

    } catch (error: any) {
      setError(error.message); // Set validation error message
      setIsLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-1/3 bg-gray-200 flex flex-col gap-10 mt-20 rounded-md">
        <div className="text-center">
          <p className='text-3xl font-bold font-serif my-6'>Signup</p>
        </div>
        <div className="w-full flex justify-center py-6">
          <form onSubmit={handleFormSubmit} className='w-8/12 flex flex-col gap-6'>
            <div>
              <label htmlFor="username">
                <input
                  className='test-xl p-2 rounded-lg w-full'
                  type="text"
                  id="username"
                  placeholder='Username'
                  value={formData.username}
                  onChange={handleSignupFormChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                <input
                  className='test-xl p-2 rounded-lg w-full'
                  type="email"
                  id="email"
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleSignupFormChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <input
                  className='test-xl p-2 rounded-lg w-full'
                  type="password"
                  id="password"
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleSignupFormChange}
                />
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display validation error */}
            <div className="flex justify-center">
              <button type='submit' className={`bg-black text-white text-xl px-8 py-2 rounded-2xl hover:text-black hover:bg-white outline outline-1 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`} disabled={isLoading}>
                {isLoading ? 'Signing...' : 'Signup'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
