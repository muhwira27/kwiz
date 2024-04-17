'use client';
import { Poppins } from 'next/font/google';
import { AuthUserProvider } from '@/firebase/auth/AuthUserProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthUserProvider>
      <section className={poppins.className}>{children}</section>
    </AuthUserProvider>
  );
}
