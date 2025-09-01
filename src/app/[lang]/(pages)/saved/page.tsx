import React from 'react';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import UserAuthClient from './userAuthClient';

export default async function Saved({ params }: { params: { lang: Locale } }) {
  const { saved } = await getDictionary(params.lang);
  const { quizCard } = await getDictionary(params.lang);
  const { common } = await getDictionary(params.lang);

  return (
    <main className="mb-3 mt-2 flex h-fit w-full flex-col gap-10 rounded-large bg-white px-6 py-6 shadow-custom1 sm:mt-3 md:mb-5 lg:px-9 lg:py-10">
      <section className="flex w-lvw flex-col gap-2 text-slate-grey md:w-full">
        <h2 className="text-lgx font-bold sm:text-xxl">{saved.title}</h2>
        <p className="text-base sm:text-lgx">{saved.subtitle}</p>
      </section>
      <UserAuthClient
        quizCard={quizCard}
        lang={params.lang}
        saved={saved}
        loadingText={common.loading}
      />
    </main>
  );
}
