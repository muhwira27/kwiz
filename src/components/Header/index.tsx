'use client';

import Image from 'next/image';
import { MenuRounded, Search } from '@mui/icons-material';
import { Language } from '@mui/icons-material'; // Import the Language icon
import Profile from '../../../public/profile.png';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import { i18n } from '@/i18n.config'; // Import i18n configuration
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Header = {
  searchQuiz: string;
};

export default function Header({
  lang,
  header,
}: {
  lang: string; // Changed from Locale to string for simplicity
  header: Header;
}) {
  const auth = useAuth();
  const { toggleSidebar } = useSidebar();
  const userData = auth.user;
  const pathName = usePathname();

  // Function to redirect based on the selected locale
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale; // Change the second segment to the new locale
    return segments.join('/');
  };

  // Determine the next language
  const nextLanguage = lang === 'en' ? 'id' : 'en';

  // Determine the label for the current language
  const currentLanguageLabel = lang === 'en' ? 'EN' : 'ID';

  return (
    <header className="flex items-center justify-between px-[14px] pb-3 pt-5 sm:pr-0 md:px-0">
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
        <div className="flex items-center gap-2">
          {/* Toggle Language Button */}
          <Link
            href={redirectedPathName(nextLanguage)} // Redirect to the next language
            className="flex items-center rounded-full bg-white px-3 py-2 text-sm font-medium shadow-custom1 transition-all hover:bg-misty-blue hover:text-white lg:px-4 lg:py-3 lg:text-base"
          >
            <Language className="mr-2" style={{ fontSize: '20px' }} />
            {currentLanguageLabel} 
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <Image
            src={Profile}
            alt={''}
            className="size-9 rounded-full object-cover lg:size-11"
          />
          <p className="hidden font-medium text-slate-grey sm:block lg:text-lg">
            {userData.username}
          </p>
        </div>
      </div>
    </header>
  );
}
