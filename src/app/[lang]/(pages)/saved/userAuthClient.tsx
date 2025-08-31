'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import dynamic from 'next/dynamic';
const QuizCardNoSSR = dynamic(() => import('@/components/QuizCard'), {
  ssr: false,
});
import { getSavedQuizzes } from '@/firebase/auth/getSavedQuizzes';
import { Locale } from '@/i18n.config';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default function UserAuthClient({
  quizCard,
  lang,
  saved,
}: {
  quizCard: any;
  lang: Locale;
  saved: any;
}) {
  const auth = useAuth();
  const userData = auth.user;
  const [savedQuizzes, setSavedQuizzes] = useState<any[]>([]);

  useEffect(() => {
    if (userData?.id) {
      const userRef = doc(db, 'user', userData.id);
      const unsubscribe = onSnapshot(userRef, (userDoc) => {
        if (userDoc.exists() && userDoc.data().savedQuizzes) {
          const savedQuizIds = userDoc.data().savedQuizzes;
          getSavedQuizzes(savedQuizIds, lang, (data) => {
            setSavedQuizzes(data || []);
          });
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userData, lang]);

  if (!savedQuizzes || savedQuizzes.length === 0) {
    return (
      <section className="flex items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center rounded-2xl px-6 py-10 text-center text-slate-grey">
          <p className="mb-1 text-lg font-semibold sm:text-xl">
            {saved?.emptyTitle ?? 'No saved quizzes yet'}
          </p>
          <p className="max-w-xl text-sm sm:text-base">
            {saved?.emptySubtitle ??
              'Save quizzes from Dashboard or Category to find them here.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex h-fit w-full gap-3 overflow-x-auto rounded-2xl px-2 py-4 scrollbar-hide">
        {savedQuizzes.map((quiz) => (
          <Link key={quiz.id} href={`/${lang}/quiz/${quiz.id}`}>
            <QuizCardNoSSR quiz={quiz} quizCard={quizCard} />
          </Link>
        ))}
      </div>
    </section>
  );
}
