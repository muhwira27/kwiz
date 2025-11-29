'use client';

import { useEffect, useState } from 'react';

export default function DurationBar({
  duration,
  onTimeUp,
  second,
  isPaused,
}: {
  duration: number;
  onTimeUp: () => void;
  second: string;
  isPaused: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progressWidth, setProgressWidth] = useState(100);

  useEffect(() => {
    setTimeLeft(duration);
    setProgressWidth(100);
  }, [duration]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPaused]);

  useEffect(() => {
    setProgressWidth((timeLeft / duration) * 100);
    if (timeLeft < 0) {
      onTimeUp();
    }
  }, [timeLeft, duration, onTimeUp]);

  return (
    <section className="flex w-full items-center space-x-2">
      <div className="flex h-8 w-full items-end justify-end overflow-hidden rounded-full border bg-[#f4fafd] lg:h-10">
        <div
          style={{ width: `${progressWidth}%` }}
          className="h-full rounded-full bg-[#a4b3cc] transition-all duration-1000 ease-linear"
        ></div>
      </div>
      <div className="flex h-fit w-12 justify-end">
        <p className="text-xxl font-bold text-slate-grey">
          {Math.max(timeLeft, 0)}
          <span className="text-base font-medium">{second}</span>
        </p>
      </div>
    </section>
  );
}
