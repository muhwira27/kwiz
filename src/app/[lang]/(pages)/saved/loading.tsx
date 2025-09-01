"use client";
import LoadingSpinner from '@/components/LoadingSpinner';
import { useParams } from 'next/navigation';

export default function Loading() {
  const { lang } = useParams() as { lang: string };
  const text = lang === 'en' ? 'Loading...' : 'Memuat...';
  return <LoadingSpinner text={text} />;
}
