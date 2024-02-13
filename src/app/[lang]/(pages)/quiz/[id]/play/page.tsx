import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { getQuizById } from '@/firebase/quiz/getQuizById';
import Questions from './questions';
import { shuffleArray } from '@/utils/shuffleArray';

export default async function PlayQuiz({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const { id, lang } = params;
  const { quiz } = await getDictionary(lang);
  const quizData = await getQuizById(id, lang);

  const newQuestions = shuffleArray(quizData?.questions!).slice(
    0,
    quizData?.numberOfQuestions
  );

  return (
    <>
      {quizData && (
        <Questions
          quiz={quizData}
          questions={newQuestions}
          props={quiz.questions}
        />
      )}
    </>
  );
}
