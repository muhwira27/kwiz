'use client';

import Image from 'next/image';
import { MenuRounded, Search, NotificationsRounded } from '@mui/icons-material';
import Profile from '../../../public/profile.png';
import { useSidebar } from '../../context/SidebarContext';

type Header = {
  searchQuiz: string;
};

export default function Header({ header }: { header: Header }) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex items-center justify-between px-[14px] pb-3 pt-5 sm:px-0">
      <button onClick={toggleSidebar} className="md:hidden">
        <MenuRounded className="text-slate-grey" style={{ fontSize: '30px' }} />
      </button>

      <div className="flex w-[55%] max-w-96 items-center rounded-large bg-white shadow-custom1">
        <div className="pl-6 md:pl-7">
          <Search
            className="text-misty-blue"
            sx={{ fontSize: { xs: 22, sm: 24, md: 26, lg: 28 } }}
          />
        </div>
        <input
          id="search"
          className="w-full bg-transparent py-3 pl-3 text-sm font-medium text-slate-grey outline-none placeholder:text-slate-grey sm:text-base lg:py-4 lg:text-lg"
          placeholder={`${header.searchQuiz}..`}
        />
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <NotificationsRounded
          className="text-slate-grey "
          sx={{ fontSize: { xs: 30, sm: 32, md: 34, lg: 38 } }}
        />

        <div className="flex items-center gap-2 lg:gap-3">
          <Image
            src={Profile}
            alt={''}
            className="size-9 rounded-full object-cover lg:size-11"
          />
          <p className="hidden font-medium text-slate-grey sm:block lg:text-lg">
            John Smith
          </p>
        </div>
      </div>
    </header>
  );
}
