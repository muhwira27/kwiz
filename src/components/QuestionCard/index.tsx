'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { QuizProps } from '@/firebase/quiz/quiz';
import { QuestionProps } from '@/firebase/quiz/quiz';
import DurationBar from '../DurationBar';
import { shuffleArray } from '@/utils/shuffleArray';

type QuestionCardProps = {
  question: string;
  second: string;
  send: string;
  submit: string;
};

export default function QuestionCard({
  quiz,
  question,
  handleNextQuestion,
  onCorrectAnswer,
  indexQuestion,
  isLastQuestion,
  isPaused,
  props,
}: {
  quiz: QuizProps;
  question: QuestionProps;
  handleNextQuestion: () => void;
  onCorrectAnswer: () => void;
  indexQuestion: number;
  isLastQuestion: boolean;
  isPaused: boolean;
  props: QuestionCardProps;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [options, setOptions] = useState<Array<string>>([]);

  useEffect(() => {
    const options = [
      question.option1,
      question.option2,
      question.option3,
      question.option4,
    ];

    const shuffledOptions = shuffleArray([...options]);

    setOptions(shuffledOptions);
  }, [question]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const getOptionClass = (option: string) => {
    return `rounded-lg p-4 text-base font-medium sm:text-lg md:text-lgx ${
      selectedOption === option
        ? 'bg-[#00AD8A] text-[#F0F0F0]'
        : 'bg-[#F0F0F0] text-slate-grey hover:bg-[#00AD8A] hover:text-[#F0F0F0]'
    }`;
  };

  const handleSendClick = () => {
    if (selectedOption === question.answer) {
      onCorrectAnswer();
    }
    handleNextQuestion();
  };

  return (
    <section className="flex flex-col items-center gap-5 md:gap-8">
      {/* duration bar */}
      <DurationBar
        duration={quiz.timePerQuestion}
        onTimeUp={() =>
          selectedOption ? handleSendClick() : handleNextQuestion()
        }
        second={props.second}
        isPaused={isPaused}
      />

      {/* thumbnail question */}
      <section
        className={`flex flex-col items-center justify-center gap-5 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:gap-9 lg:gap-y-11 ${
          !question.image &&
          'min-[780px]:px-16 md:px-0 min-[1140px]:px-16 lg:px-20'
        } `}
      >
        {question.image && (
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
        )}

        {/* question and answer options */}
        <section className="flex w-full flex-col gap-6 md:gap-11 lg:gap-14">
          <section className="flex flex-col gap-4 md:gap-8">
            {/* number of question right now */}
            <div className="w-fit rounded-large border-2 border-[#83A8A0] px-7 py-1">
              <p className="text-sm font-semibold text-[#83A8A0] md:text-base">
                {props.question} {indexQuestion + 1}
                {'/'}
                {quiz.numberOfQuestions}
              </p>
            </div>
            <h2 className="text-lgx font-semibold md:text-xxl">
              {question.question}
            </h2>
          </section>

          {/* answer options */}
          <section className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-10">
            {options.map((option, index) => (
              <button
                key={index}
                className={getOptionClass(option)}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </section>

          <button
            onClick={handleSendClick}
            className={`rounded-lg p-2 text-white md:text-xl ${
              selectedOption
                ? 'bg-misty-blue hover:bg-stormy-sky'
                : 'bg-misty-blue/50 text-white/75'
            }`}
            disabled={!selectedOption}
          >
            {isLastQuestion ? `${props.submit}` : `${props.send}`}
          </button>
        </section>
      </section>
    </section>
  );
}
