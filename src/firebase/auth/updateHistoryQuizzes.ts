import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config';

export default async function updateHistoryQuizzes(
  userId: string,
  quizId: string,
  score: number,
  startTime: Timestamp,
  endTime: Timestamp
) {
  const userRef = doc(db, 'user', userId);

  // Get the user's history quizzes array
  const historyQuizzesDoc = await getDoc(userRef);
  const historyQuizzes = historyQuizzesDoc.exists()
    ? historyQuizzesDoc.data().historyQuizzes || []
    : [];

  // Enrich with quiz metadata to avoid costly reads later for stats
  const quizDocRef = doc(db, 'quiz', quizId);
  const quizDoc = await getDoc(quizDocRef);
  const scorePerQuestion = quizDoc.exists() ? quizDoc.data().scorePerQuestion : undefined;
  const numberOfQuestions = quizDoc.exists() ? quizDoc.data().numberOfQuestions : undefined;

  const data = {
    quizId: quizId,
    score: score,
    startTime: startTime,
    endTime: endTime,
    scorePerQuestion,
    numberOfQuestions,
  };

  await updateDoc(userRef, {historyQuizzes: [...historyQuizzes, data]})
}
