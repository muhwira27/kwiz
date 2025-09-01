'use client';

import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import Learning from '../../../../../public/images/Learning-bro.svg';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ForgotPassword() {
  const auth = useAuth();
  const { lang } = useParams() as { lang: string };
  const loadingText = lang === 'en' ? 'Loading...' : 'Memuat...';
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
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
      setError('Email address is required');
      setLoading(false);
      return;
    }

    try {
      const result = await auth.sendResetPasswordEmail(email);

      if (result == undefined) {
        setSuccessMessage(
          'Password reset email sent. Please check your inbox.'
        );
      } else {
        setError(result);
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
      <section className="flex h-fit w-full max-w-[640px] flex-col items-center gap-5 rounded-large bg-soft-white px-4 py-8 md:w-1/2 md:gap-4 md:px-12 md:py-5 min-[1280px]:gap-5 min-[1280px]:py-8 lg:w-[70%] lg:px-24">
        <h2 className="mb-2 text-center text-xl font-bold md:mb-0 md:text-[24px]">
          Forgot Your Password?
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
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={handleEmailChange}
              className={`w-full rounded-large bg-soft-white px-8 py-4 text-charcoal shadow-custom1 focus:outline-none ${
                error && (error.includes('email') || error.includes('Email'))
                  ? 'border border-red-500'
                  : ''
              }`}
            />
            {(error && error.includes('email')) ||
            (error && error.includes('Email')) ? (
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
              {loading ? loadingText : 'Reset Password'}
            </button>
            <Link
              href={`/${lang}/login`}
              type="submit"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-soft-white font-semibold text-charcoal shadow-custom1"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
