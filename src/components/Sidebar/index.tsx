'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/logo.svg';
import Kwiz from '../../../public/kwiz.png';
import { usePathname } from 'next/navigation';
import { Locale } from '@/i18n.config';
import {
  SpaceDashboard,
  Category,
  Bookmark,
  Settings,
  Logout,
} from '@mui/icons-material';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

type Menu = {
  dashboard: string;
  category: string;
  saved: string;
  settings: string;
};

export default function Sidebar({ menu, lang }: { menu: Menu; lang: Locale }) {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  const navigation = [
    {
      name: menu.dashboard,
      href: `/${lang}/dashboard`,
      icon: SpaceDashboard,
    },
    {
      name: menu.category,
      href: `/${lang}/category`,
      icon: Category,
    },
    {
      name: menu.saved,
      href: `/${lang}/saved`,
      icon: Bookmark,
    },
    {
      name: menu.settings,
      href: `/${lang}/settings`,
      icon: Settings,
    },
  ];

  const isScreenMd =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 960px)').matches;

  const handleNavLinkClick = () => {
    if (isScreenMd && isSidebarVisible) {
      toggleSidebar();
    }
  };

  const [loggingOut, setLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await auth.logOut();
      router.push(`/${lang}/login`);
    } catch (error) {
      console.log(error);
    } finally {
      // keep spinner briefly to cover navigation
      setTimeout(() => setLoggingOut(false), 800);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isScreenMd &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isSidebarVisible
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isScreenMd, isSidebarVisible, toggleSidebar]);

  return (
    <>
      {mounted && loggingOut &&
        createPortal(
          <div className="fixed inset-0 z-[1000]">
            <LoadingSpinner />
          </div>,
          document.body
        )}
      <aside
      ref={sidebarRef}
      className={`${
        isSidebarVisible ? ' flex translate-x-0' : 'flex -translate-x-full'
      } fixed left-0 top-0 z-20 h-screen w-fit transform flex-col gap-8 bg-[#fbf9f9] pt-[37px] transition-transform duration-300 ease-in-out md:sticky md:flex md:translate-x-0 md:bg-transparent lg:gap-9`}
    >
      <div className="flex items-center gap-[2px] pl-16">
        <Image
          src={Logo}
          priority
          className="h-auto w-8 md:w-9"
          alt="Website Logo"
        />
        <Image
          src={Kwiz}
          priority
          className="h-auto w-24 md:w-[104px] lg:w-[107px]"
          alt="Kwiz"
        />
      </div>

      <div className="flex h-full flex-col items-start justify-between px-7 md:pr-0">
        <nav>
          <ul className="flex flex-col items-start gap-2 md:gap-3">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={handleNavLinkClick}
                  className={`flex w-56 items-center justify-start gap-7 rounded-large px-10 py-4 text-slate-grey md:w-60 lg:w-[272px] lg:gap-8
                    ${
                      pathname.includes(item.href)
                        ? 'pointer-events-none bg-misty-blue text-white'
                        : 'hover:bg-misty-blue hover:bg-opacity-20'
                    }
                  `}
                >
                  <item.icon
                    sx={{ fontSize: { xs: 22, sm: 24, md: 25, lg: 26 } }}
                  />
                  <span className="rounded text-base font-semibold md:text-lg lg:text-lgx">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pb-2">
          <button
            onClick={handleLogout}
            className="flex w-56 items-center justify-start gap-7 rounded-large px-10 py-4 text-slate-grey hover:bg-misty-blue hover:bg-opacity-20 md:w-60 lg:w-[272px] lg:gap-8"
          >
            <Logout sx={{ fontSize: { xs: 22, sm: 24, md: 25, lg: 26 } }} />
            <span className="text-base font-semibold md:text-lg lg:text-lgx">
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
