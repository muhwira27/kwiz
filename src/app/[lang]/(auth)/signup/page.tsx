'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/auth/AuthUserProvider';
import Learning from '../../../../../public/images/Learning-bro.svg';

export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();
  const { lang } = useParams() as { lang: string };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState<any>(null);

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
      setSignupError('Username is required');
      setLoading(false);
      return;
    }

    if (!email) {
      setSignupError('Email adress is required');
      setLoading(false);
      return;
    }

    if (!password) {
      setSignupError('Password is required');
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
        setSignupError(result);
        setLoading(false);
      }
    } finally {
    }
  };

  const handleGoogleSignin = async () => {
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
      <section className="flex h-fit w-full max-w-[640px] flex-col items-center gap-5 rounded-large bg-soft-white px-4 py-8 md:w-1/2 md:gap-4 md:px-12 md:py-5 min-[1280px]:gap-5 min-[1280px]:py-8 lg:w-[70%] lg:px-24">
        <h2 className="mb-2 text-center text-xl font-bold md:mb-0 md:text-[24px]">
          Create Your Account
        </h2>
        <form className="flex w-full flex-col gap-4 md:gap-3 lg:gap-4">
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-slate-grey"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              className={`w-full rounded-large bg-soft-white px-8 py-4 text-charcoal shadow-custom1 focus:outline-none md:py-3 lg:py-4 ${
                signupError && signupError.includes('Username')
                  ? 'border border-red-500'
                  : ''
              }`}
            />
            {signupError && signupError.includes('Username') && (
              <p className="ml-3 text-xs text-red-500">{signupError}</p>
            )}
          </div>
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
              className={`w-full rounded-large bg-soft-white px-8 py-4 text-charcoal shadow-custom1 focus:outline-none md:py-3 lg:py-4 ${
                signupError &&
                (signupError.includes('email') || signupError.includes('Email'))
                  ? 'border border-red-500'
                  : ''
              }`}
            />
            {(signupError && signupError.includes('email')) ||
            (signupError && signupError.includes('Email')) ? (
              <p className="ml-3 text-xs text-red-500">{signupError}</p>
            ) : null}
          </div>
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-grey"
            >
              Password
            </label>
            <div
              className={`flex w-full rounded-large bg-soft-white py-4 pl-8 pr-5 text-charcoal shadow-custom1 md:py-3 lg:py-4 ${
                signupError && signupError.includes('Password')
                  ? 'border border-red-500'
                  : ''
              }`}
            >
              <input
                type={passwordVisible ? 'text' : 'password'}
                autoComplete="on"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                className="-mr-[10px] w-full border-none focus:outline-none"
              />
              <button
                type="button"
                className="-ml-4 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            {signupError && signupError.includes('Password') ? (
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
              {loading ? 'Loading...' : 'Create Account'}
            </button>
            <div className="flex w-full items-center px-2">
              <div className="h-px w-full border border-[#F5F5F5]"></div>
              <p className="px-3 text-xs font-normal text-[#BABABA]">OR</p>
              <div className="h-px w-full border border-[#F5F5F5]"></div>
            </div>
            <button
              className="flex h-14 w-full items-center justify-center gap-6 rounded-full bg-soft-white font-semibold text-charcoal shadow-custom1 md:pl-0"
              onClick={handleGoogleSignin}
              disabled={loading}
            >
              <Google></Google>
              <p>{'Sign Up with Google'}</p>
            </button>
          </div>
        </form>
        <p className="pt-2 text-sm font-medium text-slate-grey">
          Already have an account?{' '}
          <Link href={`/${lang}/login`} className="text-[#007AFF]">
            Login now
          </Link>
        </p>
      </section>
    </main>
  );
}
