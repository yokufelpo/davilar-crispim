'use client';

import { userContext } from '@/components/LoginVerifier';
import { login } from '@/config/drizzle-people';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(''); 
  const router = useRouter();
  const { setUser } = useContext(userContext);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const user = await login(username, password);
      if (user) {
        router.push('/');
        setUser(user);
      } else {
        setError('Usuário ou senha incorretos. Por favor, tente novamente.'); 
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setError('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
    }
  }

  return (
    <div className='flex flex-1 flex-col items-center justify-center p-12'>
      <div className='w-full max-w-md p-8 space-y-8 rounded-lg bg-white shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-gray-900'>Login - daviLar</h1>
        <form onSubmit={onSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
              Usuário
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none'
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Senha
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none'
            />
          </div>
          {error && ( //algum erro
            <p className='text-red-500 text-sm'>{error}</p>
          )}
          <button
            type='submit'
            className='w-full px-4 py-2 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
