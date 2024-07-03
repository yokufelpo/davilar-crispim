'use client';

import { useContext } from 'react';
import NavBarItem from './NavbarItem';
import { NAV_LINKS } from '@/config';
import { userContext } from '../LoginVerifier';
import Link from 'next/link';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useContext(userContext);

  return (
    <div className='bg-pattern flex gap-6 p-2 items-center'>
      {NAV_LINKS.map((item) => (
        <NavBarItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          title={item.title}
        />))}
      {user?.isAdmin === 1 && (
        <>
          <Link href="/create-user" className="flex flex-col items-center">
            <AiOutlineUserAdd size={70} />
            <div className="font-bold">Criar Usuário</div>
          </Link>
          <Link href="/user-list" className="flex flex-col items-center">
            <FaUsers size={70} />
            <div className="font-bold">Listar Usuários</div>
          </Link>
        </>
      )}
      <div className="flex-grow"></div>
      {user && (
        <button onClick={logout} className="flex flex-col items-center">
          <FiLogOut size={70} />
          <div className="font-bold">Sair</div>
        </button>
      )}
    </div>
  );
};
