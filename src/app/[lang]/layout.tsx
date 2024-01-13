import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Locale } from '@/i18n.config';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Kwiz',
  description:
    'Kwiz: Your interactive platform with various quiz categories. Learn, play and track your progress!',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
