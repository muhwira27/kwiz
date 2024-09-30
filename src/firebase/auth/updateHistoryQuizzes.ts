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

  

  const data = {
    quizId: quizId,
    score: score,
    startTime: startTime,
    endTime: endTime,
  };

  await updateDoc(userRef, {historyQuizzes: [...historyQuizzes, data]})
}
