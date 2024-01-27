import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config';
import { QuizProps } from './quiz';

export async function getPopularQuiz(
  lang: string
): Promise<QuizProps[] | undefined> {
  try {
    const quizzesQuery = query(
      collection(db, 'quiz'),
      orderBy('numberOfPlayers', 'desc'),
      limit(5)
    );
    const quizzesSnapshot = await getDocs(quizzesQuery);

    const quizzes: QuizProps[] = [];
    quizzesSnapshot.forEach((quizDocSnap) => {
      const quizData = quizDocSnap.data();
      const quiz = {
        id: quizDocSnap.id,
        name: lang === 'en' ? quizData.name.en : quizData.name.id,
        category: lang === 'en' ? quizData.category.en : quizData.category.id,
        thumbnail: quizData.thumbnail,
        numberOfPlayers: quizData.numberOfPlayers,
        numberOfQuestions: quizData.numberOfQuestions,
        timePerQuestion: quizData.timePerQuestion,
        scorePerQuestion: quizData.scorePerQuestion,
        questions:
          lang === 'en' ? quizData.questions.en : quizData.questions.id,
      };
      quizzes.push(quiz);
    });

    return quizzes;
  } catch (error) {
    console.error('Error getting popular quiz:', error);
    return undefined;
  }
}
