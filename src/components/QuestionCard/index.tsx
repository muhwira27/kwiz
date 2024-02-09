import React from 'react';
import Image from 'next/image';
import { QuizProps } from '@/firebase/quiz/quiz';
import { QuestionProps } from '@/firebase/quiz/quiz';

export default function QuestionCard({
  quiz,
  question,
}: {
  quiz: QuizProps;
  question: QuestionProps;
}) {
  return (
    <section className="flex flex-col gap-5 md:gap-8">
      {/* duration bar */}
      <section className="flex items-center gap-6">
        <section className="w-full">
          <div className="h-8 md:h-12 rounded-full border-2 border-[#7B8699]">
            <div className="ml-auto h-full w-4/5 rounded-full bg-[#A4B3CC]"></div>
          </div>
        </section>

        <section>
          <p className="text-xxl font-bold text-slate-grey">
            {quiz.timePerQuestion}
            <span className="text-base font-medium">s</span>
          </p>
        </section>
      </section>

      {/* thumbnail question */}
      <section className="flex flex-col gap-5 md:flex-row">
        <section className="relative h-44 w-72 md:w-96">
          <Image
            src={question.image}
            alt=""
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-large object-cover object-center"
          />
        </section>

        {/* question and answer options */}
        <section className="flex w-full flex-col gap-6 md:gap-14">
          <section className="flex flex-col gap-4 md:gap-8">
            {/* number of question right now */}
            <div className="w-fit rounded-large border-2 border-[#83A8A0] px-7 py-1">
              <p className="text-sm font-semibold text-[#83A8A0] md:text-base">
                Question 1/10
              </p>
            </div>
            <h2 className="text-lgx font-semibold md:text-xxl">
              {question.question}
            </h2>
          </section>

          {/* answer options */}
          <section className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-10">
            <button className="rounded-lg bg-[#F0F0F0] p-2 text-lg text-slate-grey md:text-xl">
              {question.option1}
            </button>

            <button className="rounded-lg bg-[#F0F0F0] p-2 text-lg text-slate-grey md:text-xl">
              {question.option2}
            </button>

            <button className="rounded-lg bg-[#F0F0F0] p-2 text-lg text-slate-grey md:text-xl">
              {question.option3}
            </button>

            <button className="rounded-lg bg-[#F0F0F0] p-2 text-lg text-slate-grey md:text-xl">
              {question.option4}
            </button>
          </section>

          <button className="rounded-lg bg-misty-blue p-2 text-white md:text-xl">
            Send
          </button>
        </section>
      </section>
    </section>
  );
}
