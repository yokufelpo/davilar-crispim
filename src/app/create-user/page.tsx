'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userContext } from '@/components/LoginVerifier';
import { users } from '../../../drizzle/schema'; 
import { createUser } from '@/config/drizzle-people';

export default function CreateUser() {
  const { user } = useContext(userContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const created = await createUser(username, password, isAdmin);

    if (created) {
      setCreateSuccess(true); 
      setTimeout(() => {
        setCreateSuccess(false); // Reset success state after 3 seconds
        router.push('/'); // Redirect to home page
      }, 3000); // Show success message for 3 seconds
    } else {
      console.error('Failed to create user.');
    }
  };

  return (
    <div className='flex flex-1 flex-col items-center justify-center p-12'>
      <div className='w-full max-w-md p-8 space-y-8 rounded-lg bg-white shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-gray-900'>Criar Usuário</h1>
        
        {createSuccess && (
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4' role='alert'>
            Usuário criado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none'
              required
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none'
              required
            />
          </div>
          <div className='flex items-center space-x-4'>
            <input
              type='checkbox'
              id='isAdmin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className='text-blue-500 rounded'
            />
            <label htmlFor='isAdmin' className='text-sm font-medium text-gray-700'>
              Admin
            </label>
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
          >
            Criar Usuário
          </button>
        </form>
      </div>
    </div>
  );
}
