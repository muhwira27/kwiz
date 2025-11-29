'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import Learning from '../../../../../public/images/Learning-bro.svg';
import type { Locale } from '@/i18n.config';
import { getClientDictionary } from '@/lib/dictionaryClient';

export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();
  const { lang } = useParams() as { lang: string };
  const dict = getClientDictionary(lang as Locale);
  const t = dict.auth;
  const loadingText = dict.common.loading;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setLoading(true);
    setSignupError(null);

    if (!username) {
      setErrorKey('required-username');
      setSignupError(t.errors?.requiredUsername ?? 'Username is required');
      setLoading(false);
      return;
    }

    if (!email) {
      setErrorKey('required-email');
      setSignupError(t.errors?.requiredEmail ?? 'Email address is required');
      setLoading(false);
      return;
    }

    if (!password) {
      setErrorKey('required-password');
      setSignupError(t.errors?.requiredPassword ?? 'Password is required');
      setLoading(false);
      return;
    }

    try {
      const result = await auth.signUp(username, email, password);
      if (result == undefined) {
        router.push(`/${lang}/dashboard`);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } else {
        let key: string | null = null;
        let msg = String(result);
        if (msg.includes('Username already exists')) {
          key = 'username-exists';
          msg = t.errors?.usernameExists ?? msg;
        } else if (msg.includes('Email already in use')) {
          key = 'email-in-use';
          msg = t.errors?.emailAlreadyInUse ?? msg;
        } else if (msg.includes('Invalid email address')) {
          key = 'invalid-email';
          msg = t.errors?.invalidEmail ?? msg;
        } else if (msg.includes('Password should be at least 6 characters')) {
          key = 'weak-password';
          msg = t.errors?.weakPassword ?? msg;
        }
        setErrorKey(key);
        setSignupError(msg);
        setLoading(false);
      }
    } finally {
    }
  };

  const handleGoogleSignin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      await auth.logInWithGoogle();
      router.push(`/${lang}/dashboard`);
    } catch (e) {
      console.log(e);
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
          {t.register}
        </h2>
        <form className="flex w-full flex-col gap-4 md:gap-3 lg:gap-4">
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-slate-grey"
            >
              {t.username.replace('*','')}
            </label>
            <input
              type="text"
              id="username"
              placeholder={t.enterUsername}
              value={username}
              onChange={handleUsernameChange}
              className={`w-full rounded-large bg-soft-white px-8 py-4 text-charcoal shadow-custom1 focus:outline-none md:py-3 lg:py-4 ${
                errorKey === 'required-username' || errorKey === 'username-exists'
                  ? 'border border-red-500'
                  : ''
              }`}
            />
            {(errorKey === 'required-username' || errorKey === 'username-exists') && signupError && (
              <p className="ml-3 text-xs text-red-500">{signupError}</p>
            )}
          </div>
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
              className={`w-full rounded-large bg-soft-white px-8 py-4 text-charcoal shadow-custom1 focus:outline-none md:py-3 lg:py-4 ${
                errorKey === 'required-email' || errorKey === 'email-in-use' || errorKey === 'invalid-email'
                  ? 'border border-red-500'
                  : ''
              }`}
            />
            {(errorKey === 'required-email' || errorKey === 'email-in-use' || errorKey === 'invalid-email') && signupError ? (
              <p className="ml-3 text-xs text-red-500">{signupError}</p>
            ) : null}
          </div>
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-grey"
            >
              {t.password.replace('*','')}
            </label>
            <div
              className={`flex w-full rounded-large bg-soft-white py-4 pl-8 pr-5 text-charcoal shadow-custom1 md:py-3 lg:py-4 ${
                errorKey === 'required-password' || errorKey === 'weak-password'
                  ? 'border border-red-500'
                  : ''
              }`}
            >
              <input
                type={passwordVisible ? 'text' : 'password'}
                autoComplete="on"
                id="password"
                placeholder={t.enterPassword}
                value={password}
                onChange={handlePasswordChange}
                className="-mr-[0.625rem] w-full border-none focus:outline-none"
              />
              <button
                type="button"
                className="-ml-4 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            {(errorKey === 'required-password' || errorKey === 'weak-password') && signupError ? (
              <p className="ml-3 text-xs text-red-500">{signupError}</p>
            ) : null}
          </div>

          <div className="mt-2 flex flex-col gap-4">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-full bg-misty-blue font-semibold text-white"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? loadingText : t.registerButton}
            </button>
            <div className="flex w-full items-center px-2">
              <div className="h-px w-full border border-[#F5F5F5]"></div>
              <p className="px-3 text-xs font-normal text-[#BABABA]">{t.or}</p>
              <div className="h-px w-full border border-[#F5F5F5]"></div>
            </div>
            <button
              type="button"
              className="flex h-14 w-full items-center justify-center gap-6 rounded-full bg-soft-white font-semibold text-charcoal shadow-custom1 md:pl-0"
              onClick={handleGoogleSignin}
              disabled={loading}
            >
              <Google></Google>
              <p>{t.registerGoogle}</p>
            </button>
          </div>
        </form>
        <p className="pt-2 text-sm font-medium text-slate-grey">
          {t.haveAccount + ' '}
          <Link href={`/${lang}/login`} className="text-[#007AFF]">
            {t.loginNow}
          </Link>
        </p>
      </section>
    </main>
  );
}
