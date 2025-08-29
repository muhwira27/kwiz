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

  // Clamp invalid/zero levels to 1
  if (currentLevel < 1) return pointsPerLevel[0];
  // Levels beyond table grow linearly
  if (currentLevel > pointsPerLevel.length) {
    return 2700 + (currentLevel - 9) * 550;
  }

  return pointsPerLevel[currentLevel - 1];
}
