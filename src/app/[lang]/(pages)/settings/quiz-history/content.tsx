import React from 'react';
import { Locale } from '@/i18n.config';
import { getHistoryQuizzes } from '@/firebase/auth/getHistoryQuizzes';

export default async function Content({
  userId,
  lang,
  settings,
}: {
  userId: string;
  lang: Locale;
  settings: any;
}) {
  const historyQuizzes = await getHistoryQuizzes(userId, lang);
  return (
    <tbody className="divide-y divide-gray-200 bg-soft-white">
      {historyQuizzes.length > 0 ? (
        historyQuizzes.map((history, index) => (
          <tr key={index} className="text-center hover:bg-gray-100">
            <td className="whitespace-nowrap p-6 text-xs font-medium text-gray-900 sm:text-sm md:text-base lg:text-lgx">
              {history.dateAttempt}
            </td>
            <td className="whitespace-nowrap p-6 text-xs text-gray-700 sm:text-sm md:text-base lg:text-lgx">
              {history.quizName}
            </td>
            <td className="whitespace-nowrap p-6 text-xs text-gray-700 sm:text-sm md:text-base lg:text-lgx">
              {history.score}
            </td>
            <td className="whitespace-nowrap p-6 text-xs text-gray-700 sm:text-sm md:text-base lg:text-lgx">
              {history.correctAnswer}/{history.numberOfQuestions}
            </td>
            <td className="whitespace-nowrap p-6 text-xs text-gray-700 sm:text-sm md:text-base lg:text-lgx">
              {history.duration} {settings.submenu2.mins}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="p-6 text-center text-gray-500">
            No quiz history available.
          </td>
        </tr>
      )}
    </tbody>
  );
}
