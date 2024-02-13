'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FFD233',
  },
});

export default function ResultModal({
  onTryAgain,
  onFinish,
  score,
}: {
  onTryAgain?: () => void;
  onFinish?: () => void;
  score: number;
}) {

  const maxScore = 100;
  const stars = 3;
  const starValue = maxScore / stars;

  const valueForStar1 = score >= starValue ? 1 : score / starValue;
  const valueForStar2 =
    score >= 2 * starValue
      ? 1
      : score > starValue
        ? (score - starValue) / starValue
        : 0;
  const valueForStar3 =
    score === maxScore
      ? 1
      : score > 2 * starValue
        ? (score - 2 * starValue) / starValue
        : 0;

  const getStarSize = (index: number) => {
    switch (index) {
      case 1:
        return { fontSize: { xs: 85, md: 95 } };
      default:
        return { fontSize: { xs: 70, md: 80 } };
    }
  };

  const getClassName = (index: number) => {
    switch (index) {
      case 0:
        return '-rotate-[25deg]';
      case 1:
        return '-ml-3 -mr-3 pb-8';
      case 2:
        return 'rotate-[25deg]';
      default:
        return '';
    }
  };

  return (
    <section className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-[85%] max-w-[370px] flex-col items-center justify-center gap-8 rounded-large bg-white py-6 shadow-lg md:max-w-[430px] md:py-9">
        {/* Stars, Title, Subtitle & Score */}
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <div className="-mb-7 flex h-fit items-center justify-center">
            {[valueForStar1, valueForStar2, valueForStar3].map(
              (value, index) => {
                const className = getClassName(index);
                const starSize = getStarSize(index);
                return (
                  <div key={index} className={className}>
                    <StyledRating
                      readOnly
                      value={value}
                      max={1}
                      precision={0.1}
                      icon={<StarRoundedIcon fontSize="inherit" />}
                      emptyIcon={<StarRoundedIcon fontSize="inherit" />}
                      sx={starSize}
                    />
                  </div>
                );
              }
            )}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-center text-xxl font-semibold text-slate-grey md:text-2xl">
              Congratulations
            </p>

            <p className="text-center text-sm font-medium text-slate-grey md:text-base">
              You have earned a score of
            </p>
          </div>

          <p className="text-center text-[50px] font-semibold tracking-wider text-slate-grey md:text-[54px]">
            {score}
          </p>
        </div>

        <div className="flex justify-center gap-6 md:gap-9">
          <button
            className="rounded-lg bg-[#F42020] bg-opacity-65 px-6 py-2 text-sm font-medium tracking-wide text-white md:px-8 md:text-base"
            onClick={onTryAgain}
          >
            Try Again
          </button>
          <button
            className="rounded-lg bg-misty-blue px-9 py-2 text-sm font-medium tracking-wide text-white md:px-11 md:text-base"
            onClick={onFinish}
          >
            Finish
          </button>
        </div>
      </div>
    </section>
  );
}
