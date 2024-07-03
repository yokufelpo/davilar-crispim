'use client';
import React, { useEffect, useState } from 'react';
import { users } from '../../../drizzle/schema';
import { getUsers, deleteUser } from '../../config/drizzle-people'; 

export default function UsersPage() {
  const [usersList, setUsersList] = useState<(typeof users.$inferSelect)[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<(typeof users.$inferSelect)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;

  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    if (editIndex !== -1) return;

    getUsers(page, pageSize)
      .then((data) => {
        setUsersList(data.users);
        setFilteredUsers(data.users);
        setTotalPages(data.totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, editIndex]);

  useEffect(() => {
    const filtered = usersList.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, usersList]);

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredUsers(usersList);
  };

  const handleDeleteUser = async (id: number) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o usuário ${id}?`);
    if (confirmDelete) {
      const success = await deleteUser(id);
      if (success) {
        getUsers(page, pageSize)
          .then((data) => {
            setUsersList(data.users);
            setFilteredUsers(data.users);
            setTotalPages(data.totalPages);
          });
      }
    }
  };

  if (editIndex !== -1) {}

  return (
    <div className='flex flex-1 flex-col items-center justify-center p-12'>
      <div
        className={`flex flex-1 flex-col rounded border border-black bg-purple-200 transition-all ${isLoading ? 'opacity-0' : 'opacity-100 delay-75'}`}
      >
        <input
          type='text'
          placeholder='Buscar Usuário'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='m-2 p-2 rounded border border-gray-300'
        />
        <button onClick={clearSearch} className='text-red-500'>
          Limpar
        </button>
        <table className='table-auto border-collapse text-left'>
          <thead className='bg-white'>
            <tr>
              <th className='border border-slate-600 p-2'>id</th>
              <th className='border border-slate-600 p-2'>Usuário</th>
              <th className='border border-slate-600 p-2'>Senha</th>
              <th className='border border-slate-600 p-2'>Admin</th>
              <th className='border border-slate-600 p-2'>Ação</th>
            </tr>
          </thead>
          <tbody className='flex-1 bg-purple-200'>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className='border border-slate-600 p-2'>{user.id}</td>
                <td className='border border-slate-600 p-2'>{user.username}</td>
                <td className='border border-slate-600 p-2'>{user.password}</td>
                <td className='border border-slate-600 p-2'>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td className='border border-slate-600 p-2'>
                  <button onClick={() => handleDeleteUser(user.id)} className='text-red-500'>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={`flex w-32 justify-center gap-2 rounded-b-lg bg-white p-4 transition-all ${isLoading ? 'opacity-0' : 'opacity-100 delay-75'}`}
      >
        <button
          disabled={page <= 1}
          onClick={() => setPage((page) => page - 1)}
          className='disabled:text-slate-400'
        >
          {'<-'}
        </button>
        <p>
          {page} / {totalPages}
        </p>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((page) => page + 1)}
          className='disabled:text-slate-400'
        >
          {'->'}
        </button>
      </div>
    </div>
  );
}
