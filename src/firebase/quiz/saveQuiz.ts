import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config';

export default async function saveQuiz(
  userId: string,
  quizId: string,
  isSaved: boolean
) {
  const userRef = doc(db, 'user', userId);

  // Get the user's saved quizzes array
  const savedQuizzesDoc = await getDoc(userRef);
  const savedQuizzes = savedQuizzesDoc.exists()
    ? savedQuizzesDoc.data().savedQuizzes || []
    : [];

  if (isSaved) {
    // Check if quiz is already saved to avoid duplicates
    if (!savedQuizzes.includes(quizId)) {
      await updateDoc(userRef, {
        savedQuizzes: [...savedQuizzes, quizId],
      });
    }
  } else {
    // Filter out the quiz to remove from saved list
    const filteredSavedQuizzes = savedQuizzes.filter(
      (id: string) => id !== quizId
    );

    await updateDoc(userRef, { savedQuizzes: filteredSavedQuizzes });
  }
}
