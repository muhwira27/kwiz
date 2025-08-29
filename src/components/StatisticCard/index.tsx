'use client';

import Image from 'next/image';
import {
  FlagRounded,
  AccessTimeFilledRounded,
  CheckCircleRounded,
} from '@mui/icons-material';
import Profile from '../../../public/profile.png';
import InfoBadge from '../InfoBadge';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import getRequiredPointsForNextLevel from '@/utils/getRequiredPointsForNextLevel';

type StatisticCardProps = {
  skillLevel: string;
  points: string;
  quizFinished: string;
  timeSpent: string;
  correctAnswer: string;
  mins: string;
};

export default function StatisticCard(props: StatisticCardProps) {
  const auth = useAuth();
  const userData = auth.user;
  const [points, setPoints] = useState<number>(userData.points ?? 0);
  const [level, setLevel] = useState<number>(userData.level ?? 1);

  const requiredPoints = getRequiredPointsForNextLevel(level);
  const progressPercentage = Math.min((points / requiredPoints) * 100, 100);

  useEffect(() => {
    if (userData?.id) {
      const userRef = doc(db, 'user', userData.id);
      const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setPoints(userData.points);
          setLevel(userData.level);
        }
      });
      return () => unsubscribe();
    }
  }, [userData.id]);

  const infoBadge = [
    {
      icon: FlagRounded,
      label: props.quizFinished,
      value: '20',
    },
    {
      icon: AccessTimeFilledRounded,
      label: props.timeSpent,
      value: `12.6 ${props.mins}`,
    },
    {
      icon: CheckCircleRounded,
      label: props.correctAnswer,
      value: '200',
    },
  ];

  return (
    <div className="flex h-max w-full justify-center gap-4 sm:gap-5 md:gap-7 lg:gap-9">
      <div className="relative hidden h-auto w-72 rounded-large min-[860px]:block md:hidden min-[1200px]:block lg:h-56 lg:w-[350px]">
        <Image
          src={Profile}
          alt="Pofile"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-large object-cover object-center"
        />
      </div>

      <div className="flex grow flex-col justify-center gap-5 md:gap-6">
        <div className="flex flex-col items-start">
          <p className="text-lgx font-bold text-slate-grey sm:text-xl md:text-[26px] lg:text-xxl">
            {userData.name}
          </p>
          <p className="text-sm font-medium text-slate-grey sm:text-base md:text-lg lg:text-lg">
            {props.skillLevel}: {level}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <p className="text-xs font-medium text-slate-grey md:text-sm">
            {props.points}: {points} / {getRequiredPointsForNextLevel(level)}
          </p>
          <div className="flex h-3 w-full items-start rounded-large bg-[#F5F5F5]">
            <div
              className="h-full rounded-large bg-[#C4C4C4]"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex w-full flex-wrap gap-y-4 min-[380px]:gap-x-3 sm:gap-x-6 md:gap-x-2 lg:gap-x-5">
          {infoBadge.map((info, index) => {
            return (
              <InfoBadge
                key={index}
                icon={info.icon}
                label={info.label}
                value={info.value}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
