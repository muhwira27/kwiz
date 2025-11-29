'use client';

import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type InfoBdgeProps = {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  label: string;
  value: string;
};

export default function InfoBadge(props: InfoBdgeProps) {
  return (
    <div className="flex w-[9.6875rem] items-center gap-3 bg-transparent sm:w-40 md:w-[11.25rem] lg:w-48 lg:gap-4">
      <div className="flex items-center justify-center rounded-xl bg-white p-3 shadow-custom1">
        <props.icon
          className="text-slate-grey"
          sx={{ fontSize: { xs: 24, sm: 26, md: 25, lg: 27 } }}
        ></props.icon>
      </div>

      <div className="flex flex-col items-start">
        <p className="text-base font-bold text-slate-grey md:text-lg">
          {props.value}
        </p>
        <p className="text-slate-gre text-xs text-slate-grey md:text-sm">
          {props.label}
        </p>
      </div>
    </div>
  );
}
