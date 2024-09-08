export default function getRequiredPointsForNextLevel(
  currentLevel: number
): number {
  const pointsPerLevel = [
    100,
    250,
    450,
    700,
    1000,
    1350,
    1750,
    2200,
    2700
  ];

  if (currentLevel <= 0 || currentLevel > pointsPerLevel.length) {
    return 2700 + (currentLevel - 9) * 550;
  }

  return pointsPerLevel[currentLevel - 1];
}