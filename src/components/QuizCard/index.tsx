'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuizProps } from '@/firebase/quiz/quiz';
import { Bookmark, AccessTimeFilled } from '@mui/icons-material';

type QuizCard = {
  question: string;
  minutes: string;
  plays: string;
};

export default function QuizCard({
  quiz,
  quizCard,
}: {
  quiz: QuizProps;
  quizCard: QuizCard;
}) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <section className="flex flex-col gap-4 rounded-2xl px-4 py-3 shadow-custom1 md:w-60">
      <section className="flex justify-center">
        <div className="relative h-40 w-48 overflow-hidden rounded-2xl border-b-4 border-r-2 border-dusk-blue md:h-44 md:w-52">
          <Image
            src={quiz.thumbnail}
            alt={quiz.name}
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
          <div className="absolute right-0 top-0 rounded-es-xl bg-dusk-blue px-5 py-0.5 text-[11px] font-semibold text-white md:text-xs">
            <p>
              {quiz.numberOfQuestions} {quizCard.question}
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-between text-sm font-semibold text-slate-grey md:text-base">
        <h5>{quiz.name}</h5>
        <Bookmark
          sx={{ fontSize: { xs: 22, sm: 22, md: 24, lg: 24 } }}
          onClick={handleSave}
          className={`cursor-pointer ${
            isSaved ? 'text-blue-500' : 'text-gray-400'
          }`}
        />
      </section>

      <section className="flex items-center justify-between text-[11px] text-slate-grey md:text-xs">
        <div className="flex items-center gap-1">
          <AccessTimeFilled
            sx={{ fontSize: { xs: 22, sm: 22, md: 24, lg: 24 } }}
          />

          <p>
            {Math.floor((quiz.timePerQuestion * quiz.numberOfQuestions) / 60)}{' '}
            {quizCard.minutes}
          </p>
        </div>

        <div className="rounded-2xl bg-dusk-blue px-4 py-0.5 text-white">
          <p>
            {quiz.numberOfPlayers} {quizCard.plays}
          </p>
        </div>
      </section>
    </section>
  );
}
