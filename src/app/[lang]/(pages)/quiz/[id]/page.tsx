import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { getQuizById } from '@/firebase/quiz/getQuizById';
import Link from 'next/link';
import QuizDetailCard from '@/components/QuizDetailCard';

export default async function Quiz({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const { id, lang } = params;
  const { quiz } = await getDictionary(lang);

  const quizData = await getQuizById(id, lang);
  console.log(quizData);
  return (
    <main
      className={`mb-3 mt-2 flex ${
        quizData ? 'h-fit' : 'h-full'
      } w-full flex-col gap-7 rounded-large bg-white px-6 py-6 shadow-custom1 sm:mt-3 md:mb-5 lg:px-9 lg:py-10`}
    >
      {quizData === undefined ? (
        <section className="flex h-full w-full flex-col items-center justify-center gap-2">
          <h2 className="text-lgx font-bold text-slate-grey md:text-xl lg:text-xxl">
            {quiz.quizDetail.notFound}
          </h2>
          <p className="text-base text-slate-grey md:text-lg lg:text-lgx">
            {quiz.quizDetail.notFoundSub}
          </p>
        </section>
      ) : (
        <>
          <section className="flex flex-col gap-1 md:gap-2">
            <h5 className="text-lgx font-bold text-slate-grey md:text-xl lg:text-xxl">
              {lang === 'en'
                ? `${quizData?.name} ${quiz.quizDetail.title}`
                : `${quiz.quizDetail.title} ${quizData?.name}`}
            </h5>
            <p className="text-base text-slate-grey md:text-lg lg:text-lgx">
              {quiz.quizDetail.subtitle}
            </p>
          </section>

          {quizData && (
            <QuizDetailCard quiz={quizData} quizDetail={quiz.quizDetail} />
          )}

          <section className="felx flex-col">
            <h6 className="mb-3 text-base font-semibold text-slate-grey sm:text-lg md:text-lgx lg:text-xl">
              {quiz.quizDetail.instruction}
            </h6>

            <p className="text-sm leading-7 text-slate-grey sm:text-base sm:leading-8 md:leading-9 min-[1280px]:text-lg min-[1280px]:leading-9">
              {quiz.quizDetail.instruction1}
              <span className="mb-3 block" />
              <span className="font-medium">
                {quiz.quizDetail.instructionTime1}
              </span>
              {quiz.quizDetail.instructionTime2} {quizData?.timePerQuestion}{' '}
              {quiz.quizDetail.instructionTime3} <br />
              <span className="font-medium">
                {quiz.quizDetail.instructionAnswer1}
              </span>
              {quiz.quizDetail.instructionAnswer2} <br />
              <span className="mb-3 block" />
              {quiz.quizDetail.instruction2}
            </p>
          </section>

          <section className="flex w-full justify-end">
            <Link href={`${id}/play`}>
              <button
                type="button"
                className="rounded-large bg-misty-blue px-14 py-3 text-base font-medium text-white hover:bg-stormy-sky hover:font-semibold sm:text-lg md:px-16 md:py-4 md:text-lgx"
              >
                Start
              </button>
            </Link>
          </section>
        </>
      )}
    </main>
  );
}
