import {
  DocumentData,
  DocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

export interface UserType {
  id: string | null;
  name: string | null;
  email: string | null;
  username: string | null;
  level: number | null;
  points: number | null;
  savedQuizzes: string[] | null;
  historyQuizzes: HistoryQuizzes[] | null;
}

export interface HistoryQuizzes {
  id: string;
  score: number;
  startTime: Timestamp;
  endTime: Timestamp
}

export const userConverter = {
  toFirestore: (user: UserType) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      level: user.level,
      points: user.points,
      savedQuizzes: user.savedQuizzes,
      historyQuizzes: user.historyQuizzes?.map(hq => ({
        id: hq.id,
        score: hq.score,
        startTime: hq.startTime,
        endTime: hq.endTime
      }))
    };
  },
  fromFirestore: (
    snapshot: DocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return {
      id: data?.id ?? null,
      name: data?.name ?? null,
      email: data?.email ?? null,
      username: data?.username ?? null,
      level: data?.level ?? null,
      points: data?.points ?? null,
      savedQuizzes: data?.savedQuizzes ?? null,
      historyQuizzes: data?.historyQuizzes?.map((hq: any) => ({
        id: hq.id,
        time: hq.time,
        correcAnswer: hq.correcAnswer,
        dateAttempt: hq.dateAttempt
      })) ?? null
    } as UserType;
  },
};
