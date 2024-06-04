import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config';
import { QuizProps } from '../quiz/quiz';

export function getSavedQuizzes(
  savedQuizzes: Array<string> | null,
  lang: string,
  callback: (quizzes: QuizProps[]) => void
): () => void {
  if (savedQuizzes) {
    const quizzes: QuizProps[] = [];

    const unsubscribers = savedQuizzes.map((quizId) => {
      const quizDocRef = doc(db, 'quiz', quizId);

      return onSnapshot(quizDocRef, (quizDocSnap) => {
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

          const quizIndex = quizzes.findIndex((q) => q.id === quizId);
          if (quizIndex > -1) {
            quizzes[quizIndex] = quiz;
          } else {
            quizzes.push(quiz);
          }

          callback([...quizzes]); // Ensure the array reference changes
        } else {
          const quizIndex = quizzes.findIndex((q) => q.id === quizId);
          if (quizIndex > -1) {
            quizzes.splice(quizIndex, 1);
            callback([...quizzes]); // Ensure the array reference changes
          }
        }
      });
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  } else {
    console.log('There are no quizzes saved yet');
    return () => {};
  }
}
