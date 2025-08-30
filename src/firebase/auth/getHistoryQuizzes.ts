import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config';
import { Timestamp } from 'firebase/firestore';

type QuizHistory = {
  dateAttempt: string;
  quizName: string;
  score: number;
  numberOfQuestions: number;
  duration: number;
  correctAnswer: number;
};

export async function getHistoryQuizzes(
  userId: string,
  lang: string
): Promise<QuizHistory[]> {
  const userRef = doc(db, 'user', userId);
  const historyQuizzesDoc = await getDoc(userRef);

  const historyQuizzes = historyQuizzesDoc.exists()
    ? historyQuizzesDoc.data()?.historyQuizzes || []
    : [];

  const quizHistory: QuizHistory[] = [];

  // Loop through each history quiz entry
  for (const historyQuiz of historyQuizzes) {
    const { quizId, score, startTime, endTime } = historyQuiz;

    // Prefer stored metadata when available
    let numberOfQuestions = historyQuiz.numberOfQuestions as number | undefined;
    let scorePerQuestion = historyQuiz.scorePerQuestion as number | undefined;
    let quizName: string | undefined = undefined;

    // Fallback: fetch quiz doc only for missing fields (name always needed)
    if (!numberOfQuestions || !scorePerQuestion || !quizName) {
      const quizDocRef = doc(db, 'quiz', quizId);
      const quizDoc = await getDoc(quizDocRef);
      if (quizDoc.exists()) {
        const quizData = quizDoc.data();
        quizName = lang === 'en' ? quizData.name.en : quizData.name.id;
        numberOfQuestions = numberOfQuestions ?? quizData.numberOfQuestions;
        scorePerQuestion = scorePerQuestion ?? quizData.scorePerQuestion;
      } else {
        // Skip if quiz doc missing and we cannot build a row
        continue;
      }
    }

    // Calculate the duration in minutes (endTime - startTime)
    const start = (startTime as Timestamp).toDate();
    const end = (endTime as Timestamp).toDate();
    const duration = (end.getTime() - start.getTime()) / 60000; // Convert ms to minutes

    // Format the date for output based on language
    const dateAttempt =
      lang === 'en'
        ? start
            .toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
            .replace(',', '')
        : start
            .toLocaleString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
            .replace(',', '');

    // Calculate correct answer
    const correctAnswer = scorePerQuestion ? score / scorePerQuestion : 0;

    // Add the formatted quiz data to the array
    quizHistory.push({
      dateAttempt,
      quizName: quizName!,
      score,
      numberOfQuestions: numberOfQuestions!,
      duration: parseFloat(duration.toFixed(2)),
      correctAnswer: correctAnswer,
    });
  }

  return quizHistory;
}
