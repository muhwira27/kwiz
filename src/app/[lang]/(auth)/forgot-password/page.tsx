'use client';

import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import Learning from '../../../../../public/images/Learning-bro.svg';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Locale } from '@/i18n.config';
import { getClientDictionary } from '@/lib/dictionaryClient';

export default function ForgotPassword() {
  const auth = useAuth();
  const { lang } = useParams() as { lang: string };
  const dict = getClientDictionary(lang as Locale);
  const t = dict.auth;
  const loadingText = dict.common.loading;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!email) {
      setErrorKey('required-email');
      setError(t.errors?.requiredEmail ?? 'Email address is required');
      setLoading(false);
      return;
    }

    try {
      const result = await auth.sendResetPasswordEmail(email);

      if (result == undefined) {
        setSuccessMessage(t.resetPasswordSent);
      } else {
        let key: string | null = null;
        let msg = String(result);
        if (msg.includes('Email is not registered')) {
          key = 'email-not-registered';
          msg = t.errors?.emailNotRegistered ?? msg;
        } else if (msg.includes('Invalid email address')) {
          key = 'invalid-email';
          msg = t.errors?.invalidEmail ?? msg;
        }
        setErrorKey(key);
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center gap-6 bg-[#DAE1E5] px-2 sm:px-8 md:flex-row lg:px-14">
      <section className="lg: hidden h-fit w-full pl-0 md:flex md:w-1/2 md:pl-8">
        <Image
          src={Learning}
          height={600}
          alt="Learning"
          width={600}
          priority
        />
      </section>
      <section className="flex h-fit w-full max-w-[40rem] flex-col items-center gap-5 rounded-large bg-soft-white px-4 py-8 md:w-1/2 md:gap-4 md:px-12 md:py-5 min-[1280px]:gap-5 min-[1280px]:py-8 lg:w-[70%] lg:px-24">
        <h2 className="mb-2 text-center text-xl font-bold md:mb-0 md:text-[1.5rem]">
          {t.forgotPassword}
        </h2>

        <form className="flex w-full flex-col gap-4">
          {successMessage && (
            <div className="rounded-md border-l-4 border-green-500 bg-green-100 px-4 py-3 text-sm text-green-700 md:py-2 lg:py-4">
              <p>{successMessage}</p>
            </div>
          )}
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-grey"
            >
              {t.email.replace('*','')}
            </label>
            <input
              type="email"
              placeholder={t.enterEmail}
              value={email}
              onChange={handleEmailChange}
              className={`w-full rounded-large bg-soft-white px-8 py-4 text-charcoal shadow-custom1 focus:outline-none ${
                errorKey === 'required-email' || errorKey === 'invalid-email' || errorKey === 'email-not-registered'
                  ? 'border border-red-500'
                  : ''
              }`}
            />
            {(errorKey === 'required-email' || errorKey === 'invalid-email' || errorKey === 'email-not-registered') && error ? (
              <p className="ml-3 text-xs text-red-500">{error}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-misty-blue font-semibold text-white"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? loadingText : t.resetPassword}
            </button>
            <Link
              href={`/${lang}/login`}
              type="submit"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-soft-white font-semibold text-charcoal shadow-custom1"
            >
              {t.backToLogin}
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
