import React from 'react';
import Image from 'next/image';
import { QuizProps } from '@/firebase/quiz/quiz';

type QuizDetailProps = {
  category: string;
  questions: string;
  timeLimit: string;
  sec: string;
  points: string;
};

export default function QuizDetailCard({
  quiz,
  quizDetail,
}: {
  quiz: QuizProps;
  quizDetail: QuizDetailProps;
}) {
  return (
    <section
      className="mb-3 flex w-full flex-col gap-3 
      sm:gap-4 
      min-[850px]:flex-row 
      md:flex-col md:gap-10 
      min-[1104px]:flex-row 
      lg:gap-14"
    >
      <div
        className="relative h-[50vw] w-full rounded-2xl shadow-md 
        min-[850px]:h-[32vw] min-[850px]:w-[60%] 
        md:w-full 
        min-[1104px]:h-[20vw]
        min-[1104px]:w-1/2
        lg:h-[22vw]"
      >
        <Image
          src={quiz.thumbnail}
          alt={quiz.name}
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-2xl object-cover object-center"
        />
      </div>

      <div className="flex flex-col gap-4 text-base font-semibold text-slate-grey sm:text-lg md:gap-5 min-[1104px]:gap-7 lg:gap-8 lg:text-lgx">
        <div>
          <span className="inline-block w-32 sm:w-[8.125rem] md:w-[8.25rem] lg:w-40">
            {quizDetail.category}:
          </span>
          <span className="font-normal">{quiz.category}</span>
        </div>
        <div>
          <span className="inline-block w-32 sm:w-[8.125rem] md:w-[8.25rem] lg:w-40">
            {quizDetail.questions}:
          </span>
          <span className="font-normal">
            {quiz.numberOfQuestions} {quizDetail.questions}
          </span>
        </div>
        <div>
          <span className="inline-block w-32 sm:w-[8.125rem] md:w-[8.25rem] lg:w-40">
            {quizDetail.timeLimit}:
          </span>
          <span className="font-normal">
            {quiz.timePerQuestion} {quizDetail.sec}
          </span>
        </div>
        <div>
          <span className="inline-block w-32 sm:w-[8.125rem] md:w-[8.25rem] lg:w-40">
            {quizDetail.points}:
          </span>
          <span className="font-normal">
            {quiz.scorePerQuestion * quiz.numberOfQuestions} {quizDetail.points}
          </span>
        </div>
      </div>
    </section>
  );
}
