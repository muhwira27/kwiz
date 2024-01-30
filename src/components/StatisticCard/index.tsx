import Image from 'next/image';
import {
  FlagRounded,
  AccessTimeFilledRounded,
  CheckCircleRounded,
} from '@mui/icons-material';
import Profile from '../../../public/profile.png';
import InfoBadge from '../InfoBadge';

type StatisticCardProps = {
  skillLevel: string;
  points: string;
  quizFinished: string;
  timeSpent: string;
  correctAnswer: string;
  mins: string;
};

export default function StatisticCard(props: StatisticCardProps) {
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
      {/* <Image
        src={Profile}
        alt="Pofile"
        priority
        className="hidden h-auto w-72 rounded-large object-cover min-[860px]:block md:hidden min-[1200px]:block lg:h-52 lg:w-[380px]"
      /> */}

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
            John Smith
          </p>
          <p className="text-sm font-medium text-slate-grey sm:text-base md:text-lg lg:text-lg">
            {props.skillLevel}: 24
          </p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <p className="text-xs font-medium text-slate-grey md:text-sm">
            {props.points}: 70 / 100
          </p>
          <div className="flex h-3 w-full items-start rounded-large bg-[#F5F5F5]">
            <div className="h-full w-[70%] rounded-large bg-[#C4C4C4]"></div>
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
