import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config';
import { QuizProps } from '../quiz/quiz';

// Firestore `in` operator supports up to 10 IDs per query
const CHUNK_SIZE = 10;

export function getSavedQuizzes(
  savedQuizzes: Array<string> | null,
  lang: string,
  callback: (quizzes: QuizProps[]) => void,
  onReady?: () => void
): () => void {
  if (!savedQuizzes || savedQuizzes.length === 0) {
    callback([]);
    return () => {};
  }

  // De-duplicate without relying on iterator spreads (keeps ES5 target happy)
  const ids: string[] = [];
  for (const id of savedQuizzes) {
    if (!ids.includes(id)) ids.push(id);
  }
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += CHUNK_SIZE) {
    chunks.push(ids.slice(i, i + CHUNK_SIZE));
  }

  const map = new Map<string, QuizProps>();

  const emit = () => {
    // Emit in the same order as `savedQuizzes`
    const ordered = savedQuizzes
      .filter((id) => map.has(id))
      .map((id) => map.get(id) as QuizProps);
    callback([...ordered]);
  };

  let pendingInitial = chunks.length;

  const unsubs = chunks.map((batch) => {
    const q = query(
      collection(db, 'quiz'),
      where(documentId(), 'in', batch)
    );
    let first = true;
    return onSnapshot(q, (snap) => {
      const present = new Set<string>();
      snap.forEach((docSnap) => {
        const data: any = docSnap.data();
        present.add(docSnap.id);
        const quiz: QuizProps = {
          id: docSnap.id,
          name: lang === 'en' ? data?.name?.en ?? '' : data?.name?.id ?? '',
          category:
            lang === 'en' ? data?.category?.en ?? '' : data?.category?.id ?? '',
          thumbnail: data?.thumbnail,
          numberOfPlayers: data?.numberOfPlayers,
          numberOfQuestions: data?.numberOfQuestions,
          timePerQuestion: data?.timePerQuestion,
          scorePerQuestion: data?.scorePerQuestion,
          questions: lang === 'en' ? data?.questions?.en ?? [] : data?.questions?.id ?? [],
        };
        map.set(docSnap.id, quiz);
      });
      // Remove IDs from this batch that are no longer present
      batch.forEach((id) => {
        if (!present.has(id) && map.has(id)) map.delete(id);
      });
      emit();
      if (first) {
        first = false;
        pendingInitial -= 1;
        if (pendingInitial === 0) onReady && onReady();
      }
    });
  });

  return () => unsubs.forEach((u) => u());
}
