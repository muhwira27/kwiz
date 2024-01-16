import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config';
import { QuizProps } from './quiz';
import { CategoryProps } from '../category/category';

export async function getQuizByCategory(
  categoryId: string,
  lang: string
): Promise<QuizProps[] | undefined> {
  try {
    const categoryDocRef = doc(db, 'category', categoryId);
    const categoryDocSnap = await getDoc(categoryDocRef);

    if (categoryDocSnap.exists()) {
      const categoryData = categoryDocSnap.data() as CategoryProps;
      const quizIds = categoryData.quizzes;

      const quizzes: QuizProps[] = [];
      for (const quizId of quizIds) {
        const quizDocRef = doc(db, 'quiz', quizId);
        const quizDocSnap = await getDoc(quizDocRef);

        if (quizDocSnap.exists()) {
          const quizData = quizDocSnap.data();
          const quiz = {
            id: quizId,
            name: lang === 'en' ? quizData.name.en : quizData.name.id,
            category:
              lang === 'en' ? quizData.category.en : quizData.category.id,
            thumbnail: quizData.thumbnail,
            numberOfPlayers: quizData.numberOfPlayers,
            numberOfQuestions: quizData.numberOfQuestions,
            timePerQuestion: quizData.timePerQuestion,
            scorePerQuestion: quizData.scorePerQuestion,
            questions:
              lang === 'en' ? quizData.questions.en : quizData.questions.id,
          };
          quizzes.push(quiz);
        }
      }

      return quizzes;
    } else {
      console.log('Category not found');
      return undefined;
    }
  } catch (error) {
    console.error('Error getting quiz by category:', error);
    return undefined;
  }
}
