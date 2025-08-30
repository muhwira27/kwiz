import { doc, getDoc, updateDoc, runTransaction } from 'firebase/firestore';
import { db } from '../config';
import getRequiredPointsForNextLevel from '@/utils/getRequiredPointsForNextLevel';

export default async function updatePoints(
  userId: string,
  pointsToAdd: number
) {
  const userRef = doc(db, 'user', userId);

  await runTransaction(db, async (transaction) => {
    const userSnap = await transaction.get(userRef);
    if (!userSnap.exists()) return;
    const userData = userSnap.data() as any;

    let level: number = userData.level ?? 1;
    let points: number = (userData.points ?? 0) + pointsToAdd;

    // Per-level bucket model: carry over remainder points after leveling up
    // Level-up may happen multiple times in one update
    // required points are per current level (not cumulative)
    let required = getRequiredPointsForNextLevel(level);
    while (points >= required) {
      points -= required;
      level += 1;
      required = getRequiredPointsForNextLevel(level);
    }

    transaction.update(userRef, { points, level });
  });
}
