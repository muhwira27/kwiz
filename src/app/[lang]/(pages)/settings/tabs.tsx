'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { usePathname } from 'next/navigation';

export default function Tabs({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  const pathname = usePathname();
  return (
    <>
      <main className="mb-3 mt-2 flex h-fit w-full gap-3 rounded-large bg-white px-4 pb-6 pt-4 shadow-custom1 sm:gap-4 sm:px-6 sm:py-5 sm:pb-7 md:gap-6 md:px-8 md:py-6 md:pt-5 lg:gap-10 lg:px-9">
        <Link
          className={`p-2 text-base font-semibold leading-none sm:text-lg lg:text-lgx ${
            !pathname.includes('quiz-history')
              ? 'rounded-b-sm border-b-4 border-charcoal text-charcoal'
              : 'text-misty-blue'
          }`}
          href={`/${lang}/settings`}
        >
          Settings
        </Link>
        <Link
          className={`p-2 text-base font-semibold leading-none sm:text-lg lg:text-lgx ${
            pathname.includes('quiz-history')
              ? 'rounded-b-sm border-b-4 border-charcoal text-charcoal'
              : 'text-misty-blue'
          }`}
          href={`/${lang}/settings/quiz-history`}
        >
          Quiz History
        </Link>
      </main>
      {children}
    </>
  );
}
