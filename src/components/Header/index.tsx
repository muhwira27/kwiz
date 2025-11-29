'use client';

import Image from 'next/image';
import { MenuRounded, Search } from '@mui/icons-material';
import { Language } from '@mui/icons-material'; // Import the Language icon
import Profile from '../../../public/profile.png';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import { i18n } from '@/i18n.config'; // Import i18n configuration
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync input with URL when on search page
  useEffect(() => {
    if (pathName?.includes('/search')) {
      const q = searchParams.get('q') ?? '';
      setKeyword(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName, searchParams]);

  // Debounce navigation to search page on typing
  useEffect(() => {
    const q = keyword.trim();
    if (!q) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const target = `/${lang}/search?q=${encodeURIComponent(q)}`;
      setIsSearching(true);
      if (pathName?.includes('/search')) {
        router.replace(target);
      } else {
        router.push(target);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  // Stop small input loader when route finishes updating
  useEffect(() => {
    const ac = new AbortController();
    const end = () => setIsSearching(false);
    window.addEventListener(
      'routeChangeEndEvent',
      end as any,
      { signal: ac.signal } as any
    );
    return () => ac.abort();
  }, []);

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
  const currentLanguageLabel = lang === 'en' ? 'ID' : 'EN';

  return (
    <header className="flex items-center justify-between px-3.5 pb-3 pt-5 sm:pr-0 md:px-0">
      <button onClick={toggleSidebar} className="md:hidden">
        <MenuRounded className="text-slate-grey" style={{ fontSize: '30px' }} />
      </button>

      <div className="relative flex w-[55%] max-w-96 items-center rounded-large bg-white shadow-custom1">
        <div className="pl-6 md:pl-7">
          <Search
            className="text-misty-blue"
            sx={{ fontSize: { xs: 22, sm: 24, md: 23, lg: 25 } }}
          />
        </div>
        <input
          id="search"
          className="w-full bg-transparent py-3 pl-3 text-sm font-medium text-slate-grey outline-none placeholder:text-slate-grey sm:text-base lg:py-4 lg:text-lg"
          placeholder={`${header.searchQuiz}..`}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && keyword.trim()) {
              if (debounceRef.current) clearTimeout(debounceRef.current);
              setIsSearching(true);
              router.push(
                `/${lang}/search?q=${encodeURIComponent(keyword.trim())}`
              );
            }
          }}
        />
        {isSearching && (
          <span className="pointer-events-none absolute right-3 inline-flex h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-misty-blue" />
        )}
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-2">
          {/* Toggle Language Button */}
          <Link
            href={redirectedPathName(nextLanguage)} // Redirect to the next language
            className="flex items-center rounded-full bg-white px-3 py-2 text-sm font-medium shadow-custom1 transition-all hover:bg-misty-blue hover:text-white lg:px-4 lg:py-3 lg:text-base"
          >
            <Language className="mr-2" sx={{ fontSize: { xs: 20, md: 18 } }} />
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
