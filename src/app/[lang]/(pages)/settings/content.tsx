'use client';

import React from 'react';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import { useParams } from 'next/navigation';
import {
  AccountCircle,
  ArrowForwardIosRounded,
  Settings,
} from '@mui/icons-material';

export default function Content({ settings }: { settings: any }) {
  const auth = useAuth();
  const user = auth.user;
  const { lang } = useParams() as { lang: string };
  const languageName =
    lang === 'en' ? settings.submenu1.english : settings.submenu1.indonesian;

  return (
    <div className="mt-2 flex flex-col gap-2 md:flex-row">
      <div className="mb-3 flex h-fit w-full flex-col gap-2 rounded-large bg-white px-6 py-6 shadow-custom1 sm:mt-3 md:mb-5 lg:px-9 lg:py-10">
        <div className="flex items-center gap-2 text-slate-grey">
          <AccountCircle />
          <h3 className="text-base font-semibold ">{settings.submenu1.profile}</h3>
        </div>
        <div className="mt-3 flex w-full flex-col gap-2 space-y-2 px-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 text-base">
              <p className="font-semibold text-gray-800">{settings.submenu1.username}</p>
              <p className="text-gray-400">{user.username ?? '-'}</p>
            </div>
            <ArrowForwardIosRounded
              sx={{ fontSize: { xs: 18, sm: 24, md: 25, lg: 26 } }}
              color="disabled"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 text-base">
              <p className="font-semibold text-gray-800">{settings.submenu1.name}</p>
              <p className="text-gray-400">{user.name ?? '-'}</p>
            </div>
            <ArrowForwardIosRounded
              sx={{ fontSize: { xs: 18, sm: 24, md: 25, lg: 26 } }}
              color="disabled"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 text-base">
              <p className="font-semibold text-gray-800">{settings.submenu1.email}</p>
              <p className="text-gray-400">{user.email ?? '-'}</p>
            </div>
            <ArrowForwardIosRounded
              sx={{ fontSize: { xs: 18, sm: 24, md: 25, lg: 26 } }}
              color="disabled"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 text-base">
              <p className="font-semibold text-gray-800">{settings.submenu1.language}</p>
              <p className="text-gray-400">{languageName}</p>
            </div>
            <ArrowForwardIosRounded
              sx={{ fontSize: { xs: 18, sm: 24, md: 25, lg: 26 } }}
              color="disabled"
            />
          </div>
        </div>
      </div>

      <div className="mb-3 flex h-fit w-full flex-col gap-2 rounded-large bg-white px-6 py-6 shadow-custom1 sm:mt-3 md:mb-5 lg:px-9 lg:py-10">
        <div className="flex items-center gap-2 text-slate-grey">
          <Settings />
          <h3 className="text-base font-semibold ">{settings.submenu1.account}</h3>
        </div>
        <div className="mt-3 flex w-full flex-col gap-4 space-y-2 px-3">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-gray-800">
              {settings.submenu1.password}
            </p>
            <ArrowForwardIosRounded
              sx={{ fontSize: { xs: 18, sm: 24, md: 25, lg: 26 } }}
              color="disabled"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-gray-800">
              {settings.submenu1.delete}
            </p>
            <ArrowForwardIosRounded
              sx={{ fontSize: { xs: 18, sm: 24, md: 25, lg: 26 } }}
              color="disabled"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
