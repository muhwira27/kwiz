import React from 'react';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import SearchClient from './searchClient';

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { q?: string };
}) {
  const { search, quizCard } = await getDictionary(params.lang);
  const q = (searchParams.q ?? '').toString();

  return (
    <main className="mb-3 mt-2 flex h-fit w-full flex-col gap-10 rounded-large bg-white px-6 py-6 shadow-custom1 sm:mt-3 md:mb-5 lg:px-9 lg:py-10">
      <section className="flex w-lvw flex-col gap-2 text-slate-grey md:w-full">
        <h2 className="text-lgx font-bold sm:text-xxl">{search.title}</h2>
        <p className="text-base sm:text-lgx">{search.resultsFor} "{q}"</p>
      </section>
      <SearchClient lang={params.lang} query={q} quizCard={quizCard} />
    </main>
  );
}

