import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import LoginVerifier from '@/components/LoginVerifier';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <LoginVerifier>
          <Navbar />
          <main className='bg-pattern-cross flex flex-1'>{children}</main>
        </LoginVerifier>
      </body>
    </html>
  );
}
