import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import getRequiredPointsForNextLevel from '@/utils/getRequiredPointsForNextLevel';

export default async function updatePoints(
  userId: string,
  pointsToAdd: number
) {
  const userRef = doc(db, 'user', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const currentPoints = userData!.points;
    const newPoints = currentPoints + pointsToAdd;
    await updateDoc(userRef, { points: newPoints });

    const requiredPointsForNextLevel = getRequiredPointsForNextLevel(
      userData.level
    );
    if (newPoints >= requiredPointsForNextLevel) {
      await updateDoc(userRef, { level: userData.level + 1 });
    }
  }
}
