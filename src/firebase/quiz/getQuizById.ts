import { db } from '../config';
import { doc, getDoc } from 'firebase/firestore';
import { QuizProps } from './quiz';

export const getQuizById = async (quizId: string, lang: string): Promise<QuizProps | undefined>  => {
  try {
    const quizRef = doc(db, 'quiz', quizId);
    const quizDoc = await getDoc(quizRef);
    
    if(quizDoc.exists()) {
      const quizData = quizDoc.data();
      const quiz = {
        id: quizDoc.id,
        name: lang === 'en' ? quizData?.name.en : quizData?.name.id,
        category: lang === 'en' ? quizData?.category.en : quizData?.category.id,
        thumbnail: quizData?.thumbnail,
        numberOfPlayers: quizData?.numberOfPlayers,
        numberOfQuestions: quizData?.numberOfQuestions,
        timePerQuestion: quizData?.timePerQuestion,
        scorePerQuestion: quizData?.scorePerQuestion,
        questions:
            lang === 'en' ? quizData?.questions.en : quizData?.questions.id,
      };
      return quiz;
    }
    
    return undefined;

  } catch (error) {
    console.error('Error quiz by id:', error);
    return undefined;
  }
};
