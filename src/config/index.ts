import { IconType } from 'react-icons';
import { FaPeopleRoof } from 'react-icons/fa6';
import { HiClipboardDocumentList } from 'react-icons/hi2';
import { IoPeopleSharp } from 'react-icons/io5';

export type NavBarItemType = {
  title: string;
  href: string;
  icon: IconType;
};

export const NAV_LINKS: NavBarItemType[] = [
  { href: '/add-people', icon: FaPeopleRoof, title: 'Acolhimento' },
  { href: '/peoples', icon: IoPeopleSharp, title: 'Acolhidos' },
  { href: '/report', icon: HiClipboardDocumentList, title: 'Relatórios' },
];
