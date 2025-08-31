import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import { QuizProps } from './quiz';

export async function searchQuizzes(
  queryText: string,
  lang: string
): Promise<QuizProps[]> {
  const text = queryText.trim().toLowerCase();
  if (!text) return [];

  const snap = await getDocs(collection(db, 'quiz'));
  const results: QuizProps[] = [];
  snap.forEach((docSnap) => {
    const data = docSnap.data() as any;
    const name: string = lang === 'en' ? data.name?.en : data.name?.id;
    const haystack = `${name ?? ''}`.toLowerCase();
    if (haystack.includes(text)) {
      results.push({
        id: docSnap.id,
        name: name ?? '',
        category: lang === 'en' ? data.category?.en ?? '' : data.category?.id ?? '',
        thumbnail: data.thumbnail,
        numberOfPlayers: data.numberOfPlayers,
        numberOfQuestions: data.numberOfQuestions,
        timePerQuestion: data.timePerQuestion,
        scorePerQuestion: data.scorePerQuestion,
        questions: lang === 'en' ? data.questions?.en ?? [] : data.questions?.id ?? [],
      });
    }
  });
  return results;
}
