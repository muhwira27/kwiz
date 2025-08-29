import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { getPopularQuiz } from '@/firebase/quiz/getPopularQuiz';
import getFeaturedCategory from '@/firebase/category/getFeaturedCategory';
import dynamic from 'next/dynamic';
const QuizCardNoSSR = dynamic(() => import('@/components/QuizCard'), {
  ssr: false,
});
import CategoryCard from '@/components/CategoryCard';

const StatisticCardNoSSR = dynamic(() => import('@/components/StatisticCard'), {
  ssr: false,
});

export default async function Dashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  const { dashboard } = await getDictionary(params.lang);
  const { quizCard } = await getDictionary(params.lang);
  const quizData = await getPopularQuiz(params.lang);
  const categoryData = await getFeaturedCategory(params.lang);

  return (
    <main className="mb-3 mt-2 flex h-fit w-full flex-col gap-10 rounded-large bg-white px-6 py-6 shadow-custom1 sm:mt-3 md:mb-5 lg:px-9 lg:py-10">
      <section>
        <StatisticCardNoSSR
          skillLevel={dashboard.skillLevel}
          points={dashboard.points}
          quizFinished={dashboard.quizFinished}
          timeSpent={dashboard.timeSpent}
          correctAnswer={dashboard.correctAnswer}
          mins={dashboard.mins}
        />
      </section>

      <section>
        <h5 className="text-lg font-bold text-slate-grey md:text-xxl">
          {dashboard.title1}
        </h5>
        <div className="custom-scrollbar flex h-fit w-full gap-3 overflow-x-auto rounded-2xl px-2 py-4">
          {quizData &&
            quizData.map((quiz) => {
              return (
                <Link
                  key={quiz.id}
                  href={`quiz/${quiz.id}`}
                  className="flex-grow"
                >
                  <QuizCardNoSSR quiz={quiz} quizCard={quizCard} />
                </Link>
              );
            })}
        </div>
      </section>

      <section className="flex w-fit flex-col gap-6">
        <section className="flex items-center justify-between text-slate-grey">
          <h5 className="text-lg font-bold md:text-xxl">{dashboard.title2}</h5>
          <Link href="/category">
            <p className="text-sm md:text-base">{dashboard.viewAll}</p>
          </Link>
        </section>

        <div className="grid grid-cols-2 gap-4 min-[492px]:gap-5 min-[580px]:gap-6 min-[800px]:grid-cols-3 min-[1230px]:flex min-[1230px]:flex-wrap">
          {categoryData &&
            categoryData.map((category) => {
              return (
                <Link key={category.id} href={`category/${category.id}`}>
                  <CategoryCard category={category} />
                </Link>
              );
            })}
        </div>
      </section>
    </main>
  );
}
