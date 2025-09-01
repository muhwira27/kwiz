'use client';

import React from 'react';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import { Locale } from '@/i18n.config';
import Content from './content';

export default function Table({
  lang,
  settings,
  loadingText,
}: {
  lang: Locale;
  settings: any;
  loadingText?: string;
}) {
  const auth = useAuth();
  const userData = auth.user;

  return (
    <div className="mb-3 mt-2 flex h-fit w-full flex-col gap-10 rounded-large bg-white px-4 py-4 shadow-custom1 sm:mt-3 sm:px-7 sm:py-6 md:mb-5 lg:px-9 lg:py-6">
      <div className="mt-4 overflow-x-auto rounded-xl">
        <table className="min-w-full divide-y divide-gray-300 rounded-lg bg-soft-white shadow">
          <thead className="bg-stormy-sky bg-opacity-85">
            <tr className="text-center">
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-soft-white sm:p-5 sm:text-sm md:text-base lg:text-lg"
              >
                {settings.submenu2.date}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-soft-white sm:p-5 sm:text-sm md:text-base lg:text-lg"
              >
                {settings.submenu2.quiz}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-soft-white sm:p-5 sm:text-sm md:text-base lg:text-lg"
              >
                {settings.submenu2.score}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-soft-white sm:p-5 sm:text-sm md:text-base lg:text-lg"
              >
                {settings.submenu2.answer}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-soft-white sm:p-5 sm:text-sm md:text-base lg:text-lg"
              >
                {settings.submenu2.duration}
              </th>
            </tr>
          </thead>

          {userData.id ? (
            <Content userId={userData.id} lang={lang} settings={settings} />
          ) : (
            <tbody>
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  {loadingText ?? 'Loading...'}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
