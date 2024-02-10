import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { getQuizByCategory } from '@/firebase/quiz/getQuizByCategory';
import { getCategoryById } from '@/firebase/category/getCategoryById';
import QuizCard from '@/components/QuizCard';
import { ArrowBack } from '@mui/icons-material';

export default async function Category({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const { id, lang } = params;
  const { category, quizCard } = await getDictionary(lang);

  const categoryData = await getCategoryById(id, lang);
  const quizData = await getQuizByCategory(id, lang);

  return (
    <main
      className={`mb-3 mt-2 flex ${
        quizData && quizData.length > 0 ? 'h-fit' : 'h-full'
      } w-full flex-col gap-5 rounded-large bg-white px-6 py-6 shadow-custom1 sm:mt-3 md:mb-5 lg:px-9 lg:py-10`}
    >
      {quizData === undefined || quizData.length === 0 ? (
        <section className="flex h-full w-full flex-col items-center justify-center gap-2">
          <h2 className="text-lgx font-bold text-slate-grey md:text-xl lg:text-xxl">
            {category.notFound}
          </h2>
          <p className="text-base text-slate-grey md:text-lg lg:text-lgx">
            {category.notFoundSub}
          </p>
        </section>
      ) : (
        <>
          <section className="flex items-start gap-4 text-[#696F79]">
            <Link href={`/${lang}/category`} className='pt-0.5 md:pt-[5px]'>
              <ArrowBack
                sx={{ fontSize: { xs: 22, sm: 22, md: 28, lg: 28 } }}
              />
            </Link>
            <h2 className="text-lgx font-bold md:text-xxl">
              {lang == 'en'
                ? `${categoryData?.name} Category`
                : `Kategori ${categoryData?.name}`}
            </h2>
          </section>

          <section className="flex flex-wrap justify-center gap-4 sm:justify-normal">
            {quizData &&
              quizData.map((quiz) => {
                return (
                  <Link key={quiz.id} href={`/${lang}/quiz/${quiz.id}`}>
                    <QuizCard key={quiz.id} quiz={quiz} quizCard={quizCard} />
                  </Link>
                );
              })}
          </section>
        </>
      )}
    </main>
  );
}
