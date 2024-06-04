'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import QuizCard from '@/components/QuizCard';
import { getSavedQuizzes } from '@/firebase/auth/getSavedQuizzes';
import { Locale } from '@/i18n.config';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default function UserAuthClient({
  quizCard,
  lang,
}: {
  quizCard: any;
  lang: Locale;
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

  return (
    <section>
      <div className="flex h-fit w-full gap-3 overflow-x-auto rounded-2xl px-2 py-4 scrollbar-hide">
        {savedQuizzes.map((quiz) => (
          <Link key={quiz.id} href={`quiz/${quiz.id}`}>
            <QuizCard quiz={quiz} quizCard={quizCard} />
          </Link>
        ))}
      </div>
    </section>
  );
}
