"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const QuizCardNoSSR = dynamic(() => import('@/components/QuizCard'), { ssr: false });
import { searchQuizzes } from '@/firebase/quiz/searchQuizzes';
import { Locale } from '@/i18n.config';

export default function SearchClient({
  lang,
  query,
  quizCard,
  loadingText,
}: {
  lang: Locale;
  query: string;
  quizCard: any;
  loadingText?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      setLoading(true);
      try {
        const data = await searchQuizzes(query, lang);
        if (alive) setResults(data);
      } finally {
        if (alive) setLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [lang, query]);

  return (
    <section>
      <div className="flex h-fit w-full gap-3 overflow-x-auto rounded-2xl px-2 py-4 scrollbar-hide">
        {loading && (
          <p className="px-2 text-slate-grey">{loadingText ?? 'Loading...'}</p>
        )}
        {!loading && results.length === 0 && (
          <p className="px-2 text-slate-grey">No results</p>
        )}
        {!loading &&
          results.map((quiz) => (
            <Link key={quiz.id} href={`/${lang}/quiz/${quiz.id}`}>
              <QuizCardNoSSR quiz={quiz} quizCard={quizCard} />
            </Link>
          ))}
      </div>
    </section>
  );
}
