import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config';

export default async function incrementPlays(quizId: string) {
  try {
    const ref = doc(db, 'quiz', quizId);
    await updateDoc(ref, { numberOfPlayers: increment(1) });
  } catch (e) {
    // best-effort; ignore errors so UX isn't blocked
    console.log('Failed to increment plays', e);
  }
}

