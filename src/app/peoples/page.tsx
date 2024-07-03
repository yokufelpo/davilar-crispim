'use client';
import React, { useEffect, useState } from 'react';
import { people } from '../../../drizzle/schema';
import { getPeoples } from '@/config/drizzle-people';
import EditPage from './_components/EditPage';

export default function PeoplesPage() {
  const [peoples, setPeoples] = useState<(typeof people.$inferSelect)[]>([]);
  const [filteredPeoples, setFilteredPeoples] = useState<(typeof people.$inferSelect)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString();
  }

  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    if (editIndex !== -1) return;

    getPeoples(page, pageSize)
      .then((data) => {
        setPeoples(data.peoples);
        setFilteredPeoples(data.peoples); 
        setTotalPages(data.totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [page, editIndex]);

  
  useEffect(() => {
    const filtered = peoples.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeoples(filtered);
  }, [searchTerm, peoples]);

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredPeoples(peoples); 
  };


  if (editIndex !== -1) {
    return <EditPage setEditIndex={setEditIndex} editIndex={editIndex} />;
  }

  return (
    <div className='flex flex-1 flex-col items-center justify-center p-12'>
      <div
        className={`flex flex-1 flex-col rounded border border-black bg-purple-200 transition-all ${isLoading ? 'opacity-0' : 'opacity-100 delay-75'}`}
      >
        <input
          type='text'
          placeholder='Buscar por nome...'
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
              <th className='border border-slate-600 p-2'>#</th>
              <th className='border border-slate-600 p-2'>Nome</th>
              <th className='border border-slate-600 p-2'>Idade</th>
              <th className='border border-slate-600 p-2'>
                Nascimento
              </th>
              <th className='border border-slate-600 p-2'>Cor</th>
              <th className='border border-slate-600 p-2'>Gênero</th>
              <th className='border border-slate-600 p-2'>Data de Entrada</th>
              <th className='border border-slate-600 p-2'>Razão de Entrada</th>
              <th className='border border-slate-600 p-2'>Documento</th>
              <th className='border border-slate-600 p-2'>Escolaridade</th>
              <th className='border border-slate-600 p-2'>Vício</th>
              <th className='border border-slate-600 p-2'>Deficiência</th>
              <th className='border border-slate-600 p-2'>Doença Crônica</th>
              <th className='border border-slate-600 p-2'>Data de Saída</th>
              <th className='border border-slate-600 p-2'>Razão de Saída</th>
            </tr>
          </thead>
          <tbody className='flex-1 bg-purple-200'>
            {filteredPeoples.map((person) => (
              <tr onClick={() => setEditIndex(person.id)} key={person.id}>
                <td className='border border-slate-600 p-2'>{person.id}</td>
                <td className='border border-slate-600 p-2'>{person.name}</td>
                <td className='border border-slate-600 p-2'>{person.age}</td>
                <td className='border border-slate-600 p-2'>
                  {person.birthDate ? formatDate(person.birthDate) : ''}
                </td>
                <td className='border border-slate-600 p-2'>{person.color}</td>
                <td className='border border-slate-600 p-2'>{person.gender}</td>
                <td className='border border-slate-600 p-2'>
                  {formatDate(person.admissionDate)}
                </td>
                <td className='border border-slate-600 p-2'>
                  {person.admissionReason}
                </td>
                <td className='border border-slate-600 p-2'>
                  {person.document}
                </td>
                <td className='border border-slate-600 p-2'>
                  {person.education}
                </td>
                <td className='border border-slate-600 p-2'>
                  {person.addiction}
                </td>
                <td className='border border-slate-600 p-2'>
                  {person.deficiency}
                </td>
                <td className='border border-slate-600 p-2'>
                  {person.chronicDisease}
                </td>
                <td className='border border-slate-600 p-2'>
                    {person.checkoutDate ? formatDate(person.checkoutDate) : ''}
                </td>
                <td className='border border-slate-600 p-2'>
                  {person.checkoutReason}
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
